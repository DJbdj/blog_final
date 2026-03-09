"use client";

import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { SubmitFriendLinkPageProps } from "@/features/theme/contract/pages";
import { FriendLinkSubmitForm } from "./form";

export function SubmitFriendLinkPage({ form }: SubmitFriendLinkPageProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/friend-links"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回友链列表
      </Link>

      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2 text-white">申请友链</h1>
        <p className="text-gray-400">填写以下信息，审核通过后将展示在友链页面</p>
      </div>

      {/* Form */}
      <div className="zlu-sidebar-card max-w-2xl mx-auto">
        <FriendLinkSubmitForm form={form} />
      </div>

      {/* Info */}
      <div className="text-center text-sm text-gray-400">
        <p>我们会在 1-3 个工作日内完成审核</p>
        <p>审核结果将通过邮件通知</p>
      </div>
    </div>
  );
}
