"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface CustomSelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface CustomSelectProps {
  id?: string;
  labelPrefix?: string;
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "default" | "filter" | "country";
  className?: string;
  ariaLabel?: string;
}

export function CustomSelect({
  id,
  labelPrefix,
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
  variant = "default",
  className = "",
  ariaLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const [placement, setPlacement] = React.useState<{
    alignRight: boolean;
    openUp: boolean;
    maxWidth: number;
  }>({ alignRight: false, openUp: false, maxWidth: 280 });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const selectedOption = options[selectedIndex];

  // Calcul dynamique de l'espace disponible à l'ouverture (évite tout overflow horizontal/vertical)
  React.useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Espace horizontal
      const spaceRight = viewportWidth - rect.left;
      const spaceLeft = rect.right;
      const neededWidth = Math.min(260, viewportWidth - 24);

      // Si l'espace à droite est insuffisant pour afficher le menu sans déborder
      const shouldAlignRight = spaceRight < 210 && spaceLeft >= spaceRight;

      // Espace vertical
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const shouldOpenUp = spaceBelow < 220 && spaceAbove > spaceBelow;

      setPlacement({
        alignRight: shouldAlignRight,
        openUp: shouldOpenUp,
        maxWidth: neededWidth,
      });

      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, selectedIndex]);

  // Défilement automatique vers l'élément focalisé
  React.useEffect(() => {
    if (isOpen && listboxRef.current && focusedIndex >= 0) {
      const activeElement = listboxRef.current.children[focusedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

  // Fermeture au clic à l'extérieur
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Gestion complète du clavier (Tabulation, Flèches, Entrée, Échap)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        // Permet au focus de circuler naturellement au prochain élément
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`relative inline-block ${className}`}
    >
      {/* Bouton déclencheur avec focus visible accessible */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? `${id || "custom-select"}-listbox` : undefined}
        aria-label={ariaLabel || labelPrefix || placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-2 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hemora-red focus-visible:ring-offset-1 ${
          variant === "country"
            ? "px-2 py-1 text-sm font-semibold h-[36px] w-full bg-transparent border-none hover:text-hemora-red rounded-lg"
            : variant === "filter"
            ? `px-3.5 py-1.5 text-xs h-[36px] bg-white border border-hemora-border rounded-xl hover:border-stone-400 ${
                isOpen ? "border-hemora-red ring-1 ring-hemora-red/30 shadow-2xs" : ""
              }`
            : `px-2.5 sm:px-4 py-2 text-xs sm:text-sm h-11 bg-white border border-hemora-border rounded-xl hover:border-stone-400 ${
                isOpen ? "border-hemora-red ring-1 ring-hemora-red/30 shadow-2xs" : ""
              }`
        }`}
      >
        <div className="flex items-center gap-1.5 truncate">
          {labelPrefix && (
            <span className="text-stone-400 text-xs font-normal shrink-0">
              {labelPrefix}
            </span>
          )}
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span className="text-hemora-text font-medium truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform duration-200 group-hover:text-hemora-text ${
            isOpen ? "rotate-180 text-hemora-red" : ""
          }`}
        />
      </button>

      {/* Menu déroulant avec positionnement adaptatif anti-débordement */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: placement.openUp ? 4 : -4, scale: 0.98 }}
            animate={{ opacity: 1, y: placement.openUp ? -4 : 4, scale: 1 }}
            exit={{ opacity: 0, y: placement.openUp ? 4 : -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              maxWidth: variant === "country" ? "100%" : `${placement.maxWidth}px`,
            }}
            className={`absolute z-50 bg-white rounded-2xl border border-hemora-border shadow-xl overflow-hidden p-1.5 backdrop-blur-md ${
              placement.openUp ? "bottom-full mb-1" : "top-full mt-1"
            } ${
              variant === "country"
                ? "w-full min-w-full left-0 right-0"
                : placement.alignRight
                ? "right-0 left-auto min-w-[160px]"
                : "left-0 right-auto min-w-[160px]"
            }`}
          >
            <ul
              ref={listboxRef}
              id={`${id || "custom-select"}-listbox`}
              role="listbox"
              tabIndex={-1}
              aria-activedescendant={
                focusedIndex >= 0 ? `option-${focusedIndex}` : undefined
              }
              className="max-h-60 overflow-y-auto overflow-x-hidden space-y-0.5 pr-1 focus:outline-none custom-scrollbar"
            >
              {options.map((option, idx) => {
                const isSelected = option.value === value;
                const isFocused = focusedIndex === idx;

                return (
                  <li
                    key={option.value}
                    id={`option-${idx}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`px-3 py-2 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer transition-all duration-100 ${
                      isSelected
                        ? "bg-hemora-soft-red/50 text-hemora-red font-semibold"
                        : isFocused
                        ? "bg-stone-100/90 text-hemora-text"
                        : "text-hemora-text hover:bg-stone-50 hover:text-hemora-red"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {option.icon && (
                        <span className="shrink-0 text-base">{option.icon}</span>
                      )}
                      <span className="truncate">{option.label}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-hemora-red shrink-0" />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
