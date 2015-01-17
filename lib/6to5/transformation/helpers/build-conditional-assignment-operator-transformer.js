var t = require("../../types");

module.exports = function (opts) {
  var getObjRef = function (node, nodes, file, scope) {
    var obj = node.object;
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

  var buildAssignment = function (left, right) {
    return t.assignmentExpression("=", left, right);
  };

  var exports = {};

  exports.ExpressionStatement = function (node, parent, scope, context, file) {
    var expr = node.expression;
    if (!opts.is(expr)) return;

    var nodes = [];
    var left  = buildAbsoluteRef(expr.left, nodes, file, scope);

    nodes.push(t.ifStatement(
      opts.build(left, file),
      t.expressionStatement(buildAssignment(left, expr.right))
    ));

    return nodes;
  };

  exports.AssignmentExpression = function (node, parent, scope, context, file) {
    if (t.isExpressionStatement(parent)) return;
    if (!opts.is(node)) return;

    var nodes = [];
    var left  = buildAbsoluteRef(node.left, nodes, file, scope);

    nodes.push(t.logicalExpression(
      "&&",
      opts.build(left, file),
      buildAssignment(left, node.right)
    ));

    nodes.push(left);

    return t.toSequenceExpression(nodes, scope);
  };

  return exports;
};
