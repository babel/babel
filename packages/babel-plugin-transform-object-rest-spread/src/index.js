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
        const { parentPath, parent } = path;
        if (!parentPath.isObjectPattern()) return;

        const bindings = [];
        const root = path.findParent(path => {
          if (path.listKey) bindings.push(path);

          let { parentPath } = path;
          if (parentPath.isObjectProperty()) parentPath = parentPath.parentPath;
          return !parentPath.isPattern();
        });

        const insertionPoint = root.parentPath;
        const scope = insertionPoint.isScope()
          ? insertionPoint.get("body").scope
          : insertionPoint.scope;
        const isDeclarator =
          insertionPoint.isScope() || insertionPoint.isVariableDeclarator();
        const build = isDeclarator ? variableDeclarator : assignmentExpression;
        const memoizer = isDeclarator
          ? "generateUidIdentifier"
          : "generateDeclaredUidIdentifier";

        const memo = scope[memoizer]("ref");
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
          insertionPoint.replaceWith(
            t.sequenceExpression(
              [insertionPoint.node].concat(
                ups,
                objectWithoutProperties,
                afters,
              ),
            ),
          );
        }
      },
    },
  };
}
