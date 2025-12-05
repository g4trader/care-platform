"use client";

import { TrendingUp, Users, Clock, Award, Heart, CheckCircle } from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "500+",
    label: "Cuidadores ativos",
    description: "Profissionais certificados na plataforma",
    color: "#3b82f6",
  },
  {
    icon: Clock,
    value: "1.2k+",
    label: "Serviços realizados",
    description: "Atendimentos concluídos com sucesso",
    color: "#28a745",
  },
  {
    icon: Award,
    value: "98%",
    label: "Taxa de satisfação",
    description: "Avaliação média dos usuários",
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    value: "45%",
    label: "Aumento de renda",
    description: "Média de crescimento salarial dos cuidadores",
    color: "#8b5cf6",
  },
  {
    icon: Heart,
    value: "2.5k+",
    label: "Famílias atendidas",
    description: "Pessoas que receberam cuidado de qualidade",
    color: "#ec4899",
  },
  {
    icon: CheckCircle,
    value: "150+",
    label: "Certificações emitidas",
    description: "Profissionais qualificados este mês",
    color: "#10b981",
  },
];

export default function Metrics() {
  return (
    <section className="cp-section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="cp-section-title">Métricas de impacto</h2>
          <p className="cp-section-text">
            Números que comprovam o impacto positivo da Care Platform na vida de cuidadores e famílias.
          </p>
        </div>

        <div className="cp-metrics-grid">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="cp-metric-card">
                <div className="cp-icon-container" style={{ marginBottom: "var(--spacing-md)", backgroundColor: `${metric.color}15` }}>
                  <Icon className="cp-icon-lg" style={{ color: metric.color }} />
                </div>
                <div className="cp-metric-value" style={{ color: metric.color }}>{metric.value}</div>
                <h3 className="cp-metric-label">{metric.label}</h3>
                <p className="cp-metric-description">{metric.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

