import { AssetUploadField } from "@/features/config/components/asset-upload-field";
import type { SystemConfig } from "@/features/config/config.schema";
import { useFormContext } from "react-hook-form";

/**
 * ZLu Theme Settings
 *
 * Note: ZLu theme primarily uses environment variables for configuration.
 * This component provides asset upload fields for images that can be overridden
 * via the system settings.
 */
export function ZluThemeSettings() {
  const {
    formState: { errors },
  } = useFormContext<SystemConfig>();

  return (
    <>
      <div className="md:col-span-2 space-y-4">
        <p className="text-sm text-muted-foreground">
          ZLu 主题主要通过环境变量进行配置。以下设置可用于覆盖默认的背景图片。
        </p>
      </div>
      <AssetUploadField
        name="site.theme.zlu.homeImage"
        assetPath="themes/zlu/home-bg.webp"
        accept=".png,.webp,.jpg,.jpeg"
        label="首页背景图片"
        hint="ZLu 主题首页的背景图片"
        placeholder="/images/asset/themes/zlu/home-bg.webp or https://picsum.photos/1600/900"
        error={errors.site?.theme?.zlu?.homeImage?.message}
      />
      <AssetUploadField
        name="site.theme.zlu.avatar"
        assetPath="themes/zlu/avatar.png"
        accept=".png,.webp,.jpg,.jpeg"
        readOnly
        label="头像图片"
        error={errors.site?.theme?.zlu?.avatar?.message}
      />
    </>
  );
}
