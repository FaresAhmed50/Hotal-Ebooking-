#!/bin/bash
set -e

# Print a message when the container starts
echo "Container is starting up..."

# Start your application
npm start

# Execute any additional commands passed
exec "$@"