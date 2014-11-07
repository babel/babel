var t = require("../../types");
var _ = require("lodash");

exports.ImportSpecifier =
exports.ExportSpecifier = function (node, print) {
  print(node.id);
  if (node.name) {
    this.push(" as ");
    print(node.name);
  }
};

exports.ExportBatchSpecifier = function () {
  this.push("*");
};

exports.ExportDeclaration = function (node, print) {
  this.push("export ");

  var specifiers = node.specifiers;

  if (node.default) {
    this.push("default ");
  }

  if (node.declaration) {
    print(node.declaration);
  } else {
    if (specifiers.length === 1 && t.isExportBatchSpecifier(specifiers[0])) {
      this.push("*");
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
};

exports.ImportDeclaration = function (node, print) {
  var self = this;

  this.push("import ");

  var specfiers = node.specifiers;
  if (specfiers && specfiers.length) {
    var foundImportSpecifier = false;

    _.each(node.specifiers, function (spec, i) {
      if (+i > 0) {
        self.push(", ");
      }

      if (!spec.default && spec.type !== "ImportBatchSpecifier" && !foundImportSpecifier) {
        foundImportSpecifier = true;
        self.push("{ ");
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
};

exports.ImportBatchSpecifier = function (node, print) {
  this.push("* as ");
  print(node.name);
};
