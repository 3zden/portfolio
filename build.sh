#!/bin/bash

# Set Node.js version
export NODE_VERSION=16.20.2

# Set OpenSSL legacy provider for compatibility
export NODE_OPTIONS="--openssl-legacy-provider"

# Install dependencies
npm ci

# Build the project
npm run build

echo "Build completed successfully!" 