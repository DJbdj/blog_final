import { useState } from "react";
import { Footer } from "./footer";
import { MobileMenu } from "./mobile-menu";
import { Navbar } from "./navbar";
<<<<<<< HEAD
import type { PublicLayoutProps, UserInfo } from "@/features/theme/contract/layouts";
=======
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";
>>>>>>> 93bfe12d60f5976d9dd4a72b0639dad9d7ff5861

export function PublicLayout({
  children,
  navOptions,
  user,
  isSessionLoading,
  logout,
}: PublicLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="theme-magic min-h-screen flex flex-col bg-background">
      <Navbar
        navOptions={navOptions}
        onMenuClick={() => setIsMenuOpen(true)}
        user={user}
        isLoading={isSessionLoading}
      />
      <MobileMenu
        navOptions={navOptions}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        logout={logout}
      />
      <main className="flex-1">{children}</main>
      <Footer navOptions={navOptions} />
    </div>
  );
}
