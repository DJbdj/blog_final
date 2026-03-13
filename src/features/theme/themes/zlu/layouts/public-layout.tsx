"use client";

import { useState } from "react";
import { BackgroundLayer } from "../components/background-layer";
import { Footer } from "./footer";
import { MobileMenu } from "./mobile-menu";
import { Navbar } from "./navbar";
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";

export function PublicLayout({
  children,
  navOptions,
  user,
  isSessionLoading,
  logout,
}: PublicLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="theme-zlu min-h-screen flex flex-col">
      <BackgroundLayer />
      <Navbar
        navOptions={navOptions}
        onMenuClick={() => setIsMenuOpen(true)}
        user={user}
        isLoading={isSessionLoading}
      />
      <MobileMenu
        navOptions={navOptions}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        logout={logout}
      />
      <main className="flex-1 relative">
        <div className="zlu-layout">
          {/* Left Sidebar - Profile & Navigation */}
          <aside className="zlu-left-sidebar hidden lg:block">
            <div className="zlu-profile">
              <img
                src="/images/avatar.png"
                alt="Avatar"
                className="zlu-avatar"
              />
              <h2 className="zlu-site-title">{import.meta.env.VITE_BLOG_TITLE || "我的博客"}</h2>
              <p className="zlu-site-description">{import.meta.env.VITE_BLOG_DESCRIPTION || "记录技术与生活"}</p>
            </div>

            <nav className="zlu-nav-menu">
              <a href="/" className="zlu-nav-item">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1v2a1 1 0 001 1h1a1 1 0 001-1v-4a1 1 0 011-1v2a1 1 0 001 1h1m-6 0h6" />
                </svg>
                首页
              </a>
              <a href="/posts" className="zlu-nav-item">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-9-3h19" />
                </svg>
                文章
              </a>
              <a href="/search" className="zlu-nav-item">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                搜索
              </a>
              <a href="/friend-links" className="zlu-nav-item">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                友链
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="zlu-main-content">
            {children}
          </div>

          {/* Right Sidebar - Announcements & Tags */}
          <aside className="zlu-right-sidebar">
            <div className="zlu-sidebar-card">
              <h3 className="zlu-sidebar-title">公告</h3>
              <p className="text-sm text-gray-400">
                欢迎来到我的博客！这里记录我的技术学习心得和生活感悟。
              </p>
            </div>

            <div className="zlu-sidebar-card">
              <h3 className="zlu-sidebar-title">热门文章</h3>
              <div className="space-y-2">
                {/* Will be populated by widget */}
              </div>
            </div>

            <div className="zlu-sidebar-card">
              <h3 className="zlu-sidebar-title">标签</h3>
              <div className="flex flex-wrap gap-2">
                {/* Will be populated by widget */}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer navOptions={navOptions} />
    </div>
  );
}
