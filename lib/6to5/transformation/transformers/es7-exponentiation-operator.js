// https://github.com/rwaldron/exponentiation-operator

exports.experimental = true;

var t = require("../../types");
var pow = t.memberExpression(t.identifier("Math"), t.identifier("pow"));

exports.AssignmentExpression = function (node) {
  if (node.operator !== "**=") return;
  node.operator = "=";
  node.right = t.callExpression(pow, [node.left, node.right]);
};

exports.BinaryExpression = function (node) {
  if (node.operator !== "**") return;

  return t.callExpression(pow, [node.left, node.right]);
};
