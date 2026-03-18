// OAuth Provider Feature Module Exports
export { oauthAccessTokenMiddleware } from "./api/oauth-provider.middleware";
export {
  OAUTH_BLOG_SCOPE_GROUPS,
  OAUTH_BLOG_SCOPES,
  OAUTH_DEFAULT_BLOG_SCOPE_SELECTION,
  OAUTH_DEFAULT_CLIENT_SCOPES,
  OAUTH_JWKS_PATH,
  OAUTH_MANAGED_SCOPES,
  OAUTH_PROVIDER_CONSENT_PAGE,
  OAUTH_PROVIDER_LOGIN_PAGE,
  OAUTH_PROVIDER_SCOPES,
  OAUTH_STANDARD_SCOPES,
  createOAuthJwtPlugin,
  createOAuthProviderPlugin,
  getOAuthAuthorizationServerUrl,
  getOAuthProtectedResourceUrl,
} from "./oauth-provider.config";
export type {
  OAuthBlogAction,
  OAuthBlogResource,
  OAuthBlogScope,
  OAuthBlogScopeGroups,
  OAuthBlogScopeSelection,
  OAuthScope,
  OAuthStandardScope,
} from "./oauth-provider.config";
export { findOAuthAccessTokenByToken } from "./data/oauth-provider.data";
export type {
  OAuthPrincipal,
  OAuthScopeRequest,
} from "./schema/oauth-provider.schema";
export { OAuthScopeRequestSchema } from "./schema/oauth-provider.schema";
export {
  extractBearerToken,
  getMissingScopes,
  getOAuthAuthorizationServer,
  getOAuthJwksUrl,
  getOAuthProtectedResource,
  getOAuthProtectedResourceMetadata,
  getOAuthProtectedResourceMetadataUrl,
  hasRequiredScopes,
  normalizeRequiredScopes,
  parseOAuthScopes,
  summarizeAuthorizationHeader,
} from "./service/oauth-provider.service";
export { verifyOAuthAccessToken } from "./service/oauth-provider.server-client";
export { flattenBlogScopes } from "./service/oauth-provider.scope";
