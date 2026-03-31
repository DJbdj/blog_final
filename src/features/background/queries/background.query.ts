import { useQuery } from "@tanstack/react-query";
import { getLandscapeImageFn } from "../api/background.api";

export const backgroundQueryKeys = {
  all: () => ["background"] as const,
  landscape: () => [...backgroundQueryKeys.all(), "landscape"] as const,
};

export function useLandscapeImage(enabled: boolean = true) {
  return useQuery({
    queryKey: backgroundQueryKeys.landscape(),
    queryFn: () => getLandscapeImageFn(),
    staleTime: 1000 * 60 * 30, // 30 分钟
    gcTime: 1000 * 60 * 60, // 1 小时
    enabled,
  });
}
