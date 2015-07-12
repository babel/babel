#!/bin/sh
set -e

for f in packages/*; do
  if [ -n "$TEST_ONLY" ] && [ `basename $f` != "$TEST_ONLY" ]; then
    continue
  fi

  if [ -d "$f/test" ]; then
    echo $f
    cd $f
    node ../../node_modules/mocha/bin/_mocha
    cd ../../
  fi
done
