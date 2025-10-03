// frontend/src/contexts/UserTypes.ts
export type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
};



export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void; // permitir também null
};
