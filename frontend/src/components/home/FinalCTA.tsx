"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section className="cp-cta-final">
      <div className="section-container">
        <div className="cp-cta-content">
          <h2 className="cp-cta-title">Pronto para transformar sua rotina de cuidado?</h2>
          <p className="cp-cta-description">
            Junte-se a centenas de cuidadores e contratantes que já descobriram uma nova forma de trabalhar e cuidar.
          </p>
          <div className="cp-cta-buttons">
            <button
              className="cp-btn cp-btn-primary cp-btn-large"
              onClick={() => router.push("/login")}
            >
              Começar agora
              <ArrowRight className="cp-icon-sm" style={{ width: "18px", height: "18px", marginLeft: "var(--spacing-sm)" }} />
            </button>
            <button
              className="cp-btn cp-btn-secondary cp-btn-large"
              onClick={() => router.push("/login")}
            >
              Explorar plataforma
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
