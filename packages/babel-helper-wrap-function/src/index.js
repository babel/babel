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

const superPropVisitor = {
  MemberExpression(path) {
    if (path.get("object").isSuper()) {
      this.hasSuperProp = true;
      path.stop();
    }
  },
};

function classOrObjectMethod(path: NodePath, callId: Object) {
  const { node } = path;
  const { body, key } = node;

  const id =
    node.computed || !t.isIdentifier(key) || !t.isValidES3Identifier(key.name)
      ? null
      : t.cloneNode(node.key);
  const params = node.params.map(t.cloneNode);
  const container = t.functionDeclaration(id, params, t.cloneNode(body));

  path.get("body").replaceWith(t.blockStatement([container]));

  const fn = path.get("body.body.0");

  const state = { hasSuperProp: false };
  fn.traverse(superPropVisitor, state);
  const hasSuperProp = state.hasSuperProp;

  plainFunction(fn, callId, hasSuperProp);
  path.get("body").replaceWith(t.cloneNode(fn.node.body));
  node.params = fn.node.params;
}

function plainFunction(path: NodePath, callId: Object, hasSuperProp = false) {
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

  if (hasSuperProp) {
    const caller = template.statement.ast`
      return ${callId}(${fn})();
    `;

    path.get("body").replaceWith(t.blockStatement([caller]));
    // Unwrap the wrapper IIFE's environment so super and this and such still work.
    path
      .get("body.body.0.argument.callee.arguments.0")
      .unwrapFunctionEnvironment();
  } else {
    const caller = template.statement.ast`
      return ${ref}.apply(this, arguments);
    `;
    const wrapper = template.statement.ast`
      function ${ref}() {
        ${ref} = ${callId}(${fn});
        ${caller}
      }
    `;

    path.get("body").replaceWith(t.blockStatement([caller, wrapper]));
    node.params = buildParams(node.params, path.scope);
    path.get("body.body.1").hoist();
  }
}

export default function wrapFunction(path: NodePath, callId: Object) {
  if (path.isClassMethod() || path.isObjectMethod()) {
    classOrObjectMethod(path, callId);
  } else {
    plainFunction(path, callId);
  }
}
