import type { SystemConfig } from "@/features/config/config.schema";
import * as CacheService from "@/features/cache/cache.service";
import * as ConfigRepo from "@/features/config/config.data";
import {
  CONFIG_CACHE_KEYS,
  SystemConfigSchema,
} from "@/features/config/config.schema";
import * as Storage from "@/features/media/data/media.storage";
import { purgeSiteCDNCache } from "@/lib/invalidate";

function hasSiteConfigChanged(
  currentConfig: SystemConfig | null | undefined,
  nextConfig: SystemConfig | null | undefined,
) {
  return JSON.stringify(currentConfig?.site) !== JSON.stringify(nextConfig?.site);
}

export async function getSystemConfig(
  context: DbContext & { executionCtx: ExecutionContext },
) {
  return await CacheService.get(
    context,
    CONFIG_CACHE_KEYS.system,
    SystemConfigSchema.nullable(),
    async () => await ConfigRepo.getSystemConfig(context.db),
  );
}

export async function updateSystemConfig(
  context: DbContext & { env: Env; executionCtx: ExecutionContext },
  data: SystemConfig,
) {
  const currentConfig = await ConfigRepo.getSystemConfig(context.db);

  await ConfigRepo.upsertSystemConfig(context.db, data);
  await CacheService.deleteKey(
    context,
    CONFIG_CACHE_KEYS.system,
    CONFIG_CACHE_KEYS.isEmailConfigured,
  );

  // Purge CDN cache if site config changed
  if (hasSiteConfigChanged(currentConfig, data)) {
    await purgeSiteCDNCache(context.env);
  }

  return { success: true };
}

export async function uploadSiteAsset(
  context: { env: Env },
  input: { file: File; assetPath: string },
): Promise<{ url: string }> {
  const { url } = await Storage.putSiteAsset(
    context.env,
    input.file,
    input.assetPath,
  );

  const timestamp = Math.floor(Date.now() / 1000);
  const isFavicon = input.assetPath.startsWith("favicon/");
  const finalUrl = isFavicon
    ? `${url}?original=true&v=${timestamp}`
    : `${url}?v=${timestamp}`;

  return { url: finalUrl };
}
