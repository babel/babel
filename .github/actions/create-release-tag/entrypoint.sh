#!/bin/sh

set -e

# GitHub doesn't support running actions on new tags yet: we need to run it on the commit.
# For this reason, we can't be sure that the tag already exists. We can use the commit
# message to create the tag. If the tag already exists locally, they won't conflict because
# they have the same name and are on the same commit.

echo "INFO: Getting release version..."
tag_name=$(git log --oneline --format=%B -1 $GITHUB_SHA)

echo "INFO: Creating new tag..."
(git tag $tag_name $GITHUB_SHA) || echo "INFO: Tag already exists"
