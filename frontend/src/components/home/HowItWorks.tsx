"use client";

import { UserPlus, Search, CheckCircle, Calendar, MessageSquare, Star } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Crie seu perfil",
    description: "Cuidadores completam seu perfil com experiência, certificações e especialidades. Contratantes definem suas necessidades e preferências.",
  },
  {
    icon: Search,
    title: "Encontre a conexão ideal",
    description: "Nossa plataforma usa matching inteligente para conectar cuidadores qualificados com oportunidades que fazem sentido.",
  },
  {
    icon: CheckCircle,
    title: "Valide e confie",
    description: "Sistema de avaliações e certificações garante que você está trabalhando com profissionais verificados e confiáveis.",
  },
  {
    icon: Calendar,
    title: "Agende e gerencie",
    description: "Agenda integrada, relatórios automáticos e comunicação clara facilitam a gestão de todos os serviços.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação transparente",
    description: "Canal direto entre cuidador e contratante, com histórico completo de atendimentos e feedback.",
  },
  {
    icon: Star,
    title: "Avalie e melhore",
    description: "Sistema de avaliações contínuas ajuda a melhorar a qualidade do serviço e construir reputação.",
  },
];

export default function HowItWorks() {
  return (
    <section className="cp-section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="cp-section-title">Como funciona na prática</h2>
          <p className="cp-section-text">
            Um processo simples e intuitivo que conecta cuidadores e contratantes em poucos passos.
          </p>
        </div>

        <div className="cp-steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="cp-step-card">
                <div className="cp-step-number">{index + 1}</div>
                <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)" }}>
                  <Icon className="cp-icon-lg" />
                </div>
                <h3 className="cp-card-title">{step.title}</h3>
                <p className="cp-card-subtitle">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

