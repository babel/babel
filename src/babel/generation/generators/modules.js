import each from "lodash/collection/each";
import * as t from "../../types";

export function ImportSpecifier(node, print) {
  print(node.local);
  if (node.imported && node.local !== node.imported) {
    this.push(" as ");
    print(node.imported);
  }
}

export function ImportDefaultSpecifier(node, print) {
  print(node.local);
}

export function ExportSpecifier(node, print) {
  print(node.local);
  if (node.exported && node.local !== node.exported) {
    this.push(" as ");
    print(node.exported);
  }
}

export function ExportAllDeclaration(node, print) {
  this.push("export * from ");
  print(node.source);
  this.semicolon();
}

export function ExportNamedDeclaration(node, print) {
  this.push("export ");
  ExportDeclaration.call(this, node, print);
}

export function ExportDefaultDeclaration(node, print) {
  this.push("export default ");
  ExportDeclaration.call(this, node, print);
}

function ExportDeclaration(node, print) {
  var specifiers = node.specifiers;

  if (node.declaration) {
    print(node.declaration);
    if (t.isStatement(node.declaration)) return;
  } else {
    this.push("{");
    if (specifiers.length) {
      this.space();
      print.join(specifiers, { separator: ", " });
      this.space();
    }
    this.push("}");

    if (node.source) {
      this.push(" from ");
      print(node.source);
    }
  }

  this.ensureSemicolon();
}

export function ImportDeclaration(node, print) {
  this.push("import ");

  if (node.isType) {
    this.push("type ");
  }

  var specfiers = node.specifiers;
  if (specfiers && specfiers.length) {
    var foundImportSpecifier = false;

    for (var i = 0; i < node.specifiers.length; i++) {
      var spec = node.specifiers[i];

      if (i > 0) {
        this.push(", ");
      }

      if (!t.isSpecifierDefault(spec) && !foundImportSpecifier) {
        foundImportSpecifier = true;
        this.push("{ ");
      }

      print(spec);
    }

    if (foundImportSpecifier) {
      this.push(" }");
    }

    this.push(" from ");
  }

  print(node.source);
  this.semicolon();
}

export function ImportNamespaceSpecifier(node, print) {
  this.push("* as ");
  print(node.name);
}
