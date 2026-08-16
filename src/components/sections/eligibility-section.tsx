"use client";

import * as React from "react";
import { Container } from "../layout/container";
import { Button } from "../ui/button";
import { CheckCircle2, AlertTriangle, XCircle, ArrowLeft } from "lucide-react";

type Step = "intro" | "age" | "weight" | "gender" | "lastDonation" | "result";

interface CustomDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function CustomDropdown({ label, value, options, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full z-30" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-white border border-hemora-border rounded-[16px] px-5 h-[60px] text-base sm:text-lg font-medium text-hemora-text w-full cursor-pointer hover:border-hemora-red/40 transition-colors focus:outline-none focus:ring-1 focus:ring-hemora-red/35 relative z-10"
      >
        <span className={value ? "text-hemora-text" : "text-hemora-muted"}>
          {selectedOption ? selectedOption.label : label}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className={`w-3.5 h-3.5 text-hemora-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-hemora-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150 py-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-3 text-sm sm:text-base font-medium transition-colors hover:bg-hemora-soft-red hover:text-hemora-red cursor-pointer ${
                value === opt.value ? "bg-hemora-soft-red/60 text-hemora-red" : "text-hemora-text"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function EligibilitySection() {
  const [currentStep, setCurrentStep] = React.useState<Step>("intro");
  
  // State du formulaire
  const [age, setAge] = React.useState<string>("");
  const [weight, setWeight] = React.useState<string>("");
  const [gender, setGender] = React.useState<"homme" | "femme" | "">("");
  const [hasGivenBefore, setHasGivenBefore] = React.useState<boolean | null>(null);

  // States pour la date de dernier don personnalisée (Jour, Mois, Année)
  const [selectedDay, setSelectedDay] = React.useState<string>("");
  const [selectedMonth, setSelectedMonth] = React.useState<string>("");
  const [selectedYear, setSelectedYear] = React.useState<string>("");

  // Validation / Erreurs de saisie
  const [error, setError] = React.useState<string>("");

  // État du résultat calculé
  const [resultType, setResultType] = React.useState<"eligible" | "temporary" | "blocked">("eligible");
  const [resultMessage, setResultMessage] = React.useState<string>("");
  const [blockedMessages, setBlockedMessages] = React.useState<string[]>([]);
  const [nextPossibleDate, setNextPossibleDate] = React.useState<string>("");

  // Options du sélecteur
  const dayOptions = Array.from({ length: 31 }, (_, i) => {
    const val = String(i + 1).padStart(2, "0");
    return { value: val, label: val };
  });
  
  const monthOptions = [
    { value: "0", label: "Janvier" },
    { value: "1", label: "Février" },
    { value: "2", label: "Mars" },
    { value: "3", label: "Avril" },
    { value: "4", label: "Mai" },
    { value: "5", label: "Juin" },
    { value: "6", label: "Juillet" },
    { value: "7", label: "Août" },
    { value: "8", label: "Septembre" },
    { value: "9", label: "Octobre" },
    { value: "10", label: "Novembre" },
    { value: "11", label: "Décembre" },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const val = String(currentYear - i);
    return { value: val, label: val };
  });

  // Réinitialiser le test
  const resetTest = () => {
    setCurrentStep("intro");
    setAge("");
    setWeight("");
    setGender("");
    setHasGivenBefore(null);
    setSelectedDay("");
    setSelectedMonth("");
    setSelectedYear("");
    setError("");
    setBlockedMessages([]);
  };

  // Gestion de la progression du questionnaire
  const handleStart = () => {
    setCurrentStep("age");
    setError("");
  };

  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      setError("Veuillez saisir un âge valide.");
      return;
    }
    setError("");
    setCurrentStep("weight");
  };

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWeight = parseInt(weight, 10);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      setError("Veuillez saisir un poids valide.");
      return;
    }
    setError("");
    setCurrentStep("gender");
  };

  const handleGenderSelect = (selectedGender: "homme" | "femme") => {
    setGender(selectedGender);
    setError("");
    setCurrentStep("lastDonation");
  };

  const handleHasGivenSelect = (given: boolean) => {
    setHasGivenBefore(given);
    if (!given) {
      // Si aucun don antérieur, le test se termine directement en succès
      calculateResult(given, null);
    }
  };

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay || !selectedMonth || !selectedYear) {
      setError("Veuillez renseigner le jour, le mois et l'année de votre dernier don.");
      return;
    }

    // Valider si la date construite est valide (ex: éviter le 31 Février)
    const dayNum = parseInt(selectedDay, 10);
    const monthNum = parseInt(selectedMonth, 10);
    const yearNum = parseInt(selectedYear, 10);

    const testDate = new Date(yearNum, monthNum, dayNum);
    if (
      testDate.getFullYear() !== yearNum ||
      testDate.getMonth() !== monthNum ||
      testDate.getDate() !== dayNum
    ) {
      setError("La date saisie est invalide.");
      return;
    }

    // Empêcher les dates futures
    const today = new Date();
    if (testDate > today) {
      setError("La date du dernier don ne peut pas être dans le futur.");
      return;
    }

    setError("");
    calculateResult(true, testDate);
  };

  // Calcul logique selon les règles métier
  const calculateResult = (userHasGivenBefore: boolean, lastDonationDateObj: Date | null) => {
    const parsedAge = parseInt(age, 10);
    const parsedWeight = parseInt(weight, 10);
    
    const errorsList: string[] = [];

    // 1. Validation de l'âge
    if (parsedAge < 18 || parsedAge > 65) {
      errorsList.push("Pour donner dans le cadre de ce simulateur, il faut avoir entre 18 et 65 ans révolus.");
    }

    // 2. Validation du poids
    if (parsedWeight < 50) {
      errorsList.push("Le poids minimum requis est de 50 kg.");
    }

    // Si on a des critères bloquants (âge et/ou poids), on affiche les deux d'un coup
    if (errorsList.length > 0) {
      setResultType("blocked");
      setBlockedMessages(errorsList);
      setCurrentStep("result");
      return;
    }

    // 3. Si pas de don antérieur, éligible
    if (!userHasGivenBefore || !lastDonationDateObj) {
      setResultType("eligible");
      setCurrentStep("result");
      return;
    }

    // 4. Calcul du délai réglementaire
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDonationDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Délai requis : Homme = 3 mois (~90 jours), Femme = 4 mois (~120 jours)
    const requiredDays = gender === "homme" ? 90 : 120;

    if (diffDays < requiredDays) {
      // Calcul de la prochaine date possible
      const nextDate = new Date(lastDonationDateObj);
      nextDate.setDate(nextDate.getDate() + requiredDays);
      
      // Formater la date en français
      const formattedDate = nextDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setResultType("temporary");
      setNextPossibleDate(formattedDate);
      setResultMessage(
        `Le délai réglementaire depuis votre dernier don (${
          gender === "homme" ? "3 mois" : "4 mois"
        } requis) n'est pas encore écoulé.`
      );
      setCurrentStep("result");
    } else {
      setResultType("eligible");
      setCurrentStep("result");
    }
  };

  // Obtenir le numéro de l'étape
  const getStepNumber = () => {
    switch (currentStep) {
      case "age": return 1;
      case "weight": return 2;
      case "gender": return 3;
      case "lastDonation": return 4;
      default: return 0;
    }
  };

  // Calcul du pourcentage de progression
  const getProgressPercentage = () => {
    const step = getStepNumber();
    return step ? (step / 4) * 100 : 0;
  };

  // États d'activation "is dirty" des boutons de soumission
  const isAgeValid = age.trim().length > 0 && parseInt(age, 10) > 0;
  const isWeightValid = weight.trim().length > 0 && parseInt(weight, 10) > 0;
  const isDateSelectorDirty = selectedDay !== "" && selectedMonth !== "" && selectedYear !== "";

  return (
    <section id="eligibilite" className="py-16 sm:py-24 md:py-32 bg-white border-t border-hemora-border/60">
      <Container size="narrow">
        <div className="space-y-12">
          
          {/* EN-TÊTE DE LA SECTION */}
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
              Éligibilité
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.12]">
              Voyons si <span className="italic font-serif">vous pouvez donner.</span>
            </h2>
            <p className="text-hemora-muted text-base sm:text-lg max-w-xl mx-auto">
              Quelques critères simples permettent d’avoir une première indication avant votre passage en centre.
            </p>
          </div>

          {/* ESPACE FORMULAIRE / INTERACTIF SOBRE */}
          <div 
            className="border border-hemora-border rounded-3xl p-6 sm:p-10 md:p-12 bg-hemora-bg bg-grain min-h-[300px] flex flex-col justify-center transition-all duration-300 relative overflow-visible"
            aria-live="polite"
          >
            
            {/* ÉTAPE D'ACCUEIL : AFFICHAGE DES CRITÈRES GENERAUX */}
            {currentStep === "intro" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Ligne des 3 critères épurés en deux lignes uniformes et avec paddings symétriques sur mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-hemora-border/80">
                  
                  {/* Critère 1 : Age */}
                  <div className="pb-5 sm:pb-0 sm:px-4 text-center sm:text-left space-y-1">
                    <p className="font-serif text-2xl sm:text-3xl font-normal text-hemora-text leading-tight">
                      18 à 65<br />ans
                    </p>
                    <p className="text-xs font-medium text-hemora-muted">
                      Âge requis
                    </p>
                  </div>

                  {/* Critère 2 : Poids */}
                  <div className="py-5 sm:py-0 sm:px-6 text-center sm:text-left space-y-1">
                    <p className="font-serif text-2xl sm:text-3xl font-normal text-hemora-text leading-tight">
                      50 kg<br />minimum
                    </p>
                    <p className="text-xs font-medium text-hemora-muted">
                      Poids requis
                    </p>
                  </div>

                  {/* Critère 3 : Délai */}
                  <div className="pt-5 sm:pt-0 sm:px-6 text-center sm:text-left space-y-1">
                    <p className="font-serif text-2xl sm:text-3xl font-normal text-hemora-text leading-tight">
                      3 ou 4<br />mois
                    </p>
                    <p className="text-xs font-medium text-hemora-muted">
                      Depuis votre dernier don
                    </p>
                  </div>

                </div>

                <div className="pt-4 flex justify-center">
                  <Button
                    variant="primary"
                    className="h-[50px] px-8"
                    onClick={handleStart}
                  >
                    Vérifier mon éligibilité
                  </Button>
                </div>
              </div>
            )}

            {/* ÉTAPE DE QUESTIONNAIRE INTERACTIF */}
            {currentStep !== "intro" && currentStep !== "result" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                {/* Barre de progression fine et discrète */}
                <div className="w-full h-1 bg-hemora-border rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-hemora-red transition-all duration-300 rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>

                {/* En-tête de progression fine */}
                <div className="flex items-center justify-between pb-3 border-b border-hemora-border/70">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === "age") setCurrentStep("intro");
                      if (currentStep === "weight") setCurrentStep("age");
                      if (currentStep === "gender") setCurrentStep("weight");
                      if (currentStep === "lastDonation") setCurrentStep("gender");
                      setError("");
                    }}
                    className="text-xs font-medium text-hemora-muted hover:text-hemora-text flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Retour</span>
                  </button>
                  <span className="text-xs font-mono font-medium text-hemora-muted">
                    Question {getStepNumber()} sur 4
                  </span>
                </div>

                {/* Question 1 : Âge */}
                {currentStep === "age" && (
                  <form onSubmit={handleAgeSubmit} className="space-y-5">
                    <label htmlFor="input-age" className="block font-serif text-lg sm:text-xl text-hemora-text">
                      Quel âge avez-vous ?
                    </label>
                    <div className="space-y-4">
                      <div className="relative w-full">
                        <input
                          id="input-age"
                          type="number"
                          min="1"
                          max="120"
                          placeholder="Ex: 28"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="bg-white border border-hemora-border rounded-[16px] pl-5 pr-16 h-[60px] focus:outline-none focus:border-hemora-red focus:ring-1 focus:ring-hemora-red/35 text-lg sm:text-xl font-medium text-hemora-text w-full placeholder-stone-400"
                          required
                          autoFocus
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-hemora-muted select-none">
                          ans
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          className="h-[50px] px-8 w-full sm:w-auto"
                          disabled={!isAgeValid}
                        >
                          Continuer
                        </Button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Question 2 : Poids */}
                {currentStep === "weight" && (
                  <form onSubmit={handleWeightSubmit} className="space-y-5">
                    <label htmlFor="input-weight" className="block font-serif text-lg sm:text-xl text-hemora-text">
                      Combien de kilogrammes pesez-vous ?
                    </label>
                    <div className="space-y-4">
                      <div className="relative w-full">
                        <input
                          id="input-weight"
                          type="number"
                          min="10"
                          max="250"
                          placeholder="Ex: 65"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="bg-white border border-hemora-border rounded-[16px] pl-5 pr-16 h-[60px] focus:outline-none focus:border-hemora-red focus:ring-1 focus:ring-hemora-red/35 text-lg sm:text-xl font-medium text-hemora-text w-full placeholder-stone-400"
                          required
                          autoFocus
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-hemora-muted select-none">
                          kg
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          className="h-[50px] px-8 w-full sm:w-auto"
                          disabled={!isWeightValid}
                        >
                          Continuer
                        </Button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Question 3 : Sexe biologique */}
                {currentStep === "gender" && (
                  <div className="space-y-4">
                    <span className="block font-serif text-lg sm:text-xl text-hemora-text">
                      Pour calculer le délai depuis votre dernier don, indiquez :
                    </span>
                    <p className="text-xs text-hemora-muted leading-relaxed max-w-md">
                      Le délai utilisé dans ce simulateur est de 3 mois pour un homme et 4 mois pour une femme.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        variant="secondary"
                        className="h-[50px] px-6 w-full sm:w-auto hover:bg-hemora-red/5 hover:text-hemora-red hover:border-hemora-red/30"
                        onClick={() => handleGenderSelect("homme")}
                      >
                        Homme
                      </Button>
                      <Button
                        variant="secondary"
                        className="h-[50px] px-6 w-full sm:w-auto hover:bg-hemora-red/5 hover:text-hemora-red hover:border-hemora-red/30"
                        onClick={() => handleGenderSelect("femme")}
                      >
                        Femme
                      </Button>
                    </div>
                  </div>
                )}

                {/* Question 4 : Dernier don */}
                {currentStep === "lastDonation" && (
                  <div className="space-y-4">
                    {hasGivenBefore === null ? (
                      <div className="space-y-4">
                        <span className="block font-serif text-lg sm:text-xl text-hemora-text">
                          Avez-vous déjà donné votre sang ?
                        </span>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            variant="secondary"
                            className="h-[50px] px-6 w-full sm:w-auto hover:bg-hemora-red/5 hover:text-hemora-red hover:border-hemora-red/30"
                            onClick={() => handleHasGivenSelect(true)}
                          >
                            Oui
                          </Button>
                          <Button
                            variant="secondary"
                            className="h-[50px] px-6 w-full sm:w-auto hover:bg-hemora-red/5 hover:text-hemora-red hover:border-hemora-red/30"
                            onClick={() => handleHasGivenSelect(false)}
                          >
                            Non, jamais
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleDateSubmit} className="space-y-5 animate-in fade-in duration-200">
                        <label className="block font-serif text-lg sm:text-xl text-hemora-text">
                          À quelle date a eu lieu votre dernier don ?
                        </label>
                        <div className="space-y-4">
                          
                          {/* SÉLECTEURS TRIPLE HAUT DE GAMME RADIX-LIKE */}
                          <div className="grid grid-cols-3 gap-3 relative z-30">
                            <CustomDropdown
                              label="Jour"
                              value={selectedDay}
                              options={dayOptions}
                              onChange={setSelectedDay}
                            />
                            <CustomDropdown
                              label="Mois"
                              value={selectedMonth}
                              options={monthOptions}
                              onChange={setSelectedMonth}
                            />
                            <CustomDropdown
                              label="Année"
                              value={selectedYear}
                              options={yearOptions}
                              onChange={setSelectedYear}
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 justify-end relative z-10 pt-2">
                            <Button
                              type="button"
                              variant="secondary"
                              className="h-[50px] px-6 w-full sm:w-auto order-2 sm:order-1"
                              onClick={() => {
                                setHasGivenBefore(null);
                                setSelectedDay("");
                                setSelectedMonth("");
                                setSelectedYear("");
                                setError("");
                              }}
                            >
                              Retour
                            </Button>
                            <Button 
                              type="submit" 
                              variant="primary" 
                              className="h-[50px] px-8 w-full sm:w-auto order-1 sm:order-2"
                              disabled={!isDateSelectorDirty}
                            >
                              Calculer
                            </Button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* Message d'erreur s'il y a lieu */}
                {error && (
                  <p className="text-xs font-semibold text-hemora-red animate-pulse" role="alert">
                    {error}
                  </p>
                )}
              </div>
            )}

            {/* ÉTAPE 3 : AFFICHAGE DU RÉSULTAT */}
            {currentStep === "result" && (
              <div className="space-y-8 animate-in zoom-in-95 duration-300">
                
                {/* 1. ÉLIGIBLE */}
                {resultType === "eligible" && (
                  <div className="space-y-6 text-center sm:text-left animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-hemora-soft-red border border-hemora-red/30 text-hemora-red flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-2xl text-hemora-text font-normal">
                          Vous remplissez les principaux critères.
                        </h3>
                        <p className="text-sm font-medium text-hemora-muted">
                          D’après vos réponses, aucun des critères simplifiés utilisés ici ne vous empêche de donner aujourd’hui.
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                      <Button
                        variant="primary"
                        className="h-[50px] px-8 bg-hemora-red hover:bg-hemora-red-hover text-white"
                        onClick={() => {
                          const el = document.querySelector("#centres");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Trouver un centre près de moi
                      </Button>
                      <Button
                        variant="secondary"
                        className="h-[50px] px-6 border-hemora-border hover:bg-hemora-surface hover:text-hemora-text text-hemora-muted"
                        onClick={resetTest}
                      >
                        Recommencer le test
                      </Button>
                    </div>
                  </div>
                )}

                {/* 2. TEMPORAIREMENT NON ÉLIGIBLE */}
                {resultType === "temporary" && (
                  <div className="space-y-6 text-center sm:text-left animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-white border border-hemora-border text-hemora-red flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-serif text-2xl text-hemora-text font-normal">
                          Encore un peu de patience.
                        </h3>
                        <p className="text-sm font-semibold text-hemora-text bg-white inline-block px-3 py-1.5 rounded-xl border border-hemora-border">
                          Vous pourrez probablement donner à partir du {nextPossibleDate}.
                        </p>
                        <p className="text-xs text-hemora-muted leading-relaxed">
                          {resultMessage}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-center sm:justify-start">
                      <Button
                        variant="secondary"
                        className="h-[50px] px-6 border-hemora-border hover:bg-hemora-surface hover:text-hemora-text text-hemora-muted"
                        onClick={resetTest}
                      >
                        Recommencer le test
                      </Button>
                    </div>
                  </div>
                )}

                {/* 3. CRITÈRE BLOQUANT */}
                {resultType === "blocked" && (
                  <div className="space-y-6 text-center sm:text-left animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                      <div className="w-12 h-12 rounded-full bg-white border border-hemora-border text-hemora-red flex items-center justify-center shrink-0 mt-1">
                        <XCircle className="w-6 h-6" />
                      </div>
                      <div className="space-y-3 flex-1">
                        <h3 className="font-serif text-2xl text-hemora-text font-normal">
                          {blockedMessages.length > 1 
                            ? "Certains critères ne sont pas remplis." 
                            : "Ce critère n’est pas rempli."
                          }
                        </h3>
                        <div className="space-y-2.5">
                          {blockedMessages.map((msg, idx) => (
                            <p 
                              key={idx} 
                              className="text-sm font-semibold text-hemora-text bg-white border border-hemora-border px-4 py-3 rounded-xl block"
                            >
                              {msg}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-center sm:justify-start">
                      <Button
                        variant="secondary"
                        className="h-[50px] px-6 border-hemora-border hover:bg-hemora-surface hover:text-hemora-text text-hemora-muted"
                        onClick={resetTest}
                      >
                        Recommencer le test
                      </Button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* DISCLAIMER ACCESSIBLE */}
          <div className="p-5 rounded-2xl border border-hemora-border/60 bg-stone-50/60 text-center max-w-xl mx-auto">
            <p className="text-xs text-hemora-muted leading-relaxed">
              <strong>À savoir :</strong> seul un entretien médical avec un professionnel de santé peut confirmer définitivement votre aptitude au don.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}
