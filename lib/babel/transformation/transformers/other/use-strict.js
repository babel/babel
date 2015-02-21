"use strict";

var messages = require("../../../messages");
var t        = require("../../../types");

exports.Program = function (program) {
  var first = program.body[0];
  if (t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" })) {
    program.body.shift();
  }
};

exports.post = function (file) {
  file.ast.program.body.unshift(t.expressionStatement(t.literal("use strict")));
};

exports.FunctionDeclaration =
exports.FunctionExpression = function () {
  this.skip();
};

exports.ThisExpression = function () {
  return t.identifier("undefined");
};

exports.CallExpression = function (node, parent, scope, file) {
  if (t.isIdentifier(node.callee, { name: "eval" })) {
    throw file.errorWithNode(node, messages.get("evalInStrictMode"));
  }
};
