/* @flow */

import type { Scope } from "babel-traverse";
import * as t from "babel-types";

let visitor = {
  enter(path, state) {
    if (path.isThisExpression() || path.isReferencedIdentifier({ name: "arguments" })) {
      state.found = true;
      path.stop();
    }
  },

  Function(path) {
    path.skip();
  }
};

export default function (node: Object, scope: Scope) {
  let container = t.functionExpression(null, [], node.body, node.generator, node.async);

  let callee = container;
  let args   = [];

  let state = { found: false };
  scope.traverse(node, visitor, state);
  if (state.found) {
    callee = t.memberExpression(container, t.identifier("apply"));
    args = [t.thisExpression(), t.identifier("arguments")];
  }

  let call = t.callExpression(callee, args);
  if (node.generator) call = t.yieldExpression(call, true);

  return t.returnStatement(call);
}
