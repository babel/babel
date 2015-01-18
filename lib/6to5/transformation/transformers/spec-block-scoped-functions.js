"use strict";

var t = require("../../types");

exports.FunctionDeclaration = function (node, parent) {
  if (t.isProgram(parent) || t.isExportDeclaration(parent)) {
    return;
  }

  var declar = t.variableDeclaration("let", [
    t.variableDeclarator(node.id, t.toExpression(node))
  ]);

  // hoist it up above everything else
  declar._blockHoist = 2;

  // todo: name this
  node.id = null;

  return declar;
};
