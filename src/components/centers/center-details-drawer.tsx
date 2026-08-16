"use client";

import * as React from "react";
import { BloodDonationCenter } from "@/types/centers";
import { getCenterOpenStatus } from "@/lib/centers/open-status";
import { formatDistance } from "@/lib/centers/distance";
import { getDirectionsUrl } from "@/lib/centers/filter";
import { X, MapPin, Phone, Clock, Navigation, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CenterDetailsDrawerProps {
  center: BloodDonationCenter & { distanceKm?: number } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CenterDetailsDrawer({
  center,
  isOpen,
  onClose,
}: CenterDetailsDrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!center) return null;

  const status = getCenterOpenStatus(center);
  const currentDayIndex = new Date().getDay();

  const donationTypeLabels: Record<string, { label: string; desc: string }> = {
    sang: {
      label: "Don de sang total",
      desc: "Prélèvement standard d'environ 450 ml, indispensable pour les urgences et interventions chirurgicales.",
    },
    plasma: {
      label: "Don de plasma",
      desc: "Séparation par aphérèse pour les grands brûlés et la fabrication de médicaments dérivés.",
    },
    plaquettes: {
      label: "Don de plaquettes",
      desc: "Essentiel pour les patients sous chimiothérapie ou atteints de maladies hématologiques.",
    },
  };

  const appointmentLabels: Record<string, string> = {
    "avec-rdv": "Sur rendez-vous uniquement",
    "sans-rdv": "Accueil libre sans rendez-vous",
    mixte: "Avec ou sans rendez-vous selon votre convenance",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="drawer-center-title">
          {/* Backdrop sombre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer latéral Desktop / Bottom sheet Mobile */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10"
          >
            {/* Header du Drawer */}
            <div className="p-6 sm:p-8 border-b border-hemora-border/70 sticky top-0 bg-white/95 backdrop-blur-md z-20 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red">
                    {center.city}, {center.country}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs font-sans text-stone-500">
                    {center.type}
                  </span>
                </div>
                <h2
                  id="drawer-center-title"
                  className="font-serif text-2xl sm:text-3xl font-normal text-hemora-text tracking-tight leading-snug"
                >
                  {center.name}
                </h2>
              </div>

              {/* Bouton de fermeture */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le volet de détails"
                className="w-9 h-9 rounded-full border border-hemora-border bg-white text-stone-500 hover:text-hemora-text hover:border-stone-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corps du Drawer */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              
              {/* Statut d'ouverture & Distance */}
              <div className="p-4 rounded-2xl bg-hemora-bg bg-grain border border-hemora-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3 h-3 rounded-full shrink-0 ${
                      status.isOpen ? "bg-emerald-500" : "bg-stone-300"
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-hemora-text">
                      {status.label}
                    </p>
                    <p className="text-xs text-hemora-muted capitalize">
                      {status.detail}
                    </p>
                  </div>
                </div>

                {center.distanceKm !== undefined && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-hemora-red bg-white px-3 py-1 rounded-full border border-hemora-border shadow-2xs">
                    <Navigation className="w-3 h-3 rotate-45" />
                    {formatDistance(center.distanceKm)}
                  </span>
                )}
              </div>

              {/* Coordonnées */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-400">
                  Coordonnées & Localisation
                </h3>
                <div className="space-y-2.5 text-sm text-hemora-text">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-hemora-red shrink-0 mt-0.5" />
                    <span>
                      {center.address}, {center.city} ({center.country})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-hemora-red shrink-0" />
                    <a
                      href={`tel:${center.phone.replace(/\s/g, "")}`}
                      className="hover:underline font-mono"
                    >
                      {center.phone}
                    </a>
                  </div>

                  {center.accessInfo && (
                    <div className="pt-2 text-xs text-hemora-muted bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                      <strong>Accès :</strong> {center.accessInfo}
                    </div>
                  )}
                </div>
              </div>

              {/* Horaires de la semaine */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-400">
                    Horaires d’ouverture
                  </h3>
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                </div>

                <div className="rounded-2xl border border-hemora-border divide-y divide-hemora-border/60 overflow-hidden bg-white text-xs sm:text-sm">
                  {center.openingHours.map((schedule) => {
                    const isToday = schedule.dayIndex === currentDayIndex;

                    return (
                      <div
                        key={schedule.dayName}
                        className={`px-4 py-3 flex items-center justify-between gap-4 transition-colors ${
                          isToday ? "bg-hemora-soft-red/30 font-medium" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={isToday ? "font-bold text-hemora-red" : "text-hemora-text"}>
                            {schedule.dayName}
                          </span>
                          {isToday && (
                            <span className="text-[10px] font-mono text-hemora-red uppercase tracking-wider">
                              (Aujourd’hui)
                            </span>
                          )}
                        </div>

                        <span className={schedule.isOpen ? "text-stone-700 font-mono" : "text-stone-400 italic"}>
                          {schedule.isOpen && schedule.openTime && schedule.closeTime
                            ? `${schedule.openTime} — ${schedule.closeTime}`
                            : "Fermé"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dons pris en charge */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-400">
                  Dons pris en charge
                </h3>
                <div className="space-y-2">
                  {center.accepts.map((type) => {
                    const info = donationTypeLabels[type];
                    return (
                      <div
                        key={type}
                        className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 space-y-0.5 text-xs"
                      >
                        <p className="font-semibold text-hemora-text">
                          {info.label}
                        </p>
                        <p className="text-hemora-muted">
                          {info.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modalités d'accueil */}
              <div className="space-y-2 text-xs">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-400">
                  Modalité d’accueil
                </h3>
                <p className="text-hemora-text font-medium bg-white p-3 rounded-xl border border-hemora-border">
                  {appointmentLabels[center.appointmentMode]}
                </p>
              </div>

              {/* Notes / Remarques */}
              {center.notes && (
                <div className="p-4 rounded-2xl bg-hemora-soft-red/20 border border-hemora-red/20 text-xs text-hemora-text leading-relaxed">
                  {center.notes}
                </div>
              )}

            </div>

            {/* Pied du Drawer */}
            <div className="p-6 sm:p-8 border-t border-hemora-border bg-white sticky bottom-0 z-20">
              <a
                href={getDirectionsUrl(center)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-xl bg-hemora-red hover:bg-hemora-red/90 text-white font-sans font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                Obtenir l’itinéraire sur la carte
              </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
