// https://github.com/zenparsing/es-function-bind

import * as t from "../../../types";

export var metadata = {
  optional: true,
  stage: 0
};

function inferBindContext(bindExpr, scope) {
  // nothing to infer
  if (bindExpr.object) return bindExpr.object;

  var id = scope.path.getData("functionBind");
  if (!id) {
    id = scope.generateTemp("context");
    scope.path.setData("functionBind", id);
  }
  bindExpr.callee.object = t.assignmentExpression("=", id, bindExpr.callee.object);
  return id;
}

export function CallExpression(node, parent, scope, file) {
  var bindExpr = node.callee;
  if (!t.isBindExpression(bindExpr)) return;
  var bindCtx = inferBindContext(bindExpr, scope);
  node.callee = t.memberExpression(bindExpr.callee, t.identifier("call"));
  node.arguments.unshift(bindCtx);
}

export function BindExpression(node, parent, scope, file) {
  var bindCtx = inferBindContext(node, scope);
  return t.callExpression(t.memberExpression(node.callee, t.identifier("bind")), [bindCtx]);
}
