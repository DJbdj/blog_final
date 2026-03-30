"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLightMode, setIsLightMode] = useState(false);

  // 检测当前主题
  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setIsLightMode(isLight);
    };

    checkTheme();

    // 监听主题变化
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function highlight() {
      try {
        // 根据主题选择 shiki 主题
        const theme = isLightMode ? "github-light" : "one-dark-pro";
        const html = await codeToHtml(code, {
          lang: language === "text" ? "text" : language,
          theme,
        });
        // 提取 shiki 生成的 code 内容，去掉外层的 pre
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const preElement = doc.querySelector("pre");
        if (preElement) {
          setHighlightedCode(preElement.innerHTML);
        } else {
          setHighlightedCode(`<code>${escapeHtml(code)}</code>`);
        }
      } catch {
        setHighlightedCode(`<code>${escapeHtml(code)}</code>`);
      }
    }
    highlight();
  }, [code, language, isLightMode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return (
    <div className="my-4 relative group">
      <pre className="zlu-code-block">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1 text-xs text-[var(--zlu-text-tertiary)] hover:text-[var(--zlu-text-primary)] transition-colors opacity-0 group-hover:opacity-100 bg-[var(--zlu-bg-secondary)] px-2 py-1 rounded border border-[var(--zlu-border)]"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3" />
            已复制
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            复制
          </>
        )}
      </button>
    </div>
  );
}
