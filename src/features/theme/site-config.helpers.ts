import type { SiteConfig } from "@/features/config/site-config.schema";

// Note: __THEME_NAME__ is injected by vite.config.ts at build time
declare const __THEME_NAME__: string;

/**
 * Get theme preload images based on site config and current theme
 * Supports external URLs for background images
 */
export function getThemePreloadImages(siteConfig: SiteConfig): Array<string> {
  const themeName = (__THEME_NAME__ as "default" | "fuwari" | "zlu") || "default";

  switch (themeName) {
    case "fuwari":
      return siteConfig.theme?.fuwari?.homeBg
        ? [siteConfig.theme.fuwari.homeBg]
        : [];
    case "default":
      return [
        siteConfig.theme?.default?.background?.homeImage,
        siteConfig.theme?.default?.background?.globalImage,
      ].filter((image): image is string => Boolean(image));
    case "zlu":
      // ZLu theme uses environment variables for preload images
      return [];
    default:
      themeName satisfies never;
      return [];
  }
}
