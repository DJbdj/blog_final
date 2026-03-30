import { useEffect, useState } from "react";
import { useDailyBackground } from "@/features/pexels/queries/pexels.query";

/**
 * 检查当前是否为浅色模式
 */
function isLightMode(): boolean {
  if (typeof document === "undefined") return true;
  const html = document.documentElement;
  return (
    html.classList.contains("light") && !html.classList.contains("system")
  );
}

export function BackgroundLayer() {
  // 跟踪当前是否为浅色模式
  const [currentLightMode, setCurrentLightMode] = useState(() => isLightMode());

  // 获取 Pexels 每日精选背景（仅在浅色模式下启用）
  const { data: pexelsBackground } = useDailyBackground(currentLightMode);

  // 监听主题变化
  useEffect(() => {
    const checkTheme = () => {
      setCurrentLightMode(isLightMode());
    };

    // 初始检查
    checkTheme();

    // 使用 MutationObserver 监听 HTML 类的变化
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 应用 Pexels 背景到 body::before 伪元素
  useEffect(() => {
    // 获取或创建样式元素
    let styleEl = document.getElementById('pexels-background-style') as HTMLStyleElement;

    if (!pexelsBackground || !currentLightMode) {
      // 清除背景
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      // 移除伪元素样式
      if (styleEl) {
        styleEl.remove();
      }
      // 隐藏署名
      const link = document.querySelector('.pexels-credit') as HTMLElement;
      if (link) link.style.display = 'none';
      return;
    }

    // 设置 HTML 和 body 背景为透明
    document.documentElement.style.backgroundColor = 'transparent';
    document.body.style.backgroundColor = 'transparent';

    // 创建或更新伪元素样式
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'pexels-background-style';
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("${pexelsBackground.src.landscape}");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        filter: blur(20px);
        transform: scale(1.1);
        z-index: -1;
        pointer-events: none;
      }
    `;

    // 添加或更新摄影师署名
    let link = document.querySelector('.pexels-credit') as HTMLAnchorElement;
    if (!link) {
      link = document.createElement('a');
      link.href = pexelsBackground.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'pexels-credit';
      link.style.cssText = 'position:fixed;bottom:1rem;right:1rem;font-size:0.75rem;color:#6b7280;opacity:0.5;transition:opacity 0.2s;z-index:9999;pointer-events:auto;text-decoration:none;';
      link.onmouseenter = () => link.style.opacity = '1';
      link.onmouseleave = () => link.style.opacity = '0.5';
      document.body.appendChild(link);
    }

    link.href = pexelsBackground.url;
    link.textContent = `Photo by ${pexelsBackground.photographer} on Pexels`;
    link.style.display = 'block';

    return () => {
      // 清理
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      if (styleEl) {
        styleEl.remove();
      }
      const link = document.querySelector('.pexels-credit') as HTMLElement;
      if (link) link.style.display = 'none';
    };
  }, [pexelsBackground, currentLightMode]);

  return null;
}
