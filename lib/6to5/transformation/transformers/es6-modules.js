var t = require("../../types");
var _ = require("lodash");

var inheritsComments = function (node, nodes) {
  if (nodes.length) {
    t.inheritsComments(nodes[0], node);
  }
};

exports.ImportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.specifiers.length) {
    _.each(node.specifiers, function (specifier) {
      file.moduleFormatter.importSpecifier(specifier, node, nodes, parent);
    });
  } else {
    file.moduleFormatter.import(node, nodes, parent);
  }

  inheritsComments(node, nodes);

  return nodes;
};

exports.ExportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.declaration) {
    // make sure variable exports have an initialiser
    // this is done here to avoid duplicating it in the module formatters
    if (t.isVariableDeclaration(node.declaration)) {
      var declar = node.declaration.declarations[0];
      declar.init = declar.init || t.identifier("undefined");
    }

    file.moduleFormatter.export(node, nodes, parent);
  } else {
    _.each(node.specifiers, function (specifier) {
      file.moduleFormatter.exportSpecifier(specifier, node, nodes, parent);
    });
  }

  inheritsComments(node, nodes);

  return nodes;
};
