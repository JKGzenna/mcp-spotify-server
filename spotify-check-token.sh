#!/bin/bash

# This script dynamically reads the Spotify 'accessToken' from 'spotify-config.json'

# Path to the 'spotify-config.json' file
CONFIG_FILE="spotify-config.json"

# Extract the current 'accessToken' from the config file using pure bash
accessToken=$(grep -oP '"accessToken":\s*"\K[^"]+' "$CONFIG_FILE")

# Check if the 'accessToken' is valid
if [ -z "$accessToken" ]; then
  echo "Error: Access token is missing or invalid. Please authenticate first."
  exit 1
fi

# Use the 'accessToken' obtained from the config file in the Spotify API request
curl -s -o /dev/null -H "Authorization: Bearer $accessToken" https://api.spotify.com/v1/me
  echo -e "\nThe accessToken & refreshToken are created and validated using the credentials provided in the 'spotify-config.json' file , for security reasons, the refreshToken is not displayed, but will be used automatically for refresh the accessToken when needed.\n \n--> accessToken for Claude client:\n$accessToken\n"
  echo -e "\n--> accessToken with Bearer Header:\nAuthorization: Bearer $accessToken\n"
  echo -e "\n--> accessToken for use with Plugged.in spotify config:\nOAUTH2_TOKEN=$accessToken\n"
