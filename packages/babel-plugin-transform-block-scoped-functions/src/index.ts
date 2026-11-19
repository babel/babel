import { declare } from "@babel/helper-plugin-utils";
import { types as t, type Visitor, type NodePath } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

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
        t.variableDeclarator(func.id!, t.toExpression(func)),
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

      const fnPaths = new Set<NodePath>(
        path
          .get("cases")
          .flatMap(c => c.get("consequent"))
          .filter(p => p.isFunctionDeclaration()),
      );

      const fns: t.FunctionDeclaration[] = [];
      const hoistedIds: t.Identifier[] = [];
      const inHoistedFn = (p: NodePath) => !!p.findParent(q => fnPaths.has(q));
      const usedNames = new Set<string>();

      for (const [name, binding] of Object.entries(path.scope.bindings)) {
        if (binding.kind !== "let" && binding.kind !== "const") continue;
        if (
          binding.referencePaths.some(inHoistedFn) ||
          binding.constantViolations.some(inHoistedFn)
        ) {
          usedNames.add(name);
        }
      }

      for (const caseNode of node.cases) {
        const { consequent } = caseNode;
        for (let i = consequent.length - 1; i >= 0; i--) {
          const stmt = consequent[i];
          if (t.isFunctionDeclaration(stmt)) {
            fns.push(stmt);
            consequent.splice(i, 1);
          } else if (
            t.isVariableDeclaration(stmt) &&
            stmt.kind !== "var" &&
            Object.keys(t.getBindingIdentifiers(stmt)).some(n =>
              usedNames.has(n),
            )
          ) {
            const replacement = stmt.declarations.flatMap(
              (d): t.Statement[] => {
                const names = Object.keys(t.getBindingIdentifiers(d.id));
                if (!names.some(n => usedNames.has(n))) {
                  return [t.variableDeclaration(stmt.kind, [d])];
                }
                for (const n of names) hoistedIds.push(t.identifier(n));
                return d.init
                  ? [
                      t.expressionStatement(
                        t.assignmentExpression("=", d.id as t.LVal, d.init),
                      ),
                    ]
                  : [];
              },
            );
            consequent.splice(i, 1, ...replacement);
          } else if (
            t.isClassDeclaration(stmt) &&
            usedNames.has(stmt.id!.name)
          ) {
            hoistedIds.push(t.identifier(stmt.id!.name));
            consequent[i] = t.expressionStatement(
              t.assignmentExpression(
                "=",
                t.identifier(stmt.id!.name),
                t.toExpression(stmt),
              ),
            );
          }
        }
      }

      if (!fns.length) return;

      const [newPath] = path.replaceWith(
        t.blockStatement([
          ...(hoistedIds.length
            ? [
                t.variableDeclaration(
                  "let",
                  hoistedIds.map(id => t.variableDeclarator(id)),
                ),
              ]
            : []),
          t.variableDeclaration(
            "let",
            fns.map(fn =>
              t.variableDeclarator(t.cloneNode(fn.id!), t.toExpression(fn)),
            ),
          ),
          node,
        ]),
      );

      newPath.scope.crawl();
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
