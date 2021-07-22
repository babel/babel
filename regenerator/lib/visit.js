/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var recast = require("recast");
var types = recast.types;
var n = types.namedTypes;
var util = require("./util.js");

exports.transform = function transform(node, options) {
  options = util.defaults(options || {}, {
    includeRuntime: false
  });

  var result = require("@babel/core").transformFromAstSync(node, null, {
    presets: [require("regenerator-preset")],
    code: false,
    ast: true,
    // The deep-clone utility that Babel uses (based on V8's Serialization API
    // https://nodejs.org/api/v8.html#v8_serialization_api in Node.js) removes
    // the prototypes from the cloned node.loc.lines objects that Recast uses
    // internally, leading to _blockHoist test failures in tests.transform.js.
    // Also, unless cloning is somehow truly necessary, it should be faster to
    // skip this step.
    cloneInputAst: false
  });

  node = result.ast;

  if (options.includeRuntime === true) {
    injectRuntime(n.File.check(node) ? node.program : node);
  }

  return node;
};

function injectRuntime(program) {
  n.Program.assert(program);

  // Include the runtime by modifying the AST rather than by concatenating
  // strings. This technique will allow for more accurate source mapping.
  var runtimePath = require("..").runtime.path;
  var runtime = fs.readFileSync(runtimePath, "utf8");
  var runtimeBody = recast.parse(runtime, {
    sourceFileName: runtimePath
  }).program.body;

  var body = program.body;
  body.unshift.apply(body, runtimeBody);
}
