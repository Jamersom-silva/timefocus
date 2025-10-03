// frontend/src/contexts/UserContext.tsx
import { createContext, useState, useEffect } from "react";
import type { User as UserType } from "./UserTypes";
import { api } from "../services/api";

export type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  login: (email: string, password: string) => Promise<UserType | null>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Função para atualizar usuário a partir do backend
  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setUser(null);

    try {
      const data = await api.getCurrentUser();
      setUser(data);
    } catch (err) {
      console.error("Falha ao atualizar usuário:", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // Ao iniciar, verifica se há token e busca usuário atual
  useEffect(() => {
    refreshUser();
  }, []);

  // Login: salva token e atualiza estado
  const login = async (email: string, password: string): Promise<UserType | null> => {
    try {
      const res = await api.login({ email, password });
      localStorage.setItem("token", res.access_token);
      if (res.user) setUser(res.user);
      return res.user || null;
    } catch (err) {
      throw new Error("Falha no login");
    }
  };

  // Registro: salva token e atualiza estado
  const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const res = await api.register({ username, email, password });
      localStorage.setItem("token", res.access_token);
      if (res.user) setUser(res.user);
    } catch (err) {
      throw new Error("Falha no registro");
    }
  };

  // Logout: remove token e limpa estado
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
