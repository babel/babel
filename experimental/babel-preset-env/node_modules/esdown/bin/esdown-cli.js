#! /usr/bin/env node
var Path = require("path");
var FS = require("fs");
var dir = Path.dirname(FS.realpathSync(__filename));

require(Path.resolve(dir, "..", "build", "esdown.js")).main();
