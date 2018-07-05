import type { NodePath } from "@babel/traverse";
import template from "@babel/template";
import * as t from "@babel/types";

function buildParams(params, scope) {
  const dummies = [];
  for (const param of params) {
    if (t.isAssignmentPattern(param) || t.isRestElement(param)) {
      break;
    }
    dummies.push(scope.generateUidIdentifier("x"));
  }
  return dummies;
}

function classOrObjectMethod(path: NodePath, callId: Object) {
  const { node } = path;
  const { body } = node;

  const params = node.params.map(t.cloneNode);
  const container = t.functionExpression(null, params, t.cloneNode(body));

  path
    .get("body")
    .replaceWith(t.blockStatement([t.expressionStatement(container)]));

  const fn = path.get("body.body.0.expression");
  plainFunction(fn, callId);
  path.get("body").replaceWith(t.cloneNode(fn.node.body));
}

function plainFunction(path: NodePath, callId: Object) {
  const { node } = path;
  const functionId = node.id;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToExpression();
  }

  const name = functionId ? functionId.name : "wrapped";
  const ref = path.scope.generateUidIdentifier(name);
  const fn = t.cloneNode(node);
  fn.type = "FunctionExpression";
  fn.generator = true;

  const caller = template.statement.ast`
    return ${ref}.apply(this, arguments);
  `;
  const wrapper = template.statement.ast`
    function ${ref}() {
      ${ref} = ${callId}(${fn});
      ${caller}
    }
  `;

  node.params = buildParams(node.params, path.scope);

  path.get("body").replaceWith(t.blockStatement([caller, wrapper]));
  path.get("body.body.1").hoist();
}

export default function wrapFunction(path: NodePath, callId: Object) {
  if (path.isClassMethod() || path.isObjectMethod()) {
    classOrObjectMethod(path, callId);
  } else {
    plainFunction(path, callId);
  }
}
