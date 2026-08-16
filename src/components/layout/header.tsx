"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "#pourquoi-donner", label: "Pourquoi donner" },
    { href: "#eligibilite", label: "Éligibilité" },
    { href: "#deroulement", label: "Déroulement" },
    { href: "#centres", label: "Centres" },
  ];

  return (
    <header className="w-full pt-0 pb-2 sm:pb-4 mb-6 sm:mb-10">
      <div className="flex items-center justify-between">
        {/* Logo Gauche */}
        <Link
          href="#"
          className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-hemora-text hover:opacity-90 transition-opacity flex items-center gap-1.5"
          aria-label="Hemora - Accueil"
        >
          <span>Hemora</span>
          <span className="w-2 h-2 rounded-full bg-hemora-red inline-block" />
        </Link>

        {/* Navigation Centre (Desktop Navbar pilule ultra élégante h-[42px]) */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-hemora-muted bg-hemora-bg px-6 h-[42px] rounded-full border border-hemora-border"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-hemora-text transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Droite (Desktop) - Hauteur strictement identique (42px) */}
        <div className="hidden md:flex items-center">
          <Button
            variant="primary"
            size="sm"
            className="text-xs sm:text-sm font-medium h-[42px] min-h-[42px] px-6"
            onClick={() => {
              const el = document.querySelector("#eligibilite");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Vérifier mon éligibilité
          </Button>
        </div>

        {/* Bouton Burger Mobile */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-full text-hemora-text hover:bg-hemora-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hemora-red border border-hemora-border bg-white h-[42px] w-[42px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="md:hidden border border-hemora-border bg-hemora-surface rounded-2xl px-5 py-6 mt-4 space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <nav
            className="flex flex-col space-y-3 text-base font-medium text-hemora-text"
            aria-label="Navigation mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-hemora-bg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-hemora-border">
            <Button
              variant="primary"
              className="w-full text-base h-[48px]"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.querySelector("#eligibilite");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Vérifier mon éligibilité
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
