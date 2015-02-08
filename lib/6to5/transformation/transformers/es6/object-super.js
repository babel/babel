"use strict";

var ReplaceSupers = require("../../helpers/replace-supers");
var t             = require("../../../types");

exports.check = function (node) {
  return t.isIdentifier(node, { name: "super" });
};

exports.Property = function (node, parent, scope, file) {
  if (!node.method) return;

  var value = node.value;
  var thisExpr = scope.generateUidIdentifier("this");

  var replaceSupers = new ReplaceSupers({
    topLevelThisReference: thisExpr,
    methodNode:            node,
    className:             thisExpr,
    isStatic:              true,
    scope:                 scope,
    file:                  file
  });

  replaceSupers.replace();

  if (replaceSupers.hasSuper) {
    value.body.body.unshift(
      t.variableDeclaration("var", [
        t.variableDeclarator(thisExpr, t.thisExpression())
      ])
    );
  }
};
