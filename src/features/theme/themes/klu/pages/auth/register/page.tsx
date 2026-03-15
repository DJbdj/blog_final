import { Link } from "@tanstack/react-router";
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import type { RegisterPageProps } from "@/features/theme/contract/pages";

export function RegisterPage({
  registerForm,
}: RegisterPageProps) {
  const {
    register,
    errors,
    handleSubmit,
    isSubmitting,
    isSuccess,
  } = registerForm;

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--klu-accent-success)]/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-[var(--klu-accent-success)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
          注册成功
        </h2>
        <p className="text-[var(--klu-text-secondary)] mb-4">
          请检查邮箱并点击验证链接完成注册
        </p>
        <Link to="/login" className="klu-btn klu-btn-primary">
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--klu-text-primary)] mb-2">
          创建账号
        </h1>
        <p className="text-[var(--klu-text-secondary)]">
          填写信息开始注册
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
            用户名
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
            />
            <input
              {...register("name")}
              type="text"
              placeholder="你的名字"
              className="klu-input w-full pl-10"
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
            邮箱
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              className="klu-input w-full pl-10"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
            密码
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="设置密码"
              className="klu-input w-full pl-10"
            />
          </div>
          {errors.password && (
            <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
            确认密码
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
            />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="再次输入密码"
              className="klu-input w-full pl-10"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="klu-btn klu-btn-primary w-full"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              注册
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Links */}
      <div className="text-center text-sm">
        <span className="text-[var(--klu-text-secondary)]">已有账号？</span>
        <Link
          to="/login"
          className="text-[var(--klu-accent-primary)] hover:underline ml-1"
        >
          立即登录
        </Link>
      </div>
    </div>
  );
}
