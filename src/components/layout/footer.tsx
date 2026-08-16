import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./container";

export function Footer() {
  return (
    <footer id="footer" className="bg-hemora-bg bg-grain border-t border-hemora-border py-12 text-hemora-muted">
      <Container size="default" className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-hemora-border">
          {/* Logo */}
          <div className="space-y-2">
            <Link
              href="#"
              className="hover:opacity-90 transition-opacity inline-block"
              aria-label="Hemora - Accueil"
            >
              <Image
                src="/logo.svg"
                alt="Hemora"
                width={105}
                height={35}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-hemora-muted">
              Plateforme d'information & orientation au don de sang.
            </p>
          </div>

          {/* Navigation courte */}
          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <Link href="#eligibilite" className="hover:text-hemora-text transition-colors">
              Éligibilité
            </Link>
            <Link href="#deroulement" className="hover:text-hemora-text transition-colors">
              Déroulement
            </Link>
            <Link href="#reserves" className="hover:text-hemora-text transition-colors">
              Réserves
            </Link>
            <Link href="#centres" className="hover:text-hemora-text transition-colors">
              Centres
            </Link>
            <Link href="#faq" className="hover:text-hemora-text transition-colors">
              FAQ
            </Link>
          </nav>
        </div>

        {/* Information Médicale & Mentions */}
        <div className="space-y-4 text-xs text-hemora-muted/80 leading-relaxed">
          <p className="font-medium text-hemora-text">
            Information médicale : Les informations fournies par Hemora sont données à titre indicatif. Seul un entretien individuel avec un professionnel de santé peut confirmer votre aptitude au don.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-hemora-border/60">
            <p>Figma to Code Challenge — Édition 4 · Projet Hemora</p>
            <p>© {new Date().getFullYear()} Hemora — Tous droits réservés.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
