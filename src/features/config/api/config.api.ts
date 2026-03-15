import { createServerFn } from "@tanstack/react-start";
import * as ConfigService from "@/features/config/config.service";
import { adminMiddleware } from "@/lib/middlewares";
import { SystemConfigSchema } from "@/features/config/config.schema";

export const getSystemConfigFn = createServerFn()
  .middleware([adminMiddleware])
  .handler(({ context }) => ConfigService.getSystemConfig(context));

export const updateSystemConfigFn = createServerFn({
  method: "POST",
})
  .middleware([adminMiddleware])
  .inputValidator(SystemConfigSchema)
  .handler(({ context, data }) =>
    ConfigService.updateSystemConfig(context, data),
  );

export const uploadSiteAssetFn = createServerFn({
  method: "POST",
})
  .middleware([adminMiddleware])
  .handler(async ({ context, data }) => {
    const formData = data as unknown as FormData;
    const file = formData.get("file") as File;
    const assetPath = formData.get("assetPath") as string;

    return ConfigService.uploadSiteAsset(context, { file, assetPath });
  });
