import * as CacheService from "@/features/cache/cache.service";
import * as PageviewRepo from "@/features/pageview/data/pageview.data";
import {
  PAGEVIEW_CACHE_KEYS,
  ViewCountsSchema,
} from "@/features/pageview/pageview.schema";

export async function getViewCounts(
  context: DbContext & { executionCtx: ExecutionContext },
  slugs: string[],
) {
  if (slugs.length === 0) return {};

  return CacheService.get(
    context,
    PAGEVIEW_CACHE_KEYS.viewCounts(slugs),
    ViewCountsSchema,
    () => PageviewRepo.getViewCountsBySlugs(context.db, slugs),
    { ttl: "5m" },
  );
}
