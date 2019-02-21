#!/bin/sh

set -e

echo "INFO: Installing action dependencies..."
(cd /action; npm ci)

echo "INFO: Checking out current commit..."
git -c advice.detachedHead=false checkout $GITHUB_SHA

# GitHub doesn't support running actions on new tags yet: we need to run it on the commit.
# For this reason, we can't be sure that the tag already exists. We can use the commit
# message to create the tag. If the tag already exists locally, they won't conflict because
# they have the same name and are on the same commit.
echo "INFO: Getting release version..."
# current_tag=$(git describe --abbrev=0 --tags HEAD)
current_tag=$(git log --oneline --format=%B -1 HEAD)

echo "INFO: Creating new tag..."
(git tag $current_tag $GITHUB_SHA) || echo "INFO: Tag already exists"

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
