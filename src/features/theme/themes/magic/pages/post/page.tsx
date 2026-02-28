import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowUp, Share2, ArrowLeft } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth.client";
import { ContentRenderer } from "@/features/theme/themes/magic/components/content/content-renderer";
import { CommentSection } from "@/features/theme/themes/magic/components/comments/view/comment-section";
import { config } from "../config";
import { formatDate } from "@/lib/utils";

<<<<<<< HEAD
// Placeholder type for post
interface Post {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  contentJson: any;
  coverImage?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTimeInMinutes?: number;
  tags?: Array<{ id: string; name: string }>;
}

export function PostPage({ post }: { post: Post }) {
=======
export function PostPage({ post }: { post: any }) {
>>>>>>> 93bfe12d60f5976d9dd4a72b0639dad9d7ff5861
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("链接已复制到剪贴板");
    } catch (err) {
      toast.error("复制失败，请手动复制");
    }
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">文章不存在</p>
      </div>
    );
  }

  const imageUrl = post.coverImage || `/images/default-post.jpg`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate({ to: "/posts" })}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        返回文章列表
      </button>

      {/* Article Header */}
      <article className="space-y-8">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        )}

        {/* Title Section */}
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {post.publishedAt && (
              <time className="font-medium">
                {formatDate(post.publishedAt)}
              </time>
            )}
            {config.showLastUpdated && post.updatedAt && (
              <span>更新于 {formatDate(post.updatedAt)}</span>
            )}
            {post.readTimeInMinutes && (
              <span>{post.readTimeInMinutes} 分钟阅读</span>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: any) => (
                <Link
                  key={tag.id}
                  to="/posts"
                  search={{ tagName: tag.name }}
                  className="magic-tag"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Summary */}
          {post.summary && (
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <p className="text-muted-foreground font-serif italic">
                {post.summary}
              </p>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ContentRenderer content={post.contentJson} />
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              正文结束
            </p>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-primary hover:bg-secondary/50 px-4 py-2 rounded-lg transition-colors"
            >
              <Share2 size={16} />
              分享文章
            </button>
          </div>
        </footer>

        {/* Related Posts */}
        <div className="pt-12 border-t border-border">
          <Suspense fallback={<div className="py-8">加载中...</div>}>
            <RelatedPosts slug={post.slug} />
          </Suspense>
        </div>

        {/* Comments */}
        <div className="pt-12 border-t border-border">
          <CommentSection postId={post.id} />
        </div>
      </article>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

<<<<<<< HEAD
=======
// Placeholder component for related posts
>>>>>>> 93bfe12d60f5976d9dd4a72b0639dad9d7ff5861
function RelatedPosts({ slug }: { slug: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">相关文章</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Related posts would be fetched and rendered here */}
        <div className="magic-card p-4">
          <p className="text-muted-foreground">相关文章加载中...</p>
        </div>
      </div>
    </div>
  );
}
