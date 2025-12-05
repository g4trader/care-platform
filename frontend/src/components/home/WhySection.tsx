"use client";

import { HeartHandshake, Shield, Users, Target } from "lucide-react";

export default function WhySection() {
  return (
    <section className="cp-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="cp-section-title">Por que a Care Platform existe?</h2>
          <p className="cp-section-text">
            Acreditamos que o cuidado profissional merece reconhecimento, estrutura e tecnologia de ponta.
          </p>
        </div>

        <div className="cp-grid-2" style={{ marginTop: "var(--spacing-2xl)", gap: "var(--spacing-xl)" }}>
          <div className="cp-feature-card">
            <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
              <HeartHandshake className="cp-icon-lg" />
            </div>
            <h3 className="cp-card-title">Cuidado com propósito</h3>
            <p className="cp-card-subtitle">
              Conectamos pessoas que dedicam suas vidas ao cuidado com famílias que precisam de apoio especializado.
              Cada conexão é uma oportunidade de transformar vidas.
            </p>
          </div>

          <div className="cp-feature-card">
            <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
              <Shield className="cp-icon-lg" />
            </div>
            <h3 className="cp-card-title">Segurança e confiança</h3>
            <p className="cp-card-subtitle">
              Oferecemos um ambiente seguro onde cuidadores certificados encontram oportunidades reais e famílias
              encontram profissionais qualificados e confiáveis.
            </p>
          </div>

          <div className="cp-feature-card">
            <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
              <Users className="cp-icon-lg" />
            </div>
            <h3 className="cp-card-title">Profissionalização do setor</h3>
            <p className="cp-card-subtitle">
              Elevamos o padrão do cuidado profissional através de certificações, avaliações e ferramentas
              que valorizam o trabalho dos cuidadores.
            </p>
          </div>

          <div className="cp-feature-card">
            <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
              <Target className="cp-icon-lg" />
            </div>
            <h3 className="cp-card-title">Impacto mensurável</h3>
            <p className="cp-card-subtitle">
              Acompanhamos métricas reais de satisfação, qualidade do serviço e impacto social para garantir
              que cada conexão gere valor real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

