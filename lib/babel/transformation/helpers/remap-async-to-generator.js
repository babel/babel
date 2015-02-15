"use strict";

var t = require("../../types");

var visitor = {
  enter: function (node) {
    if (t.isFunction(node)) this.skip();

    if (t.isAwaitExpression(node)) {
      node.type = "YieldExpression";

      if (node.all) {
        // await* foo; -> yield Promise.all(foo);
        node.all = false;
        node.argument = t.callExpression(t.memberExpression(t.identifier("Promise"), t.identifier("all")), [node.argument]);
      }
    }
  }
};

module.exports = function (node, callId, scope) {
  node.async = false;
  node.generator = true;

  scope.traverse(node, visitor);

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
