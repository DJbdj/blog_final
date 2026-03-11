import { useMemo } from "react";
import { ContentRenderer as Renderer } from "./render";

export function ContentRendererWrapper({ content }: { content: any }) {
  const rendered = useMemo(() => {
    return <Renderer content={content} />;
  }, [content]);

  return rendered;
}
