"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "../layout/container";

export function ReassuranceSection() {
  const points = [
    {
      num: "01",
      title: "Vous êtes accompagné",
      description:
        "Un professionnel vous guide et vérifie votre aptitude avant le don.",
    },
    {
      num: "02",
      title: "Prévoyez un peu de temps",
      description:
        "Accueil, entretien, prélèvement et repos font partie du parcours.",
    },
    {
      num: "03",
      title: "Pas besoin de tout savoir avant de venir",
      description:
        "Vos questions, doutes ou inquiétudes peuvent être clarifiés directement sur place.",
    },
  ];

  return (
    <section
      id="reassurance"
      className="py-16 sm:py-24 md:py-32 bg-hemora-bg bg-grain"
    >
      <Container size="default" className="space-y-12 sm:space-y-16 lg:space-y-20">
        
        {/* 1. EN-TÊTE ÉDITORIAL EN DEUX COLONNES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end border-b border-hemora-border/70 pb-8 sm:pb-12">
          {/* Colonne gauche (8 cols sur lg) : Label + Grand titre */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
              Réassurance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]">
              Première fois ?{" "}
              <span className="italic font-serif block pt-1">
                Vous êtes au bon endroit.
              </span>
            </h2>
          </div>

          {/* Colonne droite (4 cols sur lg) : Texte d'intro court et respirant */}
          <div className="lg:col-span-4 lg:pb-1">
            <p className="text-hemora-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed">
              Hemora vous aide à aborder votre premier don avec calme, sans pression et avec toutes les clés en main.
            </p>
          </div>
        </div>

        {/* 2. LES 3 POINTS DE RÉASSURANCE EN GRILLE ÉDITORIALE (3 COLONNES DESKTOP) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="space-y-3 border-l-2 border-hemora-red/30 pl-5 sm:pl-6 py-1 transition-colors hover:border-hemora-red"
            >
              {/* Numéro 01, 02, 03 en rouge Hemora */}
              <span className="font-mono text-xs sm:text-sm font-bold text-hemora-red uppercase tracking-wider block">
                {pt.num}
              </span>
              
              {/* Titre en gras */}
              <h3 className="font-sans font-semibold text-lg sm:text-xl text-hemora-text tracking-tight">
                {pt.title}
              </h3>

              {/* Explication épurée */}
              <p className="text-hemora-muted text-sm sm:text-base leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3. GRANDE PHOTOGRAPHIE ÉDITORIALE HORIZONTALE SOUS LES 3 POINTS */}
        <div className="pt-4">
          <div className="group relative rounded-3xl overflow-hidden border border-hemora-border/80 bg-white aspect-16/9 sm:aspect-21/9 shadow-xs transition-transform duration-500 hover:scale-[1.005]">
            <Image
              src="/images/reassurance-horizontal.jpg"
              alt="Accueil chaleureux et serein dans un centre moderne de don de sang"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
              sizes="(max-width: 1280px) 100vw, 1380px"
            />
            {/* Dégradé sombre renforcé en bas (from-black/80 via-black/30) pour garantir une accessibilité et un contraste WCAG parfaits */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-hemora-soft-red block font-semibold">
                  L'accueil Hemora
                </span>
                <p className="font-serif italic text-base sm:text-lg text-white font-normal drop-shadow-xs">
                  Un cadre bienveillant conçu pour votre sérénité.
                </p>
              </div>
              <span className="hidden sm:inline-block text-xs text-white/90 font-sans border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/30 font-medium">
                Sérénité & accompagnement
              </span>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
