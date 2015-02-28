import t from "../../types";

var isCreateClassCallExpression = t.buildMatchMemberExpression("React.createClass");

export function isCreateClass(node) {
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
}

export var isReactComponent = t.buildMatchMemberExpression("React.Component");

export function isCompatTag(tagName) {
  return tagName && /^[a-z]|\-/.test(tagName);
}
