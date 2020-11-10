#!/bin/bash
set -e

tsFlags="--strict"

yarn tsc $tsFlags ./packages/babel-types/lib/index.d.ts
