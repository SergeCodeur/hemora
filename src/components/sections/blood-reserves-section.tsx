import * as React from "react";
import { Container } from "../layout/container";
import { BloodGroup, BloodNeedLevel } from "@/types";
import { Info, AlertCircle } from "lucide-react";

export function BloodReservesSection() {
  const groups: { group: BloodGroup; level: BloodNeedLevel; label: string }[] = [
    { group: "O-", level: "critical", label: "Besoin critique" },
    { group: "O+", level: "critical", label: "Besoin critique" },
    { group: "A-", level: "high", label: "Besoin élevé" },
    { group: "A+", level: "high", label: "Besoin élevé" },
    { group: "B-", level: "moderate", label: "Besoin modéré" },
    { group: "B+", level: "stable", label: "Réserve stable" },
    { group: "AB-", level: "moderate", label: "Besoin modéré" },
    { group: "AB+", level: "stable", label: "Réserve stable" },
  ];

  const getLevelStyle = (level: BloodNeedLevel) => {
    switch (level) {
      case "critical":
        return {
          bg: "bg-red-50 border-red-200 text-red-700",
          dot: "bg-red-600",
        };
      case "high":
        return {
          bg: "bg-amber-50 border-amber-200 text-amber-800",
          dot: "bg-amber-600",
        };
      case "moderate":
        return {
          bg: "bg-blue-50 border-blue-200 text-blue-800",
          dot: "bg-blue-600",
        };
      case "stable":
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
          dot: "bg-emerald-600",
        };
    }
  };

  return (
    <section id="reserves" className="py-16 sm:py-20 md:py-24 border-t border-hemora-border bg-hemora-bg">
      <Container size="default">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-hemora-muted">
            Tendance des stocks régionaux
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-hemora-text font-normal">
            Les besoins du moment
          </h2>
          <p className="text-hemora-muted text-base sm:text-lg">
            Niveaux indicatifs des réserves par groupe sanguin pour orienter les dons prioritaires.
          </p>
          <p className="text-xs text-hemora-muted italic">
            (Données locales de démonstration pour le Figma to Code Challenge)
          </p>
        </div>

        {/* Grille des 8 groupes sanguins avec jauges calmes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {groups.map((g) => {
            const style = getLevelStyle(g.level);
            return (
              <div
                key={g.group}
                className="bg-white p-5 rounded-2xl border border-hemora-border flex flex-col justify-between space-y-4 shadow-xs transition-colors hover:border-hemora-border/80"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-2xl text-hemora-text">
                    {g.group}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} aria-hidden="true" />
                </div>

                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 self-start ${style.bg}`}
                >
                  {g.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note de réassurance forte */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-hemora-border flex items-start gap-4 max-w-3xl mx-auto text-xs text-hemora-muted shadow-xs">
          <Info className="w-5 h-5 text-hemora-red shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold text-hemora-text">
              Même lorsqu’un groupe sanguin n’est pas indiqué comme prioritaire, les dons restent utiles.
            </p>
            <p className="leading-relaxed">
              Vous ne connaissez pas votre groupe sanguin ? Ce n'est pas un obstacle : votre carte de donneur avec votre groupe sanguin exact vous sera envoyée gratuitement après votre premier don.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
