import * as t from "../../types";

/**
 * Prints ImportSpecifier, prints imported and local.
 */

export function ImportSpecifier(node, print) {
  print.plain(node.imported);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" as ");
    print.plain(node.local);
  }
}

/**
 * Prints ImportDefaultSpecifier, prints local.
 */

export function ImportDefaultSpecifier(node, print) {
  print.plain(node.local);
}

/**
 * Prints ExportDefaultSpecifier, prints exported.
 */

export function ExportDefaultSpecifier(node, print) {
  print.plain(node.exported);
}

/**
 * Prints ExportSpecifier, prints local and exported.
 */

export function ExportSpecifier(node, print) {
  print.plain(node.local);
  if (node.exported && node.local.name !== node.exported.name) {
    this.push(" as ");
    print.plain(node.exported);
  }
}

/**
 * Prints ExportNamespaceSpecifier, prints exported.
 */

export function ExportNamespaceSpecifier(node, print) {
  this.push("* as ");
  print.plain(node.exported);
}

/**
 * Prints ExportAllDeclaration, prints exported and source.
 */

export function ExportAllDeclaration(node, print) {
  this.push("export *");
  if (node.exported) {
    this.push(" as ");
    print.plain(node.exported);
  }
  this.push(" from ");
  print.plain(node.source);
  this.semicolon();
}

/**
 * Prints ExportNamedDeclaration, delegates to ExportDeclaration.
 */

export function ExportNamedDeclaration(node, print) {
  this.push("export ");
  ExportDeclaration.call(this, node, print);
}

/**
 * Prints ExportDefaultDeclaration, delegates to ExportDeclaration.
 */

export function ExportDefaultDeclaration(node, print) {
  this.push("export default ");
  ExportDeclaration.call(this, node, print);
}

/**
 * Prints ExportDeclaration, prints specifiers, declration, and source.
 */

function ExportDeclaration(node, print) {
  var specifiers = node.specifiers;

  if (node.declaration) {
    var declar = node.declaration;
    print.plain(declar);
    if (t.isStatement(declar) || t.isFunction(declar) || t.isClass(declar)) return;
  } else {
    var first = specifiers[0];
    var hasSpecial = false;
    if (t.isExportDefaultSpecifier(first) || t.isExportNamespaceSpecifier(first)) {
      hasSpecial = true;
      print.plain(specifiers.shift());
      if (specifiers.length) {
        this.push(", ");
      }
    }

    if (specifiers.length || (!specifiers.length && !hasSpecial)) {
      this.push("{");
      if (specifiers.length) {
        this.space();
        print.join(specifiers, { separator: ", " });
        this.space();
      }
      this.push("}");
    }

    if (node.source) {
      this.push(" from ");
      print.plain(node.source);
    }
  }

  this.ensureSemicolon();
}

/**
 * Prints ImportDeclaration, prints specifiers and source, handles isType.
 */

export function ImportDeclaration(node, print) {
  this.push("import ");

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.push(node.importKind + " ");
  }

  var specfiers = node.specifiers;
  if (specfiers && specfiers.length) {
    var first = node.specifiers[0];
    if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
      print.plain(node.specifiers.shift());
      if (node.specifiers.length) {
        this.push(", ");
      }
    }

    if (node.specifiers.length) {
      this.push("{");
      this.space();
      print.join(node.specifiers, { separator: ", " });
      this.space();
      this.push("}");
    }

    this.push(" from ");
  }

  print.plain(node.source);
  this.semicolon();
}

/**
 * Prints ImportNamespaceSpecifier, prints local.
 */

export function ImportNamespaceSpecifier(node, print) {
  this.push("* as ");
  print.plain(node.local);
}
