import { declare } from "@babel/helper-plugin-utils";
import type { types as t, File } from "@babel/core";
import {
  importToPlatformApi,
  injectParallelStaticImports,
  type Pieces,
  type Builders,
} from "@babel/helper-import-to-platform-api";

export default declare(api => {
  const { types: t, template } = api;
  api.assertVersion(REQUIRED_VERSION("^8.0.0"));

  const targets = api.targets();

  let helperESM: Builders;
  let helperCJS: Builders;

  const transformers: Pieces = {
    webFetch: fetch =>
      template.expression.ast`
        ${fetch}.then(r => r.text())
      `,
    nodeFsSync: buf => template.expression.ast`String(${buf})`,
    nodeFsAsync: () => template.expression.ast`String`,
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
      `@babel/plugin-proposal-text-modules can only be used when not ` +
        `compiling modules, or when compiling them to CommonJS.`,
    );
  };

  function getAttributeKey({ key }: t.ImportAttribute): string {
    return t.isIdentifier(key) ? key.name : key.value;
  }

  function hasTypeText(attributes: t.ImportAttribute[]) {
    return !!attributes?.some(
      attr => getAttributeKey(attr) === "type" && attr.value.value === "text",
    );
  }

  return {
    name: "proposal-text-modules",

    visitor: {
      Program(path) {
        if (path.node.sourceType !== "module") return;

        const helper = getHelper(this.file);

        const data = [];
        for (const decl of path.get("body")) {
          if (!decl.isImportDeclaration()) continue;
          const attributes = decl.node.attributes ?? [];
          if (!hasTypeText(attributes)) continue;

          if (decl.node.phase != null) {
            throw decl.buildCodeFrameError(
              "Text modules do not support phase modifiers.",
            );
          }
          if (attributes.length > 1) {
            const paths = decl.get("attributes");
            const index = getAttributeKey(attributes[0]) === "type" ? 1 : 0;
            throw paths[index].buildCodeFrameError(
              "Unknown attribute for text modules.",
            );
          }

          let id: t.Identifier;
          let needsNS = false;
          for (const specifier of decl.get("specifiers")) {
            if (specifier.isImportSpecifier()) {
              throw specifier.buildCodeFrameError(
                "Text modules do not support named imports.",
              );
            }

            id = specifier.node.local;
            needsNS = specifier.isImportNamespaceSpecifier();
          }
          id ??= path.scope.generateUidIdentifier("_");

          let fetch = helper.buildFetch(decl.node.source, this.file);

          if (needsNS) {
            if (helper.needsAwait) {
              fetch = template.expression.ast`
                ${fetch}.then(j => ({ default: j }))
              `;
            } else {
              fetch = template.expression.ast`{ default: ${fetch} }`;
            }
          }

          data.push({ id, fetch });
          decl.remove();
        }
        if (data.length === 0) return;

        injectParallelStaticImports(path, data, helper.needsAwait);
      },
    },
  };
});
