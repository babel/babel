import * as t from "babel-types";

export function ImportSpecifier(node: Object) {
  this.print(node.imported, node);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" ");
    this.word("as");
    this.push(" ");
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
    this.push(" ");
    this.word("as");
    this.push(" ");
    this.print(node.exported, node);
  }
}

export function ExportNamespaceSpecifier(node: Object) {
  this.token("*");
  this.push(" ");
  this.word("as");
  this.push(" ");
  this.print(node.exported, node);
}

export function ExportAllDeclaration(node: Object) {
  this.word("export");
  this.push(" ");
  this.token("*");
  if (node.exported) {
    this.push(" ");
    this.word("as");
    this.push(" ");
    this.print(node.exported, node);
  }
  this.push(" ");
  this.word("from");
  this.push(" ");
  this.print(node.source, node);
  this.semicolon();
}

export function ExportNamedDeclaration() {
  this.word("export");
  this.push(" ");
  ExportDeclaration.apply(this, arguments);
}

export function ExportDefaultDeclaration() {
  this.word("export");
  this.push(" ");
  this.word("default");
  this.push(" ");
  ExportDeclaration.apply(this, arguments);
}

function ExportDeclaration(node: Object) {
  if (node.declaration) {
    let declar = node.declaration;
    this.print(declar, node);
    if (!t.isStatement(declar)) this.semicolon();
  } else {
    if (node.exportKind === "type") {
      this.word("type");
      this.push(" ");
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
          this.token(",");
          this.push(" ");
        }
      } else {
        break;
      }
    }

    if (specifiers.length || (!specifiers.length && !hasSpecial)) {
      this.token("{");
      if (specifiers.length) {
        this.space();
        this.printList(specifiers, node);
        this.space();
      }
      this.token("}");
    }

    if (node.source) {
      this.push(" ");
      this.word("from");
      this.push(" ");
      this.print(node.source, node);
    }

    this.semicolon();
  }
}

export function ImportDeclaration(node: Object) {
  this.word("import");
  this.push(" ");

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.word(node.importKind);
    this.push(" ");
  }

  let specifiers = node.specifiers.slice(0);
  if (specifiers && specifiers.length) {
    // print "special" specifiers first
    while (true) {
      let first = specifiers[0];
      if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.token(",");
          this.push(" ");
        }
      } else {
        break;
      }
    }

    if (specifiers.length) {
      this.token("{");
      this.space();
      this.printList(specifiers, node);
      this.space();
      this.token("}");
    }

    this.push(" ");
    this.word("from");
    this.push(" ");
  }

  this.print(node.source, node);
  this.semicolon();
}

export function ImportNamespaceSpecifier(node: Object) {
  this.token("*");
  this.push(" ");
  this.word("as");
  this.push(" ");
  this.print(node.local, node);
}
