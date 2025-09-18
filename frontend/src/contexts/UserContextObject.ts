// src/contexts/UserContextObject.ts
import { createContext } from "react";
import type { UserContextType } from "./UserTypes";

export const UserContext = createContext<UserContextType | undefined>(undefined);
