/* @flow */

import type NodePrinter from "../node/printer";
import * as t from "babel-types";

export function ImportSpecifier(node: Object, print: NodePrinter) {
  print.plain(node.imported);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" as ");
    print.plain(node.local);
  }
}

export function ImportDefaultSpecifier(node: Object, print: NodePrinter) {
  print.plain(node.local);
}

export function ExportDefaultSpecifier(node: Object, print: NodePrinter) {
  print.plain(node.exported);
}

export function ExportSpecifier(node: Object, print: NodePrinter) {
  print.plain(node.local);
  if (node.exported && node.local.name !== node.exported.name) {
    this.push(" as ");
    print.plain(node.exported);
  }
}

export function ExportNamespaceSpecifier(node: Object, print: NodePrinter) {
  this.push("* as ");
  print.plain(node.exported);
}

export function ExportAllDeclaration(node: Object, print: NodePrinter) {
  this.push("export *");
  if (node.exported) {
    this.push(" as ");
    print.plain(node.exported);
  }
  this.push(" from ");
  print.plain(node.source);
  this.semicolon();
}

export function ExportNamedDeclaration(node: Object, print: NodePrinter) {
  this.push("export ");
  ExportDeclaration.call(this, node, print);
}

export function ExportDefaultDeclaration(node: Object, print: NodePrinter) {
  this.push("export default ");
  ExportDeclaration.call(this, node, print);
}

function ExportDeclaration(node: Object, print: NodePrinter) {
  if (node.declaration) {
    let declar = node.declaration;
    print.plain(declar);
    if (t.isStatement(declar) || t.isFunction(declar) || t.isClass(declar)) return;
  } else {
    if (node.exportKind === "type") {
      this.push("type ");
    }

    let specifiers = node.specifiers.slice(0);

    let first = specifiers[0];
    let hasSpecial = false;
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

export function ImportDeclaration(node: Object, print: NodePrinter) {
  this.push("import ");

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.push(node.importKind + " ");
  }

  let specifiers = node.specifiers.slice(0);
  if (specifiers && specifiers.length) {
    let first = specifiers[0];
    if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
      print.plain(specifiers.shift());
      if (specifiers.length) {
        this.push(", ");
      }
    }

    if (specifiers.length) {
      this.push("{");
      this.space();
      print.join(specifiers, { separator: ", " });
      this.space();
      this.push("}");
    }

    this.push(" from ");
  }

  print.plain(node.source);
  this.semicolon();
}

export function ImportNamespaceSpecifier(node: Object, print: NodePrinter) {
  this.push("* as ");
  print.plain(node.local);
}
