#!/usr/bin/env bash

set -e
set -u

pushd packages/regenerator-preset
npm install
# Make sure that regenerator-preset uses the latest version of
# regenerator-{runtime,transform} when running CI tests. Note that this
# also runs `npm install` for those packages.
npm link ../regenerator-runtime ../regenerator-transform
popd

# Make sure that Regenerator uses the latest versions of its helper
# packages when running CI tests. Note that `npm link` also installs any
# other npm dependencies for these two helper packages.
npm link packages/regenerator-preset packages/regenerator-runtime

# Now install any other npm dependencies that might be needed.
npm install
