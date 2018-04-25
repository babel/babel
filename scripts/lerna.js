"use strict";

var path = require("path");

// A subdependency of lerna has dropped support for early versions of Node without
// a major version bump, so we must load the polyfill to define Object.assign.
// https://github.com/npm/hosted-git-info/pull/25
require("babel-polyfill");

require(path.resolve(__dirname, "../node_modules/lerna/bin/lerna.js"));

