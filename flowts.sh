#!/usr/bin/env bash

set -e

flowts \
  --no-allow-js \
  --commit-rename-command "git add . && git commit --no-verify -m 'flowts rename'" \
  -i "./src/**/*.js" \
  "./packages/babel-parser/"

yarn eslint packages/babel-parser '**/*.ts' --fix || true

git add .
git commit --no-verify -m 'flowts convert'
