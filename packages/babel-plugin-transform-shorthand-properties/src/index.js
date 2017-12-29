import { types as t } from "@babel/core";

export default function(api, options) {
  const { spec } = options;

  return {
    visitor: {
      ObjectMethod(path, state) {
        const { node } = path;
        if (node.kind === "method") {
          let func = t.functionExpression(
            null,
            node.params,
            node.body,
            node.generator,
            node.async,
          );
          func.returnType = node.returnType;

          if (spec) {
            const methodRef = path.scope.generateUidIdentifierBasedOnNode(
              path.node,
            );
            const newMethodCheckCall = t.callExpression(
              state.addHelper("newMethodCheck"),
              [t.thisExpression(), methodRef],
            );
            path
              .get("body")
              .unshiftContainer(
                "body",
                t.expressionStatement(newMethodCheckCall),
              );
            func = t.assignmentExpression("=", methodRef, func);
          }

          path.replaceWith(t.objectProperty(node.key, func, node.computed));
        }
      },

      ObjectProperty({ node }) {
        if (node.shorthand) {
          node.shorthand = false;
        }
      },
    },
  };
}
