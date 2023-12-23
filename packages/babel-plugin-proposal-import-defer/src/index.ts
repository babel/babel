import { declare } from "@babel/helper-plugin-utils";
import type { types as t } from "@babel/core";
import type { Scope } from "@babel/traverse";
import { defineCommonJSHook } from "@babel/plugin-transform-modules-commonjs";

import syntaxImportDefer from "@babel/plugin-syntax-import-defer";

export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : "^7.23.0",
  );
  // We need the explicit type annotation otherwise when using t.assert* ts
  // reports that 'Assertions require every name in the call target to be
  // declared with an explicit type annotation'
  const t: typeof api.types = api.types;
  const { template } = api;

  function allReferencesAreProps(scope: Scope, node: t.ImportDeclaration) {
    const specifier = node.specifiers[0];
    t.assertImportNamespaceSpecifier(specifier);

    const binding = scope.getOwnBinding(specifier.local.name);
    return !!binding?.referencePaths.every(path =>
      path.parentPath.isMemberExpression({ object: path.node }),
    );
  }

  return {
    name: "proposal-import-defer",

    inherits: syntaxImportDefer,

    pre() {
      const { file } = this;

      defineCommonJSHook(file, {
        name: PACKAGE_JSON.name,
        version: PACKAGE_JSON.version,
        getWrapperPayload(source, metadata, importNodes) {
          let needsProxy = false;
          for (const node of importNodes) {
            if (!t.isImportDeclaration(node)) return null;
            if (node.phase !== "defer") return null;
            if (!allReferencesAreProps(file.scope, node)) needsProxy = true;
          }
          return needsProxy ? "defer/proxy" : "defer/function";
        },
        buildRequireWrapper(name, init, payload, referenced) {
          if (payload === "defer/proxy") {
            if (!referenced) return false;
            return template.statement.ast`
              var ${name} = ${file.addHelper("importDeferProxy")}(
                () => ${init}
              )
            `;
          }
          if (payload === "defer/function") {
            if (!referenced) return false;
            return template.statement.ast`
              function ${name}(data) {
                ${name} = () => data;
                return data = ${init};
              }
            `;
          }
        },
        wrapReference(ref, payload) {
          if (payload === "defer/function") return t.callExpression(ref, []);
        },
      });
    },

    visitor: {
      Program(path) {
        if (this.file.get("@babel/plugin-transform-modules-*") !== "commonjs") {
          throw new Error(
            `@babel/plugin-proposal-import-defer can only be used when` +
              ` transpiling modules to CommonJS.`,
          );
        }

        // Move all deferred imports to the end, so that in case of
        //   import defer * as a from "a"
        //   import "b"
        //   import "a"
        // we have the correct evaluation order

        const eagerImports = new Set();

        for (const child of path.get("body")) {
          if (
            (child.isImportDeclaration() && child.node.phase == null) ||
            (child.isExportNamedDeclaration() && child.node.source !== null) ||
            child.isExportAllDeclaration()
          ) {
            const specifier = child.node.source.value;
            if (!eagerImports.has(specifier)) {
              eagerImports.add(specifier);
            }
          }
        }

        const importsToPush = [];
        for (const child of path.get("body")) {
          if (child.isImportDeclaration({ phase: "defer" })) {
            const specifier = child.node.source.value;
            if (!eagerImports.has(specifier)) continue;

            child.node.phase = null;
            importsToPush.push(child.node);
            child.remove();
          }
        }
        if (importsToPush.length) {
          path.pushContainer("body", importsToPush);
          // Re-collect references to moved imports
          path.scope.crawl();
        }
      },
    },
  };
});
