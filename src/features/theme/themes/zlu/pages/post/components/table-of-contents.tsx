"use client";

import { useEffect, useState } from "react";
import type { JSONContent } from "@tiptap/react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface PostTableOfContentsProps {
  content: JSONContent | null;
}

export function PostTableOfContents({ content }: PostTableOfContentsProps) {
  const [headers, setHeaders] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 从 contentJson 中提取标题
  useEffect(() => {
    if (!content) return;

    const items: TOCItem[] = [];

    function extractHeaders(node: JSONContent) {
      if (node.type === "heading" && node.attrs?.level >= 2 && node.attrs?.level <= 4) {
        const text = node.content?.map((c: JSONContent) => c.text || "").join("") || "";
        if (text) {
          const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, "");
          items.push({
            id: id || `heading-${items.length}`,
            text,
            level: node.attrs!.level,
          });
        }
      }
      if (node.content) {
        node.content.forEach(extractHeaders);
      }
    }

    extractHeaders(content);
    setHeaders(items);
  }, [content]);

  // 监听滚动，高亮当前章节
  useEffect(() => {
    if (headers.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headers.forEach((header) => {
      const element = document.getElementById(header.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headers]);

  if (headers.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-24">
      <div className="zlu-sidebar-card">
        <h3 className="zlu-sidebar-title">目录</h3>
        <nav className="zlu-toc-nav">
        {headers.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`
              block w-full text-left text-sm transition-all duration-200
              ${activeId === item.id
                ? "text-[var(--zlu-primary)] font-medium"
                : "text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)]"
              }
            `}
            style={{
              paddingLeft: `${(item.level - 2) * 0.75 + 0.5}rem`,
              fontSize: item.level === 2 ? "0.875rem" : "0.8125rem"
            }}
          >
            <span className={`
              inline-block border-l-2 transition-all duration-200
              ${activeId === item.id
                ? "border-[var(--zlu-primary)] pl-2"
                : "border-transparent pl-2 hover:border-[var(--zlu-border)]"
              }
            `}>
              {item.text}
            </span>
          </button>
        ))}
        </nav>
      </div>
    </div>
  );
}
