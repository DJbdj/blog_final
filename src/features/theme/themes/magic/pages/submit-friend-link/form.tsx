import { Loader2 } from "lucide-react";
import type { FriendLinkSubmitFormData } from "@/features/theme/contract/pages";
import { Turnstile } from "@/components/common/turnstile";
import { Input } from "@/components/ui/input";

interface FriendLinkSubmitFormProps {
  form: FriendLinkSubmitFormData;
}

export function FriendLinkSubmitForm({ form }: FriendLinkSubmitFormProps) {
  const { register, errors, handleSubmit, isSubmitting, turnstileProps } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Turnstile {...turnstileProps} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 站点名称 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            站点名称 <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("siteName")}
            placeholder="我的博客"
            className="rounded-lg"
          />
          {errors.siteName && (
            <p className="text-sm text-destructive">{errors.siteName.message}</p>
          )}
        </div>

        {/* 站点地址 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            站点地址 <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("siteUrl")}
            placeholder="https://example.com"
            className="rounded-lg"
          />
          {errors.siteUrl && (
            <p className="text-sm text-destructive">{errors.siteUrl.message}</p>
          )}
        </div>
      </div>

      {/* 站点简介 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">站点简介</label>
        <Input
          {...register("description")}
          placeholder="简要介绍你的站点"
          className="rounded-lg"
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo 地址 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Logo 地址</label>
          <Input
            {...register("logoUrl")}
            placeholder="https://example.com/logo.png"
            className="rounded-lg"
          />
          {errors.logoUrl && (
            <p className="text-sm text-destructive">{errors.logoUrl.message}</p>
          )}
        </div>

        {/* 联系邮箱 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            联系邮箱 <span className="text-destructive">*</span>
          </label>
          <Input
            {...register("contactEmail")}
            placeholder="email@example.com"
            className="rounded-lg"
          />
          {errors.contactEmail && (
            <p className="text-sm text-destructive">{errors.contactEmail.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="magic-button w-full md:w-auto flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              提交中...
            </>
          ) : (
            "提交申请"
          )}
        </button>
      </div>
    </form>
  );
}
