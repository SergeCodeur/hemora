"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "../layout/container";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  badge: string;
  image: string;
  worry: string;
  feedback: string;
}

const testimonials: Testimonial[] = [
  {
    id: "aicha",
    name: "Aïcha",
    badge: "Premier don",
    image: "/images/testimonial-aicha.webp",
    worry: "J’avais surtout peur de l’aiguille.",
    feedback:
      "Finalement, le prélèvement a été beaucoup plus rapide et moins impressionnant que je l’imaginais.",
  },
  {
    id: "samuel",
    name: "Samuel",
    badge: "Premier don",
    image: "/images/testimonial-samuel.webp",
    worry: "Je ne savais pas vraiment comment ça allait se passer.",
    feedback:
      "L’équipe m’a expliqué chaque étape et je me suis senti accompagné du début à la fin.",
  },
  {
    id: "nadia",
    name: "Nadia",
    badge: "Premier don",
    image: "/images/testimonial-nadia.webp",
    worry: "Je pensais qu’il fallait connaître son groupe sanguin.",
    feedback:
      "On m’a rassurée dès l’accueil et tout a été beaucoup plus simple que prévu.",
  },
  {
    id: "idriss",
    name: "Idriss",
    badge: "Premier don",
    image: "/images/testimonial-idriss.webp",
    worry: "J’avais peur de me sentir mal après.",
    feedback:
      "J’ai pris quelques minutes pour récupérer, boire et manger avant de repartir tranquillement.",
  },
  {
    id: "salimata",
    name: "Salimata",
    badge: "Premier don",
    image: "/images/testimonial-salimata.webp",
    worry: "Je pensais que ça prendrait toute la matinée.",
    feedback:
      "Tout le parcours était parfaitement fluide. En 45 minutes chrono, c'était terminé et j'étais déjà prête à reprendre mes activités.",
  },
  {
    id: "emmanuel",
    name: "Emmanuel",
    badge: "Premier don",
    image: "/images/testimonial-emmanuel.webp",
    worry: "J'avais peur d'avoir un vertige après le don.",
    feedback:
      "Le médecin m'a rassuré dès l'entretien initial et l'équipe veille sur vous pendant la pause collation. Zéro malaise.",
  },
  {
    id: "kader",
    name: "Kader",
    badge: "Premier don",
    image: "/images/testimonial-kader.webp",
    worry: "J'hésitais à venir seul pour une première fois.",
    feedback:
      "Les soignants et les autres donneurs étaient tellement chaleureux que je me suis immédiatement senti à l'aise.",
  },
  {
    id: "fatou",
    name: "Fatou",
    badge: "Premier don",
    image: "/images/testimonial-fatou.webp",
    worry: "Je craignais de ne pas peser assez lourd.",
    feedback:
      "Le médecin a vérifié mes critères en toute bienveillance lors de l'entretien préalable et tout s'est parfaitement déroulé.",
  },
];

const TOTAL_ITEMS = testimonials.length;

// Ruban continu physique de 7 répétitions complètes (56 items au total)
const REPEAT_COUNT = 7;
const START_INDEX = Math.floor(REPEAT_COUNT / 2) * TOTAL_ITEMS; // 24 (Aïcha)

const trackItems = Array.from(
  { length: REPEAT_COUNT * TOTAL_ITEMS },
  (_, index) => {
    const baseItem = testimonials[index % TOTAL_ITEMS];
    return {
      ...baseItem,
      uniqueKey: `track-${baseItem.id}-${index}`,
      indexInList: index,
    };
  }
);

// Cadence optimale : 4,8 secondes
const AUTOPLAY_DURATION_SEC = 4.8;
const AUTOPLAY_DURATION_MS = AUTOPLAY_DURATION_SEC * 1000;

// Constantes pour le cercle de progression extérieur (Rayon 21 sur boîte de 44)
const CIRCLE_RADIUS = 21;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~ 131.95

