"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function StickyNavbar() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Afficher la capsule flottante après 250px de défilement
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#eligibilite", label: "Éligibilité" },
    { href: "#deroulement", label: "Déroulement" },
    { href: "#centres", label: "Centres" },
  ];

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
            className="flex items-center justify-between sm:justify-center gap-2.5 sm:gap-6 bg-white/90 backdrop-blur-md border border-hemora-border/90 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-md shadow-stone-900/5 transition-all"
            aria-label="Navigation flottante compacte"
          >
            {/* Logo Wordmark Hemora */}
            <Link
              href="#"
              className="hover:opacity-90 transition-opacity flex items-center shrink-0 pr-1 sm:pr-2"
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
            </Link>

            {/* Liens de navigation centraux (Desktop & Tablette) */}
            <div className="hidden sm:flex items-center gap-5 text-xs md:text-sm font-medium text-hemora-muted">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-hemora-text transition-colors py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Bouton CTA Pilule Hemora */}
            <div className="flex items-center pl-1 sm:pl-2 shrink-0">
              <a
                href="#eligibilite"
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
