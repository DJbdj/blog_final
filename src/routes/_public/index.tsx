import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import theme from "@theme";
import { siteDomainQuery } from "@/features/config/queries";
import { featuredPostsQuery, archivePostsQuery } from "@/features/posts/queries";
import { tagsQueryOptions } from "@/features/tags/queries";
import { buildCanonicalUrl, canonicalLink } from "@/lib/seo";

const { featuredPostsLimit } = theme.config.home;

export const Route = createFileRoute("/_public/")({
  loader: async ({ context }) => {
    const [, domain] = await Promise.all([
      context.queryClient.ensureQueryData(
        featuredPostsQuery(featuredPostsLimit),
      ),
      context.queryClient.ensureQueryData(siteDomainQuery),
      context.queryClient.ensureQueryData(tagsQueryOptions),
      context.queryClient.ensureQueryData(archivePostsQuery()),
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
  const { data: archivePosts } = useSuspenseQuery(archivePostsQuery());
  const { data: tags } = useSuspenseQuery(tagsQueryOptions);

  // Ensure data is always an array
  const safeFeaturedPosts = featuredPosts ?? [];
  const safeTags = tags ?? [];
  const safeArchivePosts = archivePosts ?? [];

  // 首页只展示精选文章
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <theme.HomePage posts={safeFeaturedPosts} tags={safeTags as any} archivePosts={safeArchivePosts} />;
}

function HomePageSkeleton() {
  return <theme.HomePageSkeleton />;
}
