"use strict";

var t = require("../../types");
var _ = require("lodash");

var isProtoKey = function (node) {
  return t.isLiteral(t.toComputedKey(node, node.key), { value: "__proto__" });
};

var isProtoAssignmentExpression = function (node) {
  var left = node.left;
  return t.isMemberExpression(left) && t.isLiteral(t.toComputedKey(left, left.property), { value: "__proto__" });
};

var buildDefaultsCallExpression = function (expr, ref, file) {
  return t.expressionStatement(t.callExpression(file.addHelper("defaults"), [ref, expr.right]));
};

exports.optional = true;
exports.secondPass = true;

exports.AssignmentExpression = function (node, parent, scope, context, file) {
  if (t.isExpressionStatement(parent)) return;
  if (!isProtoAssignmentExpression(node)) return;

  var nodes = [];
  var left  = node.left.object;
  var temp  = scope.generateTempBasedOnNode(node.left.object, file);

  nodes.push(t.expressionStatement(t.assignmentExpression("=", temp, left)));
  nodes.push(buildDefaultsCallExpression(node, temp, file));
  if (temp) nodes.push(temp);

  return t.toSequenceExpression(nodes);
};

exports.ExpressionStatement = function (node, parent, scope, context, file) {
  var expr = node.expression;
  if (!t.isAssignmentExpression(expr, { operator: "=" })) return;

  if (isProtoAssignmentExpression(expr)) {
    return buildDefaultsCallExpression(expr, expr.left.object, file);
  }
};

exports.ObjectExpression = function (node, parent, scope, context, file) {
  var proto;

  for (var i = 0; i < node.properties.length; i++) {
    var prop = node.properties[i];

    if (isProtoKey(prop)) {
      proto = prop.value;
      _.pull(node.properties, prop);
    }
  }

  if (proto) {
    var args = [t.objectExpression([]), proto];
    if (node.properties.length) args.push(node);
    return t.callExpression(file.addHelper("extends"), args);
  }
};
