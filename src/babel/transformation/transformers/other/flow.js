var t = require("../../../types");

exports.TypeCastExpression = function (node) {
  return node.expression;
};

exports.ImportDeclaration = function (node) {
  if (node.isType) this.remove();
};

exports.ExportDeclaration = function (node) {
  if (t.isTypeAlias(node.declaration)) this.remove();
};
