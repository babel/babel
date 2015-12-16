/* @flow */

import * as punctuators from "../fragments/punctuators";
import * as t from "babel-types";

export function ImportSpecifier(node: Object) {
  this.print(node.imported, node);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" as ");
    this.print(node.local, node);
  }
}

export function ImportDefaultSpecifier(node: Object) {
  this.print(node.local, node);
}

export function ExportDefaultSpecifier(node: Object) {
  this.print(node.exported, node);
}

export function ExportSpecifier(node: Object) {
  this.print(node.local, node);
  if (node.exported && node.local.name !== node.exported.name) {
    this.push(" as ");
    this.print(node.exported, node);
  }
}

export function ExportNamespaceSpecifier(node: Object) {
  this.push("* as ");
  this.print(node.exported, node);
}

export function ExportAllDeclaration(node: Object) {
  this.push("export *");
  if (node.exported) {
    this.push(" as ");
    this.print(node.exported, node);
  }
  this.push(" from ");
  this.print(node.source, node);
  this.push(new punctuators.SemicolonPunctuator);
}

export function ExportNamedDeclaration() {
  this.push("export ");
  ExportDeclaration.apply(this, arguments);
}

export function ExportDefaultDeclaration() {
  this.push("export default ");
  ExportDeclaration.apply(this, arguments);
}

function ExportDeclaration(node: Object) {
  if (node.declaration) {
    let declar = node.declaration;
    this.print(declar, node);
    if (t.isStatement(declar) || t.isFunction(declar) || t.isClass(declar)) return;
  } else {
    if (node.exportKind === "type") {
      this.push("type ");
    }

    let specifiers = node.specifiers.slice(0);

    // print "special" specifiers first
    let hasSpecial = false;
    while (true) {
      let first = specifiers[0];
      if (t.isExportDefaultSpecifier(first) || t.isExportNamespaceSpecifier(first)) {
        hasSpecial = true;
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.push(", ");
        }
      } else {
        break;
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

export function ImportDeclaration(node: Object) {
  this.push("import ");

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.push(node.importKind + " ");
  }

  let specifiers = node.specifiers.slice(0);
  if (specifiers && specifiers.length) {
    // print "special" specifiers first
    while (true) {
      let first = specifiers[0];
      if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.push(", ");
        }
      } else {
        break;
      }
    }

    if (specifiers.length) {
      this.push("{");
      this.space();
      this.printJoin(specifiers, node, { separator: ", " });
      this.space();
      this.push("}");
    }

    this.push(" from ");
  }

  this.print(node.source, node);
  this.push(new punctuators.SemicolonPunctuator);
}

export function ImportNamespaceSpecifier(node: Object) {
  this.push("* as ");
  this.print(node.local, node);
}
