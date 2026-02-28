import { Check, Copy } from "lucide-react";
import { memo, useState } from "react";

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
  text: "Plain Text",
  txt: "Plain Text",
};

interface CodeBlockProps {
  code: string;
  language: string | null;
  highlightedHtml?: string;
}

export const CodeBlock = memo(
  ({ code, language, highlightedHtml }: CodeBlockProps) => {
    const fallback = `<pre class="bg-transparent p-0 m-0 border-0"><code>${code}</code></pre>`;
    const html = highlightedHtml || fallback;

    const [copied, setCopied] = useState(false);

    const displayLanguage = language
      ? LANGUAGE_MAP[language.toLowerCase()] || language
      : "Plain Text";

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="my-8 group relative">
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
            <span className="text-sm font-mono text-muted-foreground">
              {displayLanguage}
            </span>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? "已复制" : "复制"}
              {copied ? (
                <Check size={14} />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>

          {/* Code */}
          <div className="overflow-x-auto custom-scrollbar">
            <div className="p-4 bg-background">
              <div
                className="[&>pre]:m-0 [&>pre]:min-w-full [&>pre>code]:p-0"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CodeBlock.displayName = "CodeBlock";
