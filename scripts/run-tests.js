#!/usr/bin/env node
"use strict";

require("./babel-register.js");

var path = require("path");
var Mocha = require("mocha");
var glob = require("glob");

var testGrep = process.env.npm_config_TEST_GREP || process.env.npm_config_test_grep;
var testPackage = process.env.npm_config_TEST_ONLY || process.env.npm_config_test_only;
var testSearch = "packages/" + (testPackage || "*") + "/test/*.js"

var mocha = new Mocha();

function getTestFiles() {
  glob.sync(testSearch).forEach(function(file) {
    mocha.addFile(file);
  });
}

function runTests() {
  if(testGrep) mocha.grep(testGrep);
  mocha.ui("tdd").reporter("dot").timeout(10000).run(function(failures) {
      process.exit(failures);
  });
}

getTestFiles();
runTests();
