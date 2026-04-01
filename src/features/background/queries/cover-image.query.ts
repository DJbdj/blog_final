import { useQuery } from "@tanstack/react-query";
import { getRandomCoverImageFn } from "@/features/background/api/cover-image.api";

export function useRandomCoverImage() {
  return useQuery({
    queryKey: ["pexels", "cover", "random"],
    queryFn: () => getRandomCoverImageFn(),
    staleTime: 1000 * 60 * 60, // 1 小时
    gcTime: 1000 * 60 * 60 * 24, // 24 小时
  });
}
