/* @flow */

import type { NodePath } from "babel-traverse";
import nameFunction from "babel-helper-function-name";
import template from "babel-template";
import * as t from "babel-types";

let buildWrapper = template(`
  (function () {
    var ref = FUNCTION;
    return function (PARAMS) {
      return ref.apply(this, arguments);
    };
  })
`);

let awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression({ node }) {
    node.type = "YieldExpression";
  }
};

function classMethod(path: NodePath, callId: Object) {
  let node = path.node;
  let body = node.body;

  node.async = false;

  let container = t.functionExpression(null, [], t.blockStatement(body.body), true);
  container.shadow = true;
  body.body = [
    t.returnStatement(t.callExpression(
      t.callExpression(callId, [container]),
      []
    ))
  ];
}

function plainFunction(path: NodePath, callId: Object) {
  let node = path.node;

  node.async = false;
  node.generator = true;

  let built = t.callExpression(callId, [node]);
  let container = buildWrapper({
    FUNCTION: built,
    PARAMS: node.params.map(() => path.scope.generateUidIdentifier("x"))
  }).expression;

  let retFunction = container.body.body[1].argument;

  if (path.isFunctionDeclaration()) {
    let declar = t.variableDeclaration("let", [
      t.variableDeclarator(
        t.identifier(node.id.name),
        t.callExpression(container, [])
      )
    ]);
    declar._blockHoist = true;

    nameFunction({
      node: retFunction,
      parent: declar.declarations[0],
      scope: path.scope
    });

    path.replaceWith(declar);
  } else {
    nameFunction({
      node: retFunction,
      parent: path.parent,
      scope: path.scope
    });

    if (retFunction.id || node.params.length) {
      // we have an inferred function id or params so we need this wrapper
      path.replaceWith(t.callExpression(container, []));
    } else {
      // we can omit this wrapper as the conditions it protects for do not apply
      path.replaceWith(built);
    }
  }
}

export default function (path: NodePath, callId: Object) {
  let node = path.node;
  if (node.generator) return;

  path.traverse(awaitVisitor);

  if (path.isClassMethod()) {
    return classMethod(path, callId);
  } else {
    return plainFunction(path, callId);
  }
}
