import { declare } from "@babel/helper-plugin-utils";
import type { NodePath } from "@babel/traverse";
import type { types as t } from "@babel/core";
import syntaxImportSourcePhase from "@babel/plugin-syntax-import-source-phase";

export default declare(({ assertVersion, types: t, template }) => {
  assertVersion(7);

  function buildFetch(
    path: NodePath<t.ImportDeclaration | t.ImportExpression>,
  ) {
    const specifier = path.node.source;

    return template.expression.ast`
      WebAssembly.compileStreaming(fetch(
        import.meta.resolve?.(${specifier}) ??
        new URL(${t.cloneNode(specifier)}, import.meta.url)
      ))
    `;
  }

  return {
    name: "proposal-import-wasm-source-to-fetch",

    inherits: syntaxImportSourcePhase,

    visitor: {
      Program(path) {
        if (path.node.sourceType !== "module") return;

        // TS reports that 'Assertions require every name in the call target to be
        // declared with an explicit type annotation.' if we just call
        // t.assertImportDefaultSpecifier, so we _explicitly_ annotate `t` as
        // having type `typeof t`. Unfortunately this is a design limitation of
        // the TS type checker, so we need to manually help it:
        // https://github.com/microsoft/TypeScript/issues/36931
        const t2: typeof t = t;

        const ids: t.Identifier[] = [];
        const fetches: t.Expression[] = [];
        for (const decl of path.get("body")) {
          if (!decl.isImportDeclaration({ phase: "source" })) continue;

          if (decl.node.attributes?.length || decl.node.assertions?.length) {
            throw path.buildCodeFrameError(
              "`import source` with import attributes cannot be compiled.",
            );
          }

          const specifier = decl.node.specifiers[0];
          t2.assertImportDefaultSpecifier(specifier);
          ids.push(specifier.local);
          fetches.push(buildFetch(decl));
          decl.remove();
        }
        if (ids.length === 0) return;

        let lhs: t.LVal, rhs: t.Expression;
        if (ids.length === 1) {
          lhs = ids[0];
          rhs = fetches[0];
        } else {
          lhs = t.arrayPattern(ids);
          rhs = template.expression.ast`
            Promise.all(${t.arrayExpression(fetches)})
          `;
        }

        path.unshiftContainer(
          "body",
          t.variableDeclaration("const", [
            t.variableDeclarator(lhs, t.awaitExpression(rhs)),
          ]),
        );
      },

      ImportExpression(path) {
        if (path.node.phase !== "source") return;

        if (path.node.options) {
          throw path.buildCodeFrameError(
            "`import.source` with an options bag cannot be compiled.",
          );
        }

        path.replaceWith(buildFetch(path));
      },
    },
  };
});
