import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { McpToolContext } from "./mcp.types";
import type { McpToolDefinition } from "./mcp-tool";
import { registerMcpTool } from "./mcp-tool";

// MCP tool imports - register your tools here
// import { mcpPostsTools } from "../features/posts";
// import { mcpTagsTools } from "../features/tags";
// import { mcpCommentsTools } from "../features/comments";
// import { mcpMediaTools } from "../features/media";
// import { mcpSearchTools } from "../features/search";
// import { mcpFriendLinksTools } from "../features/friend-links";
// import { mcpAnalyticsTools } from "../features/analytics";

const MCP_TOOLS: McpToolDefinition[] = [
  // ...mcpAnalyticsTools,
  // ...mcpCommentsTools,
  // ...mcpFriendLinksTools,
  // ...mcpMediaTools,
  // ...mcpPostsTools,
  // ...mcpSearchTools,
  // ...mcpTagsTools,
];

export function registerMcpTools(server: McpServer, context: McpToolContext) {
  MCP_TOOLS.forEach((tool) => {
    registerMcpTool(server, context, tool);
  });
}
