import { declare } from "@babel/helper-plugin-utils";
import type { types as t, File } from "@babel/core";
import syntaxImportAttributes from "@babel/plugin-syntax-import-attributes";
import {
  importToPlatformApi,
  buildParallelStaticImports,
  type Pieces,
  type Builders,
} from "@babel/helper-import-to-platform-api";

export interface Options {
  uncheckedRequire: boolean;
}

export default declare((api, options: Options) => {
  const { types: t, template } = api;
  api.assertVersion(REQUIRED_VERSION("^7.22.0"));

  const targets = api.targets();

  let helperESM: Builders;
  let helperCJS: Builders;

  const transformers: Pieces = {
    commonJS: options.uncheckedRequire
      ? (require: t.Expression, specifier: t.Expression) =>
          t.callExpression(require, [specifier])
      : null,
    webFetch: (fetch: t.Expression) =>
      template.expression.ast`${fetch}.then(r => r.json())`,
    nodeFsSync: (read: t.Expression) =>
      template.expression.ast`JSON.parse(${read})`,
    nodeFsAsync: () => template.expression.ast`JSON.parse`,
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
      `@babel/plugin-transform-json-modules can only be used when not ` +
        `compiling modules, or when compiling them to CommonJS.`,
    );
  };

  function getAttributeKey({ key }: t.ImportAttribute): string {
    return t.isIdentifier(key) ? key.name : key.value;
  }

  function hasTypeJson(attributes: t.ImportAttribute[]) {
    return !!attributes?.some(
      attr => getAttributeKey(attr) === "type" && attr.value.value === "json",
    );
  }

  return {
    name: "transform-json-modules",

    inherits: syntaxImportAttributes,

    visitor: {
      Program(path) {
        if (path.node.sourceType !== "module") return;

        const helper = getHelper(this.file);

        const data = [];
        for (const decl of path.get("body")) {
          if (!decl.isImportDeclaration()) continue;
          const attributes = decl.node.attributes || decl.node.assertions;
          if (!hasTypeJson(attributes)) continue;

          if (decl.node.phase != null) {
            throw decl.buildCodeFrameError(
              "JSON modules do not support phase modifiers.",
            );
          }
          if (attributes.length > 1) {
            const paths = decl.node.attributes
              ? decl.get("attributes")
              : decl.get("assertions");
            const index = getAttributeKey(attributes[0]) === "type" ? 1 : 0;
            throw paths[index].buildCodeFrameError(
              "Unknown attribute for JSON modules.",
            );
          }

          let id: t.Identifier;
          let needsNS = false;
          for (const specifier of decl.get("specifiers")) {
            if (specifier.isImportSpecifier()) {
              throw specifier.buildCodeFrameError(
                "JSON modules do not support named imports.",
              );
            }

            id = specifier.node.local;
            needsNS = specifier.isImportNamespaceSpecifier();
          }
          id ??= path.scope.generateUidIdentifier("_");

          let fetch = helper.buildFetch(decl.node.source, path);

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

        const decl = buildParallelStaticImports(data, helper.needsAwait);
        if (decl) path.unshiftContainer("body", decl);
      },
    },
  };
});
