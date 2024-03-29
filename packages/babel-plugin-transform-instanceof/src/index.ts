import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-instanceof",

    visitor: {
      BinaryExpression(path) {
        const { node } = path;
        if (node.operator === "instanceof") {
          const helper = this.addHelper("instanceof");
          const isUnderHelper = path.findParent(path => {
            return (
              (path.isVariableDeclarator() && path.node.id === helper) ||
              (path.isFunctionDeclaration() &&
                path.node.id &&
                path.node.id.name === helper.name)
            );
          });

          if (isUnderHelper) {
            return;
          } else {
            path.replaceWith(
              t.callExpression(helper, [
                // @ts-expect-error node.left can be PrivateName only when node.operator is "in"
                node.left,
                node.right,
              ]),
            );
          }
        }
      },
    },
  };
});
