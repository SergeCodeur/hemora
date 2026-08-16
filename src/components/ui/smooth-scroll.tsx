"use client";

import * as React from "react";

/**
 * Moteur global de défilement fluide type Locomotive Scroll / Lenis
 * Fournit une interpolation douce (momentum scroll) à 60/120fps sans conflit CSS.
 */

// Permet de déclencher un défilement doux vers une position ou un sélecteur
export function smoothScrollTo(target: number | string) {
  if (typeof window === "undefined") return;

  let targetPosition = 0;
  if (typeof target === "number") {
    targetPosition = target;
  } else if (target === "#" || target === "") {
    targetPosition = 0;
  } else {
    const el = document.querySelector(target);
    if (el) {
      const rect = el.getBoundingClientRect();
      targetPosition = window.scrollY + rect.top;
    }
  }

  // Si le dispatch global est disponible, on anime avec le moteur fluide
  if (window.__hemoraScrollTo) {
    window.__hemoraScrollTo(targetPosition);
  } else {
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  }
}

declare global {
  interface Window {
    __hemoraScrollTo?: (targetY: number) => void;
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Détection des appareils tactiles : préserver le scroll natif sans altération sur mobile
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      window.__hemoraScrollTo = (y: number) => {
        window.scrollTo({ top: y, behavior: "smooth" });
      };
      return;
    }

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;
    let animationFrameId: number;

    const ease = 0.08; // Inertie ultra-soyeuse (soyeux & réactif)

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

    // Enregistrement de la méthode globale de défilement vers une ancre
    window.__hemoraScrollTo = (y: number) => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetY = Math.max(0, Math.min(y, maxScroll));
      currentY = window.scrollY;

      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(updateScroll);
      }
    };

    const onWheel = (e: WheelEvent) => {
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
      delete window.__hemoraScrollTo;
    };
  }, []);

  return <>{children}</>;
}
