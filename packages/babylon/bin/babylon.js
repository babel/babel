#!/usr/bin/env node

var babylon = require("../lib/index");
var fs      = require("fs");

var filename = process.argv[2];
if (!filename) {
  console.error("no filename specified");
  process.exit(0);
}

var file = fs.readFileSync(filename, "utf8");
var ast  = babylon.parse(file);

console.log(JSON.stringify(ast, null, "  "));
