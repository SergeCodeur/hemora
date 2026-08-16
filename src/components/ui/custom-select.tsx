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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  // Fermeture touche Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Bouton déclencheur */}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || labelPrefix || placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-2 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hemora-red/30 ${
          variant === "country"
            ? "px-2 py-1 text-sm font-semibold h-[36px] w-full bg-transparent border-none hover:text-hemora-red"
            : variant === "filter"
            ? `px-3 py-1.5 text-xs h-[34px] bg-white border border-hemora-border rounded-xl hover:border-stone-400 ${
                isOpen ? "border-hemora-red shadow-xs ring-1 ring-hemora-red/20" : ""
              }`
            : `px-3.5 py-2 text-sm h-11 bg-white border border-hemora-border rounded-xl hover:border-stone-400 ${
                isOpen ? "border-hemora-red shadow-xs ring-1 ring-hemora-red/20" : ""
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

      {/* Menu déroulant sur mesure */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute left-0 z-50 mt-1 min-w-[200px] max-w-[280px] bg-white rounded-2xl border border-hemora-border shadow-xl overflow-hidden py-1.5 backdrop-blur-md ${
              variant === "country" ? "w-full min-w-[220px]" : ""
            }`}
          >
            <ul
              ref={listboxRef}
              role="listbox"
              tabIndex={-1}
              className="max-h-60 overflow-y-auto overflow-x-hidden divide-y divide-stone-100/80 focus:outline-none"
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    className={`px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer transition-colors duration-150 ${
                      isSelected
                        ? "bg-hemora-soft-red/40 text-hemora-red font-semibold"
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
