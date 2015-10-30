/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var asyncFunctionSyntax = require("babel-plugin-syntax-async-functions");
var blockScopingPlugin = require("babel-plugin-transform-es2015-block-scoping");
var forOfPlugin = require("babel-plugin-transform-es2015-for-of");
var babel = require("babel-core");

var regenerator = module.exports = function() {
  return require("./lib/visit");
};

regenerator.compile = function(code, opts) {
  // todo: includeRuntime
  return babel.transform(code, buildBabelOptions(opts));
};

regenerator.transform = function (ast, opts) {
  return babel.transformFromAst(ast, null, buildBabelOptions(opts));
};

function buildBabelOptions(opts) {
  return {
    plugins: [regenerator, blockScopingPlugin, asyncFunctionSyntax, forOfPlugin],
    sourceType: "script"
  };
}
