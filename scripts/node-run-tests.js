#!/usr/bin/env node
"use strict";

var child = require("child_process");
var testDebug = process.env.npm_config_TEST_DEBUG || process.env.npm_config_test_debug;

var nodeCommand = "node";

if (testDebug) {
  nodeCommand = "node --inspect --debug-brk"
}

var command = nodeCommand += " scripts/run-tests.js --color";

child.execSync(command, {stdio:[0, 1, 2]});
