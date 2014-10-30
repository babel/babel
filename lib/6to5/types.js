var b = require("./builders");
var n = require("acorn-ast-types").namedTypes;
var _ = require("lodash");

exports.FUNCTION_TYPES = ["ArrowFunctionExpression", "FunctionDeclaration", "FunctionExpression"];

exports.aliases = {
  ArrowFunctionExpression: ["Function"],
  FunctionDeclaration:     ["Function"],
  FunctionExpression:      ["Function"]
};

exports.isFunction = function (node) {
  return _.contains(exports.FUNCTION_TYPES, node.type);
};

exports.isPattern = function (node) {
  return node.type === "ArrayPattern" || node.type === "ObjectPattern";
};

exports.isReferenced = function (node, parent) {
  // we're a property key so we aren't referenced
  if (parent.type === "Property" && parent.key === node) return false;

  var isMemberExpression = parent.type === "MemberExpression";

  // we're in a member expression and we're the computed property so we're referenced
  var isComputedProperty = isMemberExpression && parent.property === node && parent.computed;

  // we're in a member expression and we're the object so we're referenced
  var isObject = isMemberExpression && parent.object === node;

  // we are referenced
  if (!isMemberExpression || isComputedProperty || isObject) return true;

  return false;
};

exports.ensureBlock = function (node) {
  var block = node.body;
  if (block.type === "BlockStatement") return;

  if (!_.isArray(block)) {
    if (!n.Statement.check(block)) block = b.returnStatement(block);
    block = [block];
  }

  node.body = b.blockStatement(block);
};

exports.getSpecifierName = function (specifier) {
  return specifier.name || specifier.id;
};

exports.ensureExpressionType = function (node) {
  node.type = {
    FunctionDeclaration: "FunctionExpression",
    ClassDeclaration: "ClassExpression"
  }[node.type] || node.type;
  return node;
};
