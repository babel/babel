#! /bin/sh

# Run all benchmarks in this directory.
# Pass option -v or --verbose to see the transpiled code under test.

set -eu

SCRIPT_DIR=$(dirname -- "$0")
cd -- "$SCRIPT_DIR"

for bench in *.mjs
do
    yarn node --predictable "$bench" "$@"
done
