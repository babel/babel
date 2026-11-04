#!/usr/bin/env bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")"

source utils/local-registry.sh
source utils/git.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Go to the root of the monorepo
cd ../..

initializeE2Egit

#==============================================================================#
#                                 PUBLISH                                      #
#==============================================================================#

# Only the last step needs the registry: let it boot in the meanwhile. Until
# then, yarn must not be pointed to it or it would store all our dependencies.
bootLocalRegistry "$PWD"/scripts/integration-tests/verdaccio-config.yml

# This script gets the last root package.json version,
# and then increases by one the patch number, after
# stripping pre-release info
VERSION=$(
  node -p "require('./package.json').version.replace(/-.*/, '').replace(/(?<=\\d+\\.\\d+\\.)\\d+/, x => ++x)"
)

TAG_PREFIX="version-e2e-test-"

yarn release-tool version "$VERSION" --all --yes --tag-version-prefix="$TAG_PREFIX"

# This also installs the dependencies
make prepublish-no-test

waitForLocalRegistry
loginLocalRegistry

yarn release-tool publish --yes --tag-version-prefix="$TAG_PREFIX"

make clean

cleanup
