import { z } from "zod";

const notificationWebhookEventTypeSchema = z.enum([
  "comment.admin_root_created",
  "comment.admin_pending_review",
  "comment.reply_to_admin_published",
  "friend_link.submitted",
]);

const webhookEndpointSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  url: z.string().url(),
  enabled: z.boolean(),
  secret: z.string().min(1),
  events: z.array(notificationWebhookEventTypeSchema),
});

export const SystemConfigSchema = z.object({
  email: z
    .object({
      apiKey: z.string().optional(),
      senderName: z.string().optional(),
      senderAddress: z.union([z.email(), z.literal("")]).optional(),
    })
    .optional(),
  notification: z
    .object({
      admin: z
        .object({
          channels: z
            .object({
              email: z.boolean().optional(),
              webhook: z.boolean().optional(),
            })
            .optional(),
        })
        .optional(),
      user: z
        .object({
          emailEnabled: z.boolean().optional(),
        })
        .optional(),
      webhooks: z.array(webhookEndpointSchema).optional(),
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
  notification: {
    admin: {
      channels: {
        email: true,
        webhook: true,
      },
    },
    user: {
      emailEnabled: true,
    },
    webhooks: [],
  },
};

export const CONFIG_CACHE_KEYS = {
  system: ["system"] as const,
  isEmailConfigured: ["isEmailConfigured"] as const,
} as const;
