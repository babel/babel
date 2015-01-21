"use strict";

var traverse = require("../../traverse");
var t        = require("../../types");

var visitor = {
  enter: function (node, parent, scope, context) {
    if (t.isFunction(node)) context.skip();

    if (t.isAwaitExpression(node)) {
      node.type = "YieldExpression";
    }
  }
};

module.exports = function (node, callId, scope) {
  node.async = false;
  node.generator = true;

  traverse(node, visitor, scope);

  var call = t.callExpression(callId, [node]);
  var id = node.id;
  delete node.id;

  if (t.isFunctionDeclaration(node)) {
    var declar = t.variableDeclaration("let", [
      t.variableDeclarator(id, call)
    ]);
    declar._blockHoist = true;
    return declar;
  } else {
    return call;
  }
};
