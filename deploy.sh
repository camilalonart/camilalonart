#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# Ask for deployment confirmation
read -p "Do you want to deploy to GitHub Pages? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Deployment cancelled."
    exit 1
fi

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
git add out/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages

echo "Deployment completed!" 