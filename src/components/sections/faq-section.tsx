"use client";

import * as React from "react";
import { Container } from "../layout/container";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
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
        "Oui, vous pouvez reprendre une activité normale. Évitez simplement les efforts physiques intenses, le sport violent et le port de charges lourdes durant la fin de journée.",
    },
    {
      question: "Je ne connais pas mon groupe sanguin, est-ce un problème ?",
      answer:
        "Aucunement ! Votre groupe sanguin sera déterminé en laboratoire suite à votre don et vous sera communiqué directement sur votre carte de donneur.",
    },
    {
      question: "Que se passe-t-il si je me sens mal ?",
      answer:
        "Les équipes médicales sont formées pour intervenir immédiatement. Un simple repos prolongé, les jambes surélevées et une boisson sucrée permettent de récupérer très rapidement.",
    },
    {
      question: "Combien de temps faut-il prévoir au total ?",
      answer:
        "Comptez environ 45 minutes sur place, dont seulement 8 à 10 minutes pour le prélèvement effectif. Le reste du temps est consacré à l'accueil, l'entretien et la collation.",
    },
    {
      question: "Puis-je donner si c’est ma première fois ?",
      answer:
        "Absolument, vous êtes le bienvenu ! L'équipe prendra un soin particulier à vous accompagner et à vous réassurer à chaque étape de votre premier don.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 border-t border-hemora-border bg-white">
      <Container size="narrow">
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-hemora-muted">
            Foire aux questions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-hemora-text font-normal">
            Vous avez encore une hésitation ?
          </h2>
          <p className="text-hemora-muted text-base sm:text-lg max-w-lg mx-auto">
            Des réponses simples, pédagogiques et rassurantes à vos inquiétudes légitimes.
          </p>
        </div>

        {/* Accordéon accessible ARIA */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <div
                key={idx}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-colors duration-200",
                  isOpen
                    ? "border-hemora-red/30 bg-hemora-soft-red/20 shadow-xs"
                    : "border-hemora-border bg-hemora-bg hover:border-hemora-border/80"
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between font-sans font-semibold text-base text-hemora-text hover:text-hemora-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hemora-red transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors",
                          isOpen ? "text-hemora-red" : "text-hemora-muted"
                        )}
                        aria-hidden="true"
                      />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-hemora-muted transition-transform duration-200 shrink-0 ml-4",
                        isOpen && "transform rotate-180 text-hemora-red"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-5 pt-1 text-sm text-hemora-muted leading-relaxed border-t border-hemora-border/40 bg-white"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
