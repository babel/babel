import syntaxDecorators2 from "babel-plugin-syntax-decorators-2";

//TODO: will have to check for dot (.) access to reserved keywords in decorator members
//TODO: check if we need the 'define' + 'Property' and 'ke' + 'ys' hacks as seen in
//https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy/blob/master/src/index.js#L69

/** manual testing code
**/
export default function({ types: t }) {
  // converts [(expression)] to [(let key = (expression))] if expression is impure
  // so as to avoid recomputation when the key is needed later
  function addKeysToComputedMembers(path) {
    const body = path.get("body.body");

    for (const member of body) {
      if (member.node.computed && member.get("key").isPure()) {
        const parent = path.findParent(p => p.parentPath.isBlock());
        const ref = member.scope.generateUidIdentifier("key");
        parent.insertBefore(
          t.variableDeclaration("let", [t.variableDeclarator(ref)]),
        );
        const replacement = t.sequenceExpression([
          t.assignmentExpression("=", ref, member.node.key),
        ]);
        // FIXME: the following should work: member.get("key").replaceWith(replacement);
        // but doesn't accept sequenceexpression type so we have to directly manipulate node
        member.node.key = replacement;
      }
    }
  }

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

      const decorators = method.node.decorators.map(d => d.expression);

      node.decorators = []; //TODO: should we remove using path methods? method.get("decorators") doesn't work

      const entry = [];
      if (node.computed) {
        // if it is computed, it has been processed by addKeysToComputedMembers
        if (t.isAssignmentExpression(node.key)) {
          entry.push(node.key.left);
        } else {
          // it's pure
          entry.push(node.key);
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
    if (path.node.decorators && path.node.decorators.length) {
      const decorators = path.node.decorators.map(d => d.expression);
      path.node.decorators = [];
      return t.arrayExpression(decorators);
    } else {
      return t.arrayExpression();
    }
  }

  function undecoratedMethods(path) {
    const body = path.get("body.body");
    const result = []; // shape: [[method1], [method2], [staticMethod1, true]]

    for (const method of body) {
      if (method.node.decorators && method.node.decorators.length > 0) continue;

      if (method.node.static) {
        result.push(
          t.arrayExpression([method.node.key, t.booleanLiteral(true)]),
        );
      } else {
        result.push(t.arrayExpression([method.node.key]));
      }
    }

    return t.arrayExpression(result);
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

      ClassExpression(path, file) {
        file.addHelper("makeElementDescriptor");
        file.addHelper("mergeDuplicateElements");
        file.addHelper("decorateClass", ["mergeDuplicateElements"]);
        file.addHelper("decorateElement", ["mergeDuplicateElements"]);
        const decorateIdentifier = file.addHelper("decorate", [
          "decorateClass",
          "decorateElement",
        ]);

        addKeysToComputedMembers(path);

        const undecorated = undecoratedMethods(path);
        const methodDecorators = takeMethodDecorators(path);
        const classDecorators = takeClassDecorators(path);

        if (
          methodDecorators.elements.length == 0 &&
          classDecorators.elements.length == 0
        ) {
          return;
        }

        const superClass =
          path.node.superClass == null
            ? path.scope.buildUndefinedNode()
            : path.node.superClass;

        path.replaceWith(
          t.callExpression(
            t.callExpression(decorateIdentifier, [
              path.node,
              undecorated,
              methodDecorators,
              superClass,
            ]),
            [classDecorators],
          ),
        );
      },
    },
  };
}
