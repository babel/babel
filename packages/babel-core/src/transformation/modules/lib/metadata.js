import extend from "lodash/object/extend";
import * as t from "babel-types";

export let ModuleDeclaration = {
  enter(node, parent, scope, formatter) {
    if (node.source) {
      node.source.value = formatter.file.resolveModuleSource(node.source.value);
      formatter.addScope(this);
    }
  }
};

export let ImportDeclaration = {
  exit(node, parent, scope, formatter) {
    formatter.hasLocalImports = true;

    let specifiers = [];
    let imported = [];
    formatter.metadata.imports.push({
      source: node.source.value,
      imported,
      specifiers
    });

    for (let specifier of (this.get("specifiers"): Array)) {
      let ids = specifier.getBindingIdentifiers();
      extend(formatter.localImports, ids);

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

export function ExportDeclaration(node, parent, scope, formatter) {
  formatter.hasLocalExports = true;

  let source = node.source ? node.source.value : null;
  let exports = formatter.metadata.exports;

  // export function foo() {}
  // export let foo = "bar";
  let declar = this.get("declaration");
  if (declar.isStatement()) {
    let bindings = declar.getBindingIdentifiers();

    for (let name in bindings) {
      let binding = bindings[name];
      formatter._addExport(name, binding);

      exports.exported.push(name);
      exports.specifiers.push({
        kind: "local",
        local: name,
        exported: this.isExportDefaultDeclaration() ? "default" : name
      });
    }
  }

  if (this.isExportNamedDeclaration() && node.specifiers) {
    for (let specifier of (node.specifiers: Array)) {
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

      formatter._addExport(local.name, specifier.exported);

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
  if (this.isExportAllDeclaration()) {
    exports.specifiers.push({
      kind: "external-all",
      source
    });
  }

  if (!t.isExportDefaultDeclaration(node) && !declar.isTypeAlias()) {
    let onlyDefault = node.specifiers && node.specifiers.length === 1 && t.isSpecifierDefault(node.specifiers[0]);
    if (!onlyDefault) {
      formatter.hasNonDefaultExports = true;
    }
  }
}

export function Scope(node, parent, scope, formatter) {
  if (!formatter.isLoose()) {
    this.skip();
  }
}
