import React, { createContext, useContext, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [localAuthenticated, setLocalAuthenticated] = useState(false);
  const { data: session } = trpc.admin.session.useQuery();
  const logoutMutation = trpc.admin.logout.useMutation();

  useEffect(() => {
    setLocalAuthenticated(localStorage.getItem("admin_auth") === "true");
  }, []);

  useEffect(() => {
    if (session?.authenticated) {
      setLocalAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    }
  }, [session?.authenticated]);

  const login = () => {
    setLocalAuthenticated(true);
    localStorage.setItem("admin_auth", "true");
  };

  const logout = () => {
    setLocalAuthenticated(false);
    localStorage.removeItem("admin_auth");
    logoutMutation.mutate();
  };

  const isAuthenticated = localAuthenticated && session?.authenticated === true;

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
