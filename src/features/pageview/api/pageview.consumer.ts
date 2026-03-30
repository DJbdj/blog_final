import { and, eq, gte, lt } from "drizzle-orm";
import type { PageviewMessage } from "@/lib/queue/queue.schema";
import { getDb } from "@/lib/db";
import { PageViewsTable } from "@/lib/db/schema";

/**
 * 批量插入页面浏览量（去重）
 */
export async function handlePageviewMessages(
  { env }: { env: Env },
  messages: Array<{ postId: number; visitorHash: string }>,
) {
  const db = await getDb(env);

  // 为每个消息尝试插入，如果已存在则跳过
  for (const { postId, visitorHash } of messages) {
    // 检查是否已存在相同的记录（防止重复计数）
    const existing = await db
      .select({ id: PageViewsTable.id })
      .from(PageViewsTable)
      .where(
        and(
          eq(PageViewsTable.postId, postId),
          eq(PageViewsTable.visitorHash, visitorHash),
        ),
      )
      .limit(1);

    if (existing.length === 0) {
      await db.insert(PageViewsTable).values({
        postId,
        visitorHash,
      });
    }
  }
}
