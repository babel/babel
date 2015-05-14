// https://github.com/zenparsing/es-function-bind

import * as t from "../../../types";

export var metadata = {
  optional: true,
  stage: 0
};

function getTempId(scope) {
  var id = scope.path.getData("functionBind");
  if (id) return id;
  id = scope.generateTemp("context");
  return scope.path.setData("functionBind", id);
}

function inferBindContext(bind, scope) {
  var tempId = getTempId(scope);
  if (bind.object) {
    bind.callee = t.sequenceExpression([
      t.assignmentExpression("=", tempId, bind.object),
      bind.callee
    ]);
  } else {
    bind.callee.object = t.assignmentExpression("=", tempId, bind.callee.object);
  }
  return tempId;
}

export function CallExpression(node, parent, scope, file) {
  var bind = node.callee;
  if (!t.isBindExpression(bind)) return;
  var context = inferBindContext(bind, scope);
  node.callee = t.memberExpression(bind.callee, t.identifier("call"));
  node.arguments.unshift(context);
}

export function BindExpression(node, parent, scope, file) {
  var context = inferBindContext(node, scope);
  return t.callExpression(t.memberExpression(node.callee, t.identifier("bind")), [context]);
}
