import { TokenRefresher } from './utils.js';
import type { SpotifyHandlerExtra, tool } from './types.js';

export const refreshAccessTokenTool: tool<Record<string, never>> = {
  name: 'refreshAccessToken',
  description: 'Attempts to refresh the Spotify access token using the refresh token from spotify-config.json.',
  schema: {},
  handler: async (_args, _extra: SpotifyHandlerExtra) => {
    try {
      const newAccessToken = await TokenRefresher.refreshAccessToken();
      return {
        content: [
          {
            type: 'text',
            text: `Successfully refreshed Spotify access token: ${newAccessToken}`,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Failed to refresh Spotify access token: ${errorMessage}`,
          },
        ],
      };
    }
  },
};