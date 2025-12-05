"use client";

import { X, Check, ArrowRight } from "lucide-react";

const comparisons = [
  {
    before: {
      title: "Antes da Care Platform",
      items: [
        "Busca manual de cuidadores em grupos e sites",
        "Sem verificação de certificações",
        "Comunicação desorganizada via WhatsApp",
        "Pagamentos informais e sem controle",
        "Sem histórico de atendimentos",
        "Dificuldade para avaliar qualidade",
      ],
    },
    after: {
      title: "Com a Care Platform",
      items: [
        "Matching inteligente com profissionais qualificados",
        "Cuidadores certificados e verificados",
        "Plataforma integrada com agenda e mensagens",
        "Pagamentos seguros e rastreáveis",
        "Relatórios detalhados de cada atendimento",
        "Sistema de avaliações e reputação",
      ],
    },
  },
];

export default function BeforeAfter() {
  return (
    <section className="cp-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="cp-section-title">Antes vs Depois</h2>
          <p className="cp-section-text">
            Veja como a Care Platform transforma a experiência de cuidadores e contratantes.
          </p>
        </div>

        <div className="cp-before-after">
          {comparisons.map((comparison, index) => (
            <div key={index} className="cp-comparison-grid">
              <div className="cp-comparison-card cp-before-card">
                <h3 className="cp-comparison-title">{comparison.before.title}</h3>
                <ul className="cp-comparison-list">
                  {comparison.before.items.map((item, i) => (
                    <li key={i} className="cp-comparison-item">
                      <X className="cp-icon-sm" style={{ width: "18px", height: "18px", color: "#ef4444", flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cp-comparison-arrow">
                <ArrowRight className="cp-icon-lg" style={{ width: "32px", height: "32px", color: "var(--color-primary)" }} />
              </div>

              <div className="cp-comparison-card cp-after-card">
                <h3 className="cp-comparison-title">{comparison.after.title}</h3>
                <ul className="cp-comparison-list">
                  {comparison.after.items.map((item, i) => (
                    <li key={i} className="cp-comparison-item">
                      <Check className="cp-icon-sm" style={{ width: "18px", height: "18px", color: "#10b981", flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

