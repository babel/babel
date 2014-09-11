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
var through = require("through");
var transform = require("./lib/visit").transform;
var utils = require("./lib/util");
var recast = require("recast");
var types = recast.types;
var genFunExp = /\bfunction\s*\*/;
var blockBindingExp = /\b(let|const)\s+/;

function regenerator(source, options) {
  options = normalizeOptions(options);

  if (isFileName(source)) {
    // If source is a file name, assume we were invoked as a browserify
    // transform, and return a stream.
    // TODO Move the normal behavior into regenerator.compile in v0.6.
    return createStream(options);
  }

  var runtime = options.includeRuntime ? fs.readFileSync(
    regenerator.runtime.path, "utf-8"
  ) + "\n" : "";

  if (!genFunExp.test(source)) {
    return runtime + source; // Shortcut: no generators to transform.
  }

  var recastOptions = getRecastOptions(options);
  var ast = recast.parse(source, recastOptions);
  var path = new types.NodePath(ast);
  var programPath = path.get("program");

  if (shouldVarify(source, options)) {
    // Transpile let/const into var declarations.
    varifyAst(programPath.node);
  }

  transform(programPath);

  injectRuntime(runtime, programPath.node);

  return recast.print(path, recastOptions).code;
}

function isFileName(str) {
  return /\.js$/.test(str) && fs.existsSync(str);
}

function createStream(options) {
  var data = [];
  return through(write, end);

  function write(buf) {
    data.push(buf);
  }

  function end() {
    this.queue(regenerator(data.join(""), options));
    this.queue(null);
  }
}

function normalizeOptions(options) {
  options = utils.defaults(options || {}, {
    includeRuntime: false,
    supportBlockBinding: true
  });

  if (!options.esprima) {
    options.esprima = require("esprima-fb");
  }

  assert.ok(
    /harmony/.test(options.esprima.version),
    "Bad esprima version: " + options.esprima.version
  );

  return options;
}

function getRecastOptions(options) {
  var recastOptions = {
    range: true
  };

  function copy(name) {
    if (name in options) {
      recastOptions[name] = options[name];
    }
  }

  copy("esprima");
  copy("sourceFileName");
  copy("sourceMapName");
  copy("inputSourceMap");
  copy("sourceRoot");

  return recastOptions;
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

function varify(source, options) {
  var recastOptions = getRecastOptions(normalizeOptions(options));
  var ast = recast.parse(source, recastOptions);
  varifyAst(ast.program);
  return recast.print(ast, recastOptions).code;
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
      sourceFileName: regenerator.runtime.path
    }).program.body;

    var body = ast.body;
    body.unshift.apply(body, runtimeBody);
  }

  return ast;
}

function runtime() {
  require("regenerator/runtime");
}
runtime.path = path.join(__dirname, "runtime.js");

// Convenience for just translating let/const to var declarations.
regenerator.varify = varify;

// To modify an AST directly, call require("regenerator").transform(ast).
regenerator.transform = transform;

// To include the runtime in the current node process, call
// require("regenerator").runtime().
regenerator.runtime = runtime;

// To transform a string of ES6 code, call require("regenerator")(source);
module.exports = regenerator;
