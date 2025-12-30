"use client";

import Link from "next/link";
import Image from "next/image";

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cp-app-footer">
      <div className="cp-footer-inner">
        {/* 1️⃣ Bloco de Identidade */}
        <div className="cp-footer-brand">
          <Image
            src="/logo-care-platform.svg"
            alt="Academia de Cuidadores"
            width={280}
            height={66}
            className="cp-footer-logo-mono"
          />
          <p className="cp-footer-tagline">Plataforma completa para cuidadores e famílias.</p>
        </div>

        {/* 2️⃣ Blocos de Navegação */}
        <div className="cp-footer-columns">
          <div className="cp-footer-column">
            <h4>Produto</h4>
            <Link href="/#como-funciona">Como funciona</Link>
            <Link href="/#pilares">Pilares</Link>
            <span className="cp-footer-link-muted">Planos (em breve)</span>
          </div>
          <div className="cp-footer-column">
            <h4>Para quem cuida</h4>
            <Link href="/caregiver">Painel do cuidador</Link>
            <span className="cp-footer-link-muted">Certificações</span>
          </div>
          <div className="cp-footer-column">
            <h4>Para famílias</h4>
            <Link href="/client">Painel do contratante</Link>
            <span className="cp-footer-link-muted">Ajuda</span>
          </div>
        </div>

        {/* 3️⃣ Separador Visual */}
        <div className="cp-footer-divider"></div>

        {/* 4️⃣ Bloco Legal e Institucional */}
        <div className="cp-footer-bottom">
          <p className="cp-footer-copyright">
            © {currentYear} Academia de Cuidadores. Todos os direitos reservados.
          </p>
          <div className="cp-footer-legal">
            <Link href="/termos">Termos de uso</Link>
            <Link href="/privacidade">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

