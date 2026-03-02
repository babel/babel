#!/bin/sh
# Get the latest HEAD of tc39/test262
# usage:
# sh ./scripts/parser-tests/bump-test262-version.sh

set -e
export GIT_DIR=./build/test262/.git
git fetch -q origin HEAD
git rev-parse FETCH_HEAD
