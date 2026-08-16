"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "../layout/container";
import { ShieldCheck, MessageCircleHeart, Sparkles, Coffee } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Avant de venir",
      duration: "~5 min de préparation",
      reassurance: "Le conseil clé : buvez 500 ml d'eau",
      icon: Sparkles,
      description:
        "Ne venez pas à jeun, prenez un repas léger et prévoyez votre pièce d’identité originale.",
    },
    {
      num: "02",
      title: "Accueil & entretien",
      duration: "~15 min",
      reassurance: "Le moment idéal pour poser vos questions",
      icon: MessageCircleHeart,
      description:
        "Un entretien médical valide votre aptitude et s'assure que le don s'effectue en toute sécurité pour vous.",
    },
    {
      num: "03",
      title: "Prélèvement",
      duration: "~8 à 10 min",
      reassurance: "Matériel 100% stérile & à usage unique",
      icon: ShieldCheck,
      description:
        "Confortablement installé dans un fauteuil, l’équipe soignante reste à vos côtés tout au long du geste.",
    },
    {
      num: "04",
      title: "Repos & collation",
      duration: "~15 min",
      reassurance: "Buffet gourmand & boissons offerts",
      icon: Coffee,
      description:
        "Un temps de repos indispensable de 15 minutes permet à votre organisme de récupérer en toute tranquillité.",
    },
  ];

  return (
    <section
      id="deroulement"
      className="py-16 sm:py-24 md:py-32 bg-hemora-bg bg-grain border-t border-hemora-border/60 scroll-mt-12 sm:scroll-mt-20"
      aria-labelledby="deroulement-title"
    >
      <Container size="default">
        
        {/* EN-TÊTE CENTRÉ */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20 sm:mb-28">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
            Parcours pas à pas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]">
            Le jour du don, <span className="italic font-serif">voilà ce qui vous attend.</span>
          </h2>
          <p className="text-hemora-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            Un parcours fluide d’environ 45 minutes, encadré du début à la fin par des équipes médicales attentionnées.
          </p>
        </div>

        {/* --- TIMELINE VERTICALE CENTRALE HARMONISÉE (MAX-W-5XL) --- */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Ligne verticale continue qui passe exactement au centre sur desktop */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-hemora-border -translate-x-1/2 z-0" />

          <div className="space-y-16 sm:space-y-24">
            
            {/* ÉTAPE 1 */}
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Côté Gauche (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 md:text-right space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 01 • {steps[0].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[0].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md md:ml-auto">
                  {steps[0].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[0].reassurance}
                  </span>
                </div>
              </div>

              {/* Pastille Centrale sur la ligne */}
              <div className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">01</span>
                </div>
              </div>

              {/* Côté Droit (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pl-16 items-center justify-start">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[0].reassurance}
                </span>
              </div>
            </div>


            {/* ÉTAPE 2 */}
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Côté Gauche (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pr-16 items-center justify-end">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <MessageCircleHeart className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[1].reassurance}
                </span>
              </div>

              {/* Pastille Centrale sur la ligne */}
              <div className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">02</span>
                </div>
              </div>

              {/* Côté Droit (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-16 md:text-left space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 02 • {steps[1].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[1].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md">
                  {steps[1].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <MessageCircleHeart className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[1].reassurance}
                  </span>
                </div>
              </div>
            </div>


            {/* RESPIRATION CENTRALE : PHOTO ÉDITORIALE AU MILIEU DU PARCOURS */}
            <div className="relative flex justify-center py-6">
              <div className="relative z-10 max-w-lg w-full rounded-3xl overflow-hidden border border-hemora-border bg-white shadow-xs">
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src="/images/process-editorial.jpg"
                    alt="Échange bienveillant pendant l'entretien"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                    <p className="font-serif italic text-sm text-white/90">
                      Un cadre chaleureux et sécurisé à chaque étape.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* ÉTAPE 3 */}
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Côté Gauche (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 md:text-right space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 03 • {steps[2].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[2].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md md:ml-auto">
                  {steps[2].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[2].reassurance}
                  </span>
                </div>
              </div>

              {/* Pastille Centrale sur la ligne */}
              <div className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">03</span>
                </div>
              </div>

              {/* Côté Droit (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pl-16 items-center justify-start">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[2].reassurance}
                </span>
              </div>
            </div>


            {/* ÉTAPE 4 */}
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Côté Gauche (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pr-16 items-center justify-end">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <Coffee className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[3].reassurance}
                </span>
              </div>

              {/* Pastille Centrale sur la ligne */}
              <div className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">04</span>
                </div>
              </div>

              {/* Côté Droit (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-16 md:text-left space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 04 • {steps[3].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[3].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md">
                  {steps[3].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <Coffee className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[3].reassurance}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
