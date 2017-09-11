#!/bin/bash
set -e

TEST_DIRS=""

for f in packages/*; do
  if [ -n "$TEST_ONLY" ] && [[ `basename $f` != *"$TEST_ONLY"* ]]; then
    continue
  fi
  # Exclude babel-standalone from coverage runs
  if [ "$TEST_TYPE" = "cov" ] && [ `basename $f` = 'babel-standalone' ]; then 
    continue
  fi

  if [ -d "$f/test" ]; then
    TEST_DIRS="$f/test $TEST_DIRS"
  fi
done

echo $TEST_DIRS
