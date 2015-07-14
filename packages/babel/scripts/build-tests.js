#!/usr/bin/env node

var fs = require("fs");
var cache = require("../test/_helper").cache;
fs.writeFileSync(__dirname + "/../tests.json", JSON.stringify(cache));
