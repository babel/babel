// https://github.com/zenparsing/es-function-bind

import * as t from "babel-types";

export let metadata = {
  optional: true,
  stage: 0
};

function getTempId(scope) {
  let id = scope.path.getData("functionBind");
  if (id) return id;

  id = scope.generateDeclaredUidIdentifier("context");
  return scope.path.setData("functionBind", id);
}

function getStaticContext(bind, scope) {
  let object = bind.object || bind.callee.object;
  return scope.isStatic(object) && object;
}

function inferBindContext(bind, scope) {
  let staticContext = getStaticContext(bind, scope);
  if (staticContext) return staticContext;

  let tempId = getTempId(scope);
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

export let visitor = {
  CallExpression(node, parent, scope) {
    let bind = node.callee;
    if (!t.isBindExpression(bind)) return;

    let context = inferBindContext(bind, scope);
    node.callee = t.memberExpression(bind.callee, t.identifier("call"));
    node.arguments.unshift(context);
  },

  BindExpression(node, parent, scope) {
    let context = inferBindContext(node, scope);
    return t.callExpression(t.memberExpression(node.callee, t.identifier("bind")), [context]);
  }
};
