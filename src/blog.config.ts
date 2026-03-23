import { clientEnv } from "@/lib/env/client.env";

const env = clientEnv();

export const blogConfig = {
  title: env.VITE_BLOG_TITLE || "Flare Stack Blog",
  name: env.VITE_BLOG_NAME || "blog",
  author: env.VITE_BLOG_AUTHOR || "作者",
  description:
    env.VITE_BLOG_DESCRIPTION || "这是博客的描述，写一段话介绍一下这个博客，",
  social: [
    { platform: "github" as const, url: env.VITE_BLOG_GITHUB || "https://github.com/example" },
    { platform: "email" as const, url: env.VITE_BLOG_EMAIL || "demo@example.com" },
  ],
  icons: {
    faviconSvg: "/favicon.svg",
    faviconIco: "/favicon.ico",
    favicon96: "/favicon-96x96.png",
    appleTouchIcon: "/apple-touch-icon.png",
    webApp192: "/web-app-manifest-192x192.png",
    webApp512: "/web-app-manifest-512x512.png",
  },
  theme: {
    default: {
      navBarName: "导航栏名称",
      background: {
        homeImage: env.VITE_DEFAULT_HOME_IMAGE || "", // R2 path or external URL (hero on homepage)
        globalImage: env.VITE_DEFAULT_GLOBAL_IMAGE || "", // R2 path or external URL (all other pages + scroll target)
        light: { opacity: env.VITE_DEFAULT_LIGHT_OPACITY ?? 0.15 }, // opacity in light mode
        dark: { opacity: env.VITE_DEFAULT_DARK_OPACITY ?? 0.1 }, // opacity in dark mode
        backdropBlur: env.VITE_DEFAULT_BACKDROP_BLUR ?? 8, // px, Gaussian blur
        transitionDuration: env.VITE_DEFAULT_TRANSITION_DURATION ?? 600, // ms, route crossfade (0-3000)
      },
    },
    fuwari: {
      homeBg: env.VITE_FUWARI_HOME_BG || "/images/home-bg.webp",
      avatar: env.VITE_FUWARI_AVATAR || "/images/avatar.png",
      primaryHue: 250,
    },
    zlu: {
      avatar: env.VITE_ZLU_AVATAR || "/images/avatar.png",
      homeImage: env.VITE_ZLU_HOME_IMAGE || "/images/home-bg.webp",
    },
  },
};

export type BlogConfig = typeof blogConfig;
