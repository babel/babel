import * as t from "babel-types";

var visitor = {
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
