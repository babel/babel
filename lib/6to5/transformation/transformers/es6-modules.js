var t = require("../../types");

var inheritsComments = function (node, nodes) {
  if (nodes.length) {
    t.inheritsComments(nodes[0], node);
  }
};

exports.ImportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.specifiers.length) {
    if (!file.moduleFormatter.importSpecifier) return;
    for (var i in node.specifiers) {
      file.moduleFormatter.importSpecifier(node.specifiers[i], node, nodes, parent);
    }
  } else {
    if (!file.moduleFormatter.importDeclaration) return;
    file.moduleFormatter.importDeclaration(node, nodes, parent);
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

    if (!file.moduleFormatter.exportDeclaration) return;
    file.moduleFormatter.exportDeclaration(node, nodes, parent);
  } else {
    if (!file.moduleFormatter.exportSpecifier) return;
    for (var i in node.specifiers) {
      file.moduleFormatter.exportSpecifier(node.specifiers[i], node, nodes, parent);
    }
  }

  inheritsComments(node, nodes);

  return nodes;
};
