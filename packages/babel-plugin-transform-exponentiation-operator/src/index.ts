import { declare } from "@babel/helper-plugin-utils";
import type { types as t, Scope } from "@babel/core";
import { skipTransparentExprWrapperNodes } from "@babel/helper-skip-transparent-expression-wrappers";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  const { types: t, template } = api;

  function build(left: t.Expression, right: t.Expression) {
    return t.callExpression(
      t.memberExpression(t.identifier("Math"), t.identifier("pow")),
      [left, right],
    );
  }

  function maybeMemoize<T extends t.Expression | t.Super>(
    node: T,
    scope: Scope,
  ) {
    if (scope.isStatic(node)) {
      return { assign: node, ref: t.cloneNode(node) };
    }

    if (scope.path.isPattern()) {
      // We cannot inject a temp var in function arguments.
      return null;
    }

    const id = scope.generateUidIdentifierBasedOnNode(node);
    scope.push({ id });
    return {
      assign: t.assignmentExpression(
        "=",
        t.cloneNode(id),
        // This is not t.Super, because otherwise the .isStatic check above
        // would have returned true.
        node as t.Expression,
      ),
      ref: t.cloneNode(id),
    };
  }

  return {
    name: "transform-exponentiation-operator",

    visitor: {
      AssignmentExpression(path) {
        const { node, scope } = path;
        if (node.operator !== "**=") return;

        // Look through wrappers such as `!` and `as`, so that the object and key
        // of a wrapped member expression are memoised and only evaluated once.
        const left = skipTransparentExprWrapperNodes(
          node.left,
        ) as typeof node.left;

        if (t.isMemberExpression(left)) {
          const { property, computed } = left;

          const object = maybeMemoize(left.object, scope);
          const prop = computed
            ? maybeMemoize(property, scope)
            : { assign: property, ref: t.cloneNode(property) };

          if (!object || !prop) {
            // We need to inject a temp var, but we are in function parameters
            // and thus cannot. Wrap the expression in an IIFE. It will be
            // eventually requeued and transformed.
            path.replaceWith(template.expression.ast`(() => ${path.node})()`);
            return;
          }

          path.replaceWith(
            t.assignmentExpression(
              "=",
              t.memberExpression(object.assign, prop.assign, computed),
              build(
                t.memberExpression(object.ref, prop.ref, computed),
                node.right,
              ),
            ),
          );
        } else {
          path.replaceWith(
            t.assignmentExpression(
              "=",
              left,
              build(t.cloneNode(left) as t.Identifier, node.right),
            ),
          );
        }
      },

      BinaryExpression(path) {
        const { node } = path;
        if (node.operator === "**") {
          path.replaceWith(build(node.left, node.right));
        }
      },
    },
  };
});
