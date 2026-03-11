import { ContentRenderer as Renderer } from "./render";

export function ContentRendererWrapper({ content }: { content: any }) {
  return <Renderer content={content} />;
}
