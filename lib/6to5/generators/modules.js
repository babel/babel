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

exports.ExportDeclaration = function () {
  throw new Error("ExportDeclaration");
};

exports.ImportDeclaration = function () {
  throw new Error("ImportDeclaration");
};

exports.ImportBatchSpecifier = function (node, print) {
  throw new Error("ImportBatchSpecifier");
};
