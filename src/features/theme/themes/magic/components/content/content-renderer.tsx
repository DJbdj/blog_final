import { useMemo } from "react";
import type { JSONContent } from "@tiptap/react";
import { renderReact } from "./render";
import { cn } from "@/lib/utils";

interface ContentRendererProps {
  content: JSONContent | null;
  className?: string;
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  const renderedContent = useMemo(() => {
    if (!content) return null;
    return renderReact(content);
  }, [content]);

  if (!content) {
    return null;
  }

  return (
    <div className={cn("magic-content prose max-w-none", className)}>
      {renderedContent}
    </div>
  );
}
