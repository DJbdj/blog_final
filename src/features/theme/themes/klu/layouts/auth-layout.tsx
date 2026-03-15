import type { AuthLayoutProps } from "@/features/theme/contract/layouts";
import { ArrowLeft, Sparkles } from "lucide-react";
import { blogConfig } from "@/blog.config";

export function AuthLayout({ onBack, children }: AuthLayoutProps) {
  return (
    <div className="klu-theme min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--klu-accent-primary)]/20 to-[var(--klu-accent-secondary)]/10 items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--klu-accent-primary)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--klu-accent-secondary)]/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--klu-accent-primary)] to-[var(--klu-accent-secondary)] flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--klu-text-primary)] mb-3">
            {blogConfig.title}
          </h1>
          <p className="text-[var(--klu-text-secondary)] max-w-sm mx-auto">
            {blogConfig.description}
          </p>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--klu-text-secondary)] hover:text-[var(--klu-text-primary)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回</span>
          </button>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--klu-accent-primary)] to-[var(--klu-accent-secondary)] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--klu-text-primary)]">
                {blogConfig.title}
              </h1>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
