import z from "zod";

const clientEnvSchema = z.object({
  VITE_UMAMI_WEBSITE_ID: z.string().optional(),
  VITE_TURNSTILE_SITE_KEY: z.string().optional(),
  VITE_BLOG_TITLE: z.string().optional(),
  VITE_BLOG_NAME: z.string().optional(),
  VITE_BLOG_AUTHOR: z.string().optional(),
  VITE_BLOG_DESCRIPTION: z.string().optional(),
  VITE_BLOG_GITHUB: z.string().optional(),
  VITE_BLOG_EMAIL: z.string().optional(),
  VITE_DEFAULT_HOME_IMAGE: z.string().optional(),
  VITE_DEFAULT_GLOBAL_IMAGE: z.string().optional(),
  VITE_DEFAULT_LIGHT_OPACITY: z.coerce.number().optional(),
  VITE_DEFAULT_DARK_OPACITY: z.coerce.number().optional(),
  VITE_DEFAULT_BACKDROP_BLUR: z.coerce.number().optional(),
  VITE_DEFAULT_TRANSITION_DURATION: z.coerce.number().optional(),
  VITE_FUWARI_HOME_BG: z.string().optional(),
  VITE_FUWARI_AVATAR: z.string().optional(),
  VITE_ZLU_AVATAR: z.string().optional(),
  VITE_ZLU_HOME_IMAGE: z.string().optional(),
});

export function clientEnv() {
  return clientEnvSchema.parse(import.meta.env);
}
