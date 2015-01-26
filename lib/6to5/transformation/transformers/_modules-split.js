"use strict";

var t = require("../../types");

exports.ExportDeclaration = function (node, parent, scope, context, file) {
  var declar = node.declaration;

  if (node.default) {
    if (t.isClassDeclaration(declar)) {
      node.declaration = declar.id;
      return [declar, node];
    }
  } else {
    if (t.isFunctionDeclaration(declar)) {
      node.specifiers  = [t.importSpecifier(declar.id, declar.id)];
      node.declaration = null;
      node._blockHoist = 2;
      return [declar, node];
    }
  }
};
