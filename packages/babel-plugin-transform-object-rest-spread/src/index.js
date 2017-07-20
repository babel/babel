import syntaxObjectRestSpread from "babel-plugin-syntax-object-rest-spread";

export default function({ types: t }) {
  function variableDeclarator(id, init) {
    return t.variableDeclarator(id, init);
  }

  function assignmentExpression(id, value) {
    return t.assignmentExpression("=", id, value);
  }

  return {
    inherits: syntaxObjectRestSpread,

    visitor: {
      SpreadElement(path) {
        const { parentPath } = path;
        if (!parentPath.isObjectExpression()) return;
        path.remove();
      },

      RestElement(path) {
        const { parent, parentPath, scope } = path;
        if (!parentPath.isObjectPattern()) return;

        const bindings = [];
        const root = path.findParent((path) => {
          if (path.listKey) bindings.push(path);

          let { parentPath } = path;
          if (parentPath.isObjectProperty()) parentPath = parentPath.parentPath;
          return !parentPath.isPattern();
        });

        let insertionPoint = root.parentPath;
        if (
          insertionPoint.isFunction() ||
          insertionPoint.isCatchClause() ||
          insertionPoint.isForXStatement()
        ) {
          insertionPoint.ensureBlock();
          const body = insertionPoint.get("body");
          const memo = scope.generateUidIdentifier("ref");
          body.unshiftContainer("body", t.variableDeclaration("var", [
            t.variableDeclarator(root.node, memo),
          ]));

          root.replaceWith(memo);
          // TODO: figure out how to continue normally.
          return;
        }

        const isDeclarator = insertionPoint.isVariableDeclarator();
        const build = isDeclarator ? variableDeclarator : assignmentExpression;
        const memoizer = isDeclarator ? "generateUidIdentifier" : "generateDeclaredUidIdentifier";

        const memo = scope[memoizer]("ref");
        parentPath.replaceWith(memo);
        const objectWithoutProperties = build(
          path.node.argument,
          t.callExpression(this.addHelper("objectWithoutProperties"), [
            memo,
            t.arrayExpression([/*TODO*/]),
          ]),
        );

        const ups = [];
        const afters = [];
        for (const binding of bindings) {
          const { parent, parentPath } = binding;
          const container = parent[binding.listKey]
          const siblings = container.splice(binding.key + 1, Infinity);
          if (!siblings.length) continue;

          const memo = scope[memoizer]("ref");
          parentPath.replaceWith(memo);

          let pattern;
          if (t.isArrayPattern(parent)) {
            const befores = Array(container.length);
            befores.fill(null);
            pattern = t.arrayPattern(befores.concat(siblings));
          } else {
            pattern = t.objectPattern(siblings);
          }

          ups.push(build(parent, memo));
          afters.push(build(pattern, memo));
        }

        if (isDeclarator) {
          insertionPoint.insertAfter(ups.concat(objectWithoutProperties, afters));
        } else if (insertionPoint.isAssignmentExpression()) {
          insertionPoint.replaceWith(t.sequenceExpression([insertionPoint.node].concat(ups, objectWithoutProperties, afters)))
        }
      },
    },
  };
}
