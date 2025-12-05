"use client";

import { ReactNode } from "react";

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function DashboardShell({
  title,
  subtitle,
  children,
}: DashboardShellProps) {
  return (
    <main className="cp-page">
      <div className="cp-container cp-dashboard">
        <header className="cp-dashboard-header">
          <div>
            <h1 className="cp-dashboard-title">{title}</h1>
            {subtitle && <p className="cp-dashboard-subtitle">{subtitle}</p>}
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
