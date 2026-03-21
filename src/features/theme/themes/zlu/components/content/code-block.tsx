"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function highlight() {
      try {
        const html = await codeToHtml(code, {
          lang: language === "text" ? "text" : language,
          theme: "one-dark-pro",
        });
        // 提取 shiki 生成的 code 内容，去掉外层的 pre
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const preElement = doc.querySelector("pre");
        if (preElement) {
          // 保留 shiki 的 pre 结构和样式
          setHighlightedCode(preElement.innerHTML);
        } else {
          setHighlightedCode(`<code>${escapeHtml(code)}</code>`);
        }
      } catch {
        setHighlightedCode(`<code>${escapeHtml(code)}</code>`);
      }
    }
    highlight();
  }, [code, language]);

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
    <div className="my-4 relative group" ref={containerRef}>
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
