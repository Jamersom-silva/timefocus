import { createContext, useState, useEffect } from "react";
import type { User as UserType } from "./UserTypes";
import { api } from "../services/api";

export type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  login: (email: string, password: string) => Promise<UserType | null>;
  register: (username: string, email: string, password: string, cpf?: string, telefone?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  login: async () => null,
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setUser(null);

    try {
      const data = await api.getCurrentUser();
      setUser(data);
    } catch (err: any) {
      console.error("Falha ao atualizar usuário:", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string): Promise<UserType | null> => {
    try {
      const res = await api.login({ email, password });
      localStorage.setItem("token", res.access_token);
      if (res.user) {
        setUser(res.user);
        return res.user;
      } else {
        await refreshUser();
        return user;
      }
    } catch (err: any) {
      throw new Error(err?.message || "Falha no login");
    }
  };

  const register = async (username: string, email: string, password: string, cpf?: string, telefone?: string): Promise<void> => {
    try {
      const res = await api.register({ username, email, password, cpf, telefone });
      localStorage.setItem("token", res.access_token);
      if (res.user) setUser(res.user);
    } catch (err: any) {
      throw new Error(err?.message || "Falha no registro");
    }
  };

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
