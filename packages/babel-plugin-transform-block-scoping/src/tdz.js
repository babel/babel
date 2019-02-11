import { types as t, template } from "@babel/core";

function getTDZStatus(refPath, bindingPath) {
  const executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "inside";
  } else if (executionStatus === "after") {
    return "outside";
  } else {
    return "maybe";
  }
}

function buildTDZAssert(node, state) {
  return t.callExpression(state.addHelper("temporalRef"), [
    node,
    t.stringLiteral(node.name),
  ]);
}

function isReference(node, scope, state) {
  const declared = state.letReferences[node.name];
  if (!declared) return false;

  // declared node is different in this scope
  return scope.getBindingIdentifier(node.name) === declared;
}

export const visitor = {
  ReferencedIdentifier(path, state) {
    if (!state.tdzEnabled) return;

    const { node, parent, scope } = path;

    if (path.parentPath.isFor({ left: node })) return;
    if (!isReference(node, scope, state)) return;

    const bindingPath = scope.getBinding(node.name).path;

    if (bindingPath.isFunctionDeclaration()) return;

    const status = getTDZStatus(path, bindingPath);
    if (status === "inside") return;

    if (status === "maybe") {
      const assert = buildTDZAssert(node, state);

      // add tdzThis to parent variable declarator so it's exploded
      bindingPath.parent._tdzThis = true;

      path.skip();

      if (path.parentPath.isUpdateExpression()) {
        if (parent._ignoreBlockScopingTDZ) return;
        path.parentPath.replaceWith(t.sequenceExpression([assert, parent]));
      } else {
        path.replaceWith(assert);
      }
    } else if (status === "outside") {
      path.replaceWith(template.ast`${state.addHelper("tdz")}("${node.name}")`);
    }
  },

  AssignmentExpression: {
    exit(path, state) {
      if (!state.tdzEnabled) return;

      const { node } = path;
      if (node._ignoreBlockScopingTDZ) return;

      const nodes = [];
      const ids = path.getBindingIdentifiers();

      for (const name of Object.keys(ids)) {
        const id = ids[name];

        if (isReference(id, path.scope, state)) {
          nodes.push(id);
        }
      }

      if (nodes.length) {
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        path.replaceWithMultiple(nodes.map(n => t.expressionStatement(n)));
      }
    },
  },
};
