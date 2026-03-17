import type { JSONContent } from "@tiptap/react";

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Pre-process markdown: convert $...$ and $$...$$ to HTML elements
 * so that marked passes them through and DOMParser can parse them.
 */
function preprocessMathInMarkdown(markdown: string): string {
  const placeholders: Array<string> = [];
  const savePlaceholder = (raw: string): string => {
    const idx = placeholders.push(raw) - 1;
    return `\u0000MATH_PLACEHOLDER_${idx}\u0000`;
  };

  // Protect code regions first to avoid replacing math syntax inside code.
  let result = markdown
    .replace(/~~~[\s\S]*?~~~/g, (m) => savePlaceholder(m))
    .replace(/(`+)[\s\S]*?\1/g, (m) => savePlaceholder(m));

  // Block math first: $$...$$ (multiline)
  result = result.replace(/\$\$([\s\S]*?)\$\$/g, (_, latex) => {
    const trimmed = latex.trim();
    const escaped = escapeHtmlAttr(trimmed);
    return `<div data-type="block-math" data-latex="${escaped}"></div>`;
  });
  // Inline math: $...$ (no $ or newline inside)
  result = result.replace(/\$([^$\n]+?)\$/g, (match, latex) => {
    const trimmed = latex.trim();

    const startsWithNumber = /^\d+([.,]\d+)?/.test(trimmed);
    const isPureNumber = /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?\s*$/.test(
      trimmed,
    );
    const hasRangeOrCurrencyWords = /\b(?:and|or|to|per|each)\b/i.test(trimmed);
    const hasEnglishWordsAfterNumber = /^\d+([.,]\d+)?\s+[a-zA-Z]+/.test(
      trimmed,
    );
    const hasNonLatexToken = /[^\d\s.,+\-*/=^_(){}\\a-zA-Z]/.test(trimmed);

    if (
      isPureNumber ||
      (startsWithNumber &&
        (hasRangeOrCurrencyWords ||
          hasEnglishWordsAfterNumber ||
          hasNonLatexToken))
    ) {
      return match; // leave as-is for currency/range-like text
    }

    const escaped = escapeHtmlAttr(trimmed);
    return `<span data-type="inline-math" data-latex="${escaped}"></span>`;
  });

  let restored = result;
  placeholders.forEach((value, idx) => {
    restored = restored.replaceAll(
      `\u0000MATH_PLACEHOLDER_${idx}\u0000`,
      value,
    );
  });
  return restored;
}

/**
 * Markdown → JSONContent 转换
 *
 * 使用与编辑器相同的扩展配置，确保解析结果与编辑器兼容。
 */
export async function markdownToJsonContent(
  markdown: string,
): Promise<JSONContent> {
  const preprocessed = preprocessMathInMarkdown(markdown);

  const { marked } = await import("marked");
  const html = await marked(preprocessed);

  const { getSchema } = await import("@tiptap/core");
  const { DOMParser: PMDOMParser } = await import("@tiptap/pm/model");
  const { parseHTML } = await import("linkedom");

  // 使用与编辑器相同的扩展配置
  const { default: StarterKit } = await import("@tiptap/starter-kit");
  const { default: ImageExt } = await import("@tiptap/extension-image");
  const { default: Mathematics } =
    await import("@tiptap/extension-mathematics");
  const { Table } = await import("@tiptap/extension-table");
  const { default: TableRow } = await import("@tiptap/extension-table-row");
  const { default: TableHeader } =
    await import("@tiptap/extension-table-header");
  const { default: TableCell } = await import("@tiptap/extension-table-cell");

  // 导入自定义扩展
  const { ImageExtension } = await import(
    "@/features/posts/editor/extensions/images"
  );
  const { CodeBlockExtension } = await import(
    "@/features/posts/editor/extensions/code-block"
  );
  const { HeadingExtension } = await import(
    "@/features/posts/editor/extensions/typography/heading"
  );
  const { BlockQuoteExtension } = await import(
    "@/features/posts/editor/extensions/typography/block-quote"
  );
  const {
    BulletListExtension,
    OrderedListExtension,
    ListItemExtension,
  } = await import("@/features/posts/editor/extensions/typography/list");

  const schema = getSchema([
    StarterKit.configure({
      orderedList: false,
      bulletList: false,
      listItem: false,
      heading: false,
      codeBlock: false,
      blockquote: false,
      code: {
        HTMLAttributes: {
          class:
            "font-mono text-sm px-1 text-foreground/80 bg-muted/40 rounded-sm",
          spellCheck: false,
        },
      },
      underline: {
        HTMLAttributes: {
          class: "underline underline-offset-4 decoration-border/60",
        },
      },
      strike: {
        HTMLAttributes: {
          class: "line-through opacity-50 decoration-foreground/40",
        },
      },
      link: {
        autolink: true,
        openOnClick: false,
        HTMLAttributes: {
          class:
            "font-normal underline underline-offset-4 decoration-border hover:decoration-foreground transition-all duration-300 cursor-pointer text-foreground",
          target: "_blank",
        },
      },
    }),
    BulletListExtension,
    OrderedListExtension,
    ListItemExtension,
    HeadingExtension.configure({
      levels: [1, 2, 3, 4],
    }),
    BlockQuoteExtension,
    CodeBlockExtension,
    Mathematics.configure({
      katexOptions: { throwOnError: false },
    }),
    Table,
    TableRow,
    TableHeader,
    TableCell,
    ImageExtension,
  ]);

  const { document } = parseHTML(
    `<!DOCTYPE html><html><body>${html}</body></html>`,
  );

  return PMDOMParser.fromSchema(schema)
    .parse(document.body as unknown as Element)
    .toJSON() as JSONContent;
}
