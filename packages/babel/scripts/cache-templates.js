#!/usr/bin/env node

var fs = require("fs");
var util = require("../lib/util");
fs.writeFileSync(__dirname + "/../templates.json", JSON.stringify(util.templates));
