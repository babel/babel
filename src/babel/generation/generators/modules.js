import * as t from "../../types";

/**
 * [Please add a description.]
 */

export function ImportSpecifier(node, print) {
  print.plain(node.imported);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" as ");
    print.plain(node.local);
  }
}

/**
 * [Please add a description.]
 */

export function ImportDefaultSpecifier(node, print) {
  print.plain(node.local);
}

/**
 * [Please add a description.]
 */

export function ExportDefaultSpecifier(node, print) {
  print.plain(node.exported);
}

/**
 * [Please add a description.]
 */

export function ExportSpecifier(node, print) {
  print.plain(node.local);
  if (node.exported && node.local.name !== node.exported.name) {
    this.push(" as ");
    print.plain(node.exported);
  }
}

/**
 * [Please add a description.]
 */

export function ExportNamespaceSpecifier(node, print) {
  this.push("* as ");
  print.plain(node.exported);
}

/**
 * [Please add a description.]
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
 * [Please add a description.]
 */

export function ExportNamedDeclaration(node, print) {
  this.push("export ");
  ExportDeclaration.call(this, node, print);
}

/**
 * [Please add a description.]
 */

export function ExportDefaultDeclaration(node, print) {
  this.push("export default ");
  ExportDeclaration.call(this, node, print);
}

/**
 * [Please add a description.]
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
 * [Please add a description.]
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
 * [Please add a description.]
 */

export function ImportNamespaceSpecifier(node, print) {
  this.push("* as ");
  print.plain(node.local);
}
