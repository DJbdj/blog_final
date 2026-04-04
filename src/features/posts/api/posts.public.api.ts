import { createServerFn } from "@tanstack/react-start";
import {
  FindPostBySlugInputSchema,
  FindRelatedPostsInputSchema,
  GetPostsCursorInputSchema,
} from "@/features/posts/schema/posts.schema";
import * as PostService from "@/features/posts/services/posts.service";
import { dbMiddleware } from "@/lib/middlewares";
import { z } from "zod";

const GetPinnedPostsInputSchema = z.object({
  limit: z.number().optional(),
});

export const getPostsCursorFn = createServerFn()
  .middleware([dbMiddleware])
  .inputValidator(GetPostsCursorInputSchema)
  .handler(async ({ data, context }) => {
    return await PostService.getPostsCursor(context, data);
  });

export const getPinnedPostsFn = createServerFn()
  .middleware([dbMiddleware])
  .inputValidator(GetPinnedPostsInputSchema)
  .handler(async ({ data, context }) => {
    return await PostService.getPinnedPosts(context, data.limit ?? 4);
  });

export const findPostBySlugFn = createServerFn()
  .middleware([dbMiddleware])
  .inputValidator(FindPostBySlugInputSchema)
  .handler(async ({ data, context }) => {
    return await PostService.findPostBySlug(context, data);
  });

export const getRelatedPostsFn = createServerFn()
  .middleware([dbMiddleware])
  .inputValidator(FindRelatedPostsInputSchema)
  .handler(async ({ data, context }) => {
    return await PostService.getRelatedPosts(context, data);
  });

export const getArchivePostsFn = createServerFn()
  .middleware([dbMiddleware])
  .handler(async ({ context }) => {
    return await PostService.getArchivePosts(context);
  });
