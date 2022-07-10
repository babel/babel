#!/bin/sh
# read given commit SHA1 from stdin, update to TEST262_COMMIT in Makefile
# usage:
# sh ./scripts/parser-tests/get-test262-version.sh | sh ./scripts/parser-tests/bump-test262-version.sh

set -e
perl -i -pe 's/^TEST262_COMMIT.+$/TEST262_COMMIT = '$(cat)'/' ./Makefile
