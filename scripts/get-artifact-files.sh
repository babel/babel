#!/bin/sh

# The artifact files will be packed into an archive shared among CI runners
# usage:
#   $ get-artifact-files.sh | tar --null -cvf babel-artifact.tar --files-from=-
find . \
  -type d -name "*node_modules*" -prune -false \
  -o \( \
    -type f -path "./codemods/*/lib/*" \
    -o -type f -path "./eslint/*/lib/*" \
    -o -type f -path "./packages/*/lib/*" \
    -o -type f -path "./packages/babel-standalone/*" \
    -o -type f -path "./packages/babel-runtime/*" -name "*.js" \
    -o -type f -path "./packages/babel-runtime-corejs2/*" -name "*.js" \
    -o -type f -path "./packages/babel-runtime-corejs3/*" -name "*.js" \
    -o -type f -path "./packages/babel-core/src/vendor/*" -name "*.js" \
  \) \
  -print0
