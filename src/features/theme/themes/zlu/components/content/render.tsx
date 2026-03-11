import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { extensions } from "@/features/posts/editor/config";
import { CodeBlock } from "./code-block";
import { ImageDisplay } from "./image-display";
import { MathFormula } from "@/components/content/math-formula";
import type { ReactNode, ReactElement } from "react";

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
        codeBlock: ({ node }: any) => {
          const code = node.textContent || "";
          const language = node.attrs?.language || "text";
          return (
            <CodeBlock
              code={code}
              language={language}
            />
          );
        },
        table: ({ node, children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse text-sm">
              {children}
            </table>
          </div>
        ),
        tableRow: ({ node, children }) => (
          <tr className="border-b border-gray-700">{children}</tr>
        ),
        tableHeader: ({ node, children }: any) => {
          const attrs = node.attrs as {
            colspan?: number;
            rowspan?: number;
            colwidth?: Array<number>;
            style?: string;
          };
          return (
            <th
              className="border border-gray-700 px-4 py-2 bg-gray-800 font-semibold text-left"
              colSpan={attrs.colspan}
              rowSpan={attrs.rowspan}
              style={attrs.style ? { width: attrs.style } : undefined}
            >
              {children}
            </th>
          );
        },
        tableCell: ({ node, children }: any) => {
          const attrs = node.attrs as {
            colspan?: number;
            rowspan?: number;
            colwidth?: Array<number>;
            style?: string;
          };
          return (
            <td
              className="border border-gray-700 px-4 py-2"
              colSpan={attrs.colspan}
              rowSpan={attrs.rowspan}
              style={attrs.style ? { width: attrs.style } : undefined}
            >
              {children}
            </td>
          );
        },
        blockquote: ({ node, children }: any) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-400">
            {children}
          </blockquote>
        ),
        bulletList: ({ node, children }: any) => (
          <ul className="list-disc list-inside my-4 space-y-1 text-gray-300">
            {children}
          </ul>
        ),
        orderedList: ({ node, children }: any) => (
          <ol className="list-decimal list-inside my-4 space-y-1 text-gray-300">
            {children}
          </ol>
        ),
        listItem: ({ node, children }: any) => (
          <li className="my-2">{children}</li>
        ),
        heading: ({ node, children }: any) => {
          const level = node.attrs.level as number;
          if (level === 1) return <h1 className="text-white font-semibold text-3xl mt-6 mb-3">{children}</h1>;
          if (level === 2) return <h2 className="text-white font-semibold text-2xl mt-6 mb-3">{children}</h2>;
          if (level === 3) return <h3 className="text-white font-semibold text-xl mt-6 mb-3">{children}</h3>;
          if (level === 4) return <h4 className="text-white font-semibold text-lg mt-6 mb-3">{children}</h4>;
          if (level === 5) return <h5 className="text-white font-semibold text-base mt-6 mb-3">{children}</h5>;
          return <h6 className="text-white font-semibold text-sm mt-6 mb-3">{children}</h6>;
        },
        paragraph: ({ node, children }: any) => (
          <p className="text-gray-300 my-4 leading-relaxed">
            {children}
          </p>
        ),
        text: ({ node }: any) => {
          const text = node.text || "";
          const marks = node.marks || [];

          let rendered: React.ReactNode = text;
          for (const mark of marks) {
            if (mark.type === "bold") {
              rendered = <strong key={mark.type}>{rendered}</strong>;
            } else if (mark.type === "italic") {
              rendered = <em key={mark.type}>{rendered}</em>;
            } else if (mark.type === "code") {
              rendered = <code key={mark.type} className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-pink-400">{rendered}</code>;
            } else if (mark.type === "underline") {
              rendered = <u key={mark.type}>{rendered}</u>;
            } else if (mark.type === "strike") {
              rendered = <s key={mark.type}>{rendered}</s>;
            } else if (mark.type === "link") {
              rendered = <a key={mark.attrs.href} href={mark.attrs.href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{rendered}</a>;
            }
          }
          return rendered;
        },
        inlineMath: ({ node }: any) => {
          const latex = node.attrs?.latex ?? "";
          return <MathFormula latex={latex} mode="inline" />;
        },
        blockMath: ({ node }: any) => {
          const latex = node.attrs?.latex ?? "";
          return <MathFormula latex={latex} mode="block" />;
        },
        hardBreak: () => <br />,
        bullet: () => null,
      },
    },
  });
}

export function ContentRenderer({ content }: { content: any }) {
  return renderReact(content);
}
