import { declare } from "@babel/helper-plugin-utils";
import { types as t, type Visitor, type NodePath } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  function transformStatementList(
    parentPath: NodePath,
    paths: NodePath<t.Statement>[],
  ) {
    const isInStrictMode = parentPath.isInStrictMode();

    for (const path of paths) {
      if (!path.isFunctionDeclaration()) continue;

      const useLet =
        isInStrictMode ||
        path.node.async ||
        path.node.generator ||
        path.getData(
          "@babel/plugin-transform-async-generator-functions/async_generator_function",
        );

      const func = path.node;
      const declar = t.variableDeclaration(useLet ? "let" : "var", [
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

  const visitor: Visitor = {
    BlockStatement(path) {
      const { node, parent } = path;
      if (
        t.isFunction(parent, { body: node }) ||
        t.isExportDeclaration(parent)
      ) {
        return;
      }

      transformStatementList(path, path.get("body"));
    },

    SwitchStatement(path) {
      const { node } = path;

      const fns: t.FunctionDeclaration[] = [];
      for (const caseNode of node.cases) {
        const { consequent } = caseNode;
        for (let i = consequent.length - 1; i >= 0; i--) {
          if (t.isFunctionDeclaration(consequent[i])) {
            fns.push(consequent[i] as t.FunctionDeclaration);
            consequent.splice(i, 1);
          }
        }
      }

      if (!fns.length) return;

      path.replaceWith(
        t.blockStatement([
          t.variableDeclaration(
            "let",
            fns.map(fn =>
              t.variableDeclarator(t.cloneNode(fn.id), t.toExpression(fn)),
            ),
          ),
          node,
        ]),
      );
    },
  };

  return {
    name: "transform-block-scoped-functions",

    visitor: {
      ...visitor,
      Loop(path) {
        path.traverse(visitor);
      },
    },
  };
});
