import { declare } from "@babel/helper-plugin-utils";
import { types as t, type File } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  function isProtoKey(node: t.ObjectExpression["properties"][number]) {
    return (
      !t.isSpreadElement(node) &&
      t.isStringLiteral(t.toComputedKey(node, node.key), {
        value: "__proto__",
      })
    );
  }

  function isProtoAssignmentExpression(
    node: t.Node,
  ): node is t.MemberExpression {
    const left = node;
    return (
      t.isMemberExpression(left) &&
      t.isStringLiteral(t.toComputedKey(left, left.property), {
        value: "__proto__",
      })
    );
  }

  function buildDefaultsCallExpression(
    expr: t.AssignmentExpression,
    ref: t.MemberExpression["object"],
    file: File,
  ) {
    return t.expressionStatement(
      t.callExpression(file.addHelper("defaults"), [
        // @ts-ignore(Babel 7 vs Babel 8) Fixme: support `super.__proto__ = ...`
        ref,
        expr.right,
      ]),
    );
  }

  return {
    name: "transform-proto-to-assign",

    visitor: {
      AssignmentExpression(path, { file }) {
        if (!isProtoAssignmentExpression(path.node.left)) return;

        const nodes = [];
        const left = path.node.left.object;
        const temp = path.scope.maybeGenerateMemoised(left);

        if (temp) {
          nodes.push(
            t.expressionStatement(
              t.assignmentExpression(
                "=",
                temp,
                // left must not be Super when `temp` is an identifier
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                left as t.Expression,
              ),
            ),
          );
        }
        nodes.push(
          buildDefaultsCallExpression(
            path.node,
            t.cloneNode(temp || left),
            file,
          ),
        );
        if (temp) nodes.push(t.cloneNode(temp));

        path.replaceWithMultiple(nodes);
      },

      ExpressionStatement(path, { file }) {
        const expr = path.node.expression;
        if (!t.isAssignmentExpression(expr, { operator: "=" })) return;

        if (isProtoAssignmentExpression(expr.left)) {
          path.replaceWith(
            buildDefaultsCallExpression(expr, expr.left.object, file),
          );
        }
      },

      ObjectExpression(path, { file }) {
        let proto;
        const { node } = path;
        const { properties } = node;

        for (let i = 0; i < properties.length; i++) {
          const prop = properties[i];
          if (isProtoKey(prop)) {
            // @ts-expect-error Fixme: we should also handle ObjectMethod with __proto__ key
            proto = prop.value;
            properties.splice(i, 1);
            break;
          }
        }

        if (proto) {
          const args = [t.objectExpression([]), proto];
          if (node.properties.length) args.push(node);
          path.replaceWith(t.callExpression(file.addHelper("extends"), args));
        }
      },
    },
  };
});
