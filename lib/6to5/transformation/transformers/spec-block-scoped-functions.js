"use strict";

var t = require("../../types");

exports.BlockStatement = function (node, parent) {
  if (t.isFunction(parent) || t.isExportDeclaration(parent)) {
    return;
  }

  for (var i = 0; i < node.body.length; i++) {
    var func = node.body[i];
    if (!t.isFunctionDeclaration(i)) continue;

    // this is to avoid triggering the TDZ detection
    func.id.loc = null;

    var declar = t.variableDeclaration("let", [
      t.variableDeclarator(func.id, t.toExpression(func))
    ]);

    // hoist it up above everything else
    declar._blockHoist = 2;

    // todo: name this
    func.id = null;

    func.body[i] = declar;
  }
};
