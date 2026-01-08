"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Menu, X } from "lucide-react";

export function AppHeader() {
  const { userId, role, name, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  const handleGoToDashboard = () => {
    setIsMobileMenuOpen(false);
    if (role === "caregiver") {
      router.push("/caregiver");
    } else if (role === "client") {
      router.push("/client");
    } else {
      router.push("/login");
    }
  };

  const handleMenuLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Bloquear scroll do body quando menu aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="cp-app-header">
        <div className="cp-container cp-app-header-inner">
          {/* Logo - visível em todas as telas */}
          <Link href="/" className="cp-logo" onClick={handleMenuLinkClick}>
            <Image
              src="/logo_principal_horizontal.png"
              alt="Academia de Cuidadores"
              width={1080}
              height={323}
              priority
              className="cp-logo-img"
            />
          </Link>

          {/* Navegação Desktop - oculta no mobile */}
          <nav className="cp-nav cp-nav-desktop">
            <Link href="/#como-funciona">Como funciona</Link>
            <Link href="/#pilares">Pilares</Link>
            <span className="cp-nav-muted">Planos (em breve)</span>
          </nav>

          {/* Ações Desktop - ocultas no mobile */}
          <div className="cp-header-actions cp-header-actions-desktop">
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

          {/* Menu Hamburger Mobile - visível apenas no mobile */}
          <button
            className="cp-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="cp-icon-lg" style={{ width: "24px", height: "24px" }} />
            ) : (
              <Menu className="cp-icon-lg" style={{ width: "24px", height: "24px" }} />
            )}
          </button>
        </div>
      </header>

      {/* Menu Drawer Mobile */}
      <div
        className={`cp-mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <nav
          className={`cp-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cp-mobile-menu-header">
            <h3 className="cp-mobile-menu-title">Menu</h3>
            <button
              className="cp-mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="cp-icon-lg" style={{ width: "24px", height: "24px" }} />
            </button>
          </div>

          <div className="cp-mobile-menu-content">
            <Link href="/" className="cp-mobile-menu-item" onClick={handleMenuLinkClick}>
              Início
            </Link>
            <Link href="/#como-funciona" className="cp-mobile-menu-item" onClick={handleMenuLinkClick}>
              Como funciona
            </Link>
            <Link href="/#pilares" className="cp-mobile-menu-item" onClick={handleMenuLinkClick}>
              Pilares
            </Link>
            <span className="cp-mobile-menu-item cp-mobile-menu-item-muted">Planos (em breve)</span>

            <div className="cp-mobile-menu-divider"></div>

            <Link href="/caregiver" className="cp-mobile-menu-item" onClick={handleMenuLinkClick}>
              Para quem cuida
            </Link>
            <Link href="/client" className="cp-mobile-menu-item" onClick={handleMenuLinkClick}>
              Para famílias
            </Link>

            <div className="cp-mobile-menu-divider"></div>

            {isAuthenticated && userId ? (
              <>
                <div className="cp-mobile-menu-user">
                  <User className="cp-icon-sm" style={{ width: "18px", height: "18px" }} />
                  <span>{name || "Usuário"}</span>
                </div>
                <button
                  className="cp-mobile-menu-item cp-mobile-menu-item-button"
                  onClick={handleGoToDashboard}
                >
                  Ir para painel
                </button>
                <button
                  className="cp-mobile-menu-item cp-mobile-menu-item-button cp-mobile-menu-item-danger"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="cp-mobile-menu-item cp-mobile-menu-item-button cp-mobile-menu-item-primary"
                  onClick={handleMenuLinkClick}
                >
                  Entrar
                </Link>
                <Link
                  href="/login"
                  className="cp-mobile-menu-item cp-mobile-menu-item-button cp-mobile-menu-item-primary"
                  onClick={handleMenuLinkClick}
                >
                  Começar agora
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

