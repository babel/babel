import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-jscript",

    visitor: {
      FunctionExpression: {
        exit(path) {
          const { node } = path;
          if (!node.id) return;

          path.replaceWith(
            t.callExpression(
              t.functionExpression(
                null,
                [],
                t.blockStatement([
                  // @ts-expect-error t.toStatement must return a FunctionDeclaration if node.id is defined
                  t.toStatement(node),
                  t.returnStatement(t.cloneNode(node.id)),
                ]),
              ),
              [],
            ),
          );
        },
      },
    },
  };
});
