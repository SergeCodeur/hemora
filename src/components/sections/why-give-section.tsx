"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "../layout/container";

export function WhyGiveSection() {
  return (
    <section
      id="pourquoi-donner"
      className="py-16 sm:py-24 md:py-32 bg-hemora-bg bg-grain border-t border-hemora-border/60 scroll-mt-12 sm:scroll-mt-20"
      aria-labelledby="pourquoi-donner-title"
    >
      <Container size="default">
        {/* COMPOSITION VISUELLE SIMPLIFIÉE & ACCESSIBLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* COLONNE GAUCHE (4 colonnes) : Titre, Intro simplifiée & Conclusion */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10 lg:sticky lg:top-10">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
                Pourquoi donner
              </span>
              <h2
                id="pourquoi-donner-title"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]"
              >
                Un don peut aider plusieurs patients.
              </h2>
              <p className="text-hemora-muted text-base sm:text-lg leading-relaxed pt-1">
                Après le prélèvement, le sang peut être séparé en différents composants. Chacun peut répondre à des besoins médicaux différents.
              </p>
            </div>

            {/* Phrase de conclusion simple */}
            <div className="pt-6 border-t border-hemora-border/70 space-y-2">
              <p className="text-sm font-semibold text-hemora-text">
                Un même don peut donc être utile de plusieurs façons.
              </p>
            </div>

            {/* Phrase signature contextuelle discrète */}
            <div className="pt-2 hidden lg:block">
              <p className="font-serif italic text-hemora-red text-base sm:text-lg">
                Un geste simple, des vies préservées.
              </p>
            </div>
          </div>

          {/* COLONNE DROITE (8 colonnes) : Grande composition visuelle & Annotations simplifiées */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* L'image de séparation */}
            <div className="relative rounded-3xl overflow-hidden border border-hemora-border/80 bg-white aspect-3/2 shadow-xs transition-transform duration-500 hover:scale-[1.005]">
              <Image
                src="/images/why-give-editorial.webp"
                alt="Flacons et éprouvettes minimalistes illustrant les composants du don de sang"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 750px"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Annotations simplifiées et sans jargon technique */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-2">
              
              {/* COMPOSANT 1 : PLASMA */}
              <div className="space-y-2 border-t border-hemora-border/70 pt-4">
                <span className="text-xs font-mono font-semibold text-amber-800 bg-amber-50/90 px-2 py-0.5 rounded border border-amber-300/80 inline-block">
                  Plasma
                </span>
                <p className="text-sm text-hemora-muted leading-relaxed pt-1">
                  Utilisé dans certains traitements et situations médicales graves.
                </p>
              </div>

              {/* COMPOSANT 2 : GLOBULES ROUGES */}
              <div className="space-y-2 border-t border-hemora-border/70 pt-4">
                <span className="text-xs font-mono font-semibold text-hemora-red bg-hemora-soft-red px-2 py-0.5 rounded border border-hemora-red/20 inline-block">
                  Globules rouges
                </span>
                <p className="text-sm text-hemora-muted leading-relaxed pt-1">
                  Utilisés notamment lors d’opérations, d’accidents ou pour certaines maladies.
                </p>
              </div>

              {/* COMPOSANT 3 : PLAQUETTES */}
              <div className="space-y-2 border-t border-hemora-border/70 pt-4">
                <span className="text-xs font-mono font-semibold text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-200 inline-block">
                  Plaquettes
                </span>
                <p className="text-sm text-hemora-muted leading-relaxed pt-1">
                  Utilisées notamment pour aider les patients qui ont besoin d’un soutien à la coagulation.
                </p>
              </div>

            </div>

            {/* Version mobile de la phrase signature */}
            <div className="block lg:hidden pt-4 border-t border-hemora-border/60 text-center">
              <p className="font-serif italic text-hemora-red text-base sm:text-lg">
                Un geste simple, des vies préservées.
              </p>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
