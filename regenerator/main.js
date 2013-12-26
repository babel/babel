/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var path = require("path");
var fs = require("fs");
var transform = require("./lib/visit").transform;
var utils = require("./lib/util");
var recast = require("recast");
var esprimaHarmony = require("esprima");
var genFunExp = /\bfunction\s*\*/;
var blockBindingExp = /\b(let|const)\s+/;

assert.ok(
  /harmony/.test(esprimaHarmony.version),
  "Bad esprima version: " + esprimaHarmony.version
);

function regenerator(source, options) {
  options = utils.defaults(options || {}, {
    includeRuntime: false,
    supportBlockBinding: true
  });

  var runtime = options.includeRuntime ? fs.readFileSync(
    regenerator.runtime.dev, "utf-8"
  ) + "\n" : "";

  if (!genFunExp.test(source)) {
    return runtime + source; // Shortcut: no generators to transform.
  }

  var runtimeBody = recast.parse(runtime, {
    sourceFileName: regenerator.runtime.dev
  }).program.body;

  var supportBlockBinding = !!options.supportBlockBinding;
  if (supportBlockBinding) {
    if (!blockBindingExp.test(source)) {
      supportBlockBinding = false;
    }
  }

  var recastOptions = {
    tabWidth: utils.guessTabWidth(source),
    // Use the harmony branch of Esprima that installs with regenerator
    // instead of the master branch that recast provides.
    esprima: esprimaHarmony,
    range: supportBlockBinding
  };

  var ast = recast.parse(source, recastOptions);

  // Transpile let/const into var declarations.
  if (supportBlockBinding) {
    var defsResult = require("defs")(ast.program, {
      ast: true,
      disallowUnknownReferences: false,
      disallowDuplicated: false,
      disallowVars: false,
      loopClosures: "iife"
    });

    if (defsResult.errors) {
      throw new Error(defsResult.errors.join("\n"))
    }
  }

  ast.program = transform(ast.program);

  // Include the runtime by modifying the AST rather than by concatenating
  // strings. This technique will allow for more accurate source mapping.
  if (options.includeRuntime) {
    var body = ast.program.body;
    body.unshift.apply(body, runtimeBody);
  }

  return recast.print(ast, recastOptions).code;
}

// To modify an AST directly, call require("regenerator").transform(ast).
regenerator.transform = transform;

regenerator.runtime = {
  dev: path.join(__dirname, "runtime", "dev.js"),
  min: path.join(__dirname, "runtime", "min.js")
};

// To transform a string of ES6 code, call require("regenerator")(source);
module.exports = regenerator;
