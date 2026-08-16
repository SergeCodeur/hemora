"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { smoothScrollTo } from "../ui/smooth-scroll";

export function StickyNavbar() {
  const [isVisible, setIsVisible] = React.useState(false);
  const lastScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      // 1. Si on est tout en haut de la page (Hero), la navbar reste masquée
      if (currentScrollY < 200) {
        setIsVisible(false);
      }
      // 2. Si on remonte (Scroll Up) avec au moins 6px de delta : on l'affiche
      else if (delta < -6) {
        setIsVisible(true);
      }
      // 3. Si on descend (Scroll Down) avec au moins 6px de delta : on la masque
      else if (delta > 6) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#eligibilite", label: "Éligibilité" },
    { href: "#deroulement", label: "Déroulement" },
    { href: "#centres", label: "Centres" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-2 sm:top-3.5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-20px)] max-w-fit pointer-events-auto"
        >
          <nav
            className="flex items-center justify-between sm:justify-center gap-2.5 sm:gap-5 bg-white/90 backdrop-blur-md border border-hemora-border/90 pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full shadow-md shadow-stone-900/5 transition-all"
            aria-label="Navigation flottante compacte"
          >
            {/* Logo Wordmark Hemora */}
            <a
              href="#"
              onClick={(e) => handleSmoothScroll(e, "#")}
              className="hover:opacity-90 transition-opacity flex items-center shrink-0 pr-1 cursor-pointer"
              aria-label="Hemora - Haut de page"
            >
              <Image
                src="/logo.svg"
                alt="Hemora"
                width={95}
                height={30}
                className="h-6 w-auto object-contain"
                priority
              />
            </a>

            {/* Liens de navigation centraux (Desktop & Tablette) */}
            <div className="hidden sm:flex items-center gap-5 text-xs md:text-sm font-medium text-hemora-muted px-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="hover:text-hemora-text transition-colors py-0.5 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Bouton CTA Pilule Hemora (Courbure concentrique parfaite à 6px) */}
            <div className="flex items-center shrink-0">
              <a
                href="#eligibilite"
                onClick={(e) => handleSmoothScroll(e, "#eligibilite")}
                className="inline-flex items-center justify-center h-8 sm:h-9 px-3.5 sm:px-4 text-xs font-semibold text-white bg-hemora-red hover:bg-hemora-red-hover rounded-full transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                Vérifier mon éligibilité
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
