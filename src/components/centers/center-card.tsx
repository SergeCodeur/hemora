"use client";

import * as React from "react";
import { BloodDonationCenter } from "@/types/centers";
import { getCenterOpenStatus } from "@/lib/centers/open-status";
import { formatDistance } from "@/lib/centers/distance";
import { getDirectionsUrl } from "@/lib/centers/filter";
import { MapPin, Navigation, ArrowUpRight } from "lucide-react";

interface CenterCardProps {
  center: BloodDonationCenter & { distanceKm?: number };
  isSelected?: boolean;
  onSelect: (center: BloodDonationCenter) => void;
  onOpenDetails: (center: BloodDonationCenter) => void;
}

export function CenterCard({
  center,
  isSelected = false,
  onSelect,
  onOpenDetails,
}: CenterCardProps) {
  const status = React.useMemo(() => getCenterOpenStatus(center), [center]);

  const donationLabels: Record<string, string> = {
    sang: "Sang",
    plasma: "Plasma",
    plaquettes: "Plaquettes",
  };

  const appointmentLabels: Record<string, string> = {
    "avec-rdv": "Sur rendez-vous",
    "sans-rdv": "Sans rendez-vous",
    mixte: "Avec ou sans RDV",
  };

  return (
    <div
      onClick={() => onSelect(center)}
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer text-left space-y-4 ${
        isSelected
          ? "border-hemora-red bg-white shadow-md ring-1 ring-hemora-red/30"
          : "border-hemora-border bg-white hover:border-hemora-border/80 hover:shadow-2xs"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(center);
        }
      }}
      aria-label={`Sélectionner ${center.name}`}
    >
      {/* Haut de carte : Nom, Ville & Distance */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-hemora-muted uppercase tracking-wider">
              {center.city}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-sans text-stone-500 truncate">
              {center.type}
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-normal text-hemora-text tracking-tight leading-snug">
            {center.name}
          </h3>
        </div>

        {/* Distance si position utilisateur disponible */}
        {center.distanceKm !== undefined && (
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-mono font-bold text-hemora-red bg-hemora-soft-red/40 px-2.5 py-1 rounded-full border border-hemora-red/20">
            <Navigation className="w-3 h-3 rotate-45" />
            {formatDistance(center.distanceKm)}
          </span>
        )}
      </div>

      {/* Adresse */}
      <div className="flex items-center gap-2 text-xs text-hemora-muted">
        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span className="truncate">{center.address}</span>
      </div>

      {/* Statut d'ouverture dynamique */}
      <div className="flex items-center gap-2 text-xs">
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            status.isOpen ? "bg-emerald-500" : "bg-stone-300"
          }`}
          aria-hidden="true"
        />
        <span className="font-medium text-hemora-text">{status.label}</span>
        <span className="text-stone-300">•</span>
        <span className="text-hemora-muted">{status.detail}</span>
      </div>

      {/* Tags de dons & Modalités */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {center.accepts.map((type) => (
          <span
            key={type}
            className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200/60"
          >
            {donationLabels[type] || type}
          </span>
        ))}
        <span className="text-[11px] text-hemora-muted px-1.5 py-0.5">
          {appointmentLabels[center.appointmentMode]}
        </span>
      </div>

      {/* Actions de bas de carte */}
      <div className="pt-3 border-t border-hemora-border/60 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(center);
          }}
          className="text-xs font-semibold text-hemora-text hover:text-hemora-red inline-flex items-center gap-1 py-1 focus-visible:outline-none focus-visible:underline cursor-pointer"
        >
          Voir les détails
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={getDirectionsUrl(center)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-hemora-text bg-stone-50 hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Navigation className="w-3 h-3" />
          Itinéraire
        </a>
      </div>
    </div>
  );
}
