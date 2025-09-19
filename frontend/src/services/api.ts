import type { 
  UserOut, PomodoroCycleOut, PomodoroCycleCreate,
  SubjectOut, SubjectCreate,
  ExerciseOut, ExerciseCreate,
  ReportOut, ReportCreate
} from "../types/api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: headers as HeadersInit,
  });

  if (!res.ok) {
    const error: { detail?: string } = await res.json().catch(() => ({ detail: res.statusText }));
    throw error;
  }

  return res.json() as Promise<T>;
}

export const api = {
  // ---------- Auth ----------
  login: (data: { email: string; password: string }) =>
    request<{ access_token: string; token_type: string }>("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  register: (data: { username: string; email: string; password: string }) =>
    request<UserOut>("/auth/register", { method: "POST", body: JSON.stringify(data) }),

  getCurrentUser: () => request<UserOut>("/auth/me"),

  // ---------- Pomodoro ----------
  getPomodoroCycles: () => request<PomodoroCycleOut[]>("/api/pomodoro"),
  createPomodoroCycle: (data: PomodoroCycleCreate) =>
    request<PomodoroCycleOut>("/api/pomodoro", { method: "POST", body: JSON.stringify(data) }),

  // ---------- Subjects ----------
  getSubjects: () => request<SubjectOut[]>("/api/subjects"),
  createSubject: (data: SubjectCreate) =>
    request<SubjectOut>("/api/subjects", { method: "POST", body: JSON.stringify(data) }),

  // ---------- Exercises ----------
  getExercises: () => request<ExerciseOut[]>("/api/exercises"),
  createExercise: (data: ExerciseCreate) =>
    request<ExerciseOut>("/api/exercises", { method: "POST", body: JSON.stringify(data) }),

  // ---------- Reports ----------
  getReports: () => request<ReportOut[]>("/api/reports"),
  createReport: (data: ReportCreate) =>
    request<ReportOut>("/api/reports", { method: "POST", body: JSON.stringify(data) }),
};
