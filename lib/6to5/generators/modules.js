exports.ImportSpecifier =
exports.ExportSpecifier = function (node, print) {
  var code = print(node.id);
  if (node.name) code += " as " + print(node.name);
  return code;
};

exports.ExportBatchSpecifier = function () {
  return "*";
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
