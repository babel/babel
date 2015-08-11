// https://github.com/zenparsing/es-function-bind

import * as t from "babel-types";

export var metadata = {
  optional: true,
  stage: 0
};

/**
 * [Please add a description.]
 */

function getTempId(scope) {
  var id = scope.path.getData("functionBind");
  if (id) return id;

  id = scope.generateDeclaredUidIdentifier("context");
  return scope.path.setData("functionBind", id);
}

/**
 * [Please add a description.]
 */

function getStaticContext(bind, scope) {
  var object = bind.object || bind.callee.object;
  return scope.isStatic(object) && object;
}

/**
 * [Please add a description.]
 */

function inferBindContext(bind, scope) {
  var staticContext = getStaticContext(bind, scope);
  if (staticContext) return staticContext;

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

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  CallExpression(node, parent, scope) {
    var bind = node.callee;
    if (!t.isBindExpression(bind)) return;

    var context = inferBindContext(bind, scope);
    node.callee = t.memberExpression(bind.callee, t.identifier("call"));
    node.arguments.unshift(context);
  },

  /**
   * [Please add a description.]
   */

  BindExpression(node, parent, scope) {
    var context = inferBindContext(node, scope);
    return t.callExpression(t.memberExpression(node.callee, t.identifier("bind")), [context]);
  }
};
