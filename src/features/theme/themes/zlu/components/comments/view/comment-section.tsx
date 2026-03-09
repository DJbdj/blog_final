"use client";

import { useState } from "react";

interface CommentEditorProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
}

function CommentEditor({ onSubmit, isSubmitting }: CommentEditorProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的评论..."
        className="zlu-input min-h-[100px] resize-y"
        disabled={isSubmitting}
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !content.trim()}
        className="zlu-button zlu-button-primary"
      >
        {isSubmitting ? "发送中..." : "发表评论"}
      </button>
    </div>
  );
}

interface CommentListProps {
  rootComments: any[];
}

function CommentList({ rootComments }: CommentListProps) {
  if (rootComments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        暂无评论，快来抢沙发吧！
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rootComments.map((comment) => (
        <div key={comment.id} className="zlu-sidebar-card p-4">
          <div className="flex items-start gap-3">
            <img
              src={comment.author?.image || "/images/default-avatar.png"}
              alt={comment.author?.name || "匿名"}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-white">{comment.author?.name || "匿名"}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 text-sm">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface CommentSectionProps {
  postId: string;
  className?: string;
}

export function CommentSection({ className }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateComment = async (content: string) => {
    setIsSubmitting(true);
    // Simulate comment creation
    const newComment = {
      id: Date.now(),
      content,
      author: { name: "用户", image: null },
      createdAt: new Date().toISOString(),
    };
    setComments([newComment, ...comments]);
    setIsSubmitting(false);
  };

  return (
    <section className={`space-y-8 mt-12 pt-8 border-t border-gray-700 ${className || ""}`}>
      <header>
        <p className="text-xl font-semibold text-white">{comments.length} 条评论</p>
      </header>

      <div className="space-y-4">
        <CommentEditor
          onSubmit={handleCreateComment}
          isSubmitting={isSubmitting}
        />
      </div>

      <CommentList rootComments={comments} />
    </section>
  );
}
