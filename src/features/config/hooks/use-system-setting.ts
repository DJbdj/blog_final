import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateSystemConfigFn } from "@/features/config/api/config.api";
import { CONFIG_KEYS, systemConfigQuery } from "@/features/config/queries";
import { DEFAULT_CONFIG } from "@/features/config/config.schema";

export function useSystemSetting() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(systemConfigQuery);

  const saveMutation = useMutation({
    mutationFn: updateSystemConfigFn,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: CONFIG_KEYS.system }),
        queryClient.invalidateQueries({ queryKey: CONFIG_KEYS.site }),
      ]);
    },
  });

  return {
    settings: data ?? DEFAULT_CONFIG,
    isLoading,
    saveSettings: saveMutation.mutateAsync,
  };
}
