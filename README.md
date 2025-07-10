<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 10px;">
<img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" width="35" height="35">
<h1>MCP Spotify Server</h1>
</div>

*A lightweight [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that enables AI assistants like Cursor & Claude to control Spotify playback and manage playlists.*

## Security Features

- ### 'AuthTest' class for manual token generation
  The `authTest` class (previously `auth`) allows manual token generation by running the command `npm run auth`. This process generates an `accessToken` and `refreshToken` based on the `clientId` and `clientSecret` specified in the `spotify-config.json` file. The tokens are updated in the configuration file after user confirmation in the browser.

- ### 'AuthApp' class associated to a new MCP tool named 'getAccessTokenTool'
  The `getAccessTokenTool` is a new MCP tool that enables AI clients like Claude, Cursor and VsCode  to fetch Spotify tokens programmatically. It uses the `clientId` and `clientSecret` from `spotify-config.json` to generate an `accessToken` and `refreshToken`. After user confirm Spotify Authorizationin the browser, the user is redirected back to the AI client, and browser shows a success message via the Redirect URI `http://127.0.0.1:8088`, the tool updates the `spotify-config.json` file with the new tokens (accessToken & refreshToken).
This MCP tool simplifies token management and integrates seamlessly with MCP workflows.

- ### 'accessToken' terminal view & check status
  You can view and check accessToken status using ``sh spotify-check-token.sh`` in a terminal prompted in the root of the project.


## Example Interactions

- _"Get a new access token"_
- _"Play Gangnam Style first song"_
- _"Create a Snoop Dog / El Fary fusion playlist"_
- _"Copy all the techno tracks from my workout playlist to my work playlist"_

## Tools

### Read Operations

1. **'searchSpotify'**

   - **Description**: Search for tracks, albums, artists, or playlists on Spotify
   - **Parameters**:
     - `query` (string): The search term
     - `type` (string): Type of item to search for (track, album, artist, playlist)
     - `limit` (number, optional): Maximum number of results to return (10-50)
   - **Returns**: List of matching items with their IDs, names, and additional details
   - **Example**: `searchSpotify("bohemian rhapsody", "track", 20)`

2. **'getNowPlaying'**

   - **Description**: Get information about the currently playing track on Spotify
   - **Parameters**: None
   - **Returns**: Object containing track name, artist, album, playback progress, duration, and playback state
   - **Example**: `getNowPlaying()`

3. **'getMyPlaylists'**

   - **Description**: Get a list of the current user's playlists on Spotify
   - **Parameters**:
     - `limit` (number, optional): Maximum number of playlists to return (default: 20)
     - `offset` (number, optional): Index of the first playlist to return (default: 0)
   - **Returns**: Array of playlists with their IDs, names, track counts, and public status
   - **Example**: `getMyPlaylists(10, 0)`

4. **'getPlaylistTracks'**

   - **Description**: Get a list of tracks in a specific Spotify playlist
   - **Parameters**:
     - `playlistId` (string): The Spotify ID of the playlist
     - `limit` (number, optional): Maximum number of tracks to return (default: 100)
     - `offset` (number, optional): Index of the first track to return (default: 0)
   - **Returns**: Array of tracks with their IDs, names, artists, album, duration, and added date
   - **Example**: `getPlaylistTracks("37i9dQZEVXcJZyENOWUFo7")`

5. **'getRecentlyPlayed'**

   - **Description**: Retrieves a list of recently played tracks from Spotify.
   - **Parameters**:
     - `limit` (number, optional): A number specifying the maximum number of tracks to return.
   - **Returns**: If tracks are found it returns a formatted list of recently played tracks else a message stating: "You don't have any recently played tracks on Spotify".
   - **Example**: `getRecentlyPlayed({ limit: 10 })`

### Play / Create Operations

1. **'playMusic'**

   - **Description**: Start playing a track, album, artist, or playlist on Spotify
   - **Parameters**:
     - `uri` (string, optional): Spotify URI of the item to play (overrides type and id)
     - `type` (string, optional): Type of item to play (track, album, artist, playlist)
     - `id` (string, optional): Spotify ID of the item to play
     - `deviceId` (string, optional): ID of the device to play on
   - **Returns**: Success status
   - **Example**: `playMusic({ uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6" })`
   - **Alternative**: `playMusic({ type: "track", id: "6rqhFgbbKwnb9MLmUQDhG6" })`

2. **'pausePlayback'**

   - **Description**: Pause the currently playing track on Spotify
   - **Parameters**:
     - `deviceId` (string, optional): ID of the device to pause
   - **Returns**: Success status
   - **Example**: `pausePlayback()`

3. **'skipToNext'**

   - **Description**: Skip to the next track in the current playback queue
   - **Parameters**:
     - `deviceId` (string, optional): ID of the device
   - **Returns**: Success status
   - **Example**: `skipToNext()`

4. **'skipToPrevious'**

   - **Description**: Skip to the previous track in the current playback queue
   - **Parameters**:
     - `deviceId` (string, optional): ID of the device
   - **Returns**: Success status
   - **Example**: `skipToPrevious()`

5. **'createPlaylist'**

   - **Description**: Create a new playlist on Spotify
   - **Parameters**:
     - `name` (string): Name for the new playlist
     - `description` (string, optional): Description for the playlist
     - `public` (boolean, optional): Whether the playlist should be public (default: false)
   - **Returns**: Object with the new playlist's ID and URL
   - **Example**: `createPlaylist({ name: "Workout Mix", description: "Songs to get pumped up", public: false })`

6. **'addTracksToPlaylist'**

   - **Description**: Add tracks to an existing Spotify playlist
   - **Parameters**:
     - `playlistId` (string): ID of the playlist
     - `trackUris` (array): Array of track URIs or IDs to add
     - `position` (number, optional): Position to insert tracks
   - **Returns**: Success status and snapshot ID
   - **Example**: `addTracksToPlaylist({ playlistId: "3cEYpjA9oz9GiPac4AsH4n", trackUris: ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"] })`

7. **'addToQueue'**

   - **Description**: Adds a track, album, artist or playlist to the current playback queue
   - - **Parameters**:
     - `uri` (string, optional): Spotify URI of the item to add to queue (overrides type and id)
     - `type` (string, optional): Type of item to queue (track, album, artist, playlist)
     - `id` (string, optional): Spotify ID of the item to queue
     - `deviceId` (string, optional): ID of the device to queue on
   - **Returns**: Success status
   - **Example**: `addToQueue({ uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6" })`
   - **Alternative**: `addToQueue({ type: "track", id: "6rqhFgbbKwnb9MLmUQDhG6" })`

## Setup

### Prerequisites

- Node.js v20+ minimum (recommended v22+)
- A Spotify Premium account
- A registered Spotify Developer application (https://developer.spotify.com/dashboard)

### Installation

```bash
git clone https://github.com/JKGzenna/mcp-spotify-server.git
cd mcp-spotify-server
npm i
npm run build
```

### Creating a Spotify Developer Application

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in with your Spotify account
3. Click the "Create an App" button
4. Fill in the App name and Appdescription, then, add a Redirect URI (e.g., `http://127.0.0.1:8088/callback`) & check the 'Web Playback SDK' and 'Web API' checkboxes.
5. Accept the Terms of service checkbox and click "Save"
6. In your new app's dashboard, you'll see your **Client ID**
7. Click "Show Client Secret" to reveal your **Client Secret**
8. If yo want edit this configuration later, click "Edit Settings"

### Spotify API Configuration

Create a `spotify-config.json` file in the project root (you can copy and modify the provided example):

```bash
# Copy the example config file with this command
cp spotify-config.example.json spotify-config.json
```

Then edit the ``spotify-config.json`` file with your credentials and redirectUri:

```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "redirectUri": "http://127.0.0.1:8088/callback"
}
```

### Authentication Process

The Spotify API uses OAuth 2.0 for authentication. Follow these steps to authenticate your application:

1. Run the authentication script:

```bash
npm run auth
```

2. The script will generate an authorization URL. Open this URL in your web browser.

3. You'll be prompted to log in to Spotify and authorize your application.

4. After authorization, Spotify will redirect you to your specified redirect URI with a code parameter in the URL.

5. The authentication script will automatically exchange this code for access and refresh tokens.

6. These tokens will be saved to your `spotify-config.json` file, which will now look something like:

```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "redirectUri": "http://127.0.0.1:8088/callback",
  "accessToken": "BQAi9Pn...kKQ",
  "refreshToken": "AQDQcj...7w"
}
```


## 'accessToken' terminal view & check status

You can view and check accessToken status using ``sh spotify-check-token.sh`` in a terminal prompted in the root of the project.


## Integrating with Claude Desktop, Cursor, and VsCode [via 'cline' model extension](https://marketplace.visualstudio.com/items/?itemName=saoudrizwan.claude-dev)

To use your MCP server with Claude Desktop, add it to your Claude configuration:

```json
{
  "mcpServers": {
    "spotify": {
      "command": "node",
      "args": ["~/../mcp-spotify-server/build/index.js"]
    }
  }
}
```

For Cursor, go to the MCP tab in `Cursor Settings` (command + shift + J). Add a server with this command:

```bash
node path/to/mcp-spotify-server/build/index.js
```

To set up your MCP correctly with Cline ensure you have the following file configuration set `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "spotify": {
      "command": "node",
      "args": ["~/../mcp-spotify-server/build/index.js"],
      "autoApprove": ["getListeningHistory", "getNowPlaying"]
    }
  }
}
```

You can add additional tools to the auto approval array to run the tools without intervention.