import * as t from "babel-types";

function getTDZStatus(refPath, bindingPath) {
  let executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "inside";
  } else if (executionStatus === "after") {
    return "outside"
  } else {
    return "maybe";
  }
}

function buildTDZAssert(node, file) {
  return t.callExpression(
    file.addHelper("temporalRef"),
    [node, t.stringLiteral(node.name), file.addHelper("temporalUndefined")]
  );
}

function isReference(node, scope, state) {
  let declared = state.letReferences[node.name];
  if (!declared) return false;

  // declared node is different in this scope
  return scope.getBindingIdentifier(node.name) === declared;
}

export let visitor = {
  ReferencedIdentifier(path, state) {
    if (!this.file.opts.tdz) return;

    let { node, parent, scope } = path;

    if (path.parentPath.isFor({ left: node })) return;
    if (!isReference(node, scope, state)) return;

    let bindingPath = scope.getBinding(node.name).path;

    let status = getTDZStatus(path, bindingPath);
    if (status === "inside") return;

    if (status === "maybe") {
      let assert = buildTDZAssert(node, state.file);

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
      path.replaceWith(t.throwStatement(t.inherits(
        t.newExpression(t.identifier("ReferenceError"), [
          t.stringLiteral(`${node.name} is not defined - temporal dead zone`)
        ]),
        node
      )));
    }
  },

  AssignmentExpression: {
    exit(path, state) {
      if (!this.file.opts.tdz) return;

      let { node } = path;
      if (node._ignoreBlockScopingTDZ) return;

      let nodes = [];
      let ids = path.getBindingIdentifiers();

      for (let name in ids) {
        let id = ids[name];

        if (isReference(id, path.scope, state)) {
          nodes.push(buildTDZAssert(id, state.file));
        }
      }

      if (nodes.length) {
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        path.replaceWithMultiple(nodes.map(t.expressionStatement));
      }
    }
  }
};
