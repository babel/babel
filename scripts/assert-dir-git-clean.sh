#!/bin/sh

# Must run at a git working dir
if [ -n "$(git status --porcelain=v1 2>/dev/null)" ]; then
  echo "Please re-run \"make build\" and checkout the following changes to git"
  git status
  exit 1
fi
