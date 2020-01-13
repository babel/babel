#!/bin/bash
set -e

tsFlags="--strict"

yarn --silent tsc $tsFlags ./packages/babel-types/lib/index.d.ts
