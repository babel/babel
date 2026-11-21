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
    return attributes.some(
      attr => getAttributeKey(attr) === "type" && attr.value.value === type,
    );
  }

  return {
    name,

    visitor: {
      Program(path) {
        if (path.node.sourceType !== "module") return;

        // Only resolve the helper once a matching import is found, so that
        // modules without any such import can still be compiled to formats
        // other than CommonJS.
        let helper: Builders | undefined;

        const data = [];
        const namespaces = [];
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

          let defaultId: t.Identifier | undefined;
          let namespaceId: t.Identifier | undefined;
          for (const specifier of decl.get("specifiers")) {
            if (specifier.isImportSpecifier()) {
              throw specifier.buildCodeFrameError(
                `${type} modules do not support named imports.`,
              );
            }
            if (
              specifier.isImportNamespaceSpecifier() &&
              specifier.node.exportsFilter
            ) {
              throw specifier.buildCodeFrameError(
                "Transforming `import { x, y } as ns from '...'` is not supported yet.",
              );
            }

            if (specifier.isImportNamespaceSpecifier()) {
              namespaceId = specifier.node.local;
            } else {
              defaultId = specifier.node.local;
            }
          }
          const id =
            defaultId ?? namespaceId ?? path.scope.generateUidIdentifier("_");

          helper ??= getHelper(this.file);
          let fetch = helper.buildFetch(decl.node.source, this.file);

          if (defaultId && namespaceId) {
            // import value, * as ns from "..."
            namespaces.push(
              template.statement.ast`
                const ${namespaceId} = { default: ${t.cloneNode(defaultId)} };
              `,
            );
          } else if (namespaceId) {
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

        injectParallelStaticImports(
          path,
          data,
          helper!.needsAwait,
        )!.insertAfter(namespaces);
      },
    },
  };
}
