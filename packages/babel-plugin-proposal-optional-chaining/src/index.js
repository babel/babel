import syntaxOptionalChaining from "@babel/plugin-syntax-optional-chaining";
import { types as t } from "@babel/core";

export default function(api, options) {
  const { loose = false } = options;

  function optional(path, replacementPath) {
    const { scope } = path;
    const optionals = [];
    const nil = scope.buildUndefinedNode();

    let objectPath = path;
    while (
      objectPath.isOptionalMemberExpression() ||
      objectPath.isOptionalCallExpression()
    ) {
      const { node } = objectPath;
      if (node.optional) {
        optionals.push(node);
      }

      if (objectPath.isOptionalMemberExpression()) {
        objectPath.node.type = "MemberExpression";
        objectPath = objectPath.get("object");
      } else {
        objectPath.node.type = "CallExpression";
        objectPath = objectPath.get("callee");
      }
    }

    for (let i = optionals.length - 1; i >= 0; i--) {
      const node = optionals[i];
      node.optional = false;

      const isCall = t.isCallExpression(node);
      const replaceKey = isCall ? "callee" : "object";
      const chain = node[replaceKey];

      let ref;
      let check;
      if (loose && isCall) {
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
      if (isCall && t.isMemberExpression(chain)) {
        if (loose) {
          // To avoid a Function#call, we can instead re-grab the property from the context object.
          // `a.?b.?()` translates roughly to `_a.b != null && _a.b()`
          node.callee = chain;
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

      replacementPath.replaceWith(
        t.conditionalExpression(
          loose
            ? t.binaryExpression("==", t.clone(check), t.nullLiteral())
            : t.logicalExpression(
                "||",
                t.binaryExpression("===", t.clone(check), t.nullLiteral()),
                t.binaryExpression(
                  "===",
                  t.clone(ref),
                  scope.buildUndefinedNode(),
                ),
              ),
          nil,
          replacementPath.node,
        ),
      );

      replacementPath = replacementPath.get("alternate");
    }
  }

  function findReplacementPath(path) {
    return path.find(path => {
      const { parentPath } = path;

      if (path.key == "object" && parentPath.isOptionalMemberExpression()) {
        return false;
      }
      if (path.key == "callee" && parentPath.isOptionalCallExpression()) {
        return false;
      }
      if (
        path.key == "argument" &&
        parentPath.isUnaryExpression({ operator: "delete" })
      ) {
        return false;
      }

      return true;
    });
  }

  return {
    inherits: syntaxOptionalChaining,

    visitor: {
      "OptionalCallExpression|OptionalMemberExpression"(path) {
        if (!path.node.optional) {
          return;
        }

        optional(path, findReplacementPath(path));
      },
    },
  };
}
