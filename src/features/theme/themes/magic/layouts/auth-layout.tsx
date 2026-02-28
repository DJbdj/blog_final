import { ArrowLeft } from "lucide-react";
import type { AuthLayoutProps } from "@/features/theme/contract/layouts";

export function AuthLayout({ onBack, children }: AuthLayoutProps) {
  return (
    <div className="theme-magic min-h-screen w-full flex flex-col bg-background">
      <header className="h-16 flex items-center px-4 sm:px-6 border-b border-border">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          返回
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-sm animate-in fade-in duration-500">
          {children}
        </div>
      </main>

      <footer className="h-16" />
    </div>
  );
}
