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
  this.push("export");

  var specifiers = node.specifiers;

  if (node.default) {
    this.push(" default");
  } else if (specifiers && specifiers.length > 0) {
    if (specifiers.length === 1 && specifiers[0].type === "ExportBatchSpecifier") {
      this.push(" *");
    } else {
      this.push(" { ");
      this.printJoin(print, specifiers, ", ");
      this.push(" }");
    }

    if (node.source) {
      this.push(" from ");
      print(node.source);
    }

    this.semicolon();

    return;
  }

  if (node.declaration) {
    this.push(" ");
    print(node.declaration);
  } else {
    this.push(" { }");
    this.semicolon();
  }
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
        self.push("{");
      }

      print(spec);
    });

    if (foundImportSpecifier) {
      this.push("}");
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
