#!/bin/sh

set -e

current=$(git rev-parse HEAD)
git checkout $1
branch=$(git rev-parse HEAD)

if [ "$current" = "$branch" ]; then
  exit 0
else
  exit 78
fi
