import { z } from "zod";

export const SystemConfigSchema = z.object({
  email: z
    .object({
      apiKey: z.string().optional(),
      senderName: z.string().optional(),
      senderAddress: z.union([z.email(), z.literal("")]).optional(),
    })
    .optional(),
  site: z
    .object({
      title: z.string().optional(),
      author: z.string().optional(),
      description: z.string().optional(),
      social: z
        .object({
          github: z.string().optional(),
          email: z.string().optional(),
        })
        .optional(),
      theme: z
        .object({
          default: z
            .object({
              navBarName: z.string().optional(),
              background: z
                .object({
                  homeImage: z.string().optional(),
                  globalImage: z.string().optional(),
                  light: z
                    .object({
                      opacity: z.number().optional(),
                    })
                    .optional(),
                  dark: z
                    .object({
                      opacity: z.number().optional(),
                    })
                    .optional(),
                  backdropBlur: z.number().optional(),
                  transitionDuration: z.number().optional(),
                })
                .optional(),
            })
            .optional(),
          fuwari: z
            .object({
              homeBg: z.string().optional(),
              avatar: z.string().optional(),
              primaryHue: z.number().optional(),
            })
            .optional(),
          zlu: z
            .object({
              homeImage: z.string().optional(),
              avatar: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
});

export type SystemConfig = z.infer<typeof SystemConfigSchema>;

export const DEFAULT_CONFIG: SystemConfig = {
  email: {
    apiKey: "",
    senderName: "",
    senderAddress: "",
  },
};

export const CONFIG_CACHE_KEYS = {
  system: ["system"] as const,
  isEmailConfigured: ["isEmailConfigured"] as const,
} as const;
