#!/bin/sh
# read given commit SHA1 from stdin, update to COMPAT_TABLE_COMMIT in download-compat-table.sh
# usage:
# node ./scripts/update-compat-data/get-last-commit.js | sh ./scripts/update-compat-data/bump-data-compat-version.sh

set -e
perl -i -pe 's/^COMPAT_TABLE_COMMIT.+$/COMPAT_TABLE_COMMIT='$(cat)'/' ./packages/babel-compat-data/download-compat-table.sh
