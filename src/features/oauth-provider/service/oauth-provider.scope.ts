import type {
  OAuthBlogAction,
  OAuthBlogResource,
  OAuthBlogScope,
  OAuthBlogScopeGroups,
  OAuthBlogScopeSelection,
} from "../oauth-provider.config";

function typedEntries<T extends Record<string, unknown>>(obj: T): Array<[keyof T & string, T[keyof T & string]]> {
  return Object.entries(obj) as Array<[keyof T & string, T[keyof T & string]]>;
}

function toBlogScope<R extends OAuthBlogResource>(
  resource: R,
  action: OAuthBlogAction<R>,
): OAuthBlogScope {
  return `${resource}:${action}` as OAuthBlogScope;
}

export type OAuthBlogScopesInput =
  | OAuthBlogScopeGroups
  | OAuthBlogScopeSelection;

export function flattenBlogScopes(
  blogScopes: OAuthBlogScopesInput,
): OAuthBlogScope[] {
  const entries = typedEntries(blogScopes);
  const result: OAuthBlogScope[] = [];

  for (const [resource, actions] of entries) {
    if (actions) {
      const actionArray = actions as readonly OAuthBlogAction<typeof resource>[];
      for (const action of actionArray) {
        result.push(toBlogScope(resource as OAuthBlogResource, action));
      }
    }
  }

  return result;
}
