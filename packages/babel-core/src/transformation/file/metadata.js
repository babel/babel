/* @flow */

import * as t from "babel-types";

export let ModuleDeclaration = {
  enter(path, file) {
    let { node } = path;
    if (node.source) {
      node.source.value = file.resolveModuleSource(node.source.value);
    }
  }
};

export let ImportDeclaration = {
  exit(path, file) {
    let { node } = path;

    let specifiers = [];
    let imported = [];
    file.metadata.modules.imports.push({
      source: node.source.value,
      imported,
      specifiers
    });

    for (let specifier of (path.get("specifiers"): Array<Object>)) {
      let local = specifier.node.local.name;

      if (specifier.isImportDefaultSpecifier()) {
        imported.push("default");
        specifiers.push({
          kind: "named",
          imported: "default",
          local
        });
      }

      if (specifier.isImportSpecifier()) {
        let importedName = specifier.node.imported.name;
        imported.push(importedName);
        specifiers.push({
          kind: "named",
          imported: importedName,
          local
        });
      }

      if (specifier.isImportNamespaceSpecifier()) {
        imported.push("*");
        specifiers.push({
          kind: "namespace",
          local
        });
      }
    }
  }
};

export function ExportDeclaration(path, file) {
  let { node } = path;

  let source = node.source ? node.source.value : null;
  let exports = file.metadata.modules.exports;

  // export function foo() {}
  // export let foo = "bar";
  let declar = path.get("declaration");
  if (declar.isStatement()) {
    let bindings = declar.getBindingIdentifiers();

    for (let name in bindings) {
      exports.exported.push(name);
      exports.specifiers.push({
        kind: "local",
        local: name,
        exported: path.isExportDefaultDeclaration() ? "default" : name
      });
    }
  }

  if (path.isExportNamedDeclaration() && node.specifiers) {
    for (let specifier of (node.specifiers: Array<Object>)) {
      let exported = specifier.exported.name;
      exports.exported.push(exported);

      // export foo from "bar";
      if (t.isExportDefaultSpecifier(specifier)) {
        exports.specifiers.push({
          kind: "external",
          local: exported,
          exported,
          source
        });
      }

      // export * as foo from "bar";
      if (t.isExportNamespaceSpecifier(specifier)) {
        exports.specifiers.push({
          kind: "external-namespace",
          exported,
          source
        });
      }

      let local = specifier.local;
      if (!local) continue;

      // export { foo } from "bar";
      // export { foo as bar } from "bar";
      if (source) {
        exports.specifiers.push({
          kind: "external",
          local: local.name,
          exported,
          source
        });
      }

      // export { foo };
      // export { foo as bar };
      if (!source) {
        exports.specifiers.push({
          kind: "local",
          local: local.name,
          exported
        });
      }
    }
  }

  // export * from "bar";
  if (path.isExportAllDeclaration()) {
    exports.specifiers.push({
      kind: "external-all",
      source
    });
  }
}

export function Scope(path) {
  path.skip();
}
