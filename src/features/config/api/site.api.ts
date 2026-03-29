import { createServerFn } from "@tanstack/react-start";
import * as ConfigService from "@/features/config/service/config.service";
import { serverEnv } from "@/lib/env/server.env";
import { dbMiddleware } from "@/lib/middlewares";

export const getSiteDomainFn = createServerFn().handler(({ context }) => {
  return serverEnv(context.env).DOMAIN;
});

export const getSiteConfigFn = createServerFn()
  .middleware([dbMiddleware])
  .handler(({ context }) => ConfigService.getSiteConfig(context));

// Pexels Daily Background - Test integration
declare global {
  interface KVNamespace {
    get<T>(key: string, type: "json"): Promise<T | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  }
}

export const getPexelsDailyBackgroundFn = createServerFn({ method: "GET" })
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

    // Check KV cache
    const cacheKey = `pexels:daily:${new Date().toISOString().split("T")[0]}`;
    if (env.KV) {
      const cached = await env.KV.get<{ src: { landscape: string }; url: string; photographer: string }>(cacheKey, "json");
      if (cached) return cached;
    }

    // Fetch from Pexels API
    const response = await fetch("https://api.pexels.com/v1/curated?page=1&per_page=1", {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) {
      console.error(JSON.stringify({ message: "Pexels API error", status: response.status }));
      return null;
    }

    const data = await response.json();
    const photo = data.photos?.[0];

    if (!photo) return null;

    const result = {
      src: { landscape: photo.src.landscape },
      url: photo.url,
      photographer: photo.photographer,
    };

    // Cache for 24 hours
    if (env.KV) {
      await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 86400 });
    }

    return result;
  });
