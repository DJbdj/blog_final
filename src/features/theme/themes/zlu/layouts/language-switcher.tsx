"use client";

import { Languages, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getLocale, setLocale } from "@/paraglide/runtime";

const LOCALES = [
  { code: "zh", label: "简体中文", display: "中文" },
  { code: "zh-TW", label: "繁體中文", display: "繁體" },
  { code: "en", label: "English", display: "EN" },
  { code: "ja", label: "日本語", display: "日本" },
] as const;

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = getLocale();
  const currentLabel = LOCALES.find((l) => l.code === currentLocale)?.display ?? "中文";

  const handleLanguageChange = (locale: string) => {
    setLocale(locale as typeof currentLocale);
    setIsOpen(false);
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
        aria-label="Switch language"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLabel}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-28 bg-[var(--zlu-bg-secondary)] border border-[var(--zlu-border)] rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          {LOCALES.map((locale) => (
            <button
              key={locale.code}
              onClick={() => handleLanguageChange(locale.code)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                currentLocale === locale.code
                  ? "text-[var(--zlu-primary)] bg-[var(--zlu-primary)]/10 font-medium"
                  : "text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)] hover:bg-[var(--zlu-bg-tertiary)]"
              }`}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
