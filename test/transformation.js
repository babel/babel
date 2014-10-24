var transform = require("../lib/6to5/transform");
var helper    = require("./_helper");
var assert    = require("assert");

helper.run(helper.getTests(), transform, assert);
