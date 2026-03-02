import { Link, useLocation } from "@tanstack/react-router";
import { Search, UserIcon } from "lucide-react";
import { useState } from "react";
import type { NavOption, UserInfo } from "@/features/theme/contract/layouts";
import { Skeleton } from "@/components/ui/skeleton";

interface NavbarProps {
  navOptions: Array<NavOption>;
  onMenuClick: () => void;
  user?: UserInfo;
  isLoading?: boolean;
}

export function Navbar({
  onMenuClick,
  user,
  navOptions,
  isLoading,
}: NavbarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header
        className="magic-navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      >
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-0 flex items-center justify-between h-16">
          {/* Left: Brand */}
          <Link to="/" className="group">
            <h1 className="text-xl font-bold text-primary transition-colors">
              Magic
            </h1>
          </Link>

          {/* Center: Main Nav - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navOptions.map((option) => (
              <Link
                key={option.id}
                to={option.to}
                className={`magic-nav-link ${
                  isActive(option.to)
                    ? "active text-primary font-medium"
                    : ""
                }`}
              >
                {option.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="hidden sm:block p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              title="搜索 (Ctrl+K)"
            >
              <Search
                size={18}
                strokeWidth={2}
              />
            </Link>

            {/* Profile / Menu Toggle */}
            <div className="flex items-center gap-3 pl-3">
              <div className="hidden md:flex items-center">
                {isLoading ? (
                  <Skeleton className="w-8 h-8 rounded-full" />
                ) : user ? (
                  <Link
                    to="/profile"
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon
                        size={16}
                        className="text-primary"
                      />
                    )}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="magic-button magic-button-outline text-sm"
                  >
                    登录
                  </Link>
                )}
              </div>

              <button
                className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                onClick={onMenuClick}
                aria-label="打开菜单"
                type="button"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  );
}
