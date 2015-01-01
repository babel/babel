var t = require("../../types");

var isMemo = function (node) {
  var is = t.isAssignmentExpression(node) && node.operator === "?=";
  if (is) t.assertMemberExpression(node.left);
  return is;
};

var getPropRef = function (nodes, prop, file, scope) {
  if (t.isIdentifier(prop)) {
    return t.literal(prop.name);
  } else {
    var temp = t.getUid(prop, file, scope);
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(temp, prop)
    ]));
    return temp;
  }
};

var getObjRef = function (nodes, obj, file, scope) {
  if (t.isDynamic(obj)) {
    var temp = t.getUid(obj, file, scope);
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(temp, obj)
    ]));
    return temp;
  } else {
    return obj;
  }
};

var buildHasOwn = function (obj, prop, file) {
  return t.unaryExpression(
    "!",
    t.callExpression(
      t.memberExpression(file.addDeclaration("has-own"), t.identifier("call")),
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

exports.ExpressionStatement = function (node, parent, file, scope) {
  var expr = node.expression;
  if (!isMemo(expr)) return;

  var nodes = [];

  var left = expr.left;
  var obj  = getObjRef(nodes, left.object, file, scope);
  var prop = getPropRef(nodes, left.property, file, scope);

  nodes.push(t.ifStatement(
    buildHasOwn(obj, prop, file),
    t.expressionStatement(buildAssignment(expr, obj, prop))
  ));

  return nodes;
};

exports.AssignmentExpression = function (node, parent, file, scope) {
  if (t.isExpressionStatement(parent)) return;
  if (!isMemo(node)) return;

  var nodes = [];

  var left = node.left;
  var obj  = getObjRef(nodes, left.object, file, scope);
  var prop = getPropRef(nodes, left.property, file, scope);

  nodes.push(t.logicalExpression(
    "&&",
    buildHasOwn(obj, prop, file),
    buildAssignment(node, obj, prop)
  ));

  nodes.push(buildAbsoluteRef(left, obj, prop));

  return t.toSequenceExpression(nodes, scope);
};
