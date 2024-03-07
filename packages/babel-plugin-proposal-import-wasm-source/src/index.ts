import { declare } from "@babel/helper-plugin-utils";
import type { types as t, File } from "@babel/core";
import syntaxImportSourcePhase from "@babel/plugin-syntax-import-source";

import {
  importToPlatformApi,
  buildParallelStaticImports,
  type Pieces,
  type Builders,
} from "@babel/helper-import-to-platform-api";

export default declare(api => {
  const { types: t, template } = api;
  api.assertVersion(REQUIRED_VERSION("^7.23.0"));

  const targets = api.targets();

  let helperESM: Builders;
  let helperCJS: Builders;

  const transformers: Pieces = {
    webFetch: (fetch: t.Expression) =>
      template.expression.ast`WebAssembly.compileStreaming(${fetch})`,
    nodeFsSync: (read: t.Expression) =>
      template.expression.ast`new WebAssembly.Module(${read})`,
    nodeFsAsync: template.expression`WebAssembly.compile`,
  };

  const getHelper = (file: File) => {
    const modules = file.get("@babel/plugin-transform-modules-*");
    if (modules === "commonjs") {
      return (helperCJS ??= importToPlatformApi(targets, transformers, true));
    }
    if (modules == null) {
      return (helperESM ??= importToPlatformApi(targets, transformers, false));
    }
    throw new Error(
      `@babel/plugin-proposal-import-wasm-source can only be used when not ` +
        `compiling modules, or when compiling them to CommonJS.`,
    );
  };

  return {
    name: "proposal-import-wasm-source",

    inherits: syntaxImportSourcePhase,

    visitor: {
      Program(path) {
        if (path.node.sourceType !== "module") return;

        const helper = getHelper(this.file);

        // TS reports that 'Assertions require every name in the call target to be
        // declared with an explicit type annotation.' if we just call
        // t.assertImportDefaultSpecifier, so we _explicitly_ annotate `t` as
        // having type `typeof t`. Unfortunately this is a design limitation of
        // the TS type checker, so we need to manually help it:
        // https://github.com/microsoft/TypeScript/issues/36931
        const t2: typeof t = t;

        const data = [];
        for (const decl of path.get("body")) {
          if (!decl.isImportDeclaration({ phase: "source" })) continue;

          if (decl.node.attributes?.length || decl.node.assertions?.length) {
            throw path.buildCodeFrameError(
              "`import source` with import attributes cannot be compiled.",
            );
          }

          const specifier = decl.node.specifiers[0];
          t2.assertImportDefaultSpecifier(specifier);

          data.push({
            id: specifier.local,
            fetch: helper.buildFetch(decl.node.source, path),
          });
          decl.remove();
        }

        const decl = buildParallelStaticImports(data, helper.needsAwait);
        if (decl) path.unshiftContainer("body", decl);
      },

      ImportExpression(path) {
        if (path.node.phase !== "source") return;

        if (path.node.options) {
          throw path.buildCodeFrameError(
            "`import.source` with an options bag cannot be compiled.",
          );
        }

        path.replaceWith(
          getHelper(this.file).buildFetchAsync(path.node.source, path),
        );
      },
    },
  };
});
