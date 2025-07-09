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

# Use the accessToken in the Spotify API request
curl -s -o /dev/null -H "Authorization: Bearer $accessToken" https://api.spotify.com/v1/me
  echo -e "\n¡¡¡ accessToken successfully validated !!!\n \n$accessToken\n"
