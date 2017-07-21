import syntaxObjectRestSpread from "babel-plugin-syntax-object-rest-spread";

export default function({ types: t }) {
  function variableDeclarator(id, init) {
    return t.variableDeclarator(id, init);
  }

  function assignmentExpression(id, value) {
    return t.assignmentExpression("=", id, value);
  }

  function generateUidVariableDeclarator(path, scope) {
    return scope.generateUidIdentifierBasedOnNode(path.node);
  }

  function generateUidAssignmentExpression(path, scope) {
    const id = generateUidVariableDeclarator(path, scope);
    scope.push({ id });
    return id;
  }

  const visitor = {
    SpreadElement(path) {
      const { parentPath } = path;
      if (!parentPath.isObjectExpression()) return;
      path.remove();
    },

    RestElement(path) {
      const { parentPath, parent } = path;
      if (!parentPath.isObjectPattern()) return;

      const bindings = [];
      const root = path.findParent(path => {
        if (path.listKey && path.parentPath.isPattern()) bindings.push(path);

        let { parentPath } = path;
        if (parentPath.isObjectProperty()) parentPath = parentPath.parentPath;
        return !parentPath.isPattern();
      });

      let insertionPoint = root.parentPath;
      if (insertionPoint.isVariableDeclarator()) {
        const { parent } = insertionPoint;
        const grandParentPath = insertionPoint.parentPath.parentPath;
        if (grandParentPath.isForXStatement({ left: parent })) {
          insertionPoint = grandParentPath;
        }
      }
      const scope = insertionPoint.isScope()
        ? insertionPoint.get("body").scope
        : insertionPoint.scope;
      const isDeclarator =
        insertionPoint.isScope() || insertionPoint.isVariableDeclarator();
      const build = isDeclarator ? variableDeclarator : assignmentExpression;
      const memoizer = isDeclarator
        ? generateUidVariableDeclarator
        : generateUidAssignmentExpression;

      const memo = memoizer(parentPath, scope);
      const objectWithoutProperties = [];
      const properties = parent.properties;
      properties.pop();
      const keys = [];
      for (const { computed, key } of properties) {
        if (t.isIdentifier(key) && !computed) {
          keys.push(t.stringLiteral(key.name));
        } else {
          keys.push(key);
        }
      }
      if (keys.length) {
        objectWithoutProperties.push(build(parent, memo));
      }
      objectWithoutProperties.push(
        build(
          path.node.argument,
          t.callExpression(this.addHelper("objectWithoutProperties"), [
            memo,
            t.arrayExpression(keys),
          ]),
        ),
      );
      parentPath.replaceWith(memo);

      const ups = [];
      const afters = [];
      for (const binding of bindings) {
        const { parent, parentPath } = binding;
        const container = parent[binding.listKey];
        const siblings = container.splice(binding.key + 1, Infinity);
        if (!siblings.length) continue;

        const memo = memoizer(parentPath, scope);
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

      let insertInto;
      if (insertionPoint.isScope()) {
        insertionPoint.ensureBlock();
        const body = insertionPoint.get("body");
        body.unshiftContainer("body", t.variableDeclaration("var", []));

        insertInto = body.get("body.0");
      }

      if (isDeclarator) {
        const declarators = ups.concat(objectWithoutProperties, afters);
        if (insertInto) {
          insertInto.pushContainer("declarations", declarators);
        } else {
          insertionPoint.insertAfter(declarators);
        }
      } else {
        let assigned;
        if (parentPath.parentPath === insertionPoint) {
          assigned = memo;
        } else {
          const right = insertionPoint.get("right");
          assigned = memoizer(right, scope);
          right.replaceWith(build(assigned, right.node));
        }
        insertionPoint.replaceWith(
          t.sequenceExpression(
            [insertionPoint.node].concat(
              ups,
              objectWithoutProperties,
              afters,
              assigned,
            ),
          ),
        );
      }
    },

    // Have to traverse function params in reverse order, so they don't
    // unshift a variable declarator in the wrong order.
    Function(path) {
      const params = path.get("params");
      for (let i = params.length - 1; i >= 0; i--) {
        params[i].traverse(visitor, this);
      }
    },
  };

  return {
    inherits: syntaxObjectRestSpread,

    visitor,
  };
}
