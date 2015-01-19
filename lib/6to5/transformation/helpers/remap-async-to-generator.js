"use strict";

var traverse = require("../../traverse");
var t        = require("../../types");

module.exports = function (node, callId) {
  node.async = false;
  node.generator = true;

  traverse(node, {
    enter: function (node, parent, scope, context) {
      if (t.isFunction(node)) context.skip();

      if (t.isAwaitExpression(node)) {
        node.type = "YieldExpression";
      }
    }
  });

  var call = t.callExpression(callId, [node]);

  if (t.isFunctionDeclaration(node)) {
    var declar = t.variableDeclaration("var", [
      t.variableDeclarator(node.id, call)
    ]);
    declar._blockHoist = true;
    return declar;
  } else {
    return call;
  }
};
