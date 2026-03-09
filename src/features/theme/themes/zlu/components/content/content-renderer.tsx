"use client";

import { useMemo } from "react";
import { ContentRenderer } from "./render";

export function ContentRendererWrapper({ content }: { content: any }) {
  const rendered = useMemo(() => {
    return <ContentRenderer content={content} />;
  }, [content]);

  return rendered;
}
