"use strict";

var useStrict = require("../../helpers/use-strict");
var t         = require("../../../types");

exports.post = function (file) {
  var program = file.ast.program;
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
