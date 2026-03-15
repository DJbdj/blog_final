import { useFormContext, useWatch } from "react-hook-form";
import { AssetUploadField } from "@/features/config/components/asset-upload-field";
import { RangeField } from "@/features/config/components/site-settings-fields";
import type { SystemConfig } from "@/features/config/config.schema";
import {
  FUWARI_THEME_HUE_MAX,
  FUWARI_THEME_HUE_MIN,
} from "@/features/config/site-config.schema";

function FuwariHuePreview() {
  const { control } = useFormContext<SystemConfig>();
  const currentHue = useWatch({
    control,
    name: "site.theme.fuwari.primaryHue",
  });
  const previewHue =
    typeof currentHue === "number" && !Number.isNaN(currentHue)
      ? currentHue
      : 250;

  const previewStyle = {
    "--fuwari-hue": String(previewHue),
  } as React.CSSProperties;

  return (
    <div
      className="fuwari-preview rounded-2xl border border-border/40 bg-background/70 p-4 md:col-span-2"
      style={previewStyle}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            主题色预览
          </p>
          <p className="text-xs text-muted-foreground">
            当前色相：{previewHue}deg
          </p>
        </div>
        <div
          className="h-10 w-10 shrink-0 rounded-xl border border-black/10 shadow-sm"
          style={{ backgroundColor: "var(--fuwari-primary)" }}
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="fuwari-card-base rounded-xl border border-black/5 p-4 shadow-sm">
          <div
            className="h-2.5 w-16 rounded-full"
            style={{ backgroundColor: "var(--fuwari-primary)" }}
          />
          <p className="mt-4 text-xs/5 font-medium text-black/45 dark:text-white/45">
            卡片标签
          </p>
          <p className="mt-1 text-lg font-semibold text-black/90 dark:text-white/90">
            卡片标题
          </p>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            卡片描述内容
          </p>
        </div>

        <button
          type="button"
          className="fuwari-btn-primary h-11 rounded-xl px-4 text-sm font-semibold shadow-sm active:scale-[0.98]"
        >
          主要按钮
        </button>

        <button
          type="button"
          className="fuwari-btn-regular h-11 rounded-xl px-4 text-sm font-medium shadow-sm active:scale-[0.98]"
        >
          次要按钮
        </button>
      </div>
    </div>
  );
}

export function FuwariThemeSettings() {
  const {
    formState: { errors },
  } = useFormContext<SystemConfig>();

  return (
    <>
      <AssetUploadField
        name="site.theme.fuwari.homeBg"
        assetPath="themes/fuwari/home-bg.webp"
        accept=".png,.webp,.jpg,.jpeg"
        label="首页背景图片"
        hint="Fuwari 主题首页的背景图片"
        placeholder="/images/asset/themes/fuwari/home-bg.webp or https://picsum.photos/1600/900"
        error={errors.site?.theme?.fuwari?.homeBg?.message}
      />
      <AssetUploadField
        name="site.theme.fuwari.avatar"
        assetPath="themes/fuwari/avatar.png"
        accept=".png,.webp,.jpg,.jpeg"
        readOnly
        label="头像图片"
        error={errors.site?.theme?.fuwari?.avatar?.message}
      />
      <RangeField
        name="site.theme.fuwari.primaryHue"
        label="主题色相"
        hint="调整主题的主色调（0-360 度）"
        min={FUWARI_THEME_HUE_MIN}
        max={FUWARI_THEME_HUE_MAX}
        step={1}
        unit="deg"
        defaultValue={250}
        error={errors.site?.theme?.fuwari?.primaryHue?.message}
      />
      <FuwariHuePreview />
    </>
  );
}
