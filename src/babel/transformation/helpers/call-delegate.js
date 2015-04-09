import traverse from "../../traversal";
import * as t from "../../types";

var visitor = {
  enter(node, parent, scope, state) {
    if (this.isThisExpression() || this.isReferencedIdentifier({ name: "arguments" })) {
      state.found = true;
      this.stop();
    }

    if (this.isFunction()) {
      this.skip();
    }
  }
};

export default function (node, scope) {
  var container = t.functionExpression(null, [], node.body, node.generator, node.async);

  var callee = container;
  var args   = [];

  var state = { found: false };
  scope.traverse(node, visitor, state);
  if (state.found) {
    callee = t.memberExpression(container, t.identifier("apply"));
    args = [t.thisExpression(), t.identifier("arguments")];
  }

  var call = t.callExpression(callee, args);
  if (node.generator) call = t.yieldExpression(call, true);

  return t.returnStatement(call);
}
