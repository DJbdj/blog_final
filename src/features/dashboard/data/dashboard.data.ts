import { count, desc, eq } from "drizzle-orm";
import { CommentsTable, PostsTable, user as UserTable } from "@/lib/db/schema";

export async function getPendingCommentsCount(db: DB) {
  const [result] = await db
    .select({ count: count() })
    .from(CommentsTable)
    .where(eq(CommentsTable.status, "pending"));
  return result.count;
}

export async function getPublishedPostsCount(db: DB) {
  const [result] = await db
    .select({ count: count() })
    .from(PostsTable)
    .where(eq(PostsTable.status, "published"));
  return result.count;
}

export async function getDraftsCount(db: DB) {
  const [result] = await db
    .select({ count: count() })
    .from(PostsTable)
    .where(eq(PostsTable.status, "draft"));
  return result.count;
}

export async function getRecentComments(db: DB, limit = 5) {
  const results = await db
    .select({
      id: CommentsTable.id,
      content: CommentsTable.content,
      root_id: CommentsTable.root_id,
      reply_to_comment_id: CommentsTable.reply_to_comment_id,
      status: CommentsTable.status,
      ai_reason: CommentsTable.ai_reason,
      post_id: CommentsTable.postId,
      user_id: CommentsTable.userId,
      createdAt: CommentsTable.createdAt,
      updatedAt: CommentsTable.updatedAt,
      userName: UserTable.name,
      postTitle: PostsTable.title,
      postSlug: PostsTable.slug,
    })
    .from(CommentsTable)
    .leftJoin(UserTable, eq(CommentsTable.userId, UserTable.id))
    .leftJoin(PostsTable, eq(CommentsTable.postId, PostsTable.id))
    .orderBy(desc(CommentsTable.createdAt))
    .limit(limit);

  // Transform to flat structure for easier consumption
  return results.map((r) => ({
    id: r.id,
    content: r.content,
    root_id: r.root_id,
    reply_to_comment_id: r.reply_to_comment_id,
    status: r.status,
    ai_reason: r.ai_reason,
    post_id: r.post_id,
    user_id: r.user_id,
    createdAt: r.createdAt?.getTime ? r.createdAt.getTime() : r.createdAt,
    updatedAt: r.updatedAt?.getTime ? r.updatedAt.getTime() : r.updatedAt,
    user: r.userName ? { name: r.userName } : null,
    post: r.postTitle ? { title: r.postTitle, slug: r.postSlug } : null,
  }));
}

export async function getRecentPosts(db: DB, limit = 5) {
  const results = await db
    .select({
      id: PostsTable.id,
      title: PostsTable.title,
      summary: PostsTable.summary,
      readTimeInMinutes: PostsTable.readTimeInMinutes,
      slug: PostsTable.slug,
      status: PostsTable.status,
      publishedAt: PostsTable.publishedAt,
      createdAt: PostsTable.createdAt,
      updatedAt: PostsTable.updatedAt,
    })
    .from(PostsTable)
    .where(eq(PostsTable.status, "published"))
    .orderBy(desc(PostsTable.publishedAt))
    .limit(limit);

  // Normalize timestamps to ensure serializable format
  return results.map((r) => ({
    ...r,
    publishedAt: r.publishedAt?.getTime ? r.publishedAt.getTime() : r.publishedAt,
    createdAt: r.createdAt?.getTime ? r.createdAt.getTime() : r.createdAt,
    updatedAt: r.updatedAt?.getTime ? r.updatedAt.getTime() : r.updatedAt,
  }));
}

export async function getRecentUsers(db: DB, limit = 5) {
  const results = await db
    .select({
      id: UserTable.id,
      name: UserTable.name,
      createdAt: UserTable.createdAt,
    })
    .from(UserTable)
    .orderBy(desc(UserTable.createdAt))
    .limit(limit);

  // Normalize timestamps to ensure serializable format
  return results.map((r) => ({
    ...r,
    createdAt: r.createdAt?.getTime ? r.createdAt.getTime() : r.createdAt,
  }));
}
