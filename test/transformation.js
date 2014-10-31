var transform = require("../lib/6to5/transform");
var helper    = require("./_helper");
var assert    = require("assert");

helper.runTransformationTests(helper.getTransformationTests(), transform, assert);
