#!/bin/bash

set -e

# Local validation does not publish uncommitted changes.
echo "Building project..."
npm run build
npm run check:site
command -v gh >/dev/null || { echo "Install GitHub CLI to request a deployment."; exit 1; }

# Ask for deployment confirmation
echo "Deployment publishes the committed main branch on GitHub, not local changes."
read -p "Run the GitHub Pages workflow for main? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Deployment cancelled."
    exit 1
fi

gh workflow run deploy.yml --ref main --repo camilalonart/camilalonart
echo "Deployment requested. Follow its progress in GitHub Actions."