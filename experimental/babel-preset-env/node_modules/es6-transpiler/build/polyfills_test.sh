#!/bin/sh

echo "running tests (in es5 mode i.e. without --harmony)"

node es5/polyfills/test/index.js
