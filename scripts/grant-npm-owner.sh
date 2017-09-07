#!/bin/bash
set -e

read -p "Username: " username

for f in packages/*; do
  package=`basename $f`

  if [ -d "$f" ]; then
    npm owner add $username $package
  fi
done
