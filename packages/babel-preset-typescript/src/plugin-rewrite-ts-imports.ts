import { declare } from "@babel/helper-plugin-utils";
import type { types as t, NodePath, PluginPass } from "@babel/core";

export default declare(function ({ types: t, template }) {
  function maybeReplace(
    source: t.ArgumentPlaceholder | t.Expression,
    path: NodePath,
    state: PluginPass,
  ) {
    if (!source) return;
    // todo: if we want to support `preserveJsx`, we can register a global flag via file.set from transform-react-jsx, and read it here.
    const preserveJsx = false;
    if (t.isStringLiteral(source)) {
      if (/^\.\.?\//.test(source.value)) {
        // @see packages/babel-helpers/src/helpers/tsRewriteRelativeImportExtensions.ts
        source.value = source.value.replace(
          /\.(tsx)$|((?:\.d)?)((?:\.[^./]+)?)\.([cm]?)ts$/i,
          function (m, tsx, d, ext, cm) {
            return tsx
              ? preserveJsx
                ? ".jsx"
                : ".js"
              : d && (!ext || !cm)
                ? m
                : d + ext + "." + cm.toLowerCase() + "js";
          },
        );
      }
      return;
    }

    path.replaceWith(
      t.callExpression(
        state.addHelper("tsRewriteRelativeImportExtensions"),
        preserveJsx ? [source, t.booleanLiteral(true)] : [source],
      ),
    );
  }

  return {
    name: "preset-typescript/plugin-rewrite-ts-imports",
    visitor: {
      "ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration"(
        path: NodePath<
          | t.ImportDeclaration
          | t.ExportAllDeclaration
          | t.ExportNamedDeclaration
        >,
        state,
      ) {
        const node = path.node;
        const kind = t.isImportDeclaration(node)
          ? node.importKind
          : node.exportKind;
        if (kind === "value") {
          maybeReplace(node.source, path.get("source"), state);
        }
      },
      CallExpression(path, state) {},
      ImportExpression(path, state) {
        maybeReplace(path.node.source, path.get("source"), state);
      },
    },
  };
});
