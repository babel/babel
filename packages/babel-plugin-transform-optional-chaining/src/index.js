import syntaxOptionalChaining from "babel-plugin-syntax-optional-chaining";

export default function ({ types: t }) {
  function optional(path, key, replacementPath, needsContext = false, loose = false) {
    const { scope } = path;
    const optionals = [path.node];

    let objectPath = path.get(key);
    while (objectPath.isMemberExpression()) {
      const { node } = objectPath;
      if (node.optional) {
        optionals.push(node);
      }

      objectPath = objectPath.get("object");
    }

    for (let i = optionals.length - 1; i >= 0; i--) {
      const node = optionals[i];
      node.optional = false;

      const replaceKey = i == 0 ? key : "object";
      const atCall = needsContext && i == 0;

      const chain = node[replaceKey];

      let ref;
      let check;
      if (loose && atCall) {
        // If we are using a loose transform (avoiding a Function#call) and we are at the call,
        // we can avoid a needless memoize.
        check = ref = chain;
      } else {
        ref = scope.maybeGenerateMemoised(chain);
        if (ref) {
          check = t.assignmentExpression("=", ref, chain);
          node[replaceKey] = ref;
        } else {
          check = ref = chain;
        }
      }

      // Ensure call expressions have the proper `this`
      // `foo.bar()` has context `foo`.
      if (atCall && t.isMemberExpression(chain)) {
        if (loose) {
          // To avoid a Function#call, we can instead re-grab the property from the context object.
          // `a.?b.?()` translates roughly to `_a.b != null && _a.b()`
          node.callee = chain
        } else {
          // Otherwise, we need to memoize the context object, and change the call into a Function#call.
          // `a.?b.?()` translates roughly to `(_b = _a.b) != null && _b.call(_a)`
          const { object } = chain;
          let context = scope.maybeGenerateMemoised(object);
          if (context) {
            chain.object = t.assignmentExpression("=", context, object);
          } else {
            context = object;
          }

          node.arguments.unshift(context);
          node.callee = t.memberExpression(node.callee, t.identifier("call"));
        }
      }

      replacementPath.replaceWith(t.conditionalExpression(
        t.binaryExpression("==", check, t.nullLiteral()),
        scope.buildUndefinedNode(),
        replacementPath.node
      ));

      replacementPath = replacementPath.get("alternate");
    }
  }

  return {
    inherits: syntaxOptionalChaining,

    visitor: {
      MemberExpression(path) {
        if (!path.node.optional) {
          return;
        }

        const replace = path.find(path => {
          const { parentPath } = path;
          if (parentPath.isStatement()) {
            return true;
          }

          if (path.key == "left" && parentPath.isAssignmentExpression()) {
            return false;
          }
          if (path.key == "object" && parentPath.isMemberExpression()) {
            return false;
          }
          if (path.key == "callee" && (parentPath.isCallExpression() || parentPath.isNewExpression())) {
            return false;
          }
          return true;
        });

        optional(path, "object", replace);
      },

      "NewExpression|CallExpression"(path) {
        if (!path.node.optional) {
          return;
        }

        optional(path, "callee", path, path.isCallExpression(), this.opts.loose);
      },
    },
  };
}
