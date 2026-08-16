"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Header } from "../layout/header";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section id="hero" className="p-4 sm:p-6 lg:p-[30px] bg-hemora-bg">
      {/* Masques SVG pour les découpes d'onglets de dossiers (Folder Tab Cutouts) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Masque Onglet Gauche (Visuel 1) */}
          <clipPath id="folder-tab-left" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.06 C 0,0.02 0.02,0 0.06,0 L 0.52,0 C 0.56,0 0.58,0.02 0.60,0.06 L 0.62,0.10 C 0.63,0.12 0.65,0.13 0.68,0.13 L 0.94,0.13 C 0.98,0.13 1,0.15 1,0.18 L 1,0.94 C 1,0.98 0.98,1 0.94,1 L 0.06,1 C 0.02,1 0,0.98 0,0.94 Z" />
          </clipPath>
          {/* Masque Onglet Droit (Visuel 3) */}
          <clipPath id="folder-tab-right" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.18 C 0,0.15 0.02,0.13 0.06,0.13 L 0.32,0.13 C 0.35,0.13 0.37,0.12 0.38,0.10 L 0.40,0.06 C 0.42,0.02 0.44,0 0.48,0 L 0.94,0 C 0.98,0 1,0.02 1,0.06 L 1,0.94 C 1,0.98 1,1 0.94,1 L 0.06,1 C 0.02,1 0,0.98 0,0.94 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-[1380px] mx-auto bg-white bg-grain border border-hemora-border rounded-3xl pt-5 sm:pt-6 lg:pt-8 px-6 sm:px-10 lg:px-12 pb-10 sm:pb-12 lg:pb-14 space-y-8 sm:space-y-12 shadow-xs">
        
        {/* HEADER INTÉGRÉ EN HAUT DU CONTENEUR MAÎTRE */}
        <Header />

        {/* CONTENU CENTRAL DU HERO */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Headline éditorial Newsreader */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal text-hemora-text tracking-tight leading-[1.08]">
            Vous envisagez de faire un don ?{" "}
            <span className="italic font-serif block sm:inline">Commencez ici.</span>
          </h1>

          {/* Description précise */}
          <p className="text-hemora-muted text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            Vérifiez votre éligibilité, découvrez comment se déroule un don de sang et trouvez un centre près de chez vous.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
            {/* CTA Principal */}
            <Button
              variant="primary"
              className="h-[50px] px-8 text-base font-medium w-full sm:w-auto"
              onClick={() => {
                const el = document.querySelector("#eligibilite");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Vérifier mon éligibilité
            </Button>

            {/* CTA Secondaire Éditorial Capsule avec icône ArrowRight très fine et légère */}
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector("#centres");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group h-[50px] pl-7 pr-2.5 bg-white text-hemora-text border border-hemora-border rounded-full hover:border-hemora-border/80 hover:bg-hemora-bg/60 transition-all flex items-center justify-between gap-4 cursor-pointer font-medium text-base w-full sm:w-auto"
            >
              <span>Trouver un centre</span>
              <span className="w-8 h-8 rounded-full bg-hemora-red text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>

        {/* COMPOSITION VISUELLE AVEC TEXTES ADAPTATIFS DESKTOP / MOBILE */}
        <div className="pt-2">
          {/* Desktop Layout : 3 colonnes avec découpes d'onglets et légendes sous l'image */}
          <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
            
            {/* VISUEL 1 — AVANT LE DON (Gauche) */}
            <div className="col-span-3 -translate-y-[85px] space-y-3">
              <div
                className="group relative bg-hemora-bg aspect-3/4 shadow-xs"
                style={{ clipPath: "url(#folder-tab-left)" }}
              >
                <Image
                  src="/images/hero-before-donation.jpg"
                  alt="Premier entretien convivial avant le don de sang"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="25vw"
                />
              </div>
              {/* Légende sous l'image uniquement sur Desktop */}
              <div className="pt-1 space-y-0.5">
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-hemora-red block">
                  Étape 01
                </span>
                <p className="font-serif italic text-base text-hemora-text font-normal">
                  Avant votre venue
                </p>
              </div>
            </div>

            {/* VISUEL 2 — EXPÉRIENCE PRINCIPALE (Centre, Dominant 4:3) */}
            <div className="col-span-6 z-10">
              <div className="group relative rounded-2xl overflow-hidden border border-hemora-border bg-hemora-bg aspect-4/3 shadow-sm">
                <Image
                  src="/images/hero-main-donation.jpg"
                  alt="Expérience de don de sang sereine et sécurisée"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-hemora-soft-red block">
                      L'expérience Hemora
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-normal pt-0.5">
                      Accompagné à chaque étape
                    </p>
                  </div>
                  <span className="text-xs text-white/80 font-sans border border-white/30 px-3 py-1 rounded-full backdrop-blur-xs">
                    Sérénité & sécurité
                  </span>
                </div>
              </div>
            </div>

            {/* VISUEL 3 — APRÈS LE DON (Droite) */}
            <div className="col-span-3 -translate-y-[85px] space-y-3">
              <div
                className="group relative bg-hemora-bg aspect-3/4 shadow-xs"
                style={{ clipPath: "url(#folder-tab-right)" }}
              >
                <Image
                  src="/images/hero-after-donation.jpg"
                  alt="Moment de détente et collation après le don de sang"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="25vw"
                />
              </div>
              {/* Légende sous l'image uniquement sur Desktop */}
              <div className="pt-1 space-y-0.5">
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-hemora-red block">
                  Après le don
                </span>
                <p className="font-serif italic text-base text-hemora-text font-normal leading-snug">
                  « C’était plus simple que ce que j’imaginais »
                </p>
              </div>
            </div>

          </div>

          {/* Mobile & Tablette Layout (Textes à l'intérieur des images) */}
          <div className="lg:hidden space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-hemora-border bg-hemora-bg aspect-4/3 shadow-xs">
              <Image
                src="/images/hero-main-donation.jpg"
                alt="Expérience de don de sang sereine et sécurisée"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-hemora-soft-red block">
                  L'expérience Hemora
                </span>
                <p className="font-serif text-base font-normal">
                  Accompagné à chaque étape
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-xl overflow-hidden border border-hemora-border bg-hemora-bg aspect-3/4">
                <Image
                  src="/images/hero-before-donation.jpg"
                  alt="Entretien convivial"
                  fill
                  className="object-cover object-center"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/80 block">Étape 01</span>
                  <p className="font-serif italic text-xs font-normal">
                    Avant votre venue
                  </p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-hemora-border bg-hemora-bg aspect-3/4">
                <Image
                  src="/images/hero-after-donation.jpg"
                  alt="Détente post-don"
                  fill
                  className="object-cover object-center"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/80 block">Après le don</span>
                  <p className="font-serif italic text-xs font-normal leading-tight">
                    « Plus simple que prévu »
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
