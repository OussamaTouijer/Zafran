
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "admin" | "client" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check local storage for existing user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const isAdmin = user?.role === "admin";
  const isClient = user?.role === "client";
  const isAuthenticated = !!user;
  
  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    // Mock authentication for demo purposes
    // In a real app, this would validate credentials against a backend
    if (email === "admin@zafran.com" && password === "admin123") {
      const adminUser = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@zafran.com",
        role: "admin" as UserRole
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
    } else {
      // Default to client role for demo purposes
      const clientUser = {
        id: "client-" + Math.floor(Math.random() * 1000),
        name: "Client User",
        email: email,
        role: "client" as UserRole
      };
      setUser(clientUser);
      localStorage.setItem("user", JSON.stringify(clientUser));
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  
  return (
    <AuthContext.Provider value={{ user, isAdmin, isClient, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
