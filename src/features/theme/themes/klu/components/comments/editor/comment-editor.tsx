import { useState } from "react";
import { Loader2, Send, Bold, Italic, Link as LinkIcon } from "lucide-react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import { commentExtensions } from "@/features/comments/components/editor/config";

interface CommentEditorProps {
  onSubmit: (content: JSONContent) => Promise<void>;
  isSubmitting?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export function KluCommentEditor({
  onSubmit,
  isSubmitting,
  autoFocus,
  placeholder = "写下你的评论...",
}: CommentEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: commentExtensions,
    content: "",
    autofocus: autoFocus ? "end" : false,
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full bg-transparent py-3 px-4 text-sm focus:outline-none text-[var(--klu-text-secondary)]",
        placeholder,
      },
    },
  });

  const { isEmpty } = useEditorState({
    editor,
    selector: (ctx) => ({
      isEmpty: ctx.editor.isEmpty,
    }),
  });

  const handleSubmit = async () => {
    if (isEmpty || isSubmitting || !editor) return;

    try {
      await onSubmit(editor.getJSON());
      editor.commands.clearContent();
    } catch (error) {
      // Error handled by parent hook
    }
  };

  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleLink = () => {
    const url = window.prompt("输入链接地址:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div
      className={`rounded-xl border bg-[var(--klu-bg-secondary)] transition-all overflow-hidden ${
        isFocused
          ? "border-[var(--klu-accent-primary)] ring-1 ring-[var(--klu-accent-primary)]/20"
          : "border-[var(--klu-border-primary)]"
      }`}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[var(--klu-border-primary)] bg-[var(--klu-bg-tertiary)]">
        <button
          type="button"
          onClick={toggleBold}
          className={`p-1.5 rounded-md transition-colors ${
            editor.isActive("bold")
              ? "bg-[var(--klu-accent-primary)]/20 text-[var(--klu-accent-primary)]"
              : "text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-elevated)]"
          }`}
          title="粗体"
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          onClick={toggleItalic}
          className={`p-1.5 rounded-md transition-colors ${
            editor.isActive("italic")
              ? "bg-[var(--klu-accent-primary)]/20 text-[var(--klu-accent-primary)]"
              : "text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-elevated)]"
          }`}
          title="斜体"
        >
          <Italic size={14} />
        </button>
        <div className="w-px h-4 bg-[var(--klu-border-primary)] mx-1" />
        <button
          type="button"
          onClick={toggleLink}
          className={`p-1.5 rounded-md transition-colors ${
            editor.isActive("link")
              ? "bg-[var(--klu-accent-primary)]/20 text-[var(--klu-accent-primary)]"
              : "text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)] hover:bg-[var(--klu-bg-elevated)]"
          }`}
          title="链接"
        >
          <LinkIcon size={14} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Submit button */}
      <div className="flex justify-end px-3 py-2 border-t border-[var(--klu-border-primary)]">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isEmpty || isSubmitting}
          className="klu-btn klu-btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <>
              <Send size={14} />
              发送
            </>
          )}
        </button>
      </div>
    </div>
  );
}
