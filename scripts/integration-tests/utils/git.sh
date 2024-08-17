#!/usr/bin/env bash

original_git_branch=`git rev-parse --abbrev-ref HEAD`
tmp_branch_name="integration-tests-$(date +'%F-%H-%M-%N')"
original_user_name=`git config user.name`
original_user_email=`git config user.email`

export GIT_E2E_SETUP="true"

function initializeE2Egit {
  git checkout -b $tmp_branch_name

  # This is needed by "yarn release-tool", which commits when publishing
  git config user.name "Babel E2E Test"
  git config user.email "babel-e2e@example.com"
}

function cleanupE2Egit {
  # Delete release tags
  git tag -d $(git tag -l "version-e2e-test-*")

  # Checkout the previous branch
  git checkout -f $original_git_branch
  git branch -D $tmp_branch_name

  # Restore git user
  git config user.name "$original_user_name"
  git config user.email "$original_user_email"
}
