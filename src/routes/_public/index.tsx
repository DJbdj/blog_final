import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import theme from "@theme";
import { siteDomainQuery } from "@/features/config/queries";
import { featuredPostsQuery, postsInfiniteQueryOptions } from "@/features/posts/queries";
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
        postsInfiniteQueryOptions({ limit: RECENT_POSTS_LIMIT }),
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
  const { data: recentPostsData } = useSuspenseQuery(
    postsInfiniteQueryOptions({ limit: RECENT_POSTS_LIMIT }),
  );
  const { data: tags } = useSuspenseQuery(tagsQueryOptions);

  // Get the first page of recent posts
  const recentPosts = recentPostsData?.pages[0]?.items ?? [];

  // Filter out posts that are already featured
  const nonFeaturedPosts = recentPosts.filter(
    (post) => !featuredPosts.some((fp) => fp.id === post.id),
  );

  return <theme.HomePage posts={featuredPosts} recentPosts={nonFeaturedPosts} tags={tags} />;
}

function HomePageSkeleton() {
  return <theme.HomePageSkeleton />;
}
