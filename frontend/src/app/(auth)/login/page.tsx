"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Book, ShoppingCart, BarChart2, User, Home, Shield, TrendingUp, Activity, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogleMock, setRole } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [name, setName] = useState("");

  const handleGoogleLogin = async () => {
    setLoading("google");
    try {
      await loginWithGoogleMock();
      setShowRoleSelection(true);
    } catch (err: any) {
      alert(err.message || "Erro ao fazer login com Google");
    } finally {
      setLoading(null);
    }
  };

  const handleRoleSelection = async (role: "caregiver" | "client") => {
    setLoading(role);
    try {
      await setRole(role);
      router.push(role === "caregiver" ? "/caregiver" : "/client");
    } catch (err: any) {
      alert(err.message || "Erro ao definir perfil");
    } finally {
      setLoading(null);
    }
  };

  const handleDirectLogin = async (role: "caregiver" | "client") => {
    const userName = name.trim() || "Usuário de teste";
    setLoading(role);
    try {
      await login(role, userName);
      router.push(role === "caregiver" ? "/caregiver" : "/client");
    } catch (err: any) {
      alert(err.message || "Erro ao fazer login");
    } finally {
      setLoading(null);
    }
  };

  // Modal de seleção de role após Google login
  if (showRoleSelection) {
    return (
      <div className="cp-page">
        <div className="cp-container" style={{ maxWidth: "600px" }}>
          <div className="cp-card">
            <div className="cp-page-header" style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}>
              <h1 className="cp-modal-title">Como você quer usar a plataforma?</h1>
              <p className="cp-modal-description">
                Escolha o perfil que melhor descreve como você vai usar a Care Platform.
              </p>
            </div>

            <div className="cp-grid-2" style={{ marginTop: "var(--spacing-xl)" }}>
              <div
                className="cp-role-card"
                onClick={() => handleRoleSelection("caregiver")}
                style={{ opacity: loading === "caregiver" ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                <div className="cp-icon-container" style={{ margin: "0 auto var(--spacing-md)" }}>
                  <User className="cp-icon-lg" />
                </div>
                <h3 className="cp-role-card-title">Sou Cuidador</h3>
                <p className="cp-role-card-description">
                  Profissional que oferece serviços de cuidado. Acesse cursos, gerencie sua agenda e encontre oportunidades.
                </p>
                {loading === "caregiver" && <div>Carregando...</div>}
              </div>

              <div
                className="cp-role-card"
                onClick={() => handleRoleSelection("client")}
                style={{ opacity: loading === "client" ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                <div className="cp-icon-container" style={{ margin: "0 auto var(--spacing-md)" }}>
                  <Home className="cp-icon-lg" />
                </div>
                <h3 className="cp-role-card-title">Sou Contratante</h3>
                <p className="cp-role-card-description">
                  Família ou instituição que precisa de serviços de cuidado. Crie pedidos e encontre cuidadores qualificados.
                </p>
                {loading === "client" && <div>Carregando...</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela principal de login com layout em 2 colunas
  return (
    <main className="cp-auth-root">
      <div className="cp-auth-container">
        <div className="cp-auth-grid">
          {/* Coluna Esquerda - Texto/Hero */}
          <div>
            <div className="cp-auth-left-pill">
              <Shield className="cp-icon-sm" style={{ width: "14px", height: "14px" }} />
              Acesso seguro para cuidadores e contratantes
            </div>
            <h1 className="cp-auth-left-title">
              Conecte sua conta e comece a organizar seus cuidados
            </h1>
            <p className="cp-auth-left-text">
              A Care Platform ajuda cuidadores a profissionalizar o trabalho e famílias a acompanharem cada atendimento com transparência.
            </p>

            <ul className="cp-auth-bullets">
              <li>
                <Book className="cp-icon-sm" />
                <span>Certificação e trilhas práticas para quem cuida.</span>
              </li>
              <li>
                <ShoppingCart className="cp-icon-sm" />
                <span>Marketplace com filtros por tipo de cuidado e região.</span>
              </li>
              <li>
                <BarChart2 className="cp-icon-sm" />
                <span>Agenda e relatórios claros para famílias e instituições.</span>
              </li>
            </ul>

            <div className="cp-auth-stats-row">
              <div className="cp-auth-stat">
                <strong>
                  <TrendingUp className="cp-icon-sm" style={{ width: "14px", height: "14px", marginRight: "0.25rem", display: "inline" }} />
                  500+
                </strong>
                <span>cuidadores ativos</span>
              </div>
              <div className="cp-auth-stat">
                <strong>
                  <Activity className="cp-icon-sm" style={{ width: "14px", height: "14px", marginRight: "0.25rem", display: "inline" }} />
                  1.2k+
                </strong>
                <span>serviços realizados</span>
              </div>
              <div className="cp-auth-stat">
                <strong>
                  <CheckCircle className="cp-icon-sm" style={{ width: "14px", height: "14px", marginRight: "0.25rem", display: "inline" }} />
                  98%
                </strong>
                <span>de satisfação</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Card de Login */}
          <div>
            <div className="cp-auth-card">
              {/* Logo/Topo */}
              <div className="cp-auth-card-header">
                <Image
                  src="/logo-care-platform.svg"
                  alt="Care Platform"
                  width={180}
                  height={42}
                  style={{ marginBottom: "var(--spacing-sm)" }}
                />
                <p className="cp-auth-card-subtitle">Plataforma completa para cuidadores e contratantes</p>
              </div>

              {/* Headline */}
              <h1 className="cp-auth-title">Entre na Care Platform</h1>
              <p className="cp-auth-subtitle">
                Escolha como quer acessar para organizar seus cuidados e atendimentos.
              </p>

              {/* Botão Google */}
              <button
                className="cp-auth-google-btn"
                onClick={handleGoogleLogin}
                disabled={!!loading}
              >
                <span className="cp-g-icon">G</span>
                <span>Continuar com Google</span>
              </button>

              {/* Divisor */}
              <div className="cp-auth-divider">
                <span>ou continue definindo seu perfil</span>
              </div>

              {/* Campo Nome (opcional) */}
              <div className="cp-auth-field">
                <label htmlFor="name" className="cp-auth-label">
                  Seu nome (opcional)
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Deixe em branco para usar 'Usuário de teste'"
                  className="cp-auth-input"
                />
              </div>

              {/* Cards de Seleção de Perfil */}
              <div className="cp-auth-roles">
                <div
                  className="cp-auth-role-card"
                  data-role="caregiver"
                  onClick={() => !loading && handleDirectLogin("caregiver")}
                  style={{
                    opacity: loading === "caregiver" ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  <div className="cp-icon-container-sm" style={{ margin: "0 auto var(--spacing-sm)" }}>
                    <User className="cp-icon" />
                  </div>
                  <h3 className="cp-auth-role-title">Sou Cuidador</h3>
                  <p className="cp-auth-role-desc">
                    Acesse cursos, gerencie sua agenda e encontre oportunidades de trabalho.
                  </p>
                  {loading === "caregiver" && (
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                      Entrando...
                    </div>
                  )}
                </div>

                <div
                  className="cp-auth-role-card"
                  data-role="client"
                  onClick={() => !loading && handleDirectLogin("client")}
                  style={{
                    opacity: loading === "client" ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  <div className="cp-icon-container-sm" style={{ margin: "0 auto var(--spacing-sm)" }}>
                    <Home className="cp-icon" />
                  </div>
                  <h3 className="cp-auth-role-title">Sou Contratante</h3>
                  <p className="cp-auth-role-desc">
                    Crie pedidos de cuidado e encontre cuidadores qualificados para sua família.
                  </p>
                  {loading === "client" && (
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                      Entrando...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
