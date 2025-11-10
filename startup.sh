#!/bin/sh

# Azure App Service startup script for Next.js standalone mode
cd /home/site/wwwroot

# Set PORT if not already set (Azure usually sets this, but just in case)
if [ -z "$PORT" ]; then
  export PORT=8080
fi

# Check if standalone build exists
if [ -d ".next/standalone" ]; then
  echo "Starting Next.js standalone server on port $PORT..."
  cd .next/standalone
  # Copy public and .next/static to standalone directory if they exist
  if [ -d "/home/site/wwwroot/public" ]; then
    cp -r /home/site/wwwroot/public . 2>/dev/null || true
  fi
  if [ -d "/home/site/wwwroot/.next/static" ]; then
    mkdir -p .next
    cp -r /home/site/wwwroot/.next/static .next/ 2>/dev/null || true
  fi
  node server.js
else
  echo "Standalone build not found. Using standard Next.js start..."
  cd /home/site/wwwroot
  npm start
fi

