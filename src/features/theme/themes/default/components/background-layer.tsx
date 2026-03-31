import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useLandscapeImage } from "@/features/background/queries/background.query";
import type { DefaultThemeBackground } from "@/features/config/site-config.schema";

const baseStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
};

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

  // 获取风景图片（仅在无自定义图片且为浅色模式时使用）
  const { data: landscapeImage } = useLandscapeImage(
    !hasAnyImage && currentLightMode
  );

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

  useEffect(() => {
    if ((!background || !hasAnyImage || !isHomepage) && !landscapeImage)
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
  }, [background, hasAnyImage, isHomepage, landscapeImage]);

  // 确定使用哪个背景图片
  const effectiveHomeImage = landscapeImage?.src.landscape || background?.homeImage;
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
      {landscapeImage && currentLightMode && (
        <a
          href={landscapeImage.url}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 text-xs text-gray-500 opacity-50 hover:opacity-100 transition-opacity z-10"
          style={{ pointerEvents: "auto" }}
        >
          Photo by {landscapeImage.photographer}
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
