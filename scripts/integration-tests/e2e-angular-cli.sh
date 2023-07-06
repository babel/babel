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

mkdir tmp
cd tmp

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

startLocalRegistry "$PWD"/../../verdaccio-config.yml

# Create and build a new angular project
npx -p @angular/cli ng new ngx
cd ngx
npm run build

cleanup
