"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "../layout/container";
import { ShieldCheck, MessageCircleHeart, Sparkles, Coffee } from "lucide-react";

export function ProcessSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Suivi continu de la progression du défilement le long de la timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  // Amortissement doux du tracé pour une sensation premium
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  const steps = [
    {
      num: "01",
      title: "Avant de venir",
      duration: "~5 min de préparation",
      reassurance: "Le conseil clé : buvez 500 ml d'eau",
      icon: Sparkles,
      description:
        "Ne venez pas à jeun, prenez un repas léger et prévoyez votre pièce d’identité originale.",
    },
    {
      num: "02",
      title: "Accueil & entretien",
      duration: "~15 min",
      reassurance: "Le moment idéal pour poser vos questions",
      icon: MessageCircleHeart,
      description:
        "Un entretien médical valide votre aptitude et s'assure que le don s'effectue en toute sécurité pour vous.",
    },
    {
      num: "03",
      title: "Prélèvement",
      duration: "~8 à 10 min",
      reassurance: "Matériel 100% stérile & à usage unique",
      icon: ShieldCheck,
      description:
        "Confortablement installé dans un fauteuil, l’équipe soignante reste à vos côtés tout au long du geste.",
    },
    {
      num: "04",
      title: "Repos & collation",
      duration: "~15 min",
      reassurance: "Buffet gourmand & boissons offerts",
      icon: Coffee,
      description:
        "Un temps de repos indispensable de 15 minutes permet à votre organisme de récupérer en toute tranquillité.",
    },
  ];

  return (
    <section
      id="deroulement"
      className="py-16 sm:py-24 md:py-32 bg-hemora-bg bg-grain border-t border-hemora-border/60 scroll-mt-12 sm:scroll-mt-20"
      aria-labelledby="deroulement-title"
    >
      <Container size="default">
        
        {/* EN-TÊTE CENTRÉ AVEC REVEAL */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-20 sm:mb-28"
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
            Parcours pas à pas
          </span>
          <h2
            id="deroulement-title"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]"
          >
            Le jour du don, <span className="italic font-serif">voilà ce qui vous attend.</span>
          </h2>
          <p className="text-hemora-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            Un parcours fluide d’environ 45 minutes, encadré du début à la fin par des équipes médicales attentionnées.
          </p>
        </motion.div>

        {/* --- TIMELINE VERTICALE CENTRALE AVEC TRACÉ PROGRESSIF --- */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* Ligne verticale grise de fond */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-hemora-border/70 -translate-x-1/2 z-0" />

          {/* Ligne verticale animée bordeaux qui suit le scroll */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-hemora-red -translate-x-1/2 z-0"
          />

          <div className="space-y-16 sm:space-y-24">
            
            {/* ÉTAPE 1 */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row items-center"
            >
              {/* Côté Gauche (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 md:text-right space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 01 • {steps[0].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[0].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md md:ml-auto">
                  {steps[0].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[0].reassurance}
                  </span>
                </div>
              </div>

              {/* Pastille Centrale animée sur la ligne */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">01</span>
                </div>
              </motion.div>

              {/* Côté Droit (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pl-16 items-center justify-start">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[0].reassurance}
                </span>
              </div>
            </motion.div>


            {/* ÉTAPE 2 */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row items-center"
            >
              {/* Côté Gauche (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pr-16 items-center justify-end">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <MessageCircleHeart className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[1].reassurance}
                </span>
              </div>

              {/* Pastille Centrale animée sur la ligne */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">02</span>
                </div>
              </motion.div>

              {/* Côté Droit (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-16 md:text-left space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 02 • {steps[1].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[1].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md">
                  {steps[1].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <MessageCircleHeart className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[1].reassurance}
                  </span>
                </div>
              </div>
            </motion.div>


            {/* RESPIRATION CENTRALE : PHOTO ÉDITORIALE AU MILIEU DU PARCOURS AVEC ZOOM SUBTIL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex justify-center py-6"
            >
              <div className="relative z-10 max-w-lg w-full rounded-3xl overflow-hidden border border-hemora-border bg-white shadow-xs">
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src="/images/process-editorial.webp"
                    alt="Échange bienveillant pendant l'entretien"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 92vw, 520px"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                    <p className="font-serif italic text-sm text-white/90">
                      Un cadre chaleureux et sécurisé à chaque étape.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>


            {/* ÉTAPE 3 */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row items-center"
            >
              {/* Côté Gauche (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 md:text-right space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 03 • {steps[2].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[2].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md md:ml-auto">
                  {steps[2].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[2].reassurance}
                  </span>
                </div>
              </div>

              {/* Pastille Centrale animée sur la ligne */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">03</span>
                </div>
              </motion.div>

              {/* Côté Droit (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pl-16 items-center justify-start">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[2].reassurance}
                </span>
              </div>
            </motion.div>


            {/* ÉTAPE 4 */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row items-center"
            >
              {/* Côté Gauche (Micro-conseil Desktop) */}
              <div className="hidden md:flex md:w-1/2 pr-16 items-center justify-end">
                <span className="inline-flex items-center gap-2 text-xs font-sans font-medium text-hemora-text bg-white border border-hemora-border px-4 py-2 rounded-full shadow-2xs hover:border-hemora-red/40 transition-colors">
                  <Coffee className="w-3.5 h-3.5 text-hemora-red" />
                  {steps[3].reassurance}
                </span>
              </div>

              {/* Pastille Centrale animée sur la ligne */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-10 h-10 rounded-full bg-white border-2 border-hemora-red flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-hemora-red">04</span>
                </div>
              </motion.div>

              {/* Côté Droit (Texte) */}
              <div className="w-full md:w-1/2 pl-16 md:pl-16 md:text-left space-y-2.5">
                <span className="text-xs font-mono font-bold text-hemora-red uppercase tracking-wider block">
                  Étape 04 • {steps[3].duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-hemora-text font-normal">
                  {steps[3].title}
                </h3>
                <p className="text-sm sm:text-base text-hemora-muted leading-relaxed max-w-md">
                  {steps[3].description}
                </p>
                {/* Micro-conseil mobile */}
                <div className="md:hidden pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-hemora-muted bg-white border border-hemora-border px-3 py-1 rounded-full">
                    <Coffee className="w-3.5 h-3.5 text-hemora-red" />
                    {steps[3].reassurance}
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </Container>
    </section>
  );
}
