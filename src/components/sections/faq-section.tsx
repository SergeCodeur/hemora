"use client";

import * as React from "react";
import { Container } from "../layout/container";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Est-ce que ça fait mal ?",
    answer:
      "La piqûre provoque une sensation brève similaire à une prise de sang classique. Le prélèvement en lui-même est totalement indolore et surveillé en permanence par le personnel infirmier.",
  },
  {
    question: "Dois-je venir à jeun ?",
    answer:
      "Non, surtout pas ! Il est au contraire vivement recommandé de prendre un repas léger et de boire au moins 500 ml d'eau ou de jus de fruit avant votre venue.",
  },
  {
    question: "Et si j’ai peur des aiguilles ?",
    answer:
      "C'est une appréhension très fréquente chez les nouveaux donneurs. Signalez-le simplement à l'équipe médicale : vous serez installé très confortablement et distrait pendant le geste.",
  },
  {
    question: "Puis-je travailler ou reprendre mes activités après ?",
    answer:
      "Oui, vous pouvez reprendre une activité normale. Évitez simplement les efforts physiques intenses, le sport violent et le port de charges lourdes durant le reste de la journée.",
  },
  {
    question: "Je ne connais pas mon groupe sanguin, est-ce un problème ?",
    answer:
      "Aucunement. Votre groupe sanguin sera déterminé en laboratoire après votre premier don et vous sera communiqué directement sur votre carte de donneur.",
  },
  {
    question: "Que se passe-t-il si je me sens mal ?",
    answer:
      "Les équipes médicales sont formées pour intervenir immédiatement. Un temps de repos prolongé, les jambes surélevées et une collation permettent de récupérer très rapidement.",
  },
  {
    question: "Combien de temps faut-il prévoir au total ?",
    answer:
      "Comptez environ 45 minutes sur place, dont seulement 8 à 10 minutes pour le prélèvement effectif. Le reste du temps est consacré à l'accueil, l'entretien médical et la collation.",
  },
  {
    question: "Puis-je donner si c’est ma première fois ?",
    answer:
      "Absolument, vous êtes le bienvenu ! L'équipe prendra un soin particulier à vous accompagner et à vous guider pas à pas pour cette première expérience.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 md:py-32 bg-hemora-bg bg-grain border-t border-hemora-border/60"
      aria-labelledby="faq-title"
    >
      <Container size="default">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          
          {/* ========================================================================= */}
          {/* EN-TÊTE ÉDITORIAL CENTRÉ                                                 */}
          {/* ========================================================================= */}
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
              Foire aux questions
            </span>
            <h2
              id="faq-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]"
            >
              Vous avez encore une hésitation ?
            </h2>
            <p className="text-hemora-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl mx-auto pt-1">
              Les réponses aux questions qu’on se pose souvent avant de donner.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* ACCORDÉON FAQ CENTRÉ ÉPURÉ (COLONNE UNIQUE)                              */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const contentId = `faq-answer-${idx}`;
              const buttonId = `faq-question-${idx}`;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                    isOpen
                      ? "border-hemora-border bg-white shadow-2xs"
                      : "border-hemora-border/70 bg-white/60 hover:bg-white hover:border-hemora-border"
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => toggleFAQ(idx)}
                      className="w-full px-5 sm:px-7 py-5 text-left flex items-center justify-between gap-4 font-sans text-base sm:text-lg font-medium text-hemora-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hemora-red/40 transition-colors cursor-pointer group"
                    >
                      <span className={`transition-colors leading-snug ${isOpen ? "text-hemora-text font-semibold" : "group-hover:text-hemora-red"}`}>
                        {faq.question}
                      </span>
                      
                      {/* Pastille circulaire épurée avec + / − */}
                      <span
                        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border transition-all duration-200 ${
                          isOpen
                            ? "border-hemora-red/30 bg-hemora-soft-red/40 text-hemora-red"
                            : "border-hemora-border bg-white text-hemora-muted group-hover:border-hemora-red/40 group-hover:text-hemora-text"
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-hemora-muted leading-relaxed border-t border-hemora-border/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* NOTE DE SITUATION SPÉCIFIQUE CENTRÉE                                      */}
          {/* ========================================================================= */}
          <div className="pt-6 border-t border-hemora-border/70 text-center space-y-1.5 max-w-lg mx-auto">
            <p className="text-sm sm:text-base font-semibold text-hemora-text">
              Une question plus spécifique ?
            </p>
            <p className="text-sm text-hemora-muted leading-relaxed">
              Certaines situations nécessitent l’avis d’un professionnel de santé.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}
