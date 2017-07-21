import syntaxDecorators2 from "babel-plugin-syntax-decorators-2";

//TODO: will have to check for dot (.) access to reserved keywords in decorator members
export default function({ types: t }) {
  // goes over the methods of current class and prepares decorators
  // expects path of a ClassExpression
  function takeMethodDecorators(path) {
    const body = path.get("body.body");

    // a collection of [decoratedKey, decorators] or [decoratedKey, decorators, true] for static properties
    const entries = [];

    for (const method of body) {
      const { node } = method;
      if (!method.isClassMethod()) continue;
      if (!node.decorators || !method.node.decorators.length) continue;

      const decorators = method.node.decorators
        .map(d => d.expression)
        .reverse(); // reverse for correct evaluation order
      node.decorators = []; //TODO: should we remove from path? method.get("decorators") doesn't work

      const entry = [];
      if (node.computed) {
        // if it is computed, we need an identifier to refer to it later
        // so we can avoid evaluating the expression twice
        if (t.isAssignmentExpression(node.key)) {
          entry.push(node.key.left);
        } else {
          const parent = path.findParent(p => p.parentPath.isBlock());
          const ref = method.scope.generateUidIdentifier("key");
          parent.insertBefore(
            t.variableDeclaration("let", [t.variableDeclarator(ref)]),
          );
          const replacement = t.sequenceExpression([
            t.assignmentExpression("=", ref, node.key),
          ]);
          //method.get("key").replaceWith(); FIXME: this should work
          node.key = replacement;
          entry.push(ref);
        }
      } else {
        entry.push(t.stringLiteral(node.key.name));
      }

      entry.push(t.arrayExpression(decorators));

      if (node.static) {
        entry.push(t.booleanLiteral(true));
      }

      entries.push(t.arrayExpression(entry));
    }

    return t.arrayExpression(entries);
  }

  // expects path of a ClassExpression
  function takeClassDecorators(path) {
    // reverse for correct decorator evaluation order
    const decorators = path.node.decorators.map(d => d.expression).reverse();
    path.node.decorators = [];
    return t.arrayExpression(decorators);
  }

  return {
    inherits: syntaxDecorators2,
    visitor: {
      // export default is a special case since it expects and expression rather than a declaration
      ExportDefaultDeclaration(path) {
        const classPath = path.get("declaration");
        if (!classPath.isClassDeclaration()) return;

        if (classPath.node.id) {
          const ref = classPath.node.id;
          path.insertBefore(
            t.variableDeclaration("let", [t.variableDeclarator(ref)]),
          );
          classPath.replaceWith(
            t.assignmentExpression("=", ref, t.toExpression(classPath.node)),
          );
        } else {
          classPath.replaceWith(t.toExpression(classPath));
        }
      },

      // replace declaration with a let declaration
      ClassDeclaration(path) {
        const { node } = path;
        const ref = node.id || path.scope.generateUidIdentifier("class");

        path.replaceWith(
          t.variableDeclaration("let", [
            t.variableDeclarator(ref, t.toExpression(node)),
          ]),
        );
      },

      ClassExpression(path) {
        const methodDecorators = takeMethodDecorators(path);
        const classDecorators = takeClassDecorators(path);
        if (
          methodDecorators.elements.length == 0 &&
          classDecorators.elements.length == 0
        ) {
          return;
        }
        path.replaceWith(
          t.callExpression(t.identifier("decorate"), [
            path.node,
            methodDecorators,
            classDecorators,
          ]),
        );
      },

      ClassMethod(path) {
        if (path.get("decorators")) {
          path.get("decorators").forEach(p => p.remove());
          path.get("body").unshiftContainer("body", t.identifier("yo"));
        }
      },
    },
  };
}
