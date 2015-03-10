import * as t from "../../../types";
import pull from "lodash/array/pull";

function isProtoKey(node) {
  return t.isLiteral(t.toComputedKey(node, node.key), { value: "__proto__" });
}

function isProtoAssignmentExpression(node) {
  var left = node.left;
  return t.isMemberExpression(left) && t.isLiteral(t.toComputedKey(left, left.property), { value: "__proto__" });
}

function buildDefaultsCallExpression(expr, ref, file) {
  return t.expressionStatement(t.callExpression(file.addHelper("defaults"), [ref, expr.right]));
}

export var secondPass = true;
export var optional = true;

export function AssignmentExpression(node, parent, scope, file) {
  if (!isProtoAssignmentExpression(node)) return;

  var nodes = [];
  var left  = node.left.object;
  var temp  = scope.generateTempBasedOnNode(node.left.object);

  nodes.push(t.expressionStatement(t.assignmentExpression("=", temp, left)));
  nodes.push(buildDefaultsCallExpression(node, temp, file));
  if (temp) nodes.push(temp);

  return t.toSequenceExpression(nodes);
}

export function ExpressionStatement(node, parent, scope, file) {
  var expr = node.expression;
  if (!t.isAssignmentExpression(expr, { operator: "=" })) return;

  if (isProtoAssignmentExpression(expr)) {
    return buildDefaultsCallExpression(expr, expr.left.object, file);
  }
}

export function ObjectExpression(node, parent, scope, file) {
  var proto;

  for (var i = 0; i < node.properties.length; i++) {
    var prop = node.properties[i];

    if (isProtoKey(prop)) {
      proto = prop.value;
      pull(node.properties, prop);
    }
  }

  if (proto) {
    var args = [t.objectExpression([]), proto];
    if (node.properties.length) args.push(node);
    return t.callExpression(file.addHelper("extends"), args);
  }
}
