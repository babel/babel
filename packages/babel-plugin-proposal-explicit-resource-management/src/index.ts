import { declare } from "@babel/helper-plugin-utils";
import syntacExplicitResourceManagement from "@babel/plugin-syntax-explicit-resource-management";
import { types as t, template } from "@babel/core";
import type { NodePath } from "@babel/traverse";

export default declare(api => {
  // TOOD: assert version 7.22.0
  api.assertVersion(7);

  return {
    name: "proposal-explicit-resource-management",
    inherits: syntacExplicitResourceManagement,

    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind === "using") {
          throw path.buildCodeFrameError(
            `"using" declaration at the top-level of modules is not supported yet.`,
          );
        }
      },
      ForOfStatement(path: NodePath<t.ForOfStatement>) {
        const { left } = path.node;
        if (!t.isVariableDeclaration(left, { kind: "using" })) return;

        const { id } = left.declarations[0];
        const tmpId = path.scope.generateUidIdentifierBasedOnNode(id);
        left.declarations[0].id = tmpId;
        left.kind = "const";

        path.ensureBlock();
        path.node.body.body.unshift(
          t.variableDeclaration("using", [
            t.variableDeclarator(id, t.cloneNode(tmpId)),
          ]),
        );
      },
      BlockStatement(path, state) {
        let stackId: t.Identifier | null = null;
        for (const node of path.node.body) {
          if (!t.isVariableDeclaration(node, { kind: "using" })) continue;
          node.kind = "const";
          stackId ??= path.scope.generateUidIdentifier("stack");

          node.declarations.forEach(decl => {
            decl.init = t.callExpression(state.addHelper("using"), [
              t.cloneNode(stackId),
              decl.init,
            ]);
          });
        }
        if (!stackId) return;

        const errorId = path.scope.generateUidIdentifier("error");
        const hasErrorId = path.scope.generateUidIdentifier("hasError");

        const replacement = template.statement.ast`
          try {
            var ${stackId} = [];
            ${path.node.body}
          } catch (_) {
            var ${errorId} = _;
            var ${hasErrorId} = true;
          } finally {
            ${state.addHelper("dispose")}(
              ${t.cloneNode(stackId)},
              ${t.cloneNode(errorId)},
              ${t.cloneNode(hasErrorId)},
              // Pass SuppressedError so that it can be used with "pure"
              // polyfills that do not compile the contents of runtime
              // helpers.
              typeof SuppressedError !== undefined && SuppressedError
            );
          }
        `;

        if (path.parentPath.isFunction()) {
          path.replaceWith(t.blockStatement([replacement]));
        } else {
          path.replaceWith(replacement);
        }
      },
    },
  };
});
