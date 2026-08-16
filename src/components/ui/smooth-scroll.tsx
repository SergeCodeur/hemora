"use client";

import * as React from "react";

/**
 * SmoothScroll fluide type Locomotive Scroll / Lenis
 * Fournit une interpolation douce (momentum scroll) à 60/120fps sans bloquer le défilement natif.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Vérifie si le client supporte le défilement fluide
    if (typeof window === "undefined") return;

    // Détection des appareils tactiles : préserver le scroll natif parfait sur mobile
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;
    let animationFrameId: number;

    const ease = 0.085; // Coefficient d'amortissement doux et réactif

    const onWheel = (e: WheelEvent) => {
      // Si la cible est un élément à scroll interne (ex: select, dropdown), ne pas intercepter
      const target = e.target as HTMLElement | null;
      if (target?.closest(".overflow-y-auto, .custom-scrollbar, select, textarea")) {
        return;
      }

      e.preventDefault();
      targetY += e.deltaY * 0.85;

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      const diff = targetY - currentY;
      currentY += diff * ease;

      window.scrollTo(0, Math.round(currentY));

      if (Math.abs(diff) > 0.5) {
        animationFrameId = requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo(0, targetY);
        isRunning = false;
      }
    };

    const onScroll = () => {
      if (!isRunning) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <>{children}</>;
}
