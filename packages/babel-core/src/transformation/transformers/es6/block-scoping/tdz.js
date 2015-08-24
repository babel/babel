import * as t from "babel-types";

/**
 * [Please add a description.]
 */

function getTDZStatus(refPath, bindingPath) {
  var executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "inside";
  } else if (executionStatus === "after") {
    return "outside"
  } else {
    return "maybe";
  }
}

/**
 * [Please add a description.]
 */

function buildTDZAssert(node, file) {
  return t.callExpression(
    file.addHelper("temporal-assert-defined"),
    [node, t.literal(node.name), file.addHelper("temporal-undefined")]
  );
}

/**
 * [Please add a description.]
 */

function isReference(node, scope, state) {
  var declared = state.letReferences[node.name];
  if (!declared) return false;

  // declared node is different in this scope
  return scope.getBindingIdentifier(node.name) === declared;
}

export var visitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier(node, parent, scope, state) {
    if (t.isFor(parent, { left: node })) return;
    if (!isReference(node, scope, state)) return;

    var bindingPath = scope.getBinding(node.name).path;

    var status = getTDZStatus(this, bindingPath);
    if (status === "inside") return;

    if (status === "maybe") {
      var assert = buildTDZAssert(node, state.file);

      // add tdzThis to parent variable declarator so it's exploded
      bindingPath.parent._tdzThis = true;

      this.skip();

      if (t.isUpdateExpression(parent)) {
        if (parent._ignoreBlockScopingTDZ) return;
        this.parentPath.replaceWith(t.sequenceExpression([assert, parent]));
      } else {
        return t.logicalExpression("&&", assert, node);
      }
    } else if (status === "outside") {
      return t.throwStatement(t.newExpression(t.identifier("ReferenceError"), [
        t.literal(`${node.name} is not defined - temporal dead zone`)
      ]));
    }
  },

  /**
   * [Please add a description.]
   */

  AssignmentExpression: {
    exit(node, parent, scope, state) {
      if (node._ignoreBlockScopingTDZ) return;

      var nodes = [];
      var ids = this.getBindingIdentifiers();

      for (var name in ids) {
        var id = ids[name];

        if (isReference(id, scope, state)) {
          nodes.push(buildTDZAssert(id, state.file));
        }
      }

      if (nodes.length) {
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        return nodes.map(t.expressionStatement);
      }
    }
  }
};
