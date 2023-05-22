import { declare } from "@babel/helper-plugin-utils";
import syntacExplicitResourceManagement from "@babel/plugin-syntax-explicit-resource-management";
import { types as t, template } from "@babel/core";
import type { NodePath } from "@babel/traverse";

export default declare(api => {
  // TOOD: assert version 7.22.0
  api.assertVersion(7);

  const TOP_LEVEL_USING = new WeakSet();
  const TOP_LEVEL_AWAIT_USING = new WeakSet();

  function isUsingDeclaration(node: t.Node): node is t.VariableDeclaration {
    if (!t.isVariableDeclaration(node)) return false;
    return (
      node.kind === "using" ||
      node.kind === "await using" ||
      TOP_LEVEL_USING.has(node) ||
      TOP_LEVEL_AWAIT_USING.has(node)
    );
  }

  return {
    name: "proposal-explicit-resource-management",
    inherits: syntacExplicitResourceManagement,

    visitor: {
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
          const isAwaitUsing =
            node.kind === "await using" || TOP_LEVEL_AWAIT_USING.has(node);
          needsAwait ||= isAwaitUsing;

          if (
            !TOP_LEVEL_AWAIT_USING.delete(node) &&
            !TOP_LEVEL_USING.delete(node)
          ) {
            node.kind = "const";
          }
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
      // To transform top-level using declarations, we must wrap the
      // module body in a block after hoisting all the exports and imports.
      // This might cause some variables to be `undefined` rather than TDZ.
      Program(path) {
        if (path.node.sourceType !== "module") return;
        if (!path.node.body.some(isUsingDeclaration)) return;

        const innerBlockBody = [];
        for (const stmt of path.get("body")) {
          if (stmt.isFunctionDeclaration() || stmt.isImportDeclaration()) {
            continue;
          }

          let { node } = stmt;
          let shouldRemove = true;

          if (stmt.isExportDefaultDeclaration()) {
            let { declaration } = stmt.node;
            let varId;
            if (t.isClassDeclaration(declaration)) {
              varId = declaration.id;
              declaration.id = null;
              declaration = t.toExpression(declaration);
            } else if (!t.isExpression(declaration)) {
              continue;
            }

            varId ??= path.scope.generateUidIdentifier("_default");
            innerBlockBody.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(varId, declaration),
              ]),
            );
            stmt.replaceWith(
              t.exportNamedDeclaration(null, [
                t.exportSpecifier(t.cloneNode(varId), t.identifier("default")),
              ]),
            );
            continue;
          }

          if (stmt.isExportNamedDeclaration()) {
            node = stmt.node.declaration;
            if (!node || t.isFunction(node)) continue;

            stmt.replaceWith(
              t.exportNamedDeclaration(
                null,
                Object.keys(t.getOuterBindingIdentifiers(node, false)).map(id =>
                  t.exportSpecifier(t.identifier(id), t.identifier(id)),
                ),
              ),
            );
            shouldRemove = false;
          } else if (stmt.isExportDeclaration()) {
            continue;
          }

          if (t.isClassDeclaration(node)) {
            const { id } = node;
            node.id = null;
            innerBlockBody.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(id, t.toExpression(node)),
              ]),
            );
          } else if (t.isVariableDeclaration(node)) {
            if (node.kind === "using") {
              TOP_LEVEL_USING.add(stmt.node);
            } else if (node.kind === "await using") {
              TOP_LEVEL_AWAIT_USING.add(stmt.node);
            }
            node.kind = "var";
            innerBlockBody.push(node);
          } else {
            innerBlockBody.push(stmt.node);
          }

          if (shouldRemove) stmt.remove();
        }

        path.pushContainer("body", t.blockStatement(innerBlockBody));
      },
    },
  };
});
