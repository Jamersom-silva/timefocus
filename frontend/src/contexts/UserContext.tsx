import { createContext } from "react";
import type { User } from "./UserTypes";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Inicializamos como `null` porque o provider vai fornecer o valor real
export const UserContext = createContext<UserContextType | null>(null);
