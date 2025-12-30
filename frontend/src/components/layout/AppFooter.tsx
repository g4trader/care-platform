"use client";

import Link from "next/link";
import Image from "next/image";

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cp-app-footer">
      <div className="cp-container cp-footer-inner">
        <div className="cp-footer-main">
          <div className="cp-footer-brand">
            <Image
              src="/logo-care-platform.svg"
              alt="Care Platform"
              width={351}
              height={83}
            />
            <p>Plataforma completa para cuidadores profissionais e contratantes.</p>
          </div>

          <div className="cp-footer-columns">
            <div>
              <h4>Produto</h4>
              <Link href="/#como-funciona">Como funciona</Link>
              <Link href="/#pilares">Pilares</Link>
              <span className="cp-footer-link-muted">Planos (em breve)</span>
            </div>
            <div>
              <h4>Para quem cuida</h4>
              <Link href="/caregiver">Painel do cuidador</Link>
              <span className="cp-footer-link-muted">Certificações</span>
            </div>
            <div>
              <h4>Para famílias</h4>
              <Link href="/client">Painel do contratante</Link>
              <span className="cp-footer-link-muted">Ajuda</span>
            </div>
          </div>
        </div>

        <div className="cp-footer-bottom">
          <span>© {currentYear} Care Platform. Todos os direitos reservados.</span>
          <div className="cp-footer-bottom-links">
            <span>Termos de uso</span>
            <span>Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

