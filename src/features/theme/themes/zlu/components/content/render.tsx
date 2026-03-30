import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { extensions } from "@/features/posts/editor/config";
import { CodeBlock } from "./code-block";
import { ImageDisplay } from "./image-display";
import { MathFormula } from "@/components/content/math-formula";
import type {} from "react";

function renderReact(content: any) {
  return renderToReactElement({
    extensions,
    content,
    options: {
      nodeMapping: {
        image: ({ node: _node }: any) => (
          <ImageDisplay
            src={_node.attrs.src}
            alt={_node.attrs.alt || ""}
            caption={_node.attrs.caption}
          />
        ),
        codeBlock: ({ node: _node }: any) => {
          const code = _node.textContent || "";
          const language = _node.attrs?.language || "text";
          return (
            <CodeBlock
              code={code}
              language={language}
            />
          );
        },
        table: ({ node: _node, children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse text-sm">
              {children}
            </table>
          </div>
        ),
        tableRow: ({ node: _node, children }) => (
          <tr className="border-b border-[var(--zlu-border)]">{children}</tr>
        ),
        tableHeader: ({ node: _node, children }: any) => {
          const attrs = _node.attrs as {
            colspan?: number;
            rowspan?: number;
            colwidth?: Array<number>;
            style?: string;
          };
          return (
            <th
              className="border border-[var(--zlu-border)] px-4 py-2 bg-[var(--zlu-bg-tertiary)] font-semibold text-left"
              colSpan={attrs.colspan}
              rowSpan={attrs.rowspan}
              style={attrs.style ? { width: attrs.style } : undefined}
            >
              {children}
            </th>
          );
        },
        tableCell: ({ node: _node, children }: any) => {
          const attrs = _node.attrs as {
            colspan?: number;
            rowspan?: number;
            colwidth?: Array<number>;
            style?: string;
          };
          return (
            <td
              className="border border-[var(--zlu-border)] px-4 py-2"
              colSpan={attrs.colspan}
              rowSpan={attrs.rowspan}
              style={attrs.style ? { width: attrs.style } : undefined}
            >
              {children}
            </td>
          );
        },
        blockquote: ({ node: _node, children }: any) => (
          <blockquote className="border-l-4 border-[var(--zlu-primary)] pl-4 my-4 italic text-[var(--zlu-text-secondary)]">
            {children}
          </blockquote>
        ),
        bulletList: ({ node: _node, children }: any) => (
          <ul className="list-disc list-inside my-4 space-y-1 text-[var(--zlu-text-secondary)]">
            {children}
          </ul>
        ),
        orderedList: ({ node: _node, children }: any) => (
          <ol className="list-decimal list-inside my-4 space-y-1 text-[var(--zlu-text-secondary)]">
            {children}
          </ol>
        ),
        listItem: ({ node: _node, children }: any) => (
          <li className="my-2">{children}</li>
        ),
        heading: ({ node: _node, children }: any) => {
          const level = _node.attrs.level as number;
          // 从 node 的文本内容中提取 ID，而不是从 children
          const textContent = _node.textContent || "";
          const id = textContent
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/^-|-$/g, "");

          const baseClasses = "text-[var(--zlu-text-primary)] font-semibold mt-6 mb-3 scroll-mt-24";
          if (level === 1) return <h1 id={id} className={`${baseClasses} text-3xl`}>{children}</h1>;
          if (level === 2) return <h2 id={id} className={`${baseClasses} text-2xl`}>{children}</h2>;
          if (level === 3) return <h3 id={id} className={`${baseClasses} text-xl`}>{children}</h3>;
          if (level === 4) return <h4 id={id} className={`${baseClasses} text-lg`}>{children}</h4>;
          if (level === 5) return <h5 id={id} className={`${baseClasses} text-base`}>{children}</h5>;
          return <h6 id={id} className={`${baseClasses} text-sm`}>{children}</h6>;
        },
        paragraph: ({ node: _node, children }: any) => (
          <p className="text-[var(--zlu-text-secondary)] my-4 leading-relaxed">
            {children}
          </p>
        ),
        text: ({ node: _node }: any) => {
          const text = _node.text || "";
          const marks = _node.marks || [];

          let rendered: React.ReactNode = text;
          for (const mark of marks) {
            if (mark.type === "bold") {
              rendered = <strong key={mark.type}>{rendered}</strong>;
            } else if (mark.type === "italic") {
              rendered = <em key={mark.type}>{rendered}</em>;
            } else if (mark.type === "code") {
              rendered = <code key={mark.type} className="bg-[var(--zlu-bg-tertiary)] px-1 py-0.5 rounded text-sm font-mono text-[var(--zlu-primary)]">{rendered}</code>;
            } else if (mark.type === "underline") {
              rendered = <u key={mark.type}>{rendered}</u>;
            } else if (mark.type === "strike") {
              rendered = <s key={mark.type}>{rendered}</s>;
            } else if (mark.type === "link") {
              rendered = <a key={mark.attrs.href} href={mark.attrs.href} className="text-[var(--zlu-primary)] hover:text-[var(--zlu-primary-hover)] underline" target="_blank" rel="noopener noreferrer">{rendered}</a>;
            }
          }
          return rendered;
        },
        inlineMath: ({ node: _node }: any) => {
          const latex = _node.attrs?.latex ?? "";
          return <MathFormula latex={latex} mode="inline" />;
        },
        blockMath: ({ node: _node }: any) => {
          const latex = _node.attrs?.latex ?? "";
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