export function TestimonialsSection() {
  const [virtualIndex, setVirtualIndex] = React.useState(START_INDEX);
  const [slideDirection, setSlideDirection] = React.useState<1 | -1>(1);
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const actualIndex = ((virtualIndex % TOTAL_ITEMS) + TOTAL_ITEMS) % TOTAL_ITEMS;
  const current = testimonials[actualIndex];

  // Recalcul du recentrage modulaire silencieux pour une boucle inépuisable sans saut visuel
  React.useEffect(() => {
    if (virtualIndex >= START_INDEX + TOTAL_ITEMS * 2) {
      setVirtualIndex((v) => v - TOTAL_ITEMS);
    } else if (virtualIndex <= START_INDEX - TOTAL_ITEMS * 2) {
      setVirtualIndex((v) => v + TOTAL_ITEMS);
    }
  }, [virtualIndex]);

  const handlePrev = React.useCallback(() => {
    setSlideDirection(-1);
    setVirtualIndex((prev) => prev - 1);
  }, []);

  const handleNext = React.useCallback(() => {
    setSlideDirection(1);
    setVirtualIndex((prev) => prev + 1);
  }, []);

  // Défilement automatique avec Page Visibility API (évite les sauts d'onglet)
  React.useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (timer) clearInterval(timer);
      if (!isPaused && typeof document !== "undefined" && !document.hidden) {
        timer = setInterval(() => {
          handleNext();
        }, AUTOPLAY_DURATION_MS);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timer) clearInterval(timer);
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPaused, handleNext]);

  // Navigation clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // Swipe tactile mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) handleNext();
    if (distance < -45) handlePrev();
  };

  // FORMULE D'ANCRAGE ABSOLU CONTINU :
  // y = 0 est positionné au centre exact de la boîte parent (top-1/2).
  // Pour centrer l'item k : on remonte de la hauteur des k items précédents (k * 88px)
  // et de la demi-hauteur de l'item actif lui-même (190px / 2 = 95px).
  const desktopY = -(virtualIndex * 88 + 95);

  // Formule d'ancrage absolu continu sur mobile :
  // x = 0 est positionné au centre exact de la boîte parent (left-1/2).
  // 96px = 84px (largeur inactive) + 12px (gap)
  // 52px = demi-largeur de l'item actif de 104px
  const mobileX = -(virtualIndex * 96 + 52);

  return (
    <section
      id="temoignages"
      className="py-16 sm:py-24 md:py-32 bg-white border-t border-hemora-border/60 overflow-hidden focus:outline-none scroll-mt-12 sm:scroll-mt-20"
      aria-label="Témoignages de premiers donneurs"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Container size="default">
        
        {/* EN-TÊTE ASYMÉTRIQUE "SPLIT MAGAZINE" */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-12 sm:mb-16">
          
          {/* Bloc Titre Gauche */}
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
              Expériences vécues
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]">
              Eux aussi hésitaient avant de franchir le pas.
            </h2>
          </div>

          {/* Bloc Description Droite */}
          <div className="max-w-md md:pb-1">
            <p className="text-hemora-muted text-base sm:text-lg font-normal leading-relaxed">
              La peur de l’aiguille, le manque de temps ou l’inconnu : 8 premiers donneurs racontent ce qui les a rassurés.
            </p>
          </div>

        </div>

        {/* BLOC PRINCIPAL CONTENANT LES DEUX PARTIES */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* ========================================================================= */}
          {/* COLONNE GAUCHE (DESKTOP) : TAPIS ROULANT VERTICAL ANCRÉ ABSOLU            */}
          {/* ========================================================================= */}
          <div className="hidden md:block md:col-span-4 h-[480px] overflow-hidden relative select-none">
            
            {/* Dégradés d'atténuation haut / bas */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/95 to-transparent pointer-events-none z-30" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-30" />

            {/* Piste continue verticale ancrée de manière absolue au centre (top-1/2) */}
            <motion.div
              className="absolute left-0 right-0 top-1/2 flex flex-col gap-3 z-10 w-full"
              animate={{ y: desktopY }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 26,
                mass: 0.8,
              }}
            >
              {trackItems.map((item) => {
                const isActive = item.indexInList === virtualIndex;

                return (
                  <motion.button
                    key={`desk-card-${item.uniqueKey}`}
                    layout
                    type="button"
                    onClick={() => {
                      setSlideDirection(item.indexInList > virtualIndex ? 1 : -1);
                      setVirtualIndex(item.indexInList);
                    }}
                    aria-label={`Afficher le témoignage de ${item.name}`}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer text-left w-full shrink-0 transition-colors duration-300 ${
                      isActive
                        ? "h-[190px] shadow-lg z-20"
                        : "h-[76px] opacity-45 hover:opacity-100 z-10"
                    }`}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 260,
                        damping: 26,
                      },
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={`Photo de ${item.name}`}
                      fill
                      className={`object-cover object-[center_36%] transition-all duration-500 group-hover:scale-105 ${
                        isActive ? "grayscale-0" : "grayscale"
                      }`}
                      sizes="(max-width: 1024px) 33vw, 25vw"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                        isActive ? "opacity-90" : "opacity-60"
                      }`}
                    />
                    
                    {/* Légende du portrait */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white text-xs">
                      <div className="space-y-0.5 truncate">
                        <p className={`font-semibold drop-shadow-xs truncate ${isActive ? "text-sm" : "text-xs"}`}>
                          {item.name}
                        </p>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-[10px] font-mono text-white/80 uppercase tracking-wider block"
                          >
                            {item.badge}
                          </motion.p>
                        )}
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-hemora-red ring-2 ring-white/80 hidden sm:block shrink-0 mb-1" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* VERSION MOBILE : TAPIS ROULANT HORIZONTAL ANCRÉ ABSOLU                    */}
          {/* ========================================================================= */}
          <div
            className="md:hidden h-[130px] overflow-hidden relative select-none w-full flex items-center py-1"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Dégradés doux sur les bords gauche/droit */}
            <div className="absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-30" />
            <div className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-30" />

            {/* Ruban horizontal ancré de manière absolue au centre (left-1/2) */}
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 flex gap-3 items-center z-10"
              animate={{ x: mobileX }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 26,
                mass: 0.8,
              }}
            >
              {trackItems.map((item) => {
                const isActive = item.indexInList === virtualIndex;

                return (
                  <motion.button
                    key={`mob-card-${item.uniqueKey}`}
                    layout
                    type="button"
                    onClick={() => {
                      setSlideDirection(item.indexInList > virtualIndex ? 1 : -1);
                      setVirtualIndex(item.indexInList);
                    }}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer shrink-0 transition-colors duration-300 ${
                      isActive
                        ? "w-[104px] h-[115px] shadow-lg z-20"
                        : "w-[84px] h-[84px] opacity-45 z-10"
                    }`}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 260,
                        damping: 26,
                      },
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className={`object-cover object-[center_36%] ${isActive ? "grayscale-0" : "grayscale"}`}
                      sizes="120px"
                      quality={80}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent ${isActive ? "opacity-90" : "opacity-50"}`} />
                    <span className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-semibold truncate text-left block">
                      {item.name}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* COLONNE DROITE (8 COLONNES) : GRANDE CARTE DU TÉMOIGNAGE ACTIF             */}
          {/* ========================================================================= */}
          <div
            className="md:col-span-8 rounded-3xl border border-hemora-border bg-hemora-bg bg-grain p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden shadow-xs min-h-[400px] md:h-[480px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
          >
            {/* Grand Guillemet en filigrane discret */}
            <div className="absolute right-8 top-8 text-stone-200/50 pointer-events-none select-none">
              <svg className="w-32 sm:w-36 h-32 sm:h-36 fill-current" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>

            {/* Contenu textuel avec AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: slideDirection * 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -slideDirection * 12 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="space-y-6 sm:space-y-8 relative z-10"
              >
                {/* Badge "Premier don" + Compteur de progression */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-hemora-red" />
                    <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider">
                      {current.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium text-hemora-muted">
                    0{actualIndex + 1} / 0{TOTAL_ITEMS}
                  </span>
                </div>

                {/* Titre / Inquiétude de départ */}
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-hemora-text tracking-tight leading-[1.2]">
                  “{current.worry}”
                </h3>

                {/* Retour d'expérience */}
                <p className="text-base sm:text-lg md:text-xl text-hemora-muted leading-relaxed max-w-2xl font-normal">
                  {current.feedback}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bas de carte : Auteur (aligné avec les boutons) */}
            <div className="pt-8 sm:pt-10 mt-4 border-t border-hemora-border/60 flex items-center justify-between gap-4 relative z-10">
              
              {/* Prénom de l'auteur uniquement */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`author-${current.id}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="font-sans font-semibold text-lg sm:text-xl text-hemora-text"
                >
                  {current.name}
                </motion.p>
              </AnimatePresence>

              {/* Boutons de navigation : tailles identiques (44px) */}
              <div className="flex items-center gap-2.5">
                {/* Bouton Précédent */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Témoignage précédent"
                  className="w-11 h-11 rounded-full border border-hemora-border bg-white text-hemora-text hover:border-hemora-red hover:text-hemora-red hover:bg-hemora-soft-red/30 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Bouton Suivant avec la bordure extérieure animée */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Témoignage suivant"
                  className="relative w-11 h-11 rounded-full bg-white text-hemora-text hover:text-hemora-red flex items-center justify-center transition-colors shadow-2xs cursor-pointer group overflow-visible"
                >
                  <svg
                    className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] -rotate-90 pointer-events-none"
                    viewBox="0 0 44 44"
                  >
                    <circle
                      cx="22"
                      cy="22"
                      r={CIRCLE_RADIUS}
                      fill="none"
                      stroke="#E8E6E3"
                      strokeWidth="1.3"
                    />
                    <motion.circle
                      key={`ring-${virtualIndex}-${isPaused}`}
                      cx="22"
                      cy="22"
                      r={CIRCLE_RADIUS}
                      fill="none"
                      stroke="#A92F3D"
                      strokeWidth="1.6"
                      strokeDasharray={CIRCLE_CIRCUMFERENCE}
                      initial={{ strokeDashoffset: CIRCLE_CIRCUMFERENCE }}
                      animate={{ strokeDashoffset: isPaused ? undefined : 0 }}
                      transition={{
                        duration: AUTOPLAY_DURATION_SEC,
                        ease: "linear",
                      }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
