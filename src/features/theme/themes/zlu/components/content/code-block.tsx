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

  useEffect(() => {
    async function highlight() {
      try {
        const html = await codeToHtml(code, {
          lang: language === "text" ? "text" : language,
          theme: "one-dark-pro",
        });
        setHighlightedCode(html);
      } catch {
        // Fallback to plain text if language not supported
        setHighlightedCode(`<pre><code>${escapeHtml(code)}</code></pre>`);
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
    <div className="my-4">
      <pre className="relative group">
        <code
          className="block"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1 text-xs text-[var(--zlu-text-tertiary)] hover:text-[var(--zlu-text-primary)] transition-colors opacity-0 group-hover:opacity-100 bg-[var(--zlu-bg-secondary)] px-2 py-1 rounded"
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
      </pre>
    </div>
  );
}
