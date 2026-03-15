import { useState } from "react";
import { User, Clock, Reply, Trash2, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { RootCommentWithReplyCount } from "@/features/comments/comments.schema";
import type { JSONContent } from "@tiptap/react";

interface CommentItemProps {
  comment: RootCommentWithReplyCount;
  currentUserId?: string;
  onReply: (target: { rootId: number; commentId: number; userName: string }) => void;
  onDelete: (commentId: number) => void;
}

function CommentItem({
  comment,
  currentUserId,
  onReply,
  onDelete,
}: CommentItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isOwner = currentUserId === comment.userId;
  const hasReplies = comment.replyCount > 0;

  // Safely get user name
  const userName = comment.user?.name || "未知用户";
  const userImage = comment.user?.image;

  // Render content (simplified - just show text content)
  const renderContent = (content: JSONContent | null): string => {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (content.text) return content.text;
    if (content.content) {
      return content.content.map(renderContent).join("");
    }
    return "";
  };

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="shrink-0">
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--klu-border-primary)]"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[var(--klu-accent-primary)]/20 flex items-center justify-center ring-2 ring-[var(--klu-border-primary)]">
            <User size={16} className="text-[var(--klu-accent-primary)]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-[var(--klu-bg-tertiary)] rounded-lg p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-[var(--klu-text-primary)]">
                {userName}
              </span>
              {isOwner && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--klu-accent-primary)]/20 text-[var(--klu-accent-primary)]">
                  我
                </span>
              )}
            </div>
            <span className="text-xs text-[var(--klu-text-muted)] flex items-center gap-1">
              <Clock size={12} />
              {formatDate(comment.createdAt)}
            </span>
          </div>

          {/* Content */}
          <div className="text-sm text-[var(--klu-text-secondary)]">
            {comment.status === "deleted" ? (
              <span className="italic text-[var(--klu-text-muted)]">该评论已被删除</span>
            ) : (
              renderContent(comment.content)
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() =>
                onReply({
                  rootId: comment.id,
                  commentId: comment.id,
                  userName: userName,
                })
              }
              className="flex items-center gap-1 text-xs text-[var(--klu-text-muted)] hover:text-[var(--klu-accent-primary)] transition-colors"
            >
              <Reply size={12} />
              回复
            </button>

            {hasReplies && (
              <span className="text-xs text-[var(--klu-text-muted)]">
                {comment.replyCount} 条回复
              </span>
            )}

            {isOwner && comment.status !== "deleted" && (
              <>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-1 text-xs text-[var(--klu-text-muted)] hover:text-[var(--klu-accent-danger)] transition-colors"
                  >
                    <Trash2 size={12} />
                    删除
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="text-xs text-[var(--klu-accent-danger)] hover:underline"
                    >
                      确认删除
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="text-xs text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)]"
                    >
                      取消
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommentListProps {
  comments: RootCommentWithReplyCount[];
  isLoading: boolean;
  currentUserId?: string;
  onReply: (target: { rootId: number; commentId: number; userName: string }) => void;
  onDelete: (commentId: number) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function KluCommentList({
  comments,
  isLoading,
  currentUserId,
  onReply,
  onDelete,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: CommentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-9 h-9 klu-skeleton rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 klu-skeleton" />
              <div className="h-3 w-full klu-skeleton" />
              <div className="h-3 w-2/3 klu-skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--klu-text-muted)]">暂无评论，来抢沙发吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onReply={onReply}
          onDelete={onDelete}
        />
      ))}

      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="klu-btn klu-btn-ghost text-sm"
          >
            {isLoadingMore ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "加载更多"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
