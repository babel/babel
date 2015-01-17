var t = require("../../types");

var isMallet = function (node) {
  var is = t.isAssignmentExpression(node) && node.operator === "||=";
  if (is) {
    var left = node.left;
    if (!t.isMemberExpression(left) && !t.isIdentifier(left)) {
      throw new Error("Expected type MemeberExpression or Identifier");
    }
    return true;
  }
};

var getObjRef = function (node, nodes, file, scope) {
  var obj = node.object;
  if (t.isIdentifier(obj)) return obj;

  var temp = scope.generateUidBasedOnNode(obj, file);
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(temp, obj)
  ]));
  return temp;
};

var getPropRef = function (node, nodes, file, scope) {
  var prop = node.property;
  var key = t.toComputedKey(node, prop);
  if (t.isLiteral(key)) return key;

  var temp = scope.generateUidBasedOnNode(prop, file);
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(temp, prop)
  ]));
  return temp;
};

var buildAbsoluteRef = function (node, nodes, file, scope) {
  if (t.isIdentifier(node)) return node;

  var obj = getObjRef(node, nodes, file, scope);
  var prop = getPropRef(node, nodes, file, scope);

  var computed = node.computed || t.isLiteral(prop);
  return t.memberExpression(obj, prop, computed);
};

var buildIsFalsey = function (node) {
  return t.unaryExpression("!", node, true);
};

var buildAssignment = function (left, right) {
  return t.assignmentExpression("=", left, right);
};

exports.ExpressionStatement = function (node, parent, file, scope) {
  var expr = node.expression;
  if (!isMallet(expr)) return;

  var nodes = [];
  var left = buildAbsoluteRef(expr.left, nodes, file, scope);

  nodes.push(t.ifStatement(
    buildIsFalsey(left),
    t.expressionStatement(buildAssignment(left, expr.right))
  ));

  return nodes;
};

exports.AssignmentExpression = function (node, parent, file, scope) {
  if (t.isExpressionStatement(parent)) return;
  if (!isMallet(node)) return;

  var nodes = [];
  var left = buildAbsoluteRef(node.left, nodes, file, scope);

  nodes.push(t.logicalExpression(
    "&&",
    buildIsFalsey(left),
    buildAssignment(left, node.right)
  ));

  nodes.push(left);

  return t.toSequenceExpression(nodes, scope);
};
