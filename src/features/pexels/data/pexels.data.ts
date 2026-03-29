import { z } from "zod";

/**
 * Pexels API 响应模式
 */
const PexelsPhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  photographer_url: z.string(),
  avg_color: z.string(),
  src: z.object({
    original: z.string(),
    large2x: z.string(),
    large: z.string(),
    medium: z.string(),
    small: z.string(),
    portrait: z.string(),
    landscape: z.string(),
    tiny: z.string(),
  }),
  alt: z.string().nullable(),
});

const PexelsCuratedResponseSchema = z.object({
  total_results: z.number(),
  page: z.number(),
  per_page: z.number(),
  photos: z.array(PexelsPhotoSchema),
  next_page: z.string().nullable(),
  prev_page: z.string().nullable(),
});

export type PexelsPhoto = z.infer<typeof PexelsPhotoSchema>;
export type PexelsCuratedResponse = z.infer<typeof PexelsCuratedResponseSchema>;

/**
 * 从 Pexels API 获取精选图片
 * 使用服务端环境变量中的 API 密钥
 */
export async function fetchCuratedPhotos(
  env: { PEXELS_API_KEY?: string },
  options: { page?: number; per_page?: number } = {}
): Promise<PexelsCuratedResponse> {
  const apiKey = env.PEXELS_API_KEY;

  if (!apiKey) {
    throw new Error("PEXELS_API_KEY is not configured");
  }

  const { page = 1, per_page = 10 } = options;

  const url = new URL("https://api.pexels.com/v1/curated");
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(per_page));

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      JSON.stringify({
        message: "Pexels API request failed",
        status: response.status,
        error: errorText,
      })
    );
    throw new Error(`Pexels API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return PexelsCuratedResponseSchema.parse(data);
}

/**
 * 获取单张精选图片（用于背景）
 * 返回 landscape 尺寸，适合网页背景
 */
export async function fetchDailyBackground(
  env: { PEXELS_API_KEY?: string }
): Promise<PexelsPhoto | null> {
  try {
    const result = await fetchCuratedPhotos(env, { page: 1, per_page: 1 });
    return result.photos[0] ?? null;
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Failed to fetch daily background",
        error: String(error),
      })
    );
    return null;
  }
}
