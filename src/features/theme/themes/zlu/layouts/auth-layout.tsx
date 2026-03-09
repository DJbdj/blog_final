import { ArrowLeft } from "lucide-react";
import type { AuthLayoutProps } from "@/features/theme/contract/layouts";

export function AuthLayout({ onBack, children }: AuthLayoutProps) {
  return (
    <div className="theme-zlu min-h-screen">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="zlu-button zlu-button-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
