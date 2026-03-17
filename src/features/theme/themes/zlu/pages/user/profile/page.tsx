"use client";

import { useState } from "react";
import { Loader2, User, Mail, Save } from "lucide-react";
import type { ProfilePageProps } from "@/features/theme/contract/pages";

export function ProfilePage({ profileForm, user, logout }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await profileForm.handleSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2 text-[var(--zlu-text-primary)]">个人资料</h1>
        <p className="text-[var(--zlu-text-secondary)]">管理你的账户信息</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="zlu-sidebar-card text-center">
            <div className="w-24 h-24 rounded-full bg-blue-500/20 mx-auto mb-4 flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={32} className="text-[var(--zlu-primary)]" />
              )}
            </div>
            <h2 className="text-xl font-bold mb-1 text-[var(--zlu-text-primary)]">{user.name}</h2>
            <p className="text-[var(--zlu-text-secondary)] text-sm mb-4">{user.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="zlu-button zlu-button-secondary text-sm w-full"
            >
              {isEditing ? "取消编辑" : "编辑资料"}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {isEditing ? (
            <form onSubmit={handleSave} className="zlu-sidebar-card space-y-5">
              {/* Name */}
              <div className="zlu-form-group">
                <label className="zlu-label">用户名</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  {...profileForm.register("name")}
                  className="zlu-input"
                />
                {profileForm.errors.name && (
                  <p className="text-sm text-red-500">{profileForm.errors.name.message}</p>
                )}
              </div>

              {/* Image */}
              <div className="zlu-form-group">
                <label className="zlu-label">头像 URL</label>
                <input
                  type="url"
                  defaultValue={user.image || ""}
                  {...profileForm.register("image")}
                  placeholder="https://example.com/avatar.png"
                  className="zlu-input"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={profileForm.isSubmitting}
                  className="zlu-button zlu-button-primary flex items-center gap-2"
                >
                  {profileForm.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      保存中...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      保存更改
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="zlu-button zlu-button-secondary"
                >
                  取消
                </button>
              </div>
            </form>
          ) : (
            <div className="zlu-sidebar-card space-y-6">
              {/* Info Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[var(--zlu-text-secondary)]" />
                  <div>
                    <p className="text-sm text-[var(--zlu-text-secondary)]">邮箱</p>
                    <p className="font-medium text-[var(--zlu-text-primary)]">{user.email}</p>
                  </div>
                </div>

                {user.role && (
                  <div>
                    <p className="text-sm text-[var(--zlu-text-secondary)] mb-2">角色</p>
                    <p className="text-[var(--zlu-text-primary)]">{user.role === "admin" ? "管理员" : "用户"}</p>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <div className="pt-4">
                <button
                  onClick={logout}
                  className="zlu-button zlu-button-secondary w-full"
                >
                  退出登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
