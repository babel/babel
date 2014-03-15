/**
 * Copyright (c) 2014, Facebook, Inc.
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
var types = recast.types;
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

  var path = parse(source);
  var programPath = path.get("program");

  if (shouldVarify(source, options)) {
    // Transpile let/const into var declarations.
    varifyAst(programPath.node);
  }

  transform(programPath);

  injectRuntime(runtime, programPath.node);

  return recast.print(path).code;
}

function parse(source) {
  types.builtInTypes.string.assert(source);

  var ast = recast.parse(source, {
    // Use the harmony branch of Esprima that installs with regenerator
    // instead of the master branch that recast provides.
    esprima: esprimaHarmony,
    range: true
  });

  return new types.NodePath(ast);
}

function shouldVarify(source, options) {
  var supportBlockBinding = !!options.supportBlockBinding;
  if (supportBlockBinding) {
    if (!blockBindingExp.test(source)) {
      supportBlockBinding = false;
    }
  }

  return supportBlockBinding;
}

function varify(source) {
  var path = parse(source);
  varifyAst(path.get("program").node);
  return recast.print(path).code;
}

function varifyAst(ast) {
  types.namedTypes.Program.assert(ast);

  var defsResult = require("defs")(ast, {
    ast: true,
    disallowUnknownReferences: false,
    disallowDuplicated: false,
    disallowVars: false,
    loopClosures: "iife"
  });

  if (defsResult.errors) {
    throw new Error(defsResult.errors.join("\n"))
  }

  return ast;
}

function injectRuntime(runtime, ast) {
  types.builtInTypes.string.assert(runtime);
  types.namedTypes.Program.assert(ast);

  // Include the runtime by modifying the AST rather than by concatenating
  // strings. This technique will allow for more accurate source mapping.
  if (runtime !== "") {
    var runtimeBody = recast.parse(runtime, {
      sourceFileName: regenerator.runtime.dev
    }).program.body;

    var body = ast.body;
    body.unshift.apply(body, runtimeBody);
  }

  return ast;
}

function runtime() {
  require(runtime.dev);
}

runtime.dev = path.join(__dirname, "runtime", "dev.js");
runtime.min = path.join(__dirname, "runtime", "min.js");

// Convenience for just translating let/const to var declarations.
regenerator.varify = varify;

// To modify an AST directly, call require("regenerator").transform(ast).
regenerator.transform = transform;

// To include the runtime in the current node process, call
// require("regenerator").runtime().
regenerator.runtime = runtime;

// To transform a string of ES6 code, call require("regenerator")(source);
module.exports = regenerator;
