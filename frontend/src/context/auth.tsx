import axios from "axios";
import { createContext, useState, ReactNode } from "react";

type User = {
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiUrl = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (data: { email: string; password: string }): Promise<boolean> => {
    // React-Toastify
    return axios.post(apiUrl + "/login", data)
      .then(res => {
        console.log("login realizado")
        console.log(res.data.token)
        setUser({
          email: data.email,
          token: res.data.token
        });
        return true
      })
      .catch(err => {throw err})
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
