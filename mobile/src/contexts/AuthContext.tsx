import { createContext, ReactNode, useState } from "react";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type AuthContextProps = {
  user: UserProps;
  token: string;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [token, setToken] = useState("");

  const isAuthenticated = !!user?.id;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
