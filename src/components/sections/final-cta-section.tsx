"use client";

import * as React from "react";
import { Container } from "../layout/container";
import { Button } from "../ui/button";

export function FinalCTASection() {
  return (
    <section id="cta-final" className="py-16 sm:py-20 md:py-24 border-t border-hemora-border bg-hemora-dark-surface bg-grain text-white">
      <Container size="default">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-hemora-soft-red/80">
              Prêt pour votre premier don ?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Vous avez maintenant l’essentiel pour passer à l’action.
            </h2>
            <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto">
              Trois étapes simples : évaluez votre éligibilité, préparez sereinement votre venue et choisissez le centre le plus proche.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href="#eligibilite"
              className="inline-flex items-center justify-center h-[50px] px-8 text-base font-medium text-white bg-hemora-red hover:bg-hemora-red-hover rounded-full transition-colors w-full sm:w-auto cursor-pointer shadow-xs"
            >
              Vérifier mon éligibilité
            </a>
            <a
              href="#centres"
              className="inline-flex items-center justify-center h-[50px] px-8 text-base font-medium bg-transparent text-white border border-stone-600 hover:bg-white/10 rounded-full transition-colors w-full sm:w-auto cursor-pointer"
            >
              Trouver un centre
            </a>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="font-serif italic text-hemora-soft-red text-base sm:text-lg">
              Donner commence par savoir.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
