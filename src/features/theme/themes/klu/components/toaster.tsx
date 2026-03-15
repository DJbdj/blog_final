import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--klu-bg-card)",
          border: "1px solid var(--klu-border-primary)",
          color: "var(--klu-text-primary)",
        },
      }}
    />
  );
}
