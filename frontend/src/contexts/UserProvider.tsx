import { useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { User } from "./UserTypes";

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
