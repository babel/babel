import syntaxDecorators2 from "babel-plugin-syntax-decorators-2";
import _ from "lodash";

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
      if (member.node.computed && !member.get("key").isPure()) {
        const ref = member.scope.generateUidIdentifierBasedOnNode(
          member.node.key,
        );

        path.scope.parent.push({ id: ref });
        const replacement = t.assignmentExpression("=", ref, member.node.key);
        member.get("key").replaceWith(replacement);
      }
    }
  }

  //a predicate which tells if a path has any decorators at all or not.
  function hasDecorators(path) {
    if (path.node.decorators && path.node.decorators.length > 0) return true;

    const body = path.node.body.body;
    for (let i = 0; i < body.length; i++) {
      const method = body[i];
      if (!t.isClassMethod(method)) continue;
      if (method.decorators && method.decorators.length > 0) {
        return true;
      }
    }

    return false;
  }

  // expects a method node
  function getKey(node) {
    if (node.computed) {
      // if it is computed, it has been processed by addKeysToComputedMembers
      if (t.isAssignmentExpression(node.key)) {
        return node.key.left;
      } else {
        // it's pure
        return node.key;
      }
    } else {
      return t.stringLiteral(node.key.name || String(node.key.value));
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

      const entry = [getKey(node), t.arrayExpression(decorators)];

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

  // assume:addKeysToComputedMembers has been executed
  function undecoratedMethods(path) {
    const body = path.get("body.body");
    const result = []; // shape: [["method1"], ["method2"], ["staticMethod1", true]]
    const avoidDuplicates = []; // to avoid duplicates when both a getter and a setter are involved

    for (const method of body) {
      if (method.node.decorators && method.node.decorators.length > 0) continue;
      if (method.node.key.name == "constructor") continue;

      const key = getKey(method.node);

      if (method.node.kind == "get" || method.node.kind == "set") {
        const record = [key.value, method.node.static];

        if (_.find(avoidDuplicates, r => _.isEqual(record, r))) {
          continue;
        } else {
          avoidDuplicates.push(record);
        }
      }

      if (method.node.static) {
        result.push(t.arrayExpression([key, t.booleanLiteral(true)]));
      } else {
        result.push(t.arrayExpression([key]));
      }
    }

    return t.arrayExpression(result);
  }

  return {
    inherits: syntaxDecorators2,
    visitor: {
      // export default is a special case since it expects and expression rather than a declaration
      ExportDefaultDeclaration(path) {
        if (!hasDecorators(path)) return;

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
        if (!hasDecorators(path)) return;

        const { node } = path;
        const ref = node.id || path.scope.generateUidIdentifier("class");

        path.replaceWith(
          t.variableDeclaration("let", [
            t.variableDeclarator(ref, t.toExpression(node)),
          ]),
        );
      },

      ClassExpression(path, file) {
        if (!hasDecorators(path)) return;

        file.addHelper("makeElementDescriptor");
        file.addHelper("mergeDuplicateElements");
        file.addHelper("decorateClass", ["mergeDuplicateElements"]);
        file.addHelper("decorateElement", ["mergeDuplicateElements"]);
        const decorateIdentifier = file.addHelper("decorate", [
          "decorateClass",
          "decorateElement",
          "makeElementDescriptor",
        ]);

        addKeysToComputedMembers(path);

        const undecorated = undecoratedMethods(path);
        const methodDecorators = takeMethodDecorators(path);
        const classDecorators = takeClassDecorators(path);

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
