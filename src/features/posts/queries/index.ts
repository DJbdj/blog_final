import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
  GetPostsCountInput,
  GetPostsInput,
} from "@/features/posts/schema/posts.schema";
import {
  PostItemSchema,
  PostListResponseSchema,
  PostWithTocSchema,
} from "@/features/posts/schema/posts.schema";
import { apiClient } from "@/lib/api-client";
import { isSSR } from "@/lib/utils";
import {
  getPostRevisionFn,
  listPostRevisionsFn,
} from "../api/post-revisions.admin.api";
import { findPostByIdFn } from "../api/posts.admin.api";
import {
  findPostBySlugFn,
  getPostsCursorFn,
  getRelatedPostsFn,
  getPinnedPostsFn,
  getArchivePostsFn,
} from "../api/posts.public.api";

export const POSTS_KEYS = {
  all: ["posts"] as const,

  // Parent keys (static arrays for prefix invalidation)
  lists: ["posts", "list"] as const,
  details: ["posts", "detail"] as const,
  pinned: ["posts", "pinned"] as const,
  archive: ["posts", "archive"] as const,
  adminLists: ["posts", "admin-list"] as const,
  counts: ["posts", "count"] as const,
  revisions: ["posts", "revisions"] as const,
  revisionDetails: ["posts", "revision-detail"] as const,

  // Child keys (functions for specific queries)
  list: (filters?: { tagName?: string }) => ["posts", "list", filters] as const,
  detail: (idOrSlug: number | string) => ["posts", "detail", idOrSlug] as const,
  related: (slug: string, limit?: number) =>
    ["posts", "related", slug, limit] as const,
  adminList: (params: GetPostsInput) =>
    ["posts", "admin-list", params] as const,
  count: (params: GetPostsCountInput) => ["posts", "count", params] as const,
  revisionList: (postId: number) => ["posts", "revisions", postId] as const,
  revisionDetail: (postId: number, revisionId: number) =>
    ["posts", "revision-detail", postId, revisionId] as const,
};

export function pinnedPostsQuery(limit: number) {
  return queryOptions({
    queryKey: [...POSTS_KEYS.pinned, limit],
    queryFn: async () => {
      if (isSSR) {
        const result = await getPinnedPostsFn({ data: { limit } });
        // Validate the result with schema in SSR
        return PostItemSchema.array().parse(result);
      }
      const res = await apiClient.posts.pinned.$get({
        query: { limit: String(limit) },
      });
      if (!res.ok) throw new Error("Failed to fetch pinned posts");
      return PostItemSchema.array().parse(await res.json());
    },
  });
}

export function archivePostsQuery() {
  return queryOptions({
    queryKey: POSTS_KEYS.archive,
    queryFn: async () => {
      if (isSSR) {
        const result = await getArchivePostsFn();
        return result;
      }
      const res = await apiClient.posts.archive.$get();
      if (!res.ok) throw new Error("Failed to fetch archive posts");
      return res.json();
    },
  });
}

export function postsInfiniteQueryOptions(
  filters: { tagName?: string; limit?: number } = {},
) {
  const pageSize = filters.limit ?? 12;
  return infiniteQueryOptions({
    queryKey: POSTS_KEYS.list(filters),
    queryFn: async ({ pageParam }) => {
      if (isSSR) {
        return await getPostsCursorFn({
          data: {
            cursor: pageParam,
            limit: pageSize,
            tagName: filters.tagName,
          },
        });
      }
      const res = await apiClient.posts.$get({
        query: {
          cursor: pageParam?.toString(),
          limit: String(pageSize),
          tagName: filters.tagName,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      return PostListResponseSchema.parse(await res.json());
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
  });
}

export function recentPostsQuery(limit: number) {
  return queryOptions({
    queryKey: [...POSTS_KEYS.lists, "recent", limit],
    queryFn: async () => {
      if (isSSR) {
        const result = await getPostsCursorFn({
          data: { limit, cursor: undefined },
        });
        // Validate and return items
        const parsed = PostListResponseSchema.parse(result);
        return parsed.items;
      }
      const res = await apiClient.posts.$get({
        query: { limit: String(limit) },
      });
      if (!res.ok) throw new Error("Failed to fetch recent posts");
      return PostListResponseSchema.parse(await res.json()).items;
    },
  });
}

export function postBySlugQuery(slug: string) {
  return queryOptions({
    queryKey: POSTS_KEYS.detail(slug),
    queryFn: async () => {
      if (isSSR) {
        return await findPostBySlugFn({ data: { slug } });
      }
      const res = await apiClient.post[":slug"].$get({ param: { slug } });
      if (!res.ok) throw new Error("Failed to fetch post");
      return PostWithTocSchema.parse(await res.json());
    },
  });
}

export function postByIdQuery(id: number) {
  return queryOptions({
    queryKey: POSTS_KEYS.detail(id),
    queryFn: () => findPostByIdFn({ data: { id } }),
  });
}

export function relatedPostsQuery(slug: string, limit?: number) {
  return queryOptions({
    queryKey: POSTS_KEYS.related(slug, limit),
    queryFn: async () => {
      if (isSSR) {
        return await getRelatedPostsFn({ data: { slug, limit } });
      }
      const res = await apiClient.post[":slug"].related.$get({
        param: { slug },
        query: { limit: limit != null ? String(limit) : undefined },
      });
      if (!res.ok) throw new Error("Failed to fetch related posts");
      return PostItemSchema.array().parse(await res.json());
    },
  });
}

export function postRevisionListQuery(postId: number) {
  return queryOptions({
    queryKey: POSTS_KEYS.revisionList(postId),
    queryFn: () => listPostRevisionsFn({ data: { postId } }),
  });
}

export function postRevisionDetailQuery(postId: number, revisionId: number) {
  return queryOptions({
    queryKey: POSTS_KEYS.revisionDetail(postId, revisionId),
    queryFn: async () =>
      (await getPostRevisionFn({ data: { postId, revisionId } })) ?? null,
  });
}
