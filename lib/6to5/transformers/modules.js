var types = require("ast-types");
var _     = require("lodash");
var def   = types.Type.def;

def("ImportBatchSpecifier")
  .bases("Specifier")
  .build("id")
  .field("id", def("Identifier"));

types.finalize();

exports.ImportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.specifiers.length) {
    _.each(node.specifiers, function (specifier) {
      file.moduleFormatter.importSpecifier(specifier, node, nodes);
    });
  } else {
    file.moduleFormatter.import(node, nodes);
  }

  return nodes;
};

exports.ExportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.declaration) {
    file.moduleFormatter.export(node, nodes);
  } else {
    _.each(node.specifiers, function (specifier) {
      file.moduleFormatter.exportSpecifier(specifier, node, nodes);
    });
  }

  return nodes;
};
