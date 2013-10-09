/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assert = require("assert");
var types = require("ast-types");
var n = types.namedTypes;
var b = types.builders;
var hoist = require("./hoist").hoist;
var Emitter = require("./emit").Emitter;

exports.transform = function(ast) {
  return types.traverse(ast, visitNode);
};

function visitNode(node) {
  if (!n.Function.check(node) || !node.generator) {
    return;
  }

  node.generator = false;

  // TODO Ensure that the context is named uniquely.
  var contextId = b.identifier("$ctx");

  if (node.expression) {
    // Transform expression lambdas into normal functions.
    node.expression = false;
    node.body = b.blockStatement([
      b.returnStatement(node.body)
    ]);
  }

  var vars = hoist(node);

  var emitter = new Emitter(contextId);
  emitter.explode(node.body);

  // TODO Need to do something about FunctionDeclarations.
  // They don't need to be exploded, and it's probably safer to move
  // them out of the inner function like the hoisted variables.
  // How about this:
  // 1. hoist the function names as variables, and then
  // 2. turn each declaration site into an assignment to the name.

  var outerBody = [];

  if (vars && vars.declarations.length > 0) {
    outerBody.push(vars);
  }

  outerBody.push(b.returnStatement(
    b.callExpression(b.identifier("wrapGenerator"), [
      emitter.getContextFunction(),
      b.thisExpression()
    ])
  ));

  node.body = b.blockStatement(outerBody);
}
