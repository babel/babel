import { types as t } from "@babel/core";

export default function(api, options) {
  const { spec } = options;

  return {
    visitor: {
      ObjectMethod(path, state) {
        const { node } = path;
        if (node.kind === "method") {
          const args = [
            null,
            node.params,
            node.body,
            node.generator,
            node.async,
          ];

          if (spec) {
            const methodRef = path.scope.generateUidIdentifierBasedOnNode(node);
            args[0] = methodRef;
            const newMethodCheckCall = t.callExpression(
              state.addHelper("newMethodCheck"),
              [t.thisExpression(), methodRef],
            );
            node.body.body.unshift(t.expressionStatement(newMethodCheckCall));
          }
          const func = t.functionExpression(...args);
          func.returnType = node.returnType;

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
