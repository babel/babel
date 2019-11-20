#!/bin/bash

# Copied from https://github.com/facebook/create-react-app/blob/053f9774d3f592c17741d2a86de66a7ca58f90c0/tasks/local-registry.sh

custom_registry_url=http://localhost:4873
original_npm_registry_url=`npm get registry`
original_yarn_registry_url=`yarn config get registry`
default_verdaccio_package=verdaccio@~4.3.3

function startLocalRegistry {
  # Start local registry
  tmp_registry_log=`mktemp`
  echo "Registry output file: $tmp_registry_log"
  (cd && nohup npx ${VERDACCIO_PACKAGE:-$default_verdaccio_package} -c $1 &>$tmp_registry_log &)

  # Wait for Verdaccio to boot
  grep -q "http address" <(tail -f $tmp_registry_log)

  # Set registry to local registry
  npm set registry "$custom_registry_url"
  yarn config set registry "$custom_registry_url"
}

function loginLocalRegistry {
  # Login so we can publish packages
  (cd && npx npm-auth-to-token@1.0.0 -u user -p password -e user@example.com -r "$custom_registry_url")
}

function stopLocalRegistry {
  # Restore the original NPM and Yarn registry URLs and stop Verdaccio
  fuser -k 4873/tcp
  npm set registry "$original_npm_registry_url"
  yarn config set registry "$original_yarn_registry_url"
}
