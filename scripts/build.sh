#!/bin/sh
set -e

for f in packages/*; do
  if [ -d "$f/src" ]; then
    node node_modules/babel/bin/babel "$f/src" --out-dir "$f/lib" --copy-files $1 &
  fi
done

wait
