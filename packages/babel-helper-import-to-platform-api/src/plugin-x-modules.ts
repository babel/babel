import type { types as t, File, PluginAPI, PluginObject } from "@babel/core";
import {
  importToPlatformApi,
  injectParallelStaticImports,
  type Pieces,
  type Builders,
} from "@babel/helper-import-to-platform-api";

export interface Options {
  name: string;
  type: string;
  api: PluginAPI;
  transformers: Pieces;
}

export function createImportTypeAsDefaultPlugin({
  name,
  type,
  api,
  transformers,
}: Options): PluginObject {
  const { types: t, template } = api;

  const targets = api.targets();

  let helperESM: Builders;
  let helperCJS: Builders;

  const getHelper = (file: File) => {
    const modules = file.get("@babel/plugin-transform-modules-*");
    if (modules === "commonjs") {
      return (helperCJS ??= importToPlatformApi(targets, transformers, true));
    }
    if (modules == null) {
      return (helperESM ??= importToPlatformApi(targets, transformers, false));
    }
    throw new Error(
      `@babel/plugin-${name} can only be used when not compiling modules, or when compiling them to CommonJS.`,
    );
  };

  function getAttributeKey({ key }: t.ImportAttribute): string {
    return t.isIdentifier(key) ? key.name : key.value;
  }

  function hasMatchingType(attributes: t.ImportAttribute[]) {
    return !!attributes?.some(
      attr => getAttributeKey(attr) === "type" && attr.value.value === type,
    );
  }

  return {
    name,

    visitor: {
      Program(path) {
        if (path.node.sourceType !== "module") return;

        const helper = getHelper(this.file);

        const data = [];
        for (const decl of path.get("body")) {
          if (!decl.isImportDeclaration()) continue;
          const attributes = decl.node.attributes ?? [];
          if (!hasMatchingType(attributes)) continue;

          if (decl.node.phase != null) {
            throw decl.buildCodeFrameError(
              `${type} modules do not support phase modifiers.`,
            );
          }
          if (attributes.length > 1) {
            const paths = decl.get("attributes");
            const index = getAttributeKey(attributes[0]) === "type" ? 1 : 0;
            throw paths[index].buildCodeFrameError(
              `Unknown attribute for ${type} modules.`,
            );
          }

          let id: t.Identifier;
          let needsNS = false;
          for (const specifier of decl.get("specifiers")) {
            if (specifier.isImportSpecifier()) {
              throw specifier.buildCodeFrameError(
                `${type} modules do not support named imports.`,
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
}
