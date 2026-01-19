#!/bin/bash

# Cache Purge Helper Script
# Usage: ./scripts/purge-cache.sh [option] [url]

set -e

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

PURGE_TOKEN="${PURGE_CACHE_TOKEN}"
BASE_URL="${NEXT_PUBLIC_BASE_URL:-https://og.dailyfoss.biz.id}"

if [ -z "$PURGE_TOKEN" ]; then
  echo "Error: PURGE_CACHE_TOKEN not set"
  exit 1
fi

# Function to purge specific URL
purge_url() {
  local url="$1"
  echo "Purging: $url"
  
  curl -s -X POST "$BASE_URL/api/purge-cache" \
    -H "Authorization: Bearer $PURGE_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"urls\": [\"$url\"]}" | jq .
}

# Function to purge all cache
purge_all() {
  echo "Purging all cache..."
  
  curl -s -X POST "$BASE_URL/api/purge-cache" \
    -H "Authorization: Bearer $PURGE_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"purgeAll": true}' | jq .
}

# Function to purge by layout
purge_layout() {
  local layout="$1"
  echo "Purging all images for layout: $layout"
  
  # This is a simple example - in production you'd need to track all URLs
  curl -s -X POST "$BASE_URL/api/purge-cache" \
    -H "Authorization: Bearer $PURGE_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"urls\": [\"$BASE_URL/api/image?layoutName=$layout\"]}" | jq .
}

# Main script
case "${1:-help}" in
  url)
    if [ -z "$2" ]; then
      echo "Usage: $0 url <full_url>"
      exit 1
    fi
    purge_url "$2"
    ;;
  all)
    purge_all
    ;;
  layout)
    if [ -z "$2" ]; then
      echo "Usage: $0 layout <layout_name>"
      exit 1
    fi
    purge_layout "$2"
    ;;
  help|*)
    cat << EOF
Cache Purge Helper Script

Usage: $0 [command] [args]

Commands:
  url <url>         Purge specific URL
  all               Purge all cache
  layout <name>     Purge all images for a layout
  help              Show this help message

Examples:
  $0 url "https://og.dailyfoss.biz.id/api/image?fileType=png&layoutName=dailyfoss-beta&Title=Test"
  $0 all
  $0 layout dailyfoss-beta

Environment Variables:
  PURGE_CACHE_TOKEN    Secret token for cache purge (required)
  NEXT_PUBLIC_BASE_URL Base URL (default: https://og.dailyfoss.biz.id)

EOF
    ;;
esac
