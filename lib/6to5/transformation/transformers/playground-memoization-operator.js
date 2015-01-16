var t = require("../../types");

var isMemo = function (node) {
  var is = t.isAssignmentExpression(node) && node.operator === "?=";
  if (is) t.assertMemberExpression(node.left);
  return is;
};

var getPropRef = function (nodes, member, file, scope) {
  var prop = member.property;
  var key = t.toComputedKey(member, member.property);
  if (t.isLiteral(key)) {
    return key;
  } else {
    var temp = scope.generateUidBasedOnNode(prop, file);
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(temp, prop)
    ]));
    return temp;
  }
};

var getObjRef = function (nodes, obj, file, scope) {
  var temp = scope.generateUidBasedOnNode(obj, file);
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(temp, obj)
  ]));
  return temp;
};

var buildHasOwn = function (obj, prop, file) {
  return t.unaryExpression(
    "!",
    t.callExpression(
      t.memberExpression(file.addHelper("has-own"), t.identifier("call")),
      [obj, prop]
    ),
    true
  );
};

var buildAbsoluteRef = function (left, obj, prop) {
  var computed = left.computed || t.isLiteral(prop);
  return t.memberExpression(obj, prop, computed);
};

var buildAssignment = function (expr, obj, prop) {
  return t.assignmentExpression("=", buildAbsoluteRef(expr.left, obj, prop), expr.right);
};

exports.ExpressionStatement = function (node, parent, scope, context, file) {
  var expr = node.expression;
  if (!isMemo(expr)) return;

  var nodes = [];

  var left = expr.left;
  var obj  = getObjRef(nodes, left.object, file, scope);
  var prop = getPropRef(nodes, left, file, scope);

  nodes.push(t.ifStatement(
    buildHasOwn(obj, prop, file),
    t.expressionStatement(buildAssignment(expr, obj, prop))
  ));

  return nodes;
};

exports.AssignmentExpression = function (node, parent, scope, context, file) {
  if (t.isExpressionStatement(parent)) return;
  if (!isMemo(node)) return;

  var nodes = [];

  var left = node.left;
  var obj  = getObjRef(nodes, left.object, file, scope);
  var prop = getPropRef(nodes, left, file, scope);

  nodes.push(t.logicalExpression(
    "&&",
    buildHasOwn(obj, prop, file),
    buildAssignment(node, obj, prop)
  ));

  nodes.push(buildAbsoluteRef(left, obj, prop));

  return t.toSequenceExpression(nodes, scope);
};
