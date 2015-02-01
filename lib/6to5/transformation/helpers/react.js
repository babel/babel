var t = require("../../types");

exports.isCreateClassCallExpression = function (node) {
  if (!node || !t.isCallExpression(node)) return false;

  var callee = node.callee;
  if (!t.isMemberExpression(callee)) return false;

  // not React call member object
  if (!t.isIdentifier(callee.object, { name: "React" })) return false;

  // not createClass call member property
  if (!t.isIdentifier(callee.property, { name: "createClass" })) return false;

  // no call arguments
  var args = node.arguments;
  if (args.length !== 1) return false;

  // first node arg is not an object
  var first = args[0];
  if (!t.isObjectExpression(first)) return false;

  return true;
};

exports.isReactComponentMemberExpression = function (node) {
  if (!node || !t.isMemberExpression(node)) return false;
  if (!t.isIdentifier(node.object, { name: "React" })) return false;
  if (!t.isIdentifier(node.property, { name: "Component" })) return false;
  return true;
};
