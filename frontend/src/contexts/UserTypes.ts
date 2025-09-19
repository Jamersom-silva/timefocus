export type User = {
  id: number;
  email: string;
  username: string; // antes era "name"
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};
