"use client";

import { useRouter } from "next/navigation";
import { Book, ShoppingCart, Calendar, User, TrendingUp, Activity, CheckCircle, Star } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="badge">
              <CheckCircle className="cp-icon-sm" style={{ width: "14px", height: "14px", marginRight: "0.25rem" }} />
              Plataforma Completa
            </div>
            <h1 className="hero-headline">
              Conecte cuidadores qualificados com quem precisa de cuidado
            </h1>
            <p className="hero-subheadline">
              Certificação, marketplace e gestão de serviços em uma única plataforma.
              Transforme a forma como cuidadores e contratantes se conectam.
            </p>
            <div className="hero-cta">
              <button
                className="btn btn-primary"
                onClick={() => router.push("/login")}
              >
                Começar agora
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => router.push("/login")}
              >
                Explorar plataforma
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">
                  <TrendingUp className="cp-icon-sm" style={{ width: "16px", height: "16px", marginRight: "0.25rem" }} />
                  500+
                </div>
                <div className="stat-label">Cuidadores ativos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <Activity className="cp-icon-sm" style={{ width: "16px", height: "16px", marginRight: "0.25rem" }} />
                  1.2k+
                </div>
                <div className="stat-label">Serviços realizados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <CheckCircle className="cp-icon-sm" style={{ width: "16px", height: "16px", marginRight: "0.25rem" }} />
                  98%
                </div>
                <div className="stat-label">Satisfação</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="dashboard-header">
                <div className="dashboard-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="dashboard-title">Care Platform Dashboard</div>
              </div>
              <div className="dashboard-content">
                <div className="dashboard-card">
                  <div className="card-header">
                    <div className="cp-icon-container">
                      <User className="cp-icon-xl" />
                    </div>
                    <div>
                      <div className="card-title">Maria Silva</div>
                      <div className="card-subtitle">Cuidadora Profissional</div>
                    </div>
                  </div>
                  <div className="card-stats">
                    <div className="mini-stat">
                      <span className="mini-stat-label">Avaliação</span>
                      <span className="mini-stat-value">
                        <Star className="cp-icon-sm" style={{ width: "14px", height: "14px", marginRight: "0.25rem", display: "inline", verticalAlign: "middle" }} />
                        4.9
                      </span>
                    </div>
                    <div className="mini-stat">
                      <span className="mini-stat-label">Serviços</span>
                      <span className="mini-stat-value">127</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="card-header">
                    <div className="cp-icon-container">
                      <Calendar className="cp-icon-xl" />
                    </div>
                    <div>
                      <div className="card-title">Agenda</div>
                      <div className="card-subtitle">3 serviços esta semana</div>
                    </div>
                  </div>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-time">Hoje, 14:00</div>
                        <div className="timeline-text">Cuidado domiciliar - SP</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-time">Amanhã, 09:00</div>
                        <div className="timeline-text">Acompanhamento médico</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="pillars-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Tudo que você precisa em uma plataforma</h2>
            <p className="section-description">
              Três pilares fundamentais para transformar o cuidado profissional
            </p>
          </div>
          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
                <Book className="cp-icon-lg" style={{ width: "32px", height: "32px" }} />
              </div>
              <h3 className="pillar-title">Certificação</h3>
              <p className="pillar-description">
                Cursos e certificações para profissionais se qualificarem e
                destacarem no mercado. Aprenda com especialistas e obtenha
                credenciais reconhecidas.
              </p>
              <div className="pillar-features">
                <span className="feature-tag">Cursos online</span>
                <span className="feature-tag">Certificados</span>
                <span className="feature-tag">Especialização</span>
              </div>
            </div>

            <div className="pillar-card">
              <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
                <ShoppingCart className="cp-icon-lg" style={{ width: "32px", height: "32px" }} />
              </div>
              <h3 className="pillar-title">Marketplace</h3>
              <p className="pillar-description">
                Conecte cuidadores qualificados com famílias e instituições.
                Sistema inteligente de matching e avaliações para garantir
                a melhor experiência.
              </p>
              <div className="pillar-features">
                <span className="feature-tag">Matching</span>
                <span className="feature-tag">Avaliações</span>
                <span className="feature-tag">Segurança</span>
              </div>
            </div>

            <div className="pillar-card">
              <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
                <Calendar className="cp-icon-lg" style={{ width: "32px", height: "32px" }} />
              </div>
              <h3 className="pillar-title">Gestão</h3>
              <p className="pillar-description">
                Agenda, relatórios e automações para facilitar a gestão dos
                serviços. Controle total sobre seus atendimentos e comunicação
                integrada.
              </p>
              <div className="pillar-features">
                <span className="feature-tag">Agenda</span>
                <span className="feature-tag">Relatórios</span>
                <span className="feature-tag">Automação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2 className="cta-title">Pronto para começar?</h2>
            <p className="cta-description">
              Junte-se a centenas de cuidadores e contratantes que já transformaram
              sua forma de trabalhar.
            </p>
            <div className="cta-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={() => router.push("/login")}
              >
                Sou Cuidador
              </button>
              <button
                className="btn btn-outline btn-large"
                onClick={() => router.push("/login")}
              >
                Sou Contratante
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
