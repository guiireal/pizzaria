import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type AuthContextProps = {
  user: UserProps;
  token: string;
  isAuthenticated: boolean;
  loadingAuth: boolean;
  loading: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [token, setToken] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user?.id;

  useEffect(() => {
    async function getUser() {
      const storage = await AsyncStorage.getItem("@sujeitopizzaria");

      if (storage) {
        const { user, token } = JSON.parse(storage) as {
          user: UserProps;
          token: string;
        };

        setUser(user);
        setToken(token);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setLoading(false);
      }
    }

    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/sign-in", {
        email,
        password,
      });

      const { user, token } = response.data as {
        user: UserProps;
        token: string;
      };

      await AsyncStorage.setItem(
        "@sujeitopizzaria",
        JSON.stringify({ user, token })
      );

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
      setToken(token);
    } catch (error) {
      console.error("Erro ao acessar!", error);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();

    setUser({} as UserProps);
    setToken("");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loadingAuth,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
