import type { UserLayoutProps } from "@/features/theme/contract/layouts";

export function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="theme-zlu min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
