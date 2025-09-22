// src/types/api.ts

export interface UserOut {
  id: number;
  username: string;
  email: string;
  created_at: string; // datetime em string
}

export interface PomodoroCycleOut {
  id: number;
  user_id: number;
  duration: number;
  start_time: string; // início do ciclo
  end_time: string | null; // fim do ciclo (pode ser null se estiver em andamento)
}

export interface PomodoroCycleCreate {
  duration: number;
}

export interface SubjectOut {
  id: number;
  user_id: number;
  name: string;
  description?: string | null;
}

export interface SubjectCreate {
  name: string;
  description?: string;
}

export interface ExerciseOut {
  id: number;
  user_id: number;
  subject_id: number;
  question: string;
  answer?: string;
  completed: boolean;
  ai_generated: boolean;
}

export interface ExerciseCreate {
  subject_id: number;
  question: string;
  answer?: string;
  ai_generated?: boolean;
}

export interface ReportOut {
  id: number;
  user_id: number;
  type: string;
  data: string;
  created_at: string;
}

export interface ReportCreate {
  type: string;
  data: string;
}
