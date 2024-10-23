import { declare } from "@babel/helper-plugin-utils";
import type { types as t, Scope } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
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

        if (t.isMemberExpression(node.left)) {
          let member1: t.Expression;
          let member2: t.Expression;

          const object = maybeMemoize(node.left.object, scope);
          if (!object) {
            // We need to inject a temp var, but we are in function parameters
            // and thus cannot. Wrap the expression in an IIFE. It will be
            // eventually requeued and transformed.
            path.replaceWith(template.expression.ast`(() => ${path.node})()`);
            return;
          }

          const { property, computed } = node.left;

          if (computed) {
            const prop = maybeMemoize(property as t.Expression, scope);
            member1 = t.memberExpression(object.assign, prop.assign, true);
            member2 = t.memberExpression(object.ref, prop.ref, true);
          } else {
            member1 = t.memberExpression(object.assign, property, false);
            member2 = t.memberExpression(
              object.ref,
              t.cloneNode(property),
              false,
            );
          }

          path.replaceWith(
            t.assignmentExpression("=", member1, build(member2, node.right)),
          );
        } else {
          path.replaceWith(
            t.assignmentExpression(
              "=",
              node.left,
              build(
                // todo: it could be a t.AsExpression
                t.cloneNode(node.left) as t.Identifier,
                node.right,
              ),
            ),
          );
        }
      },

      BinaryExpression(path) {
        const { node } = path;
        if (node.operator === "**") {
          path.replaceWith(
            build(
              // left can be PrivateName only if operator is `"in"`
              node.left as t.Expression,
              node.right,
            ),
          );
        }
      },
    },
  };
});
