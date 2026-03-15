import { useMemo } from "react";
import type { JSONContent } from "@tiptap/react";
import { renderReact } from "./render";

interface ContentRendererProps {
  content: JSONContent;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  const rendered = useMemo(() => renderReact(content), [content]);
  return <>{rendered}</>;
}
