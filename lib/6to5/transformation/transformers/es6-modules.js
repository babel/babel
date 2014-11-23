var _ = require("lodash");

exports.ImportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.specifiers.length) {
    _.each(node.specifiers, function (specifier) {
      file.moduleFormatter.importSpecifier(specifier, node, nodes, parent);
    });
  } else {
    file.moduleFormatter.import(node, nodes, parent);
  }

  return nodes;
};

exports.ExportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.declaration) {
    file.moduleFormatter.export(node, nodes, parent);
  } else {
    _.each(node.specifiers, function (specifier) {
      file.moduleFormatter.exportSpecifier(specifier, node, nodes, parent);
    });
  }

  return nodes;
};
