import axios from "axios";
import { createContext, useState, ReactNode } from "react";

type User = {
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (data: { email: string; password: string }) => {
    // http://localhost:3000/login
    // React-Toastify
    axios.post("http://localhost:3000/login", data)
      .then(res => {
        setUser({
          email: data.email,
          token: res.data.token
        });
      })
      .catch(err => alert("erro: " + err))
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
