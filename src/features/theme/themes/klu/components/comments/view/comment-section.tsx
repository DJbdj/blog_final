import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LogIn, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import type { JSONContent } from "@tiptap/react";
import { rootCommentsByPostIdInfiniteQuery } from "@/features/comments/queries";
import { useComments } from "@/features/comments/hooks/use-comments";
import { authClient } from "@/lib/auth/auth.client";
import { Turnstile, useTurnstile } from "@/components/common/turnstile";
import { KluCommentEditor } from "../editor/comment-editor";
import { KluCommentList } from "./comment-list";

interface KluCommentSectionProps {
  postId: number;
}

export function KluCommentSection({ postId }: KluCommentSectionProps) {
  const { data: session } = authClient.useSession();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      rootCommentsByPostIdInfiniteQuery(postId, session?.user.id)
    );

  const rootComments = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  const { createComment, deleteComment, isCreating } = useComments(postId);
  const [replyTarget, setReplyTarget] = useState<{
    rootId: number;
    commentId: number;
    userName: string;
  } | null>(null);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const {
    isPending: turnstilePending,
    reset: resetTurnstile,
    turnstileProps,
  } = useTurnstile("comment");

  const requireTurnstile = () => {
    if (!turnstilePending) return false;
    toast.error("请先完成人机验证");
    turnstileRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    throw new Error("TURNSTILE_PENDING");
  };

  const handleCreateComment = async (content: JSONContent) => {
    requireTurnstile();
    try {
      await createComment({
        data: {
          postId,
          content,
        },
      });
    } finally {
      resetTurnstile();
    }
  };

  const handleCreateReply = async (content: JSONContent) => {
    if (!replyTarget) return;
    requireTurnstile();
    try {
      await createComment({
        data: {
          postId,
          content,
          rootId: replyTarget.rootId,
          replyToCommentId: replyTarget.commentId,
        },
      });
      setReplyTarget(null);
    } finally {
      resetTurnstile();
    }
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment({ data: { id: commentId } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageSquare size={20} className="text-[var(--klu-accent-primary)]" />
        <h3 className="text-lg font-semibold text-[var(--klu-text-primary)]">
          评论
        </h3>
        <span className="text-sm text-[var(--klu-text-muted)]">
          ({totalCount})
        </span>
      </div>

      {/* Login prompt */}
      {!session?.user && (
        <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--klu-bg-tertiary)]">
          <span className="text-sm text-[var(--klu-text-secondary)]">
            登录后发表评论
          </span>
          <Link
            to="/login"
            className="klu-btn klu-btn-primary text-sm"
          >
            <LogIn size={14} />
            登录
          </Link>
        </div>
      )}

      {/* Comment editor */}
      {session?.user && (
        <div className="space-y-4">
          <KluCommentEditor
            onSubmit={handleCreateComment}
            isSubmitting={isCreating}
            placeholder="写下你的评论..."
          />
          <div ref={turnstileRef}>
            <Turnstile {...turnstileProps} />
          </div>
        </div>
      )}

      {/* Reply editor */}
      {replyTarget && (
        <div className="pl-4 border-l-2 border-[var(--klu-accent-primary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--klu-text-secondary)]">
              回复 <strong className="text-[var(--klu-text-primary)]">{replyTarget.userName}</strong>
            </span>
            <button
              onClick={() => setReplyTarget(null)}
              className="text-xs text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)]"
            >
              取消
            </button>
          </div>
          <KluCommentEditor
            onSubmit={handleCreateReply}
            isSubmitting={isCreating}
            placeholder={`回复 ${replyTarget.userName}...`}
          />
        </div>
      )}

      {/* Comments list */}
      <KluCommentList
        comments={rootComments}
        isLoading={isLoading}
        currentUserId={session?.user.id}
        onReply={setReplyTarget}
        onDelete={handleDelete}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
        isLoadingMore={isFetchingNextPage}
      />
    </div>
  );
}
