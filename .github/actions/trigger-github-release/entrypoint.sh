#!/bin/sh

set -e

echo "INFO: Installing action dependencies..."
(cd /action; npm ci)

echo "INFO: Getting release version..."
current_tag=$(git describe --abbrev=0 --tags $GITHUB_SHA)

last_tag=$(git describe --abbrev=0 --tags $current_tag^)
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

echo "INFO: Updating CHANGELOG.md..."
echo "$changelog" | node /action/update-changelog

echo "INFO: Committing changelog..."
git add CHANGELOG.md
git -c user.name="$COMMIT_AUTHOR_NAME" -c user.email="$COMMIT_AUTHOR_EMAIL" \
  commit -m "Add $current_tag to CHANGELOG.md [skip ci]" --no-verify --quiet

echo "INFO: Pushing updates..."
git push "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" master

echo "INFO: Done! Don't forget to thank new contributors :)"
