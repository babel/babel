"use strict";

var t = require("../../types");

exports.ExportDeclaration = function (node, parent, scope, context, file) {
  var declar = node.declaration;

  if (node.default) {
    if (t.isClassDeclaration(declar)) {
      // we need to replace default class declarations with an assignment
      // because VariableDeclaration nodes aren't allowed in `export default`
      node.declaration = t.assignmentExpression("=", declar.id, t.toExpression(declar));

      return [
        t.variableDeclaration("let", [
          t.variableDeclarator(declar.id)
        ]),
        node
      ];
    }
  } else {
    if (t.isFunctionDeclaration(declar)) {
      node.declaration = null;
      node.specifiers = [t.importSpecifier(declar.id, declar.id)];
      node._blockHoist = 2;
      return [declar, node];
    }
  }
};
