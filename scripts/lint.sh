#!/usr/bin/env sh

./node_modules/.bin/eslint \
    --rule 'no-unused-vars: 1' \
    --ext md . \
    --ignore-pattern babel-types
