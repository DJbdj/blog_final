import { Link } from "@tanstack/react-router";
import { UserLayoutProps } from "@/features/theme/contract/layouts";
import { PublicLayout } from "./public-layout";

export function UserLayout({
  isAuthenticated,
  navOptions,
  user,
  isSessionLoading,
  logout,
  children,
}: UserLayoutProps) {
  if (isAuthenticated) {
    return (
      <PublicLayout
        navOptions={navOptions}
        user={user}
        isSessionLoading={isSessionLoading}
        logout={logout}
      >
        {children}
      </PublicLayout>
    );
  }

  return (
    <div className="theme-magic min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-secondary/50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">请先登录</h1>
        <p className="text-muted-foreground">
          你需要登录后才能访问此页面
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            to="/login"
            className="magic-button"
          >
            前往登录
          </Link>
          <Link
            to="/"
            className="magic-button magic-button-outline"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
