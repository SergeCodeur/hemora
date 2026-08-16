"use client";

import * as React from "react";
import { Container } from "./container";
import { smoothScrollTo } from "../ui/smooth-scroll";

export function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  return (
    <footer
      id="footer"
      className="bg-hemora-bg bg-grain border-t border-hemora-border/70 py-10 sm:py-14 text-hemora-muted"
    >
      <Container size="default" className="space-y-8 sm:space-y-10">
        {/* 1. BLOC PRINCIPAL : Logo & Baseline + Navigation sobre */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          {/* Logo Texte & Baseline */}
          <div className="space-y-1 max-w-xs">
            <a
              href="#"
              onClick={(e) => handleSmoothScroll(e, "#")}
              className="font-serif text-2xl sm:text-[26px] font-normal text-hemora-text tracking-tight hover:opacity-85 transition-opacity inline-block cursor-pointer"
              aria-label="Hemora - Retour en haut de page"
            >
              Hemora<span className="text-hemora-red">.</span>
            </a>
            <p className="text-xs sm:text-sm text-hemora-muted leading-relaxed">
              Plateforme d'information et d’orientation au don de sang.
            </p>
          </div>

          {/* Liens de navigation simples (alignés sur une seule ligne sans cassure orpheline) */}
          <nav
            className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 lg:gap-x-7 gap-y-2 text-xs sm:text-sm font-medium text-hemora-muted"
            aria-label="Navigation pied de page"
          >
            <a
              href="#eligibilite"
              onClick={(e) => handleSmoothScroll(e, "#eligibilite")}
              className="hover:text-hemora-text transition-colors py-1 cursor-pointer whitespace-nowrap"
            >
              Éligibilité
            </a>
            <a
              href="#deroulement"
              onClick={(e) => handleSmoothScroll(e, "#deroulement")}
              className="hover:text-hemora-text transition-colors py-1 cursor-pointer whitespace-nowrap"
            >
              Déroulement
            </a>
            <a
              href="#reserves"
              onClick={(e) => handleSmoothScroll(e, "#reserves")}
              className="hover:text-hemora-text transition-colors py-1 cursor-pointer whitespace-nowrap"
            >
              Réserves
            </a>
            <a
              href="#centres"
              onClick={(e) => handleSmoothScroll(e, "#centres")}
              className="hover:text-hemora-text transition-colors py-1 cursor-pointer whitespace-nowrap"
            >
              Centres
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "#faq")}
              className="hover:text-hemora-text transition-colors py-1 cursor-pointer whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>
        </div>

        {/* 2. BLOC SECONDAIRE EN BAS (Séparé par une seule fine ligne horizontale) */}
        <div className="pt-6 sm:pt-8 border-t border-hemora-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-hemora-muted/90">
          {/* Disclaimer médical court */}
          <p className="max-w-lg lg:max-w-xl text-[11px] sm:text-xs leading-relaxed text-hemora-muted">
            Les informations fournies par Hemora sont données à titre indicatif. Seul un entretien individuel avec un professionnel de santé peut confirmer votre aptitude au don.
          </p>

          {/* Mentions finales */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-stone-600 shrink-0 font-medium">
            <span>© 2026 Hemora</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Figma to Code Challenge (Édition 4)</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
