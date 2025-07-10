#!/usr/bin/env node

import { loadSpotifyConfig, authorizeSpotify } from './utils.js';
import { TokenRefresher } from './utils.js';
import type { SpotifyHandlerExtra, tool } from './types.js';

export const getAccessTokenTool: tool<Record<string, never>> = {
  name: 'getAccessToken',
  description: 'Fetches a valid Spotify access token and refresh token using the clientId and clientSecret from spotify-config.json, and updates spotify-config.json.',
  schema: {},
  handler: async (_args, _extra: SpotifyHandlerExtra) => {
    try {
      await TokenRefresher.refreshAccessToken();
      const updatedConfig = loadSpotifyConfig();
      return {
        content: [
          {
            type: 'text',
            text: `Successfully refreshed Spotify tokens:\nAccess Token: ${updatedConfig.accessToken}\nRefresh Token: ${updatedConfig.refreshToken}`,
          },
        ],
      };
    } catch (refreshError) {
      console.error('Failed to refresh access token:', refreshError);
      console.log('Attempting full authorization flow...');

      try {
        await authorizeSpotify();
        const updatedConfig = loadSpotifyConfig();
        return {
          content: [
            {
              type: 'text',
              text: `Successfully obtained Spotify tokens:\nAccess Token: ${updatedConfig.accessToken}\nRefresh Token: ${updatedConfig.refreshToken}`,
            },
          ],
        };
      } catch (authError) {
        const errorMessage = authError instanceof Error ? authError.message : String(authError);
        return {
          content: [
            {
              type: 'text',
              text: `Failed to authorize Spotify: ${errorMessage}`,
            },
          ],
        };
      }
    }
  },
};