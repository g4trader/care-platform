"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

export function AppHeader() {
  const { userId, role, name, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleGoToDashboard = () => {
    if (role === "caregiver") {
      router.push("/caregiver");
    } else if (role === "client") {
      router.push("/client");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="cp-app-header">
      <div className="cp-container cp-app-header-inner">
        <Link href="/" className="cp-logo">
          <Image
            src="/logo-care-platform.svg"
            alt="Care Platform"
            width={140}
            height={32}
            priority
          />
        </Link>

        <nav className="cp-nav">
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/#pilares">Pilares</Link>
          <span className="cp-nav-muted">Planos (em breve)</span>
        </nav>

        <div className="cp-header-actions">
          {isAuthenticated && userId ? (
            <>
              <div className="cp-dashboard-user-pill">
                <User className="cp-icon-sm" />
                <span>Olá, {name || "Usuário"}</span>
              </div>
              <button
                className="cp-btn cp-btn-secondary"
                onClick={handleGoToDashboard}
                style={{ padding: "var(--spacing-sm) var(--spacing-lg)", fontSize: "var(--font-size-sm)" }}
              >
                Ir para painel
              </button>
              <button
                className="cp-btn cp-btn-ghost"
                onClick={handleLogout}
                style={{ padding: "var(--spacing-sm) var(--spacing-lg)", fontSize: "var(--font-size-sm)" }}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="cp-nav-link"
                style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-700)" }}
              >
                Entrar
              </Link>
              <Link
                href="/login"
                className="cp-btn cp-btn-primary"
                style={{ padding: "var(--spacing-sm) var(--spacing-lg)", fontSize: "var(--font-size-sm)" }}
              >
                Começar agora
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

