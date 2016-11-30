/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var fs = require("fs");
var through = require("through");
var transform = require("./lib/visit").transform;
var utils = require("./lib/util");
var genOrAsyncFunExp = /\bfunction\s*\*|\basync\b/;

function exports(file, options) {
  var data = [];
  return through(write, end);

  function write(buf) {
    data.push(buf);
  }

  function end() {
    try {
      this.queue(compile(data.join(""), options).code);
      this.queue(null);
    } catch (e) { this.emit('error', e); }
  }
}

// To get a writable stream for use as a browserify transform, call
// require("regenerator")().
module.exports = exports;

// To include the runtime globally in the current node process, call
// require("regenerator").runtime().
function runtime() {
  regeneratorRuntime = require("regenerator-runtime");
}
exports.runtime = runtime;
runtime.path = require("regenerator-runtime/path.js").path;

var cachedRuntimeCode;
function getRuntimeCode() {
  return cachedRuntimeCode ||
    (cachedRuntimeCode = fs.readFileSync(runtime.path, "utf8"));
}

var transformOptions = {
  presets: [require("regenerator-preset")],
  parserOpts: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    strictMode: false,
    plugins: [
      "asyncFunctions",
      "asyncGenerators",
      "classConstructorCall",
      "classProperties",
      "decorators",
      "doExpressions",
      "exponentiationOperator",
      "exportExtensions",
      "flow",
      "functionBind",
      "functionSent",
      "jsx",
      "objectRestSpread",
      "trailingFunctionCommas"
    ]
  }
};

function compile(source, options) {
  var result;

  options = utils.defaults(options || {}, {
    includeRuntime: false
  });

  // Shortcut: Transform only if generators or async functions present.
  if (genOrAsyncFunExp.test(source)) {
    result = require("babel-core").transform(source, transformOptions);
  } else {
    result = { code: source };
  }

  if (options.includeRuntime === true) {
    result.code = getRuntimeCode() + "\n" + result.code;
  }

  return result;
}

// Allow packages that depend on Regenerator to use the same copy of
// ast-types, in case multiple versions are installed by NPM.
exports.types = require("recast").types;

// Transforms a string of source code, returning a { code, map? } result.
exports.compile = compile;

// To modify an AST directly, call require("regenerator").transform(ast).
exports.transform = transform;
