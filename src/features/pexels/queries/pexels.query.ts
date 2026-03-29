import { useQuery } from "@tanstack/react-query";
import { getPexelsDailyBackgroundFn } from "@/features/config/api/site.api";

/**
 * 查询键工厂
 */
export const pexelsQueryKeys = {
  all: () => ["pexels"] as const,
  dailyBackground: () => [...pexelsQueryKeys.all(), "dailyBackground"] as const,
};

/**
 * 获取每日精选背景图片的 Hook
 * 仅在浅色模式下启用查询
 */
export function useDailyBackground(enabled: boolean = true) {
  return useQuery({
    queryKey: pexelsQueryKeys.dailyBackground(),
    queryFn: () => getPexelsDailyBackgroundFn(),
    staleTime: 1000 * 60 * 60, // 1 小时后视为过期
    gcTime: 1000 * 60 * 60 * 24, // 24 小时后从缓存移除
    refetchOnWindowFocus: false,
    enabled,
  });
}
