/* @flow */

import type { NodePath } from "babel-traverse";
import nameFunction from "babel-helper-function-name";
import * as t from "babel-types";

let awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression({ node }) {
    node.type = "YieldExpression";
  }
};

export default function (path: NodePath, callId: Object) {
  let node = path.node;
  if (node.generator) return;

  if (path.isClassMethod()) {
    node.async = false;

    let body = node.body;

    let container = t.functionExpression(null, [], t.blockStatement(body.body), true);
    container.shadow = true;
    body.body = [t.returnStatement(t.callExpression(t.callExpression(callId, [container]), []))];
    return;
  }

  node.async = false;
  node.generator = true;

  path.traverse(awaitVisitor);

  let container = t.functionExpression(null, [], t.blockStatement([
    t.returnStatement(t.callExpression(t.callExpression(callId, [node]), []))
  ]));
  node.shadow = container;

  if (path.isFunctionDeclaration()) {
    let declar = t.variableDeclaration("let", [
      t.variableDeclarator(t.identifier(node.id.name), container)
    ]);
    declar._blockHoist = true;

    nameFunction({
      node: container,
      parent: declar.declarations[0],
      scope: path.scope
    });

    path.replaceWith(declar);
  } else {
    path.replaceWith(container);
  }
}
