"use client";

import { Loader2 } from "lucide-react";
import type { FriendLinkSubmitFormData } from "@/features/theme/contract/pages";
import { Turnstile } from "@/components/common/turnstile";

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
          <label className="zlu-label">
            站点名称 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("siteName")}
            placeholder="我的博客"
            className="zlu-input"
          />
          {errors.siteName && (
            <p className="text-sm text-red-500">{errors.siteName.message}</p>
          )}
        </div>

        {/* 站点地址 */}
        <div className="space-y-2">
          <label className="zlu-label">
            站点地址 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("siteUrl")}
            placeholder="https://example.com"
            className="zlu-input"
          />
          {errors.siteUrl && (
            <p className="text-sm text-red-500">{errors.siteUrl.message}</p>
          )}
        </div>
      </div>

      {/* 站点简介 */}
      <div className="space-y-2">
        <label className="zlu-label">站点简介</label>
        <input
          {...register("description")}
          placeholder="简要介绍你的站点"
          className="zlu-input"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo 地址 */}
        <div className="space-y-2">
          <label className="zlu-label">Logo 地址</label>
          <input
            {...register("logoUrl")}
            placeholder="https://example.com/logo.png"
            className="zlu-input"
          />
          {errors.logoUrl && (
            <p className="text-sm text-red-500">{errors.logoUrl.message}</p>
          )}
        </div>

        {/* 联系邮箱 */}
        <div className="space-y-2">
          <label className="zlu-label">
            联系邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("contactEmail")}
            placeholder="email@example.com"
            className="zlu-input"
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="zlu-button zlu-button-primary w-full md:w-auto"
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
