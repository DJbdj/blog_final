import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { DefaultThemeBackground } from "@/features/config/site-config.schema";

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
 */
function getCurrentImageIndex(): number {
  const now = new Date();
  const timeSlot = Math.floor(now.getTime() / ROTATION_INTERVAL);
  return timeSlot % LANDSCAPE_IMAGES.length;
}

const baseStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
};

export function BackgroundLayer({
  background,
}: {
  background?: DefaultThemeBackground;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isHomepage = pathname === "/" || pathname === "";
  const hasAnyImage = Boolean(
    background &&
      (background.homeImage !== "" || background.globalImage !== ""),
  );

  // 跟踪当前是否为浅色模式
  const [currentLightMode, setCurrentLightMode] = useState(() => isLightMode());

  // 监听主题变化
  useEffect(() => {
    const checkTheme = () => {
      setCurrentLightMode(isLightMode());
    };

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 获取当前风景图片（仅在无自定义图片且为浅色模式时使用）
  const currentLandscape = !hasAnyImage && currentLightMode
    ? LANDSCAPE_IMAGES[getCurrentImageIndex()]
    : null;

  useEffect(() => {
    if ((!background || !hasAnyImage || !isHomepage) && !currentLandscape)
      return;

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      containerRef.current?.style.setProperty(
        "--scroll-progress",
        String(progress),
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [background, hasAnyImage, isHomepage, currentLandscape]);

  // 确定使用哪个背景图片
  const effectiveHomeImage = currentLandscape?.src || background?.homeImage;
  const effectiveGlobalImage = background?.globalImage;
  const hasEffectiveImage = Boolean(effectiveHomeImage || effectiveGlobalImage);

  if (!hasEffectiveImage) return null;

  const {
    light,
    dark,
    backdropBlur,
    transitionDuration,
  } = background || {
    light: { opacity: 0.15 },
    dark: { opacity: 0.1 },
    backdropBlur: 8,
    transitionDuration: 600,
  };

  const imageStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: backdropBlur ? `blur(${backdropBlur}px)` : undefined,
  };

  const transition = `opacity ${transitionDuration}ms ease`;

  const homeOpacityExpr = isHomepage
    ? "calc((1 - var(--scroll-progress, 0)) * var(--bg-opacity))"
    : "0";
  const globalOpacityExpr = isHomepage
    ? "calc(var(--scroll-progress, 0) * var(--bg-opacity))"
    : "var(--bg-opacity)";

  return (
    <>
      {effectiveHomeImage && (
        <link rel="preload" as="image" href={effectiveHomeImage} />
      )}
      {effectiveGlobalImage && (
        <link rel="preload" as="image" href={effectiveGlobalImage} />
      )}

      {/* 摄影师署名（仅在使用风景轮换图片时显示） */}
      {currentLandscape && currentLightMode && (
        <a
          href={currentLandscape.url}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 text-xs text-gray-500 opacity-50 hover:opacity-100 transition-opacity z-10"
          style={{ pointerEvents: "auto" }}
        >
          Photo by {currentLandscape.photographer}
        </a>
      )}

      <div
        ref={containerRef}
        aria-hidden="true"
        className="[--bg-opacity:var(--bg-opacity-light)] dark:[--bg-opacity:var(--bg-opacity-dark)]"
        style={
          {
            "--bg-opacity-light": light.opacity,
            "--bg-opacity-dark": dark.opacity,
            "--scroll-progress": "0",
          } as React.CSSProperties
        }
      >
        {effectiveHomeImage && (
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url("${effectiveHomeImage}")`,
              opacity: homeOpacityExpr,
              transition,
            }}
          />
        )}

        {effectiveGlobalImage && (
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url("${effectiveGlobalImage}")`,
              opacity: globalOpacityExpr,
              transition,
            }}
          />
        )}

        {(isHomepage || Boolean(effectiveGlobalImage)) && (
          <div
            className="bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.3),rgba(255,255,255,0.8))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.3),rgba(0,0,0,0.8))]"
            style={baseStyle}
          />
        )}
      </div>
    </>
  );
}
