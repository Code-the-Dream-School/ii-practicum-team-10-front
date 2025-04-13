import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
  
  interface User {
    userId: string;
    name: string;
    email: string;
    role: string;
    profilePicture: string;
  }
  
  interface AuthContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
  
    // Load from localStorage on initial render
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken) setTokenState(storedToken);
      if (storedUser) setUserState(JSON.parse(storedUser));
    }, []);
  
    const setUser = (user: User | null) => {
      setUserState(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    };
  
    const setToken = (token: string | null) => {
      setTokenState(token);
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    };
  
    return (
      <AuthContext.Provider value={{ user, token, setUser, setToken }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  