import { useState } from "react";
import { Loader2, User, Mail, Link, Save } from "lucide-react";
import type { ProfilePageProps } from "@/features/theme/contract/pages";

export function ProfilePage({ form, user }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit();
  };

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
            <form onSubmit={handleSave} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">用户名</label>
                <input
                  type="text"
                  value={form.values.name}
                  onChange={(e) => form.setValue("name", e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
                {form.errors.name && (
                  <p className="text-sm text-red-500">{form.errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">邮箱地址</label>
                <input
                  type="email"
                  value={form.values.email}
                  onChange={(e) => form.setValue("email", e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
                {form.errors.email && (
                  <p className="text-sm text-red-500">{form.errors.email.message}</p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="text-sm font-medium">个人网站</label>
                <input
                  type="url"
                  value={form.values.website || ""}
                  onChange={(e) => form.setValue("website", e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
                {form.errors.website && (
                  <p className="text-sm text-red-500">{form.errors.website.message}</p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-sm font-medium">个人简介</label>
                <textarea
                  value={form.values.bio || ""}
                  onChange={(e) => form.setValue("bio", e.target.value)}
                  rows={4}
                  placeholder="介绍一下自己..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={form.isSubmitting}
                  className="magic-button flex items-center gap-2"
                >
                  {form.isSubmitting ? (
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
                  className="magic-button magic-button-outline"
                >
                  取消
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Info Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">邮箱</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                {user.website && (
                  <div className="flex items-center gap-3">
                    <Link size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">网站</p>
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary"
                      >
                        {user.website}
                      </a>
                    </div>
                  </div>
                )}

                {user.bio && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">个人简介</p>
                    <p className="font-medium">{user.bio}</p>
                  </div>
                )}

                {/* Creation Date */}
                <div>
                  <p className="text-sm text-muted-foreground">注册时间</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}