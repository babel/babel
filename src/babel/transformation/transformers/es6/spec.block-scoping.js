import * as t from "../../../types";

function buildAssert(node, file) {
  return t.callExpression(
    file.addHelper("temporal-assert-defined"),
    [node, t.literal(node.name), file.addHelper("temporal-undefined")]
  );
}

function references(node, scope, state) {
  var declared = state.letRefs[node.name];
  if (!declared) return false;

  // declared node is different in this scope
  return scope.getBindingIdentifier(node.name) === declared;
}

var visitor = {
  ReferencedIdentifier(node, parent, scope, state) {
    if (t.isFor(parent) && parent.left === node) return;

    if (!references(node, scope, state)) return;

    var assert = buildAssert(node, state.file);

    this.skip();

    if (t.isUpdateExpression(parent)) {
      if (parent._ignoreBlockScopingTDZ) return;
      this.parentPath.replaceWith(t.sequenceExpression([assert, parent]));
    } else {
      return t.logicalExpression("&&", assert, node);
    }
  },

  AssignmentExpression: {
    exit(node, parent, scope, state) {
      if (node._ignoreBlockScopingTDZ) return;

      var nodes = [];
      var ids = this.getBindingIdentifiers();

      for (var name in ids) {
        var id = ids[name];

        if (references(id, scope, state)) {
          nodes.push(buildAssert(id, state.file));
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

export var metadata = {
  optional: true,
  group: "builtin-advanced"
};

export var BlockStatement = {
  exit(node, parent, scope, file) {
    var letRefs = node._letReferences;
    if (!letRefs) return;

    this.traverse(visitor, {
      letRefs: letRefs,
      file:    file
    });
  }
};

export { BlockStatement as Program, BlockStatement as Loop };
