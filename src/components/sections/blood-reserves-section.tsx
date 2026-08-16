"use client";

import * as React from "react";
import { Container } from "../layout/container";
import { BloodGroup, BloodNeedLevel } from "@/types";

interface BloodReserveItem {
  group: BloodGroup;
  level: BloodNeedLevel;
  statusLabel: string;
  sublabel: string;
  barsFilled: number; // Sur 4 segments
}

const reservesData: BloodReserveItem[] = [
  {
    group: "O-",
    level: "critical",
    statusLabel: "Besoin critique",
    sublabel: "Donneur universel d'urgence",
    barsFilled: 4,
  },
  {
    group: "O+",
    level: "critical",
    statusLabel: "Besoin critique",
    sublabel: "Très fortes demandes",
    barsFilled: 4,
  },
  {
    group: "A-",
    level: "high",
    statusLabel: "Besoin élevé",
    sublabel: "Stocks en baisse",
    barsFilled: 3,
  },
  {
    group: "A+",
    level: "high",
    statusLabel: "Besoin élevé",
    sublabel: "Demande quotidienne soutenue",
    barsFilled: 3,
  },
  {
    group: "B-",
    level: "moderate",
    statusLabel: "Besoin modéré",
    sublabel: "Prélèvements réguliers",
    barsFilled: 2,
  },
  {
    group: "AB-",
    level: "moderate",
    statusLabel: "Besoin modéré",
    sublabel: "Prélèvements réguliers",
    barsFilled: 2,
  },
  {
    group: "B+",
    level: "stable",
    statusLabel: "Réserve stable",
    sublabel: "Niveau sécurisé",
    barsFilled: 1,
  },
  {
    group: "AB+",
    level: "stable",
    statusLabel: "Réserve stable",
    sublabel: "Receveur universel",
    barsFilled: 1,
  },
];

export function BloodReservesSection() {
  const getLevelStyle = (level: BloodNeedLevel) => {
    switch (level) {
      case "critical":
        return {
          textColor: "text-hemora-red font-semibold",
          dotColor: "bg-hemora-red",
          activeBarColor: "bg-hemora-red",
        };
      case "high":
        return {
          textColor: "text-[#B85D38] font-medium",
          dotColor: "bg-[#B85D38]",
          activeBarColor: "bg-[#B85D38]",
        };
      case "moderate":
        return {
          textColor: "text-[#8C7355] font-normal",
          dotColor: "bg-[#8C7355]",
          activeBarColor: "bg-[#8C7355]",
        };
      case "stable":
        return {
          textColor: "text-hemora-muted font-normal",
          dotColor: "bg-stone-400",
          activeBarColor: "bg-stone-400",
        };
    }
  };

  return (
    <section
      id="reserves"
      className="py-16 sm:py-24 md:py-32 bg-white border-t border-hemora-border/60 scroll-mt-12 sm:scroll-mt-20"
      aria-labelledby="reserves-title"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ========================================================================= */}
          {/* COLONNE GAUCHE (ÉDITORIALE & CONTEXTUELLE)                                */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-12">
            
            {/* En-tête textuel */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
                Tendance des stocks régionaux
              </span>
              <h2
                id="reserves-title"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]"
              >
                Les besoins du moment
              </h2>
              <p className="text-hemora-muted text-base sm:text-lg leading-relaxed pt-1">
                Les besoins peuvent varier selon les groupes sanguins. Même lorsqu’un groupe est stable, chaque don reste utile.
              </p>
            </div>

            {/* Message secondaire intégré naturellement (sans grosse alerte système) */}
            <div className="pt-8 border-t border-hemora-border/70 space-y-2">
              <p className="text-sm sm:text-base font-semibold text-hemora-text">
                Votre groupe n’est pas prioritaire ? Votre don reste utile.
              </p>
              <p className="text-sm text-hemora-muted leading-relaxed">
                Vous ne connaissez pas votre groupe sanguin ? Ce n’est pas un problème pour donner.
              </p>
            </div>

            {/* Mention démonstration obligatoire */}
            <div className="pt-2">
              <p className="text-xs text-stone-400 italic">
                Données locales de démonstration pour le Figma to Code Challenge.
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* COLONNE DROITE : VISUALISATION ÉDITORIALE DES 8 GROUPES                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-hemora-bg bg-grain rounded-3xl border border-hemora-border p-6 sm:p-8 md:p-10 shadow-2xs">
              
              {/* En-tête discret du tableau de données */}
              <div className="hidden sm:flex items-center justify-between pb-4 border-b border-hemora-border/80 text-xs font-mono uppercase tracking-wider text-hemora-muted">
                <span>Groupe sanguin</span>
                <span className="text-right">Niveau de besoin indicatif</span>
              </div>

              {/* Lignes continues des 8 groupes sanguins */}
              <div className="divide-y divide-hemora-border/60">
                {reservesData.map((item) => {
                  const style = getLevelStyle(item.level);
                  const isTopPriority = item.level === "critical";

                  return (
                    <div
                      key={item.group}
                      className={`py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors duration-150 ${
                        isTopPriority ? "group" : ""
                      }`}
                    >
                      {/* Groupe sanguin & typographie forte */}
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span
                          className={`font-serif text-2xl sm:text-3xl tracking-tight shrink-0 transition-transform duration-200 ${
                            isTopPriority
                              ? "text-hemora-text font-medium group-hover:scale-105"
                              : "text-hemora-text font-normal"
                          }`}
                        >
                          {item.group}
                        </span>
                        
                        {/* Rôle / précision éditoriale discrète */}
                        <span className="hidden md:inline text-xs text-hemora-muted truncate">
                          {item.sublabel}
                        </span>
                      </div>

                      {/* Niveau de besoin & Micro-jauge discrète */}
                      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                        <span className={`text-xs sm:text-sm ${style.textColor}`}>
                          {item.statusLabel}
                        </span>

                        {/* Micro-jauge à 4 segments fins minimalistes */}
                        <div
                          className="flex items-center gap-1 w-14 sm:w-16"
                          aria-label={`${item.statusLabel} (${item.barsFilled} sur 4)`}
                        >
                          {[1, 2, 3, 4].map((barIndex) => {
                            const isFilled = barIndex <= item.barsFilled;
                            return (
                              <span
                                key={barIndex}
                                className={`h-1.5 flex-1 rounded-full transition-colors ${
                                  isFilled
                                    ? style.activeBarColor
                                    : "bg-stone-200/80"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
