import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-shorthand-properties",

    visitor: {
      ObjectMethod(path) {
        const { node } = path;
        if (node.kind === "method") {
          const func = t.functionExpression(
            null,
            node.params,
            node.body,
            node.generator,
            node.async,
          );
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
});
