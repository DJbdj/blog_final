import type { UserLayoutProps } from "@/features/theme/contract/layouts";
import { Navigate } from "@tanstack/react-router";
import { User, Settings, Bell, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function UserLayout({
  isAuthenticated,
  children,
}: UserLayoutProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const menuItems = [
    { id: "profile", label: "个人资料", icon: User, to: "/profile" },
    { id: "settings", label: "设置", icon: Settings, to: "/profile" },
    { id: "notifications", label: "通知", icon: Bell, to: "/profile" },
    { id: "security", label: "安全", icon: Shield, to: "/profile" },
  ];

  return (
    <div className="klu-theme min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-8">
              <nav className="klu-card overflow-hidden">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 text-[var(--klu-text-secondary)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-tertiary)] transition-all ${
                      index !== menuItems.length - 1
                        ? "border-b border-[var(--klu-border-primary)]"
                        : ""
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
