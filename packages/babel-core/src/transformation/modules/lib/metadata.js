import extend from "lodash/object/extend";
import * as t from "babel-types";

export var ModuleDeclaration = {
  enter(node, parent, scope, formatter) {
    if (node.source) {
      node.source.value = formatter.file.resolveModuleSource(node.source.value);
      formatter.addScope(this);
    }
  }
};

export var ImportDeclaration = {
  exit(node, parent, scope, formatter) {
    formatter.hasLocalImports = true;

    var specifiers = [];
    var imported = [];
    formatter.metadata.imports.push({
      source: node.source.value,
      imported,
      specifiers
    });

    for (var specifier of (this.get("specifiers"): Array)) {
      var ids = specifier.getBindingIdentifiers();
      extend(formatter.localImports, ids);

      var local = specifier.node.local.name;

      if (specifier.isImportDefaultSpecifier()) {
        imported.push("default");
        specifiers.push({
          kind: "named",
          imported: "default",
          local
        });
      }

      if (specifier.isImportSpecifier()) {
        var importedName = specifier.node.imported.name;
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

  var source = node.source ? node.source.value : null;
  var exports = formatter.metadata.exports;

  // export function foo() {}
  // export var foo = "bar";
  var declar = this.get("declaration");
  if (declar.isStatement()) {
    var bindings = declar.getBindingIdentifiers();

    for (var name in bindings) {
      var binding = bindings[name];
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
    for (var specifier of (node.specifiers: Array)) {
      var exported = specifier.exported.name;
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

      var local = specifier.local;
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
    var onlyDefault = node.specifiers && node.specifiers.length === 1 && t.isSpecifierDefault(node.specifiers[0]);
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
