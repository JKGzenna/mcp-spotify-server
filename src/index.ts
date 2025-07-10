import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { playTools } from './play.js';
import { readTools } from './read.js';
import { getAccessTokenTool } from './authApp.js';
import { refreshAccessTokenTool } from './refreshToken.js';
import { TokenRefresher } from './utils.js';

const server = new McpServer({
  name: 'spotify-controller',
  version: '1.0.0',
});

[...readTools, ...playTools, getAccessTokenTool, refreshAccessTokenTool].forEach((tool) => {
  server.tool(tool.name, tool.description, tool.schema, tool.handler);
});

async function main() {
  const transport = new StdioServerTransport();

  // Automatically refresh the token before starting the server
  try {
    await TokenRefresher.refreshAccessToken();
    console.log('Access token refreshed successfully.');
  } catch (error) {
    console.error('Failed to refresh access token:', error);
  }

  await server.connect(transport);
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});