import { useState, useRef, useLayoutEffect, memo } from "react";
import { Check, Copy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Map short codes to display labels
const LANGUAGE_MAP: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  js: "JavaScript",
  javascript: "JavaScript",
  jsx: "JSX",
  tsx: "TSX",
  py: "Python",
  python: "Python",
  rb: "Ruby",
  ruby: "Ruby",
  go: "Go",
  rs: "Rust",
  rust: "Rust",
  java: "Java",
  cpp: "C++",
  c: "C",
  php: "PHP",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  yaml: "YAML",
  xml: "XML",
  sql: "SQL",
  sh: "Shell",
  bash: "Bash",
  md: "Markdown",
  text: "Text",
  txt: "Text",
};

interface CodeBlockProps {
  code: string;
  language: string | null;
  highlightedHtml?: string;
}

const FOLD_THRESHOLD = 400;

export const CodeBlock = memo(
  ({ code, language, highlightedHtml }: CodeBlockProps) => {
    const fallback = `<pre class="shiki font-mono text-sm leading-relaxed"><code>${code}</code></pre>`;
    const html = highlightedHtml || fallback;

    const [copied, setCopied] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [needsFolding, setNeedsFolding] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        if (scrollHeight > FOLD_THRESHOLD + 50) {
          setNeedsFolding(true);
          setContentHeight(scrollHeight);
        }
      }
    }, [html]);

    const displayLanguage = language
      ? LANGUAGE_MAP[language.toLowerCase()] || language.toLowerCase()
      : "text";

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative group my-6 not-prose">
        <div className="relative rounded-xl border border-[var(--klu-border-primary)] bg-[var(--klu-bg-secondary)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[var(--klu-bg-tertiary)] border-b border-[var(--klu-border-primary)]">
            {/* Language Badge */}
            <span className="text-xs font-mono font-medium text-[var(--klu-accent-primary)] uppercase">
              {displayLanguage}
            </span>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              aria-label="Copy code"
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all",
                "text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-elevated)]",
                copied && "text-[var(--klu-accent-success)]"
              )}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  已复制
                </>
              ) : (
                <>
                  <Copy size={14} />
                  复制
                </>
              )}
            </button>
          </div>

          {/* Code Area */}
          <div
            className={cn("overflow-auto custom-scrollbar", needsFolding && "relative")}
            style={
              needsFolding
                ? { maxHeight: isCollapsed ? FOLD_THRESHOLD : contentHeight }
                : undefined
            }
          >
            <div
              ref={contentRef}
              className="text-sm font-mono leading-relaxed"
            >
              <div
                className="[&>pre]:p-4 [&>pre]:m-0 [&>pre]:min-w-full [&>pre>code]:p-0"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>

            {/* Fade mask for folded state */}
            {needsFolding && isCollapsed && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--klu-bg-secondary)] to-transparent pointer-events-none" />
            )}
          </div>

          {/* Expand Button */}
          {needsFolding && (
            <div
              className={cn(
                "absolute bottom-4 left-0 right-0 flex justify-center z-10 transition-all",
                isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <button
                onClick={() => setIsCollapsed(false)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-[var(--klu-text-secondary)] bg-[var(--klu-bg-tertiary)] hover:bg-[var(--klu-border-primary)] transition-colors"
              >
                <ChevronDown size={14} />
                显示更多
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);
