// Type declarations for paraglide generated files
declare module "@/paraglide/messages" {
  // LocalizedString that can be used as a string
  type LocalizedString = string;

  // Message functions type with optional params
  type MessageFunction<P = void> = P extends void
    ? (params?: Record<string, never>, options?: { locale?: string }) => LocalizedString
    : (params: P, options?: { locale?: string }) => LocalizedString;

  // Export all message functions as m namespace
  export const m: Record<string, MessageFunction>;
}

declare module "@/paraglide/runtime" {
  // LocalizedString is just a string
  type LocalizedString = string;

  export function getLocale(): string;
  export function setLocale(locale: string): void;
  export function getTextDirection(): "ltr" | "rtl";
  export const locale: string;
  export const locales: string[];
  export const baseLocale: string;
}

declare module "@/paraglide/server" {
  export function getLocale(request: Request): string;
}

// Allow importing individual message files
declare module "@/paraglide/messages/*.js" {
  const message: (
    params?: Record<string, unknown>,
    options?: { locale?: string }
  ) => string;
  export default message;
}
