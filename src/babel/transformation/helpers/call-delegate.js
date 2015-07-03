import * as t from "../../types";

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  enter(node, parent, scope, state) {
    if (this.isThisExpression() || this.isReferencedIdentifier({ name: "arguments" })) {
      state.found = true;
      this.stop();
    }
  },

  /**
   * [Please add a description.]
   */

  Function() {
    this.skip();
  }
};

/**
 * [Please add a description.]
 */

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
