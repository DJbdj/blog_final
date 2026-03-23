import {
  and,
  count,
  eq,
  gte,
  inArray,
  lt,
  sql,
} from "drizzle-orm";
import type { DB } from "@/lib/db";
import { PageViewsTable, PostsTable } from "@/lib/db/schema";

/**
 * 获取时间范围内的 PV 和 UV
 */
export async function getStats(
  db: DB,
  startAt: Date,
  endAt: Date,
): Promise<{ pv: number; uv: number }> {
  const whereClause = and(
    gte(PageViewsTable.createdAt, startAt),
    lt(PageViewsTable.createdAt, endAt),
  );

  const [pvResult, uvSubqueryResult] = await Promise.all([
    db
      .select({ count: count() })
      .from(PageViewsTable)
      .where(whereClause),
    db
      .select({ count: count() })
      .from(
        db
          .selectDistinct({ visitorHash: PageViewsTable.visitorHash })
          .from(PageViewsTable)
          .where(whereClause)
          .as("distinct_visitors"),
      ),
  ]);

  return {
    pv: Number(pvResult[0]?.count ?? 0),
    uv: Number(uvSubqueryResult[0]?.count ?? 0),
  };
}

/**
 * 获取流量趋势数据（按小时或按天聚合）
 */
export async function getTrafficTrend(
  db: DB,
  startAt: Date,
  endAt: Date,
  unit: "hour" | "day",
): Promise<Array<{ date: number; views: number }>> {
  const truncExpr =
    unit === "hour"
      ? sql<number>`(${PageViewsTable.createdAt} - ${PageViewsTable.createdAt} % 3600)`
      : sql<number>`(${PageViewsTable.createdAt} - ${PageViewsTable.createdAt} % 86400)`;

  const rows = await db
    .select({
      bucket: truncExpr,
      views: count(),
    })
    .from(PageViewsTable)
    .where(
      and(
        gte(PageViewsTable.createdAt, startAt),
        lt(PageViewsTable.createdAt, endAt),
      ),
    )
    .groupBy(truncExpr)
    .orderBy(truncExpr);

  return rows.map((r) => ({
    date: Number(r.bucket) * 1000, // unix seconds → ms
    views: Number(r.views),
  }));
}

/**
 * 获取热门文章（按 PV 排序，返回 slug + views）
 */
export async function getTopPages(
  db: DB,
  startAt: Date,
  endAt: Date,
  limit = 5,
): Promise<Array<{ slug: string; title: string; views: number }>> {
  const rows = await db
    .select({
      slug: PostsTable.slug,
      title: PostsTable.title,
      views: count(),
    })
    .from(PageViewsTable)
    .innerJoin(PostsTable, eq(PageViewsTable.postId, PostsTable.id))
    .where(
      and(
        gte(PageViewsTable.createdAt, startAt),
        lt(PageViewsTable.createdAt, endAt),
      ),
    )
    .groupBy(PostsTable.slug)
    .orderBy(sql`views DESC`)
    .limit(limit);

  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    views: Number(r.views),
  }));
}

/**
 * 批量获取文章的总浏览量
 */
export async function getViewCountsBySlugs(
  db: DB,
  slugs: string[],
): Promise<Record<string, number>> {
  if (slugs.length === 0) return {};

  const rows = await db
    .select({
      slug: PostsTable.slug,
      views: count(),
    })
    .from(PageViewsTable)
    .innerJoin(PostsTable, eq(PageViewsTable.postId, PostsTable.id))
    .where(inArray(PostsTable.slug, slugs))
    .groupBy(PostsTable.slug);

  return Object.fromEntries(rows.map((r) => [r.slug, Number(r.views)]));
}
