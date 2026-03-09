"use client";

import { Link } from "@tanstack/react-router";
import { blogConfig } from "@/blog.config";
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";

interface MobileMenuProps {
  navOptions: Array<{ label: string; to: string; id: string }>;
  isOpen: boolean;
  onClose: () => void;
  user?: PublicLayoutProps["user"];
  logout?: () => Promise<void>;
}

export function MobileMenu({ navOptions, isOpen, onClose, user, logout }: MobileMenuProps) {
  return (
    <div className={`zlu-mobile-menu ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="zlu-mobile-overlay" />
      <div className="zlu-mobile-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="zlu-logo" onClick={onClose}>
            {blogConfig.title}
          </Link>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="关闭菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navOptions.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="zlu-nav-item"
              onClick={onClose}
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-gray-700">
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-4 px-2">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {user.name[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  {user.role && (
                    <p className="text-xs text-gray-400">{user.role === "admin" ? "管理员" : "用户"}</p>
                  )}
                </div>
              </div>
              <Link to="/admin" className="zlu-button zlu-button-primary w-full mb-2" onClick={onClose}>
                控制台
              </Link>
              {logout && (
                <button
                  onClick={() => logout().then(onClose)}
                  className="zlu-button zlu-button-secondary w-full"
                >
                  退出登录
                </button>
              )}
            </>
          ) : (
            <Link to="/login" className="zlu-button zlu-button-primary w-full" onClick={onClose}>
              登录
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
