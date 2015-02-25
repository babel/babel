var t = require("../../types");

var isCreateClassCallExpression = t.buildMatchMemberExpression("React.createClass");

exports.isCreateClass = function (node) {
  if (!node || !t.isCallExpression(node)) return false;

  // not React.createClass call member object
  if (!isCreateClassCallExpression(node.callee)) return false;

  // no call arguments
  var args = node.arguments;
  if (args.length !== 1) return false;

  // first node arg is not an object
  var first = args[0];
  if (!t.isObjectExpression(first)) return false;

  return true;
};

exports.isReactComponent = t.buildMatchMemberExpression("React.Component");

exports.isCompatTag = function (tagName) {
  return tagName && /^[a-z]|\-/.test(tagName);
};
