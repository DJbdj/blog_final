import { createServerFn } from "@tanstack/react-start";
import { serverEnv } from "@/lib/env/server.env";

declare global {
  interface KVNamespace {
    get<T>(key: string, type: "json"): Promise<T | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  }
}

/**
 * 从 Pexels API 获取风景图片
 * 使用随机页码获取不同的图片
 */
export const getLandscapeImageFn = createServerFn({ method: "GET" })
  .handler(async ({ context }): Promise<{ src: { landscape: string }; url: string; photographer: string } | null> => {
    const env = context.env as unknown as {
      PEXELS_API_KEY?: string;
      KV?: KVNamespace;
    };

    const apiKey = env.PEXELS_API_KEY;
    if (!apiKey) {
      console.warn(JSON.stringify({ message: "PEXELS_API_KEY not configured" }));
      return null;
    }

    // 生成随机页码（1-50），获取更多样的图片
    const randomPage = Math.floor(Math.random() * 50) + 1;

    // 使用 1 小时缓存键，避免频繁请求
    const cacheKey = `pexels:landscape:${Math.floor(Date.now() / (60 * 60 * 1000))}:${randomPage}`;

    // 检查 KV 缓存
    if (env.KV) {
      const cached = await env.KV.get<{ src: { landscape: string }; url: string; photographer: string }>(cacheKey, "json");
      if (cached) return cached;
    }

    // 从 Pexels 搜索风景图片
    const response = await fetch(`https://api.pexels.com/v1/search?query=landscape,nature,scenic&orientation=landscape&per_page=10&page=${randomPage}`, {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) {
      console.error(JSON.stringify({ message: "Pexels API error", status: response.status }));
      return null;
    }

    const data = await response.json();
    const photos = data.photos;

    if (!photos || photos.length === 0) return null;

    // 从返回的 10 张图片中随机选择一张
    const photo = photos[Math.floor(Math.random() * photos.length)];

    const result = {
      src: { landscape: photo.src.landscape },
      url: photo.url,
      photographer: photo.photographer,
    };

    // 缓存 1 小时
    if (env.KV) {
      await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 3600 });
    }

    return result;
  });
