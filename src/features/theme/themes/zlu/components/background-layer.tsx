import { useEffect, useState } from "react";

// 风景图片列表 - 固定集合
const LANDSCAPE_IMAGES = [
  {
    src: "https://images.pexels.com/photos/1001821/pexels-photo-1001821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Johannes PLATZ",
    url: "https://www.pexels.com/photo/mountain-lake-at-sunset-1001821/",
  },
  {
    src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Pixabay",
    url: "https://www.pexels.com/photo/body-of-water-view-417074/",
  },
  {
    src: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Negar Photo",
    url: "https://www.pexels.com/photo/mountain-with-snow-capped-peaks-167699/",
  },
  {
    src: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Kevin Bidwell",
    url: "https://www.pexels.com/photo/body-of-water-during-daytime-1287145/",
  },
  {
    src: "https://images.pexels.com/photos/2861356/pexels-photo-2861356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Leonardo Silveira",
    url: "https://www.pexels.com/photo/aerial-photography-of-forest-2861356/",
  },
  {
    src: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Jeffry Surianto",
    url: "https://www.pexels.com/photo/landscape-photography-of-trees-1579739/",
  },
  {
    src: "https://images.pexels.com/photos/1118868/pexels-photo-1118868.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Júlia Marques",
    url: "https://www.pexels.com/photo/foggy-forest-1118868/",
  },
  {
    src: "https://images.pexels.com/photos/2662432/pexels-photo-2662432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    photographer: "Daniel Frank",
    url: "https://www.pexels.com/photo/aerial-view-of-beach-2662432/",
  },
];

// 轮换间隔 - 每 30 分钟切换一次
const ROTATION_INTERVAL = 30 * 60 * 1000;

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

/**
 * 根据时间获取当前应该显示的图片索引
 * 使用时间戳确保同一时间段内图片一致
 */
function getCurrentImageIndex(): number {
  const now = new Date();
  const timeSlot = Math.floor(now.getTime() / ROTATION_INTERVAL);
  return timeSlot % LANDSCAPE_IMAGES.length;
}

export function BackgroundLayer() {
  // 跟踪当前是否为浅色模式
  const [currentLightMode, setCurrentLightMode] = useState(() => isLightMode());

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

  // 应用风景背景到 body::before 伪元素
  useEffect(() => {
    // 获取或创建样式元素
    let styleEl = document.getElementById('landscape-background-style') as HTMLStyleElement;

    if (!currentLightMode) {
      // 清除背景
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      // 移除伪元素样式
      if (styleEl) {
        styleEl.remove();
      }
      // 隐藏署名
      const link = document.querySelector('.landscape-credit') as HTMLElement;
      if (link) link.style.display = 'none';
      return;
    }

    // 获取当前图片
    const currentImage = LANDSCAPE_IMAGES[getCurrentImageIndex()];

    // 设置 HTML 和 body 背景为透明
    document.documentElement.style.backgroundColor = 'transparent';
    document.body.style.backgroundColor = 'transparent';

    // 创建或更新伪元素样式
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'landscape-background-style';
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
        background-image: url("${currentImage.src}");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        filter: blur(4px);
        transform: scale(1.02);
        z-index: -1;
        pointer-events: none;
      }
    `;

    // 添加或更新摄影师署名
    let link = document.querySelector('.landscape-credit') as HTMLAnchorElement;
    if (!link) {
      link = document.createElement('a');
      link.href = currentImage.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'landscape-credit';
      link.style.cssText = 'position:fixed;bottom:1rem;right:1rem;font-size:0.75rem;color:#6b7280;opacity:0.5;transition:opacity 0.2s;z-index:9999;pointer-events:auto;text-decoration:none;';
      link.onmouseenter = () => link.style.opacity = '1';
      link.onmouseleave = () => link.style.opacity = '0.5';
      document.body.appendChild(link);
    }

    link.href = currentImage.url;
    link.textContent = `Photo by ${currentImage.photographer}`;
    link.style.display = 'block';

    return () => {
      // 清理
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      if (styleEl) {
        styleEl.remove();
      }
      const link = document.querySelector('.landscape-credit') as HTMLElement;
      if (link) link.style.display = 'none';
    };
  }, [currentLightMode]);

  return null;
}
