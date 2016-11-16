#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var child  = require("child_process");

var thisBase = path.join(__dirname, "..");
var distPath = path.join(thisBase, "dist");
var browserify = path.join(thisBase, "..", "..", "node_modules", "browserify", "bin", "cmd.js");
var uglify = path.join(thisBase, "..", "..", "node_modules", "uglify-js", "bin", "uglifyjs");
var polyfillFile = path.join(distPath, "polyfill.js");
var polyfillMinFile = path.join(distPath, "polyfill.min.js");
var indexFile = path.join(thisBase, "lib", "index.js");

try {
  fs.statSync(distPath);
}
catch (e) {
  fs.mkdirSync(distPath);
}

var browserifyCommand = indexFile +
  " --insert-global-vars \"global\"" +
  " --plugin bundle-collapser/plugin" +
  " --plugin derequire/plugin" +
  " > " + polyfillFile;

var uglifyCommand = polyfillFile +
  " --compress keep_fnames,keep_fargs,warnings=false" +
  " --mangle keep_fnames" +
  " > " + polyfillMinFile;

child.execSync("node " + browserify + " " + browserifyCommand);
child.execSync("node " + uglify + " " + uglifyCommand);
