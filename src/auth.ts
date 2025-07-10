#!/usr/bin/env node

import { authorizeSpotify } from './utils.js';
import { TokenRefresher } from './utils.js';

console.log('Starting Spotify authentication flow...');

TokenRefresher.refreshAccessToken()
  .then(() => {
    console.log('Access token refreshed successfully!');
    process.exit(0);
  })
  .catch(async (refreshError) => {
    console.error('Failed to refresh access token:', refreshError);
    console.log('Attempting full authorization flow...');

    try {
      await authorizeSpotify();
      console.log('Authentication completed successfully!');
      process.exit(0);
    } catch (authError) {
      console.error('Authentication failed:', authError);
      process.exit(1);
    }
  });