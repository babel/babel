#!/bin/bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/verdaccio-config.yml

# Create and build a new angular project
mkdir tmp && cd tmp
npx -p @angular/cli ng new --defaults ngx
cd ngx
npm run build

cleanup
