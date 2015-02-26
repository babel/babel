import each from "lodash/collection/each";
import t from "../../types";

export function ImportSpecifier(node, print) {
  if (t.isSpecifierDefault(node)) {
    print(t.getSpecifierName(node));
  } else {
    return exports.ExportSpecifier.apply(this, arguments);
  }
}

export function ExportSpecifier(node, print) {
  print(node.id);
  if (node.name) {
    this.push(" as ");
    print(node.name);
  }
}

export function ExportBatchSpecifier() {
  this.push("*");
}

export function ExportDeclaration(node, print) {
  this.push("export ");

  var specifiers = node.specifiers;

  if (node.default) {
    this.push("default ");
  }

  if (node.declaration) {
    print(node.declaration);
    if (t.isStatement(node.declaration)) return;
  } else {
    if (specifiers.length === 1 && t.isExportBatchSpecifier(specifiers[0])) {
      print(specifiers[0]);
    } else {
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

    each(node.specifiers, (spec, i) => {
      if (+i > 0) {
        this.push(", ");
      }

      var isDefault = t.isSpecifierDefault(spec);

      if (!isDefault && spec.type !== "ImportBatchSpecifier" && !foundImportSpecifier) {
        foundImportSpecifier = true;
        this.push("{ ");
      }

      print(spec);
    });

    if (foundImportSpecifier) {
      this.push(" }");
    }

    this.push(" from ");
  }

  print(node.source);
  this.semicolon();
}

export function ImportBatchSpecifier(node, print) {
  this.push("* as ");
  print(node.name);
}
