var t = require("../../types");
var _ = require("lodash");

exports.BlockStatement = function (node, parent) {
  if (t.isFunction(parent)) return;

  node.body = node.body.map(function (node) {
    if (t.isFunction(node)) {
      node.type = "FunctionExpression";
      var declar = t.variableDeclaration("let", [
        t.variableDeclarator(node.id, node)
      ]);
      declar._blockHoist = true;
      return declar;
    } else {
      return node;
    }
  });
};
