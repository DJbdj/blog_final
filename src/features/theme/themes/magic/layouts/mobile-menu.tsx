import { Link } from "@tanstack/react-router";
import { XIcon, UserIcon } from "lucide-react";
import { UserInfo } from "@/features/theme/contract/layouts";

interface MobileMenuProps {
  navOptions: Array<{ id: string; to: string; label: string }>;
  isOpen: boolean;
  onClose: () => void;
  user?: UserInfo | null;
  logout: () => void;
}

export function MobileMenu({
  navOptions,
  isOpen,
  onClose,
  user,
  logout,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div className="magic-mobile-overlay" />
      </div>

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="magic-mobile-menu w-64 h-full shadow-xl">
          <div className="p-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              aria-label="关闭菜单"
            >
              <XIcon size={20} />
            </button>

            {/* Logo */}
            <div className="mb-8 mt-4 text-center">
              <h2 className="text-2xl font-bold text-primary">Magic</h2>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 mb-8">
              {navOptions.map((option) => (
                <Link
                  key={option.id}
                  to={option.to}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  {option.label}
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className="border-t border-border pt-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <UserIcon size={16} />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-2 px-4 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    退出登录
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="block w-full py-2 px-4 rounded-lg magic-button text-center"
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="block w-full py-2 px-4 rounded-lg magic-button magic-button-outline text-center"
                  >
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
