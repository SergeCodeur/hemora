"use client";

import * as React from "react";
import { Container } from "../layout/container";
import { Badge } from "../ui/badge";
import { Search, MapPin, Navigation, Calendar, Clock, ChevronRight, Phone } from "lucide-react";

export function CentersSection() {
  return (
    <section id="centres" className="py-16 sm:py-20 md:py-24 border-t border-hemora-border bg-white">
      <Container size="default">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <Badge variant="brand">Répertoire & géolocalisation</Badge>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-hemora-text font-normal">
            Trouvez un centre de don près de chez vous
          </h2>
          <p className="text-hemora-muted text-base sm:text-lg">
            Maisons du don permanentes et collectes mobiles de proximité à travers la France.
          </p>
        </div>

        {/* Barre de Recherche & Filtres (Visual Design Premium) */}
        <div className="bg-hemora-bg border border-hemora-border rounded-2xl p-4 sm:p-6 mb-8 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-hemora-muted absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                disabled
                placeholder="Rechercher une ville (ex: Paris, Lille, Lyon), un centre ou un quartier..."
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-hemora-border bg-white text-sm opacity-80 cursor-not-allowed text-hemora-text"
              />
            </div>
            <button
              disabled
              className="w-full sm:w-auto h-12 px-5 rounded-xl border border-hemora-border bg-white text-hemora-text text-sm font-medium flex items-center justify-center gap-2 opacity-70 cursor-not-allowed shrink-0"
            >
              <Navigation className="w-4 h-4 text-hemora-red" aria-hidden="true" />
              Utiliser ma position
            </button>
          </div>
        </div>

        {/* Disposition Desktop 45% Liste / 55% Carte */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[480px]">
          {/* Liste (45% -> 5 cols sur lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-hemora-muted pb-2 border-b border-hemora-border">
              <span>8 centres référencés (Aperçu)</span>
              <span>Tri par proximité</span>
            </div>

            {/* Card Centre 1 */}
            <div className="bg-hemora-bg p-5 rounded-2xl border border-hemora-red/30 bg-hemora-soft-red/10 space-y-3 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Ouvert maintenant · ferme à 17:00
                  </span>
                  <h3 className="font-semibold text-base text-hemora-text mt-2">
                    Maison du Don — Lille Centre
                  </h3>
                </div>
              </div>
              <p className="text-xs text-hemora-muted flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-hemora-red shrink-0" aria-hidden="true" />
                38 rue de la Clé, 59000 Lille
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-hemora-muted pt-1">
                <span className="bg-white px-2.5 py-1 rounded-md border border-hemora-border">Sang total</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-hemora-border">Plasma</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-hemora-border flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-hemora-muted" aria-hidden="true" /> Sans RDV possible
                </span>
              </div>
            </div>

            {/* Card Centre 2 */}
            <div className="bg-hemora-bg p-5 rounded-2xl border border-hemora-border space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-hemora-muted bg-white px-2 py-0.5 rounded border border-hemora-border">
                    Fermé · ouvre demain à 08:00
                  </span>
                  <h3 className="font-semibold text-base text-hemora-text mt-2">
                    Maison du Don — Paris République
                  </h3>
                </div>
              </div>
              <p className="text-xs text-hemora-muted flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-hemora-muted shrink-0" aria-hidden="true" />
                55 boulevard Voltaire, 75011 Paris
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-hemora-muted pt-1">
                <span className="bg-white px-2.5 py-1 rounded-md border border-hemora-border">Sang total</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-hemora-border">Plaquettes</span>
              </div>
            </div>
          </div>

          {/* Zone Carte (55% -> 7 cols sur lg) */}
          <div className="lg:col-span-7 bg-hemora-bg rounded-2xl border border-hemora-border min-h-[440px] flex flex-col items-center justify-center p-8 text-center space-y-4 relative overflow-hidden shadow-xs">
            <div className="w-14 h-14 rounded-full bg-white border border-hemora-border flex items-center justify-center text-hemora-red shadow-xs">
              <MapPin className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <p className="font-semibold text-base text-hemora-text">
                Carte interactive & Calcul de proximité GPS
              </p>
              <p className="text-xs text-hemora-muted leading-relaxed">
                La carte Leaflet / MapLibre, les marqueurs interactifs et le tri par distance seront entièrement fonctionnels lors du prochain sprint.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
