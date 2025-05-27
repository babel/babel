import { declare } from "@babel/helper-plugin-utils";
import { unshiftForXStatementBody } from "@babel/plugin-transform-destructuring";
import { types as t, template, traverse } from "@babel/core";
import type { NodePath, Visitor, PluginPass } from "@babel/core";

const enum USING_KIND {
  NORMAL,
  AWAIT,
}

// https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
// We don't test anonymous function / arrow function because they must not be disposable
function isAnonymousFunctionDefinition(
  node: t.Node,
): node is t.ClassExpression {
  return t.isClassExpression(node) && !node.id;
}

function emitSetFunctionNameCall(
  state: PluginPass,
  expression: t.Expression,
  name: string,
) {
  return t.callExpression(state.addHelper("setFunctionName"), [
    expression,
    t.stringLiteral(name),
  ]);
}

export default declare(api => {
  // The first Babel 7 version with usingCtx helper support.
  api.assertVersion(REQUIRED_VERSION("^7.23.9"));

  const TOP_LEVEL_USING = new Map<t.Node, USING_KIND>();

  function isUsingDeclaration(node: t.Node): node is t.VariableDeclaration {
    if (!t.isVariableDeclaration(node)) return false;
    return (
      node.kind === "using" ||
      node.kind === "await using" ||
      TOP_LEVEL_USING.has(node)
    );
  }

  const transformUsingDeclarationsVisitor: Visitor<PluginPass> = {
    ForOfStatement(path: NodePath<t.ForOfStatement>) {
      const { left } = path.node;
      if (!isUsingDeclaration(left)) return;

      const { id } = left.declarations[0];
      const tmpId = path.scope.generateUidIdentifierBasedOnNode(id);
      left.declarations[0].id = tmpId;
      left.kind = "const";

      path.ensureBlock();
      unshiftForXStatementBody(path, [
        t.variableDeclaration("using", [
          t.variableDeclarator(id, t.cloneNode(tmpId)),
        ]),
      ]);
    },
    "BlockStatement|StaticBlock"(
      path: NodePath<t.BlockStatement | t.StaticBlock>,
      state,
    ) {
      let ctx: t.Identifier | null = null;
      let needsAwait = false;
      const scope = path.scope;

      for (const node of path.node.body) {
        if (!isUsingDeclaration(node)) continue;
        ctx ??= scope.generateUidIdentifier("usingCtx");
        const isAwaitUsing =
          node.kind === "await using" ||
          TOP_LEVEL_USING.get(node) === USING_KIND.AWAIT;
        needsAwait ||= isAwaitUsing;

        if (!TOP_LEVEL_USING.delete(node)) {
          node.kind = "const";
        }
        for (const decl of node.declarations) {
          const currentInit = decl.init;
          decl.init = t.callExpression(
            t.memberExpression(
              t.cloneNode(ctx),
              isAwaitUsing ? t.identifier("a") : t.identifier("u"),
            ),
            [
              isAnonymousFunctionDefinition(currentInit) &&
              t.isIdentifier(decl.id)
                ? emitSetFunctionNameCall(state, currentInit, decl.id.name)
                : currentInit,
            ],
          );
        }
      }
      if (!ctx) return;

      const disposeCall = t.callExpression(
        t.memberExpression(t.cloneNode(ctx), t.identifier("d")),
        [],
      );

      const replacement = template.statement.ast`
        try {
          var ${t.cloneNode(ctx)} = ${state.addHelper("usingCtx")}();
          ${path.node.body}
        } catch (_) {
          ${t.cloneNode(ctx)}.e = _;
        } finally {
          ${needsAwait ? t.awaitExpression(disposeCall) : disposeCall}
        }
      ` as t.TryStatement;

      t.inherits(replacement, path.node);

      const { parentPath } = path;
      if (
        parentPath.isFunction() ||
        parentPath.isTryStatement() ||
        parentPath.isCatchClause()
      ) {
        path.replaceWith(t.blockStatement([replacement]));
      } else if (path.isStaticBlock()) {
        path.node.body = [replacement];
      } else {
        path.replaceWith(replacement);
      }
    },
  };

  const transformUsingDeclarationsVisitorSkipFn: Visitor<PluginPass> =
    traverse.visitors.merge([
      transformUsingDeclarationsVisitor,
      {
        Function(path) {
          path.skip();
        },
      },
    ]);

  return {
    name: "transform-explicit-resource-management",
    manipulateOptions: (_, p) => p.plugins.push("explicitResourceManagement"),

    visitor: traverse.visitors.merge([
      transformUsingDeclarationsVisitor,
      {
        // To transform top-level using declarations, we must wrap the
        // module body in a block after hoisting all the exports and imports.
        // This might cause some variables to be `undefined` rather than TDZ.
        Program(path) {
          TOP_LEVEL_USING.clear();

          if (path.node.sourceType !== "module") return;
          if (!path.node.body.some(isUsingDeclaration)) return;

          const innerBlockBody = [];
          for (const stmt of path.get("body")) {
            if (stmt.isFunctionDeclaration() || stmt.isImportDeclaration()) {
              continue;
            }

            let node: t.Statement | t.Declaration = stmt.node;
            let shouldRemove = true;

            if (stmt.isExportDefaultDeclaration()) {
              let { declaration } = stmt.node;
              let varId;
              if (t.isClassDeclaration(declaration)) {
                varId = declaration.id;
                // Move the class id to the var binding such that the scope binding
                // info is correct. Then we clone one to ensure inner class reference
                // will stay same if the outer binding is mutated.
                declaration.id = t.cloneNode(varId);
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
                  t.exportSpecifier(
                    t.cloneNode(varId),
                    t.identifier("default"),
                  ),
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
                  Object.keys(t.getOuterBindingIdentifiers(node, false)).map(
                    id => t.exportSpecifier(t.identifier(id), t.identifier(id)),
                  ),
                ),
              );
              shouldRemove = false;
            } else if (stmt.isExportDeclaration()) {
              continue;
            }

            if (t.isClassDeclaration(node)) {
              const { id } = node;
              node.id = t.cloneNode(id);
              innerBlockBody.push(
                t.variableDeclaration("var", [
                  t.variableDeclarator(id, t.toExpression(node)),
                ]),
              );
            } else if (t.isVariableDeclaration(node)) {
              if (node.kind === "using") {
                TOP_LEVEL_USING.set(stmt.node, USING_KIND.NORMAL);
              } else if (node.kind === "await using") {
                TOP_LEVEL_USING.set(stmt.node, USING_KIND.AWAIT);
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
        // We must transform `await using` in async functions before that
        // async-to-generator will transform `await` expressions into `yield`
        Function(path, state) {
          if (path.node.async) {
            path.traverse(transformUsingDeclarationsVisitorSkipFn, state);
          }
        },
      },
    ]),
  };
});
