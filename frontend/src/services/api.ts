const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token'); // pegar token do localStorage

  // Usando Record<string, string> para headers e depois convertendo para HeadersInit
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: headers as HeadersInit, // cast final
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw error;
  }

  return res.json();
}

export const api = {
  // ---------- Auth ----------
  login: (data: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  register: (data: { name: string; email: string; password: string }) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  // ---------- User ----------
  getCurrentUser: () => request('/api/users/me'),

  // ---------- Pomodoro ----------
  getPomodoroCycles: () => request('/api/pomodoro'),
  createPomodoroCycle: (data: { duration: number }) =>
    request('/api/pomodoro', { method: 'POST', body: JSON.stringify(data) }),

  // ---------- Subjects ----------
  getSubjects: () => request('/api/subjects'),
  createSubject: (data: { name: string; description?: string }) =>
    request('/api/subjects', { method: 'POST', body: JSON.stringify(data) }),

  // ---------- Exercises ----------
  getExercises: () => request('/api/exercises'),
  createExercise: (data: { subject_id: number; question: string; answer?: string; ai_generated?: boolean }) =>
    request('/api/exercises', { method: 'POST', body: JSON.stringify(data) }),

  // ---------- Reports ----------
  getReports: () => request('/api/reports'),
  createReport: (data: { type: string; data: string }) =>
    request('/api/reports', { method: 'POST', body: JSON.stringify(data) }),
};
