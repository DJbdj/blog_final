import { useState } from "react";
import { Loader2, User, Mail, Save } from "lucide-react";
import type { ProfilePageProps } from "@/features/theme/contract/pages";

export function ProfilePage({ profileForm, user }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">个人资料</h1>
        <p className="text-muted-foreground">管理你的账户信息</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="magic-card p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={32} className="text-primary" />
              )}
            </div>
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="magic-button magic-button-outline text-sm"
            >
              {isEditing ? "取消编辑" : "编辑资料"}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {isEditing ? (
            <form onSubmit={profileForm.handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">用户名</label>
                <input
                  type="text"
                  {...profileForm.register("name")}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
                {profileForm.errors.name && (
                  <p className="text-sm text-red-500">{profileForm.errors.name.message}</p>
                )}
              </div>

              {/* Email - Read-only */}
              <div className="space-y-2">
                <label className="text-sm font-medium">邮箱地址</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">邮箱地址不可更改</p>
              </div>

              {/* Save Button */}
              <div>
                <button
                  type="submit"
                  disabled={profileForm.isSubmitting}
                  className="magic-button flex items-center gap-2"
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
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Info Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">用户名</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">邮箱</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
