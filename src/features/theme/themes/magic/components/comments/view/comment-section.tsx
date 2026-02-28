import { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Comment as CommentType } from "@/features/comments/comments.schema";

interface CommentSectionProps {
  postId: string;
}

interface CommentFormData {
  content: string;
  name?: string;
  email?: string;
  website?: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CommentFormData>({
    content: "",
    name: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      // Placeholder for comment loading
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content.trim()) return;

    setIsSubmitting(true);
    try {
      // Placeholder for comment submission
      const newComment: CommentType = {
        id: Date.now().toString(),
        postId,
        content: form.content,
        author: {
          name: form.name || "匿名",
          email: form.email,
          website: form.website,
        },
        createdAt: new Date().toISOString(),
      };

      setComments([newComment, ...comments]);
      setForm({
        content: "",
        name: "",
        email: "",
        website: "",
      });
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center">加载评论中...</div>;
  }

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <MessageCircle size={20} />
        评论 ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="写下你的评论..."
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus:border-primary"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="姓名（可选）"
            className="p-2 border border-border rounded-lg focus:outline-none focus:border-primary"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="邮箱（可选）"
            className="p-2 border border-border rounded-lg focus:outline-none focus:border-primary"
          />
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="网站（可选）"
            className="p-2 border border-border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !form.content.trim()}
          className="magic-button flex items-center gap-2"
        >
          {isSubmitting ? "发送中..." : (
            <>
              <Send size={16} />
              发表评论
            </>
          )}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="magic-card p-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {comment.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{comment.author.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            暂无评论，快来发表第一条评论吧！
          </p>
        )}
      </div>
    </section>
  );
}
