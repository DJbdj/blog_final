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

  return (
    <>
      {/* Pexels 背景图片（仅在浅色模式且有数据时显示） */}
      {pexelsBackground && currentLightMode && (
        <>
          <link rel="preload" as="image" href={pexelsBackground.src.landscape} />
          <div
            className="fixed inset-0 -z-10 overflow-hidden"
            style={{
              pointerEvents: "none",
              backgroundImage: `url("${pexelsBackground.src.landscape}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.15,
            }}
          />
          {/* 摄影师署名 */}
          <a
            href={pexelsBackground.url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 text-xs text-gray-500 opacity-50 hover:opacity-100 transition-opacity z-0"
            style={{ pointerEvents: "auto" }}
          >
            Photo by {pexelsBackground.photographer} on Pexels
          </a>
        </>
      )}

      {/* Gradient Orbs */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--zlu-primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--zlu-accent) 0%, transparent 70%)",
          }}
        />
      </div>
    </>
  );
}
