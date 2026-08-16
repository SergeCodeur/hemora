"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { smoothScrollTo } from "../ui/smooth-scroll";

export function StickyNavbar() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const lastScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      // 1. Si on est tout en haut de la page (Hero), la navbar reste masquée
      if (currentScrollY < 200) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }
      // 2. Si on remonte (Scroll Up) avec au moins 6px de delta : on l'affiche
      else if (delta < -6) {
        setIsVisible(true);
      }
      // 3. Si on descend (Scroll Down) avec au moins 6px de delta : on la masque
      else if (delta > 6 && !mobileMenuOpen) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

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

  const navLinks = [
    { href: "#pourquoi-donner", label: "Pourquoi donner" },
    { href: "#eligibilite", label: "Éligibilité" },
    { href: "#deroulement", label: "Déroulement" },
    { href: "#centres", label: "Centres" },
    { href: "#faq", label: "FAQ" },
  ];

  const desktopNavLinks = [
    { href: "#eligibilite", label: "Éligibilité" },
    { href: "#deroulement", label: "Déroulement" },
    { href: "#centres", label: "Centres" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-md lg:w-auto lg:max-w-fit pointer-events-auto"
          >
            <nav
              className="flex items-center justify-between lg:justify-center gap-3 lg:gap-5 bg-white/90 backdrop-blur-md border border-hemora-border/90 pl-4 lg:pl-5 pr-2 lg:pr-1.5 py-1.5 rounded-full shadow-md shadow-stone-900/5 transition-all w-full"
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

              {/* Liens de navigation centraux (Desktop uniquement >= 1024px) */}
              <div className="hidden lg:flex items-center gap-5 text-xs md:text-sm font-medium text-hemora-muted px-1">
                {desktopNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="hover:text-hemora-text transition-colors py-0.5 cursor-pointer whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Bouton CTA Pilule (Desktop uniquement >= 1024px) */}
              <div className="hidden lg:flex items-center shrink-0">
                <a
                  href="#eligibilite"
                  onClick={(e) => handleSmoothScroll(e, "#eligibilite")}
                  className="inline-flex items-center justify-center h-8 sm:h-9 px-3.5 sm:px-4 text-xs font-semibold text-white bg-hemora-red hover:bg-hemora-red-hover rounded-full transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                >
                  Vérifier mon éligibilité
                </a>
              </div>

              {/* Bouton Burger Mobile & Tablette (< 1024px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-hemora-bg border border-hemora-border text-hemora-text hover:bg-stone-100 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hemora-red"
                aria-label="Ouvrir le menu de navigation"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-4 h-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TIROIR MOBILE & TABLETTE PLEIN ÉCRAN DÉCLENCHÉ DEPUIS LA STICKY NAVBAR    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden flex flex-col justify-end sm:justify-center p-3 sm:p-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-hemora-bg bg-grain rounded-3xl border border-hemora-border p-6 space-y-6 w-full max-w-md mx-auto relative shadow-lg"
            >
              {/* En-tête : Logo SVG + Bouton Fermer */}
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

              {/* Liens de navigation */}
              <nav className="flex flex-col space-y-1" aria-label="Navigation mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="py-3 px-3.5 rounded-2xl text-hemora-text hover:text-hemora-red hover:bg-white/80 font-medium text-base flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-hemora-red" />
                  </a>
                ))}
              </nav>

              {/* Bouton CTA d'action */}
              <div className="pt-2">
                <a
                  href="#eligibilite"
                  onClick={(e) => handleSmoothScroll(e, "#eligibilite")}
                  className="inline-flex items-center justify-center h-12 px-6 text-base font-medium text-white bg-hemora-red hover:bg-hemora-red-hover rounded-full transition-colors w-full cursor-pointer shadow-xs"
                >
                  Vérifier mon éligibilité
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
