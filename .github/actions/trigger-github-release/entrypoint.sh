#!/bin/sh

set -e

echo "INFO: Installing action dependencies..."
(cd /action; npm ci)

echo "INFO: Checking out current tag..."
git -c advice.detachedHead=false checkout $GITHUB_REF

echo "INFO: Getting tag info..."
current_tag=$(git describe --abbrev=0 --tags)
last_tag=$(git describe --abbrev=0 --tags HEAD^)
echo "INFO: New version is $current_tag; last version is $last_tag."

echo "INFO: Generating the changelog..."

# lerna-changelog expects the token to be provided as GITHUB_AUTH,
# but GitHub actions don't allow to predefine custom env vars prefixed with
# GITHUB_. We need to define it here.
changelog=$(
  GITHUB_AUTH="$GITHUB_TOKEN" \
  node /action/node_modules/.bin/lerna-changelog --tag-from $last_tag --tag-to $current_tag
)

echo "INFO: Publishing the new GitHub release..."
echo "$changelog" | node /action/release $current_tag

echo "INFO: Done! Don't forget to thank new contributors :)"
