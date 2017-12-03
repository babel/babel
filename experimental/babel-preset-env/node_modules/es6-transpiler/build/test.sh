#!/bin/sh
echo "running tests (in es5 mode i.e. without --harmony)"
exec node es5/run-tests.es6.js --path ../tests
