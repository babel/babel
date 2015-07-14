#!/bin/sh
set -e

#
export NODE_PATH="`pwd`/packages;$NODE_PATH"

# install default set
npm install

# remove global babel
npm list --global --depth 1 babel >/dev/null 2>&1 && npm uninstall -g babel || true

for f in packages/*; do
  if [ -d $f ]; then
    cd $f
    if [ -f "package.json" ]; then
      npm install
      npm link
    fi
    if [ -f "scripts/bootstrap.sh" ]; then
      ./scripts/bootstrap.sh
    fi
    cd ../..
  fi
done

git submodule update --init
make build
