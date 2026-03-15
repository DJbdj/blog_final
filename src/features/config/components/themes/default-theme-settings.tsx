import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AssetUploadField } from "@/features/config/components/asset-upload-field";
import {
  Field,
  RangeField,
} from "@/features/config/components/site-settings-fields";
import type { SystemConfig } from "@/features/config/config.schema";
import {
  DEFAULT_THEME_BLUR_MAX,
  DEFAULT_THEME_BLUR_MIN,
  DEFAULT_THEME_OPACITY_MAX,
  DEFAULT_THEME_OPACITY_MIN,
  DEFAULT_THEME_TRANSITION_MAX,
  DEFAULT_THEME_TRANSITION_MIN,
} from "@/features/config/site-config.schema";

export function DefaultThemeSettings() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SystemConfig>();

  const getInputClassName = (error?: string) =>
    error ? "border-destructive focus-visible:border-destructive" : undefined;

  return (
    <>
      <Field
        label="导航栏名称"
        hint="在导航栏中显示的站点名称"
        error={errors.site?.theme?.default?.navBarName?.message}
      >
        <Input
          {...register("site.theme.default.navBarName")}
          className={getInputClassName(
            errors.site?.theme?.default?.navBarName?.message,
          )}
          placeholder="我的博客"
        />
      </Field>
      <AssetUploadField
        name="site.theme.default.background.homeImage"
        assetPath="themes/default/home-image.webp"
        accept=".png,.webp,.jpg,.jpeg"
        label="首页背景图片"
        hint="首页顶部的背景图片，支持相对路径或外部 URL"
        placeholder="/images/asset/themes/default/home-image.webp or https://picsum.photos/1600/900"
        error={errors.site?.theme?.default?.background?.homeImage?.message}
      />
      <AssetUploadField
        name="site.theme.default.background.globalImage"
        assetPath="themes/default/global-image.webp"
        accept=".png,.webp,.jpg,.jpeg"
        label="全局背景图片"
        hint="所有页面的全局背景图片，支持相对路径或外部 URL"
        placeholder="/images/asset/themes/default/global-image.webp or https://picsum.photos/1600/900"
        error={errors.site?.theme?.default?.background?.globalImage?.message}
      />
      <RangeField
        name="site.theme.default.background.light.opacity"
        label="浅色模式背景透明度"
        hint="浅色模式下背景图片的透明度"
        min={DEFAULT_THEME_OPACITY_MIN}
        max={DEFAULT_THEME_OPACITY_MAX}
        step={0.01}
        defaultValue={0.15}
        formatValue={(value) => value.toFixed(2)}
        error={errors.site?.theme?.default?.background?.light?.opacity?.message}
      />
      <RangeField
        name="site.theme.default.background.dark.opacity"
        label="深色模式背景透明度"
        hint="深色模式下背景图片的透明度"
        min={DEFAULT_THEME_OPACITY_MIN}
        max={DEFAULT_THEME_OPACITY_MAX}
        step={0.01}
        defaultValue={0.1}
        formatValue={(value) => value.toFixed(2)}
        error={errors.site?.theme?.default?.background?.dark?.opacity?.message}
      />
      <RangeField
        name="site.theme.default.background.backdropBlur"
        label="背景模糊度"
        hint="背景图片的高斯模糊程度（像素）"
        min={DEFAULT_THEME_BLUR_MIN}
        max={DEFAULT_THEME_BLUR_MAX}
        step={1}
        unit="px"
        defaultValue={8}
        error={errors.site?.theme?.default?.background?.backdropBlur?.message}
      />
      <RangeField
        name="site.theme.default.background.transitionDuration"
        label="过渡动画时长"
        hint="路由切换时背景过渡动画的时长（毫秒）"
        min={DEFAULT_THEME_TRANSITION_MIN}
        max={DEFAULT_THEME_TRANSITION_MAX}
        step={50}
        unit="ms"
        defaultValue={600}
        error={
          errors.site?.theme?.default?.background?.transitionDuration?.message
        }
      />
    </>
  );
}
