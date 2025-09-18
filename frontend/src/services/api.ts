
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw error;
  }

  return res.json();
}

// Exemplo de funções específicas
export const api = {
  login: (data: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  register: (data: { name: string; email: string; password: string }) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  getUser: () => request('/users/me'),

  // Funções para Pomodoro, Subjects, Reports etc
  getPomodoroCycles: () => request('/pomodoro'),
};
