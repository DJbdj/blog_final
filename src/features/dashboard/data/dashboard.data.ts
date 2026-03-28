import { count, desc, eq } from "drizzle-orm";
import type { DB } from "@/lib/db";
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
  // 先获取评论列表
  const comments = await db
    .select()
    .from(CommentsTable)
    .orderBy(desc(CommentsTable.createdAt))
    .limit(limit);

  // 为每条评论获取用户和帖子信息
  const result = await Promise.all(
    comments.map(async (comment) => {
      const [user, post] = await Promise.all([
        comment.userId
          ? db.query.user.findFirst({
              where: eq(UserTable.id, comment.userId),
            })
          : Promise.resolve(null),
        db.query.posts.findFirst({
          where: eq(PostsTable.id, comment.postId),
        }),
      ]);

      return {
        comments: comment,
        user,
        posts: post,
      };
    }),
  );

  return result;
}

export async function getRecentPosts(db: DB, limit = 5) {
  return db
    .select()
    .from(PostsTable)
    .where(eq(PostsTable.status, "published"))
    .orderBy(desc(PostsTable.publishedAt))
    .limit(limit);
}

export async function getRecentUsers(db: DB, limit = 5) {
  return db
    .select()
    .from(UserTable)
    .orderBy(desc(UserTable.createdAt))
    .limit(limit);
}
