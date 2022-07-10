import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import type { NodePath } from "@babel/traverse";

export default declare(api => {
  api.assertVersion(7);

  function transformStatementList(paths: NodePath<t.Statement>[]) {
    for (const path of paths) {
      if (!path.isFunctionDeclaration()) continue;
      const func = path.node;
      const declar = t.variableDeclaration("let", [
        t.variableDeclarator(func.id, t.toExpression(func)),
      ]);

      // hoist it up above everything else
      // @ts-expect-error todo(flow->ts): avoid mutations
      declar._blockHoist = 2;

      // todo: name this
      func.id = null;

      path.replaceWith(declar);
    }
  }

  return {
    name: "transform-block-scoped-functions",

    visitor: {
      BlockStatement(path) {
        const { node, parent } = path;
        if (
          t.isFunction(parent, { body: node }) ||
          t.isExportDeclaration(parent)
        ) {
          return;
        }

        transformStatementList(path.get("body"));
      },

      SwitchCase(path) {
        transformStatementList(path.get("consequent"));
      },
    },
  };
});
