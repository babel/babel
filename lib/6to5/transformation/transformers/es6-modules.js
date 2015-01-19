"use strict";

var t = require("../../types");

exports.ast = {
  before: function (ast, file) {
    ast.program.body = file.dynamicImports.concat(ast.program.body);
  }
};

exports.ImportDeclaration = function (node, parent, scope, context, file) {
  var nodes = [];

  if (node.specifiers.length) {
    for (var i = 0; i < node.specifiers.length; i++) {
      file.moduleFormatter.importSpecifier(node.specifiers[i], node, nodes, parent);
    }
  } else {
    file.moduleFormatter.importDeclaration(node, nodes, parent);
  }

  if (nodes.length === 1) {
    // inherit `_blockHoist`
    // this for `_blockHoist` in File.prototype.addImport
    nodes[0]._blockHoist = node._blockHoist;
  }

  return nodes;
};

exports.ExportDeclaration = function (node, parent, scope, context, file) {
  var nodes = [];

  if (node.declaration) {
    // make sure variable exports have an initialiser
    // this is done here to avoid duplicating it in the module formatters
    if (t.isVariableDeclaration(node.declaration)) {
      var declar = node.declaration.declarations[0];
      declar.init = declar.init || t.identifier("undefined");
    }

    file.moduleFormatter.exportDeclaration(node, nodes, parent);
  } else {
    for (var i = 0; i < node.specifiers.length; i++) {
      file.moduleFormatter.exportSpecifier(node.specifiers[i], node, nodes, parent);
    }
  }

  return nodes;
};
