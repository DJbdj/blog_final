import type { PublicLayoutProps } from "@/features/theme/contract/layouts";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  FileText,
  Users,
  Tags,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Github,
  Mail,
} from "lucide-react";
import { blogConfig } from "@/blog.config";

interface SidebarProps {
  navOptions: Array<{ label: string; to: string; id: string }>;
  user?: { name: string; image?: string | null; role?: string | null };
  isSessionLoading: boolean;
  logout: () => Promise<void>;
  isMobile?: boolean;
  onClose?: () => void;
}

function Sidebar({
  navOptions,
  user,
  isSessionLoading,
  logout,
  isMobile,
  onClose,
}: SidebarProps) {
  const iconMap: Record<string, React.ReactNode> = {
    home: <Home size={18} />,
    posts: <FileText size={18} />,
    tags: <Tags size={18} />,
    friends: <Users size={18} />,
    search: <Search size={18} />,
  };

  const navItems = navOptions.map((opt) => ({
    ...opt,
    icon: iconMap[opt.id] || <FileText size={18} />,
  }));

  return (
    <aside
      className={`${
        isMobile
          ? "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          : "hidden lg:block w-[var(--klu-sidebar-width)] shrink-0"
      }`}
    >
      <div
        className={`${
          isMobile
            ? "absolute right-0 top-0 h-full w-4/5 max-w-xs bg-[var(--klu-bg-primary)] shadow-2xl overflow-y-auto"
            : "fixed top-0 left-0 h-screen w-[var(--klu-sidebar-width)] border-r border-[var(--klu-border-primary)] overflow-y-auto"
        }`}
      >
        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--klu-bg-tertiary)] transition-colors"
            aria-label="关闭菜单"
          >
            <X size={20} />
          </button>
        )}

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 px-2 py-4 mb-6 hover:opacity-80 transition-opacity"
          onClick={isMobile ? onClose : undefined}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--klu-accent-primary)] to-[var(--klu-accent-secondary)] flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {blogConfig.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-[var(--klu-text-primary)]">
              {blogConfig.name}
            </span>
            <span className="text-xs text-[var(--klu-text-muted)]">
              {blogConfig.author}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1 mb-8">
          {navItems.map((item, index) => (
            <>
              <Link
                key={item.id}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--klu-text-secondary)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-tertiary)] transition-all group"
                activeProps={{
                  className:
                    "!text-[var(--klu-accent-primary)] !bg-[var(--klu-accent-primary)]/10",
                }}
                onClick={isMobile ? onClose : undefined}
              >
                <span className="text-[var(--klu-text-muted)] group-hover:text-[var(--klu-text-primary)] transition-colors">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
              {index < navItems.length - 1 && (
                <div className="h-px bg-[var(--klu-border-secondary)] mx-3" />
              )}
            </>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-[var(--klu-border-primary)] pt-4 mt-4">
          {isSessionLoading ? (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-9 h-9 rounded-full klu-skeleton" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 klu-skeleton" />
                <div className="h-2 w-14 klu-skeleton" />
              </div>
            </div>
          ) : user ? (
            <div className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--klu-bg-tertiary)] transition-colors"
                onClick={isMobile ? onClose : undefined}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--klu-border-primary)]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[var(--klu-accent-primary)]/20 flex items-center justify-center">
                    <User size={18} className="text-[var(--klu-accent-primary)]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[var(--klu-text-primary)] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[var(--klu-text-muted)]">
                    {user.role === "admin" ? "管理员" : "用户"}
                  </p>
                </div>
              </Link>
              <button
                onClick={async () => {
                  await logout();
                  onClose?.();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--klu-text-secondary)] hover:text-[var(--klu-accent-danger)] hover:bg-[var(--klu-accent-danger)]/10 transition-all"
              >
                <LogOut size={18} />
                <span className="font-medium text-sm">退出登录</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--klu-text-secondary)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-tertiary)] transition-all"
              onClick={isMobile ? onClose : undefined}
            >
              <User size={18} />
              <span className="font-medium">登录</span>
            </Link>
          )}
        </div>

        {/* Social Links - Desktop only */}
        {!isMobile && (
          <div className="mt-auto pt-8 pb-4">
            <div className="flex items-center gap-2 px-3">
              {blogConfig.social.github && (
                <a
                  href={blogConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-tertiary)] transition-all"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {blogConfig.social.email && (
                <a
                  href={`mailto:${blogConfig.social.email}`}
                  className="p-2 rounded-lg text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-tertiary)] transition-all"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export function PublicLayout({
  children,
  navOptions,
  user,
  isSessionLoading,
  logout,
}: PublicLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="klu-theme min-h-screen">
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <Sidebar
          navOptions={navOptions}
          user={user}
          isSessionLoading={isSessionLoading}
          logout={logout}
          isMobile
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[var(--klu-bg-primary)]/80 backdrop-blur-lg border-b border-[var(--klu-border-primary)]">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--klu-accent-primary)] to-[var(--klu-accent-secondary)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {blogConfig.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-semibold text-[var(--klu-text-primary)]">
              {blogConfig.name}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/search"
              className="p-2 rounded-lg text-[var(--klu-text-secondary)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-tertiary)] transition-all"
              aria-label="搜索"
            >
              <Search size={20} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg text-[var(--klu-text-secondary)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-tertiary)] transition-all"
              aria-label="打开菜单"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex max-w-[1400px] mx-auto">
        {/* Left Sidebar - Desktop */}
        <Sidebar
          navOptions={navOptions}
          user={user}
          isSessionLoading={isSessionLoading}
          logout={logout}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 lg:px-8 lg:py-8">
          <div className="max-w-3xl mx-auto xl:mx-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
