"use client";

import { Languages, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getLocale, setLocale } from "@/paraglide/runtime";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = getLocale();

  const handleLanguageChange = (locale: "zh" | "en") => {
    setLocale(locale);
    setIsOpen(false);
  };

  const languageLabels: Record<string, string> = {
    zh: "中文",
    en: "EN",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)] hover:bg-[var(--zlu-bg-tertiary)] transition-all border border-transparent hover:border-[var(--zlu-border)]"
        aria-label="切换语言"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">{languageLabels[currentLocale]}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-24 bg-[var(--zlu-bg-secondary)] border border-[var(--zlu-border)] rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          <button
            onClick={() => handleLanguageChange("zh")}
            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
              currentLocale === "zh"
                ? "text-[var(--zlu-primary)] bg-[var(--zlu-primary)]/10 font-medium"
                : "text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)] hover:bg-[var(--zlu-bg-tertiary)]"
            }`}
          >
            中文
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
              currentLocale === "en"
                ? "text-[var(--zlu-primary)] bg-[var(--zlu-primary)]/10 font-medium"
                : "text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)] hover:bg-[var(--zlu-bg-tertiary)]"
            }`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
