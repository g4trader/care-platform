"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "@/lib/api-client";

type UserRole = "caregiver" | "client" | null;

interface AuthState {
  userId: string | null;
  role: UserRole;
  name: string | null;
}

interface AuthContextType extends AuthState {
  login: (role: "caregiver" | "client", name: string) => Promise<void>;
  loginWithGoogleMock: () => Promise<void>;
  setRole: (role: "caregiver" | "client") => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    userId: null,
    role: null,
    name: null,
  });

  // Carregar do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuthState(parsed);
      } catch (e) {
        localStorage.removeItem("auth");
      }
    }
  }, []);

  const login = async (role: "caregiver" | "client", name: string) => {
    const response = await apiClient.post<{ userId: string; role: "caregiver" | "client"; name: string }>(
      "/api/auth/login",
      { role, name }
    );

    const newState = {
      userId: response.userId,
      role: response.role,
      name: response.name,
    };

    setAuthState(newState);
    localStorage.setItem("auth", JSON.stringify(newState));
  };

  const loginWithGoogleMock = async () => {
    const response = await apiClient.post<{ userId: string; role: null; name: string }>(
      "/api/auth/google-mock",
      {}
    );

    const newState = {
      userId: response.userId,
      role: null,
      name: response.name,
    };

    setAuthState(newState);
    localStorage.setItem("auth", JSON.stringify(newState));
  };

  const setRole = async (role: "caregiver" | "client") => {
    if (!authState.userId) {
      throw new Error("Usuário não autenticado");
    }

    const response = await apiClient.post<{ userId: string; role: "caregiver" | "client"; name: string }>(
      "/api/auth/set-role",
      { userId: authState.userId, role }
    );

    const newState = {
      userId: response.userId,
      role: response.role,
      name: response.name,
    };

    setAuthState(newState);
    localStorage.setItem("auth", JSON.stringify(newState));
  };

  const logout = () => {
    setAuthState({ userId: null, role: null, name: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loginWithGoogleMock,
        setRole,
        logout,
        isAuthenticated: !!authState.userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

