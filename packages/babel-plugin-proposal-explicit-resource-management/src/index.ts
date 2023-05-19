import { declare } from "@babel/helper-plugin-utils";
import syntacExplicitResourceManagement from "@babel/plugin-syntax-explicit-resource-management";
import { types as t, template } from "@babel/core";
import type { NodePath } from "@babel/traverse";

function isUsingDeclaration(node: t.Node): node is t.VariableDeclaration {
  if (!t.isVariableDeclaration(node)) return false;
  return node.kind === "using" || node.kind === "await using";
}

export default declare(api => {
  // TOOD: assert version 7.22.0
  api.assertVersion(7);

  return {
    name: "proposal-explicit-resource-management",
    inherits: syntacExplicitResourceManagement,

    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind === "using" || path.node.kind === "await using") {
          throw path.buildCodeFrameError(
            `"using" declaration at the top-level of modules is not supported yet.`,
          );
        }
      },
      ForOfStatement(path: NodePath<t.ForOfStatement>) {
        const { left } = path.node;
        if (!isUsingDeclaration(left)) return;

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
        let needsAwait = false;

        for (const node of path.node.body) {
          if (!isUsingDeclaration(node)) continue;
          stackId ??= path.scope.generateUidIdentifier("stack");
          const isAwaitUsing = node.kind === "await using";
          needsAwait ||= isAwaitUsing;

          node.kind = "const";
          node.declarations.forEach(decl => {
            const args = [t.cloneNode(stackId), decl.init];
            if (isAwaitUsing) args.push(t.booleanLiteral(true));
            decl.init = t.callExpression(state.addHelper("using"), args);
          });
        }
        if (!stackId) return;

        const errorId = path.scope.generateUidIdentifier("error");
        const hasErrorId = path.scope.generateUidIdentifier("hasError");

        let disposeCall: t.Expression = t.callExpression(
          state.addHelper("dispose"),
          [
            t.cloneNode(stackId),
            t.cloneNode(errorId),
            t.cloneNode(hasErrorId),
            // Pass SuppressedError so that it can be used with "pure"
            // polyfills that do not compile the contents of runtime
            // helpers.
            template.expression.ast`
              typeof SuppressedError !== "undefined" && SuppressedError
            `,
          ],
        );
        if (needsAwait) disposeCall = t.awaitExpression(disposeCall);

        const replacement = template.statement.ast`
          try {
            var ${stackId} = [];
            ${path.node.body}
          } catch (_) {
            var ${errorId} = _;
            var ${hasErrorId} = true;
          } finally {
            ${disposeCall}
          }
        `;

        const { parentPath } = path;
        if (
          parentPath.isFunction() ||
          parentPath.isTryStatement() ||
          parentPath.isCatchClause() ||
          parentPath.isStaticBlock()
        ) {
          path.replaceWith(t.blockStatement([replacement]));
        } else {
          path.replaceWith(replacement);
        }
      },
    },
  };
});
