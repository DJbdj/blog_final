"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { blogConfig } from "@/blog.config";
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
