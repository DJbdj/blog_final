"use client";

import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { extensions } from "@/features/posts/editor/config";
import { CodeBlock } from "./code-block";
import { ImageDisplay } from "./image-display";
import { useMemo } from "react";

function renderReact(content: any) {
  return renderToReactElement({
    extensions,
    content,
    options: {
      nodeMapping: {
        image: ({ node }: any) => (
          <ImageDisplay
            src={node.attrs.src}
            alt={node.attrs.alt || ""}
            caption={node.attrs.caption}
          />
        ),
        codeBlock: ({ node }: any) => (
          <CodeBlock
            code={node.content?.[0]?.text || ""}
            language={node.attrs.language || "text"}
          />
        ),
        tableCell: ({ node }: any) => (
          <td className="border border-gray-700 px-4 py-2">
            {node.content?.[0]?.text || ""}
          </td>
        ),
        tableHeader: ({ node }: any) => (
          <th className="border border-gray-700 px-4 py-2 bg-gray-800 font-semibold">
            {node.content?.[0]?.text || ""}
          </th>
        ),
        blockquote: ({ node }: any) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-400">
            {node.content?.map((c: any) => c.text).join("") || ""}
          </blockquote>
        ),
        bulletList: ({ node }: any) => (
          <ul className="list-disc list-inside my-4 space-y-1 text-gray-300">
            {node.content?.map((item: any, idx: number) => (
              <li key={idx}>{item.content?.map((c: any) => c.text).join("") || ""}</li>
            ))}
          </ul>
        ),
        orderedList: ({ node }: any) => (
          <ol className="list-decimal list-inside my-4 space-y-1 text-gray-300">
            {node.content?.map((item: any, idx: number) => (
              <li key={idx}>{item.content?.map((c: any) => c.text).join("") || ""}</li>
            ))}
          </ol>
        ),
        heading: ({ node }: any) => {
          const level = node.attrs.level as number;
          const text = node.content?.map((c: any) => c.text).join("") || "";
          if (level === 1) return <h1 className="text-white font-semibold text-3xl mt-6 mb-3">{text}</h1>;
          if (level === 2) return <h2 className="text-white font-semibold text-2xl mt-6 mb-3">{text}</h2>;
          if (level === 3) return <h3 className="text-white font-semibold text-xl mt-6 mb-3">{text}</h3>;
          if (level === 4) return <h4 className="text-white font-semibold text-lg mt-6 mb-3">{text}</h4>;
          if (level === 5) return <h5 className="text-white font-semibold text-base mt-6 mb-3">{text}</h5>;
          return <h6 className="text-white font-semibold text-sm mt-6 mb-3">{text}</h6>;
        },
        paragraph: ({ node }: any) => (
          <p className="text-gray-300 my-4 leading-relaxed">
            {node.content?.map((c: any) => c.text).join("") || ""}
          </p>
        ),
      },
    },
  });
}

export function ContentRenderer({ content }: { content: any }) {
  const rendered = useMemo(() => renderReact(content), [content]);
  return rendered;
}
