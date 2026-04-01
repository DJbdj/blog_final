import { createServerFn } from "@tanstack/react-start";
import { serverEnv } from "@/lib/env/server.env";

declare global {
  interface KVNamespace {
    get<T>(key: string, type: "json"): Promise<T | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  }
}

/**
 * 从 Pexels API 获取随机图片作为文章封面
 * 使用每日精选图或者随机搜索图
 */
export const getRandomCoverImageFn = createServerFn({ method: "GET" })
  .handler(async ({ context }): Promise<{ src: { large: string; landscape: string }; url: string; photographer: string } | null> => {
    const env = context.env as unknown as {
      PEXELS_API_KEY?: string;
      KV?: KVNamespace;
    };

    const apiKey = env.PEXELS_API_KEY;
    if (!apiKey) {
      console.warn(JSON.stringify({ message: "PEXELS_API_KEY not configured" }));
      return null;
    }

    // 使用日期作为缓存键，每天获取一张不同的图片
    const today = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
    const cacheKey = `pexels:cover:${today}`;

    // 检查 KV 缓存
    if (env.KV) {
      const cached = await env.KV.get<{ src: { large: string; landscape: string }; url: string; photographer: string }>(cacheKey, "json");
      if (cached) return cached;
    }

    // 尝试获取每日精选图，如果没有则搜索随机图片
    const response = await fetch("https://api.pexels.com/v1/curated?per_page=1", {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) {
      console.error(JSON.stringify({ message: "Pexels API error", status: response.status }));
      // 降级：使用搜索 API
      const randomPage = Math.floor(Math.random() * 50) + 1;
      const searchResponse = await fetch(
        `https://api.pexels.com/v1/search?query=nature,texture,abstract&orientation=landscape&per_page=5&page=${randomPage}`,
        { headers: { Authorization: apiKey } }
      );
      if (!searchResponse.ok) return null;
      const searchData = await searchResponse.json();
      if (!searchData.photos || searchData.photos.length === 0) return null;
      const photo = searchData.photos[Math.floor(Math.random() * searchData.photos.length)];
      const result = {
        src: { large: photo.src.large, landscape: photo.src.landscape },
        url: photo.url,
        photographer: photo.photographer,
      };
      if (env.KV) {
        await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 86400 });
      }
      return result;
    }

    const data = await response.json();
    const photos = data.photos;

    if (!photos || photos.length === 0) return null;

    const photo = photos[0];
    const result = {
      src: { large: photo.src.large, landscape: photo.src.landscape },
      url: photo.url,
      photographer: photo.photographer,
    };

    // 缓存 24 小时
    if (env.KV) {
      await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 86400 });
    }

    return result;
  });
