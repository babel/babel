#!/bin/bash
set -e

echo "Branch: $TRAVIS_BRANCH"
echo "Commit: $TRAVIS_COMMIT"

if [ "$TRAVIS_BRANCH" != "development" ]; then
  exit 0;
fi

git fetch origin master:master
git checkout master
git merge "$TRAVIS_COMMIT"
git push "https://${GH_TOKEN}@github.com/babel/babel"
