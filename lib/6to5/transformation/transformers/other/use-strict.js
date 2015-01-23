"use strict";

var useStrict = require("../../helpers/use-strict");
var t         = require("../../../types");

exports.ast = {
  exit: function (ast) {
    if (!useStrict.has(ast.program)) {
      ast.program.body.unshift(t.expressionStatement(t.literal("use strict")));
    }
  }
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, scope, context) {
  context.skip();
};

exports.ThisExpression = function (node, parent, scope, context, file) {
  throw file.errorWithNode(node, "Top level `this` is not allowed", ReferenceError);
};
