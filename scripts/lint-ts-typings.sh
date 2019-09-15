#!/bin/bash
set -e

node="node"
tsFlags="--strict"

$node ./node_modules/typescript/bin/tsc $tsFlags ./packages/babel-types/lib/index.d.ts
