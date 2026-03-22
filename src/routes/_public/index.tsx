import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import theme from "@theme";
import { siteDomainQuery } from "@/features/config/queries";
import { featuredPostsQuery, recentPostsQuery } from "@/features/posts/queries";
import { tagsQueryOptions } from "@/features/tags/queries";
import { buildCanonicalUrl, canonicalLink } from "@/lib/seo";

const { featuredPostsLimit } = theme.config.home;
const RECENT_POSTS_LIMIT = 10;

export const Route = createFileRoute("/_public/")({
  loader: async ({ context }) => {
    const [, , domain] = await Promise.all([
      context.queryClient.ensureQueryData(
        featuredPostsQuery(featuredPostsLimit),
      ),
      context.queryClient.ensureQueryData(
        recentPostsQuery(RECENT_POSTS_LIMIT),
      ),
      context.queryClient.ensureQueryData(siteDomainQuery),
      context.queryClient.ensureQueryData(tagsQueryOptions),
    ]);

    return {
      canonicalHref: buildCanonicalUrl(domain, "/"),
    };
  },
  head: ({ loaderData }) => ({
    links: [canonicalLink(loaderData?.canonicalHref ?? "/")],
  }),
  pendingComponent: HomePageSkeleton,
  component: HomeRoute,
});

function HomeRoute() {
  const { data: featuredPosts } = useSuspenseQuery(
    featuredPostsQuery(featuredPostsLimit),
  );
  const { data: recentPosts } = useSuspenseQuery(
    recentPostsQuery(RECENT_POSTS_LIMIT),
  );
  const { data: tags } = useSuspenseQuery(tagsQueryOptions);

  // Ensure data is always an array
  const safeFeaturedPosts = featuredPosts ?? [];
  const safeRecentPosts = recentPosts ?? [];
  const safeTags = tags ?? [];

  // Filter out posts that are already featured
  const nonFeaturedPosts = safeRecentPosts.filter(
    (post) => !safeFeaturedPosts.some((fp) => fp.id === post.id),
  );

  return <theme.HomePage posts={safeFeaturedPosts} recentPosts={nonFeaturedPosts} tags={safeTags} />;
}

function HomePageSkeleton() {
  return <theme.HomePageSkeleton />;
}
