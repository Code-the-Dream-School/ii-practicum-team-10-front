import { createContext, useState, ReactNode } from "react";
import api from "../api";

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    name: string,
    email: string,
    password: string,
    verifyPassword: string
  ) => Promise<void>;
  logout: () => void;
  selectedClass: string;
  setSelectedClass: (className: string) => void;
  selectedClassChallenge: string;
  setSelectedClassChallenge: (className: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedClassChallenge, setSelectedClassChallenge] =
    useState<string>("");

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const resp = await api.login(email, password);
      const userData = resp.data;

      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);
      return userData.user;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    verifyPassword: string
  ) => {
    setIsLoading(true);
    try {
      const resp = await api.register(name, email, password, verifyPassword);
      if (resp.status == 201) {
        const userData = resp.data;
        setUser(userData.user);
        localStorage.setItem("user", JSON.stringify(userData.user));
        localStorage.setItem("token", userData.token);
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        isLoading,
        selectedClass,
        setSelectedClass,
        selectedClassChallenge,
        setSelectedClassChallenge,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
