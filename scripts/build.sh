#!/bin/bash

# Build script for OG DailyFOSS

set -e

echo "🐳 Building OG DailyFOSS Docker image..."

# Build the image
docker-compose build

echo "✅ Build complete!"
echo ""
echo "To start the container, run:"
echo "  docker-compose up -d"
echo ""
echo "To view logs, run:"
echo "  docker-compose logs -f"
