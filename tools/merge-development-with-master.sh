#!/bin/bash
set -e

if [ "$TRAVIS_BRANCH" != "development" ]; then
  exit 0;
fi

git checkout master
git merge "${TRAVIS_COMMIT}"
git push "https://${GH_TOKEN}@github.com/babel/babel"
