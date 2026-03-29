import type { PexelsPhoto } from "./pexels.data";
import { fetchDailyBackground } from "./pexels.data";

declare global {
  interface KVNamespace {
    get<T>(key: string, type: "json"): Promise<T | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  }
}

/**
 * Pexels 缓存键工厂
 */
export const cacheKeys = {
  dailyBackground: () => ["pexels", "daily", new Date().toISOString().split("T")[0]],
};

/**
 * 缓存过期时间（毫秒）
 * 每日精选图片：24 小时
 */
const CACHE_TTL = {
  DAILY_BACKGROUND: 24 * 60 * 60 * 1000, // 24 小时
};

/**
 * 从缓存或 API 获取每日精选背景图片
 * 使用 Cloudflare KV 存储缓存结果
 */
export async function getDailyBackground(
  env: {
    PEXELS_API_KEY?: string;
    KV?: KVNamespace;
  }
): Promise<PexelsPhoto | null> {
  const { KV, PEXELS_API_KEY } = env;

  // 如果没有配置 API 密钥，直接返回 null
  if (!PEXELS_API_KEY) {
    console.warn(
      JSON.stringify({
        message: "PEXELS_API_KEY not configured, skipping daily background fetch",
      })
    );
    return null;
  }

  // 如果没有 KV 存储，直接从 API 获取
  if (!KV) {
    console.warn(
      JSON.stringify({
        message: "KV namespace not available, fetching directly from Pexels API",
      })
    );
    return fetchDailyBackground({ PEXELS_API_KEY });
  }

  const cacheKey = cacheKeys.dailyBackground().join(":");

  try {
    // 尝试从 KV 缓存获取
    const cached = await KV.get<PexelsPhoto>(cacheKey, "json");
    if (cached) {
      return cached;
    }

    // 从 API 获取
    const photo = await fetchDailyBackground({ PEXELS_API_KEY });

    if (photo) {
      // 缓存 24 小时
      await KV.put(cacheKey, JSON.stringify(photo), {
        expirationTtl: CACHE_TTL.DAILY_BACKGROUND / 1000, // TTL 以秒为单位
      });
    }

    return photo;
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Error getting daily background from Pexels",
        error: String(error),
      })
    );
    return null;
  }
}
