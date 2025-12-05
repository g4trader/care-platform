"use client";

import { ReactNode } from "react";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  roleLabel: "CONTRATANTE" | "CUIDADOR";
  children: ReactNode;
}

export function DashboardShell({
  title,
  subtitle,
  roleLabel,
  children,
}: DashboardShellProps) {
  const { name, logout } = useAuth();

  return (
    <main className="cp-page">
      <div className="cp-container cp-dashboard">
        <header className="cp-dashboard-header">
          <div>
            <h1 className="cp-dashboard-title">{title}</h1>
            {subtitle && <p className="cp-dashboard-subtitle">{subtitle}</p>}
          </div>

          <div className="cp-dashboard-user">
            <div className="cp-dashboard-user-pill">
              <User className="cp-icon-sm" />
              <span>{name || "Usuário"}</span>
            </div>
            <span className="cp-role-pill">{roleLabel}</span>
            <button className="cp-btn cp-btn-ghost" onClick={logout}>
              Sair
            </button>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}

