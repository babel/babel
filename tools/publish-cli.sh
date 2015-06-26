#!/bin/bash
set -e

LAST_TAG=$(git describe $(git rev-list --tags --max-count=1))
TAG_DIFF=$(git diff $LAST_TAG -- packages/babel-cli/)

if [ -n "$TAG_DIFF" ]; then
  echo "Changes detected to babel-cli since last tag, publishing new version."

  cd ../packages
  node build-cli.js

  cd babel-cli
  npm publish
else
  echo "No changes detected to babel-cli since last tag"
fi
