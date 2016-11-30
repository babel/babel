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
var genOrAsyncFunExp = /\bfunction\s*\*|\basync\b/;
var blockBindingExp = /\b(let|const)\s+/;

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

function compile(source, options) {
  var result;
  options = normalizeOptions(options);

  // Shortcut: Transform only if generators or async functions present.
  if (genOrAsyncFunExp.test(source)) {
    var transformOptions = {
      presets: []
    };

    if (options.babelOptions) {
      Object.keys(options.babelOptions).forEach(function (key) {
        transformOptions[key] = options.babelOptions[key];
      });
    }

    transformOptions.presets.push(require("regenerator-preset"));

    result = require("babel-core").transform(source, transformOptions);

  } else {
    result = { code: source };
  }

  if (options.includeRuntime === true) {
    result.code = getRuntimeCode() + "\n" + result.code;
  }

  return result;
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

// Convenience for just translating let/const to var declarations.
exports.varify = varify;

// Allow packages that depend on Regenerator to use the same copy of
// ast-types, in case multiple versions are installed by NPM.
exports.types = types;

// Transforms a string of source code, returning the { code, map? } result
// from recast.print.
exports.compile = compile;

// To modify an AST directly, call require("regenerator").transform(ast).
exports.transform = transform;
