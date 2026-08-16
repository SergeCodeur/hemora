"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { smoothScrollTo } from "../ui/smooth-scroll";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "#pourquoi-donner", label: "Pourquoi donner" },
    { href: "#eligibilite", label: "Éligibilité" },
    { href: "#deroulement", label: "Déroulement" },
    { href: "#centres", label: "Centres" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  // Empêche le défilement d'arrière-plan quand le menu mobile est ouvert
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="w-full pt-0 pb-2 sm:pb-4 mb-6 sm:mb-10">
      <div className="flex items-center justify-between">
        {/* Logo Gauche */}
        <a
          href="#"
          onClick={(e) => handleSmoothScroll(e, "#")}
          className="hover:opacity-90 transition-opacity flex items-center cursor-pointer"
          aria-label="Hemora - Accueil"
        >
          <Image
            src="/logo.svg"
            alt="Hemora"
            width={120}
            height={40}
            className="h-8 sm:h-9 w-auto object-contain"
            priority
          />
        </a>

        {/* Navigation Centre (Desktop Navbar pilule ultra élégante h-[42px]) */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-hemora-muted bg-hemora-bg px-6 h-[42px] rounded-full border border-hemora-border"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="hover:text-hemora-text transition-colors cursor-pointer"
            >
              {link.label}
            </a>
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
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-full text-hemora-text hover:bg-hemora-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hemora-red border border-hemora-border bg-white h-[42px] w-[42px] cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
          aria-expanded={mobileMenuOpen}
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MENU MOBILE PLEIN ÉCRAN FLUIDE & ÉPURÉ (CHARTE ÉDITORIALE HEMORA)        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden flex flex-col justify-end sm:justify-center p-3 sm:p-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-hemora-bg bg-grain rounded-3xl border border-hemora-border p-6 sm:p-8 space-y-6 w-full max-w-md mx-auto relative shadow-lg"
            >
              {/* En-tête du menu mobile : Logo SVG officiel + Bouton Fermer épuré */}
              <div className="flex items-center justify-between pb-4 border-b border-hemora-border/80">
                <Link
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center"
                  aria-label="Hemora - Accueil"
                >
                  <Image
                    src="/logo.svg"
                    alt="Hemora"
                    width={110}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-hemora-border bg-white text-hemora-text flex items-center justify-center hover:border-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hemora-red cursor-pointer transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Liens de navigation épurés et lisibles */}
              <nav className="flex flex-col space-y-1" aria-label="Navigation mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleSmoothScroll(e, link.href);
                    }}
                    className="py-3 px-3.5 rounded-2xl text-hemora-text hover:text-hemora-red hover:bg-white/80 font-medium text-base sm:text-lg flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-hemora-red" />
                  </a>
                ))}
              </nav>

              {/* Bouton CTA d'action principal */}
              <div className="pt-2">
                <a
                  href="#eligibilite"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleSmoothScroll(e, "#eligibilite");
                  }}
                  className="inline-flex items-center justify-center h-12 px-6 text-base font-medium text-white bg-hemora-red hover:bg-hemora-red-hover rounded-full transition-colors w-full cursor-pointer shadow-xs"
                >
                  Vérifier mon éligibilité
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
