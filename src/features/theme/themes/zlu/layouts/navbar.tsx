"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { blogConfig } from "@/blog.config";
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";
import { useTheme } from "@/components/common/theme-provider";
import { LanguageSwitcher } from "./language-switcher";

interface NavItem {
  label: string;
  to: string;
  id: string;
}

interface NavbarProps {
  navOptions: NavItem[];
  user?: PublicLayoutProps["user"];
  isLoading: boolean;
  onMenuClick: () => void;
}

export function Navbar({ navOptions, user, isLoading, onMenuClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { userTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeIcons = {
    light: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    dark: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    system: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  const themeLabels = {
    light: "浅色",
    dark: "深色",
    system: "系统",
  };

  const cycleTheme = () => {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const currentIndex = order.indexOf(userTheme as any);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  return (
    <header className={`zlu-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="zlu-navbar-inner">
        <Link to="/" className="zlu-logo">
          {blogConfig.title}
          {import.meta.env.DEV && <span>.dev</span>}
        </Link>

        <nav className="zlu-nav-links">
          {navOptions.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="zlu-nav-link"
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}

          {isLoading ? (
            <div className="w-8 h-8 zlu-skeleton rounded-full" />
          ) : user ? (
            <Link
              to="/admin"
              className="zlu-button zlu-button-primary"
            >
              控制台
            </Link>
          ) : (
            <Link
              to="/login"
              className="zlu-button zlu-button-primary"
            >
              登录
            </Link>
          )}

          {/* Theme Toggle Button */}
          <div className="relative">
            <button
              onClick={cycleTheme}
              className="zlu-button zlu-button-secondary"
              aria-label={`切换主题 (当前：${themeLabels[userTheme]})`}
              title={`当前主题：${themeLabels[userTheme]}`}
            >
              {themeIcons[userTheme]}
            </button>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          <button
            onClick={onMenuClick}
            className="zlu-button zlu-button-secondary md:hidden"
            aria-label="菜单"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
