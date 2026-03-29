import { createServerFn } from "@tanstack/react-start";
import { getDailyBackground } from "./pexels.service";
import type { PexelsPhoto } from "./data/pexels.data";

declare global {
  interface KVNamespace {
    get<T>(key: string, type: "json"): Promise<T | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  }
}

/**
 * 获取每日精选背景图片
 * 客户端调用此函数获取 Pexels 每日精选图片
 */
export const getDailyBackgroundFn = createServerFn({ method: "GET" })
  .handler(async ({ context }): Promise<PexelsPhoto | null> => {
    const env = context.env as unknown as {
      PEXELS_API_KEY?: string;
      KV?: KVNamespace;
    };

    return getDailyBackground(env);
  });
