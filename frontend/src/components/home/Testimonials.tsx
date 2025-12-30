"use client";

import { useState } from "react";
import { Star, Quote, ChevronDown } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Cuidadora Profissional",
    location: "São Paulo, SP",
    rating: 5,
    text: "A Care Platform transformou minha carreira. Consegui me certificar, aumentar minha renda e trabalhar com famílias incríveis. A plataforma é intuitiva e me dá segurança.",
    avatar: "MS",
  },
  {
    name: "João Santos",
    role: "Familiar",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Encontrei a cuidadora perfeita para minha mãe em poucos dias. O processo foi transparente, seguro e a qualidade do serviço superou todas as expectativas.",
    avatar: "JS",
  },
  {
    name: "Ana Costa",
    role: "Cuidadora de Crianças",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "As certificações me ajudaram a me destacar no mercado. Agora tenho uma agenda cheia e clientes que valorizam meu trabalho. Recomendo para todos os cuidadores.",
    avatar: "AC",
  },
];

const logos = [
  "Instituição A",
  "Instituição B",
  "Instituição C",
  "Instituição D",
];

export default function Testimonials() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <section className="cp-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="cp-section-title">O que nossos usuários dizem</h2>
          <p className="cp-section-text">
            Histórias reais de cuidadores e contratantes que transformaram suas rotinas com a Care Platform.
          </p>
        </div>

        <div className="cp-testimonials-grid">
          {testimonials.map((testimonial, index) => {
            const isExpanded = expandedCards.has(index);
            const needsExpansion = testimonial.text.length > 120;
            
            return (
              <div 
                key={index} 
                className={`cp-testimonial-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => needsExpansion && toggleCard(index)}
                style={{ cursor: needsExpansion ? 'pointer' : 'default' }}
              >
                <div className="cp-testimonial-header">
                  <div className="cp-avatar">{testimonial.avatar}</div>
                  <div>
                    <h4 className="cp-testimonial-name">{testimonial.name}</h4>
                    <p className="cp-testimonial-role">{testimonial.role}</p>
                    <p className="cp-testimonial-location">{testimonial.location}</p>
                  </div>
                </div>
                <div className="cp-testimonial-rating">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="cp-icon-sm" style={{ width: "16px", height: "16px", color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>
                <div className="cp-testimonial-quote">
                  <Quote className="cp-icon-sm" style={{ width: "20px", height: "20px", color: "var(--color-gray-400)", marginBottom: "var(--spacing-sm)" }} />
                  <p>{testimonial.text}</p>
                </div>
                {needsExpansion && (
                  <button 
                    className="cp-testimonial-expand"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(index);
                    }}
                    aria-label={isExpanded ? "Ver menos" : "Ver mais"}
                  >
                    <ChevronDown 
                      className={`cp-icon-sm ${isExpanded ? 'expanded' : ''}`}
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span>{isExpanded ? "Ver menos" : "Ver mais"}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="cp-proof-row">
          <p className="cp-proof-label">Confiam na Care Platform:</p>
          <div className="cp-logos-grid">
            {logos.map((logo, index) => (
              <div key={index} className="cp-logo-placeholder">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

