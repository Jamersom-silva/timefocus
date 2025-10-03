// frontend/src/contexts/UserTypes.ts
export type User = {
  id: number;
  email: string;
  username: string;
  created_at: string; // necessário para ProfilePage
};


export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void; // permitir também null
};
