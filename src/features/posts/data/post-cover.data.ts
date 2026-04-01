import type { JSONContent } from "@tiptap/react";
import { eq } from "drizzle-orm";
import { extractAllImageKeys } from "@/features/posts/utils/content";
import { MediaTable, PostsTable } from "@/lib/db/schema";
import type { DB } from "@/lib/db";

/**
 * 从文章内容中提取第一张图片的 key
 */
export function extractFirstImageKey(contentJson: JSONContent | null): string | undefined {
  const allKeys = extractAllImageKeys(contentJson);
  return allKeys.length > 0 ? allKeys[0] : undefined;
}

/**
 * 更新文章的封面图片
 * @param db - 数据库连接
 * @param postId - 文章 ID
 * @param contentJson - 文章内容
 */
export async function updatePostCoverImage(
  db: DB,
  postId: number,
  contentJson: JSONContent | null,
) {
  const firstImageKey = extractFirstImageKey(contentJson);

  if (firstImageKey) {
    // 检查图片是否存在于媒体库中
    const media = await db
      .select({ id: MediaTable.id, key: MediaTable.key })
      .from(MediaTable)
      .where(eq(MediaTable.key, firstImageKey))
      .limit(1);

    if (media.length > 0) {
      await db
        .update(PostsTable)
        .set({ coverImage: firstImageKey })
        .where(eq(PostsTable.id, postId));
      return firstImageKey;
    }
  }

  // 如果没有图片，清空 coverImage 字段
  await db
    .update(PostsTable)
    .set({ coverImage: null })
    .where(eq(PostsTable.id, postId));

  return undefined;
}
