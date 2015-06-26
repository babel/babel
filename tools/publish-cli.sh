#!/bin/bash
set -e

LAST_TAG=$(git describe $(git rev-list --tags --max-count=1))
TAG_DIFF=$(git diff $LAST_TAG -- packages/babel-cli/)

if [ -n "$TAG_DIFF" ]; then
  cd ../packages
  node build-cli.js

  cd babel-cli
  npm publish
fi
