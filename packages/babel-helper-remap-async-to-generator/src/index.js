/* @flow */

import type { NodePath } from "babel-traverse";
import explodeClass from "babel-helper-explode-class";
import { bare as nameMethod } from "babel-helper-function-name";
import * as t from "babel-types";

let awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression({ node }) {
    node.type = "YieldExpression";
  }
};

let referenceVisitor = {
  ReferencedIdentifier({ node, scope }, state) {
    let name = state.id.name;
    if (node.name === name && scope.bindingIdentifierEquals(name, state.id)) {
      return state.ref = state.ref || scope.generateUidIdentifier(name);
    }
  }
};

export default function (path: NodePath, callId: Object) {
  let node = path.node;
  if (node.generator) return;

  node.async = false;
  node.generator = true;

  path.traverse(awaitVisitor);

  let container = t.functionExpression(null, [], t.blockStatement([
    t.returnStatement(t.callExpression(callId, [node]))
  ]));
  node.shadow = container;

  if (path.isFunctionDeclaration()) {
    let declar = t.variableDeclaration("let", [
      t.variableDeclarator(id, container)
    ]);
    declar._blockHoist = true;

    nameMethod({
      node: container,
      parent: declar.declarations[0],
      scope: path.scope
    });
    
    path.replaceWith(declar);
  } else {
    node.type = "FunctionExpression";

    if (path.parentPath.isMethodDefinition({ value: node })) {
      // we're a class method
      let classPath = path.parentPath.parentPath.parentPath;
      explodeClass(classPath);

      // remove method since we've injected ourselves already
      path.parentPath.remove();
    } else {
      path.replaceWith(container);
    }
  }
}
