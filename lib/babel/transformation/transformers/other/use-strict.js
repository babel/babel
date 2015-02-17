"use strict";

var useStrict = require("../../helpers/use-strict");
var messages  = require("../../../messages");
var t         = require("../../../types");

exports.Program = function (program) {
  if (!useStrict.has(program)) {
    program.body.unshift(t.expressionStatement(t.literal("use strict")));
  }
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
