import { z } from "zod";

export const emailMessageSchema = z.object({
  type: z.literal("EMAIL"),
  data: z.object({
    to: z.string(),
    subject: z.string(),
    html: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
    idempotencyKey: z.string().optional(),
  }),
});

export const postAutoSnapshotMessageSchema = z.object({
  type: z.literal("POST_AUTO_SNAPSHOT"),
  data: z.object({
    postId: z.number(),
    quietWindowSeconds: z.number().optional(),
  }),
});

export const queueMessageSchema = z.discriminatedUnion("type", [
  emailMessageSchema,
  postAutoSnapshotMessageSchema,
]);

export type QueueMessage = z.infer<typeof queueMessageSchema>;
export type EmailMessage = z.infer<typeof emailMessageSchema>;
export type PostAutoSnapshotMessage = z.infer<typeof postAutoSnapshotMessageSchema>;
