/* @flow */

import type { NodePath } from "babel-traverse";
import * as t from "babel-types";

let awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression({ node }) {
    node.type = "YieldExpression";

    if (node.all) {
      // await* foo; -> yield Promise.all(foo);
      node.all = false;
      node.argument = t.callExpression(t.memberExpression(t.identifier("Promise"), t.identifier("all")), [node.argument]);
    }
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

  node.async = false;
  node.generator = true;

  path.traverse(awaitVisitor);

  let call = t.callExpression(callId, [node]);

  let id = node.id;
  node.id = null;

  if (t.isFunctionDeclaration(node)) {
    let declar = t.variableDeclaration("let", [
      t.variableDeclarator(id, call)
    ]);
    declar._blockHoist = true;
    return declar;
  } else {
    node.type = "FunctionExpression";

    if (id) {
      let state = { id, ref: null };

      path.traverse(referenceVisitor, state);

      if (state.ref) {
        path.scope.parent.push({ id: state.ref });
        return t.assignmentExpression("=", state.ref, call);
      }
    }

    return call;
  }
}
