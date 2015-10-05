import * as t from "../../types";

/**
 * Prints ImportSpecifier, prints imported and local.
 */

export function ImportSpecifier(node) {
  this.print(node.imported, node);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" as ");
    this.print(node.local, node);
  }
}

/**
 * Prints ImportDefaultSpecifier, prints local.
 */

export function ImportDefaultSpecifier(node) {
  this.print(node.local, node);
}

/**
 * Prints ExportDefaultSpecifier, prints exported.
 */

export function ExportDefaultSpecifier(node) {
  this.print(node.exported, node);
}

/**
 * Prints ExportSpecifier, prints local and exported.
 */

export function ExportSpecifier(node) {
  this.print(node.local, node);
  if (node.exported && node.local.name !== node.exported.name) {
    this.push(" as ");
    this.print(node.exported, node);
  }
}

/**
 * Prints ExportNamespaceSpecifier, prints exported.
 */

export function ExportNamespaceSpecifier(node) {
  this.push("* as ");
  this.print(node.exported, node);
}

/**
 * Prints ExportAllDeclaration, prints exported and source.
 */

export function ExportAllDeclaration(node) {
  this.push("export *");
  if (node.exported) {
    this.push(" as ");
    this.print(node.exported, node);
  }
  this.push(" from ");
  this.print(node.source, node);
  this.semicolon();
}

/**
 * Prints ExportNamedDeclaration, delegates to ExportDeclaration.
 */

export function ExportNamedDeclaration(node, parent) {
  this.push("export ");
  ExportDeclaration.call(this, node, parent);
}

/**
 * Prints ExportDefaultDeclaration, delegates to ExportDeclaration.
 */

export function ExportDefaultDeclaration(node, parent) {
  this.push("export default ");
  ExportDeclaration.call(this, node, parent);
}

/**
 * Prints ExportDeclaration, prints specifiers, declration, and source.
 */

function ExportDeclaration(node) {
  var specifiers = node.specifiers;

  if (node.declaration) {
    var declar = node.declaration;
    this.print(declar, node);
    if (t.isStatement(declar) || t.isFunction(declar) || t.isClass(declar)) return;
  } else {
    if (node.exportKind === "type") {
      this.push("type ");
    }

    var first = specifiers[0];
    var hasSpecial = false;
    if (t.isExportDefaultSpecifier(first) || t.isExportNamespaceSpecifier(first)) {
      hasSpecial = true;
      this.print(specifiers.shift(), node);
      if (specifiers.length) {
        this.push(", ");
      }
    }

    if (specifiers.length || (!specifiers.length && !hasSpecial)) {
      this.push("{");
      if (specifiers.length) {
        this.space();
        this.printJoin(specifiers, node, { separator: ", " });
        this.space();
      }
      this.push("}");
    }

    if (node.source) {
      this.push(" from ");
      this.print(node.source, node);
    }
  }

  this.ensureSemicolon();
}

/**
 * Prints ImportDeclaration, prints specifiers and source, handles isType.
 */

export function ImportDeclaration(node) {
  this.push("import ");

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.push(node.importKind + " ");
  }

  var specfiers = node.specifiers;
  if (specfiers && specfiers.length) {
    var first = node.specifiers[0];
    if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
      this.print(node.specifiers.shift(), node);
      if (node.specifiers.length) {
        this.push(", ");
      }
    }

    if (node.specifiers.length) {
      this.push("{");
      this.space();
      this.printJoin(node.specifiers, node, { separator: ", " });
      this.space();
      this.push("}");
    }

    this.push(" from ");
  }

  this.print(node.source, node);
  this.semicolon();
}

/**
 * Prints ImportNamespaceSpecifier, prints local.
 */

export function ImportNamespaceSpecifier(node) {
  this.push("* as ");
  this.print(node.local, node);
}
