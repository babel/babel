import * as t from "../../../types";

export { check } from "../internal/modules";

export function ImportDeclaration(node, parent, scope, file) {
  // flow type
  if (node.isType) return;

  var nodes = [];

  if (node.specifiers.length) {
    for (var i = 0; i < node.specifiers.length; i++) {
      file.moduleFormatter.importSpecifier(node.specifiers[i], node, nodes, parent);
    }
  } else {
    file.moduleFormatter.importDeclaration(node, nodes, parent);
  }

  if (nodes.length === 1) {
    // inherit `_blockHoist` - this is for `_blockHoist` in File.prototype.addImport
    nodes[0]._blockHoist = node._blockHoist;
  }

  return nodes;
}

export function ExportDeclaration(node, parent, scope, file) {
  // flow type
  if (t.isTypeAlias(node.declaration)) return;

  var nodes = [];
  var i;

  if (node.declaration) {
    // make sure variable exports have an initializer
    // this is done here to avoid duplicating it in the module formatters
    if (t.isVariableDeclaration(node.declaration)) {
      var declar = node.declaration.declarations[0];
      declar.init = declar.init || t.identifier("undefined");
    }

    file.moduleFormatter.exportDeclaration(node, nodes, parent);
  } else if (node.specifiers) {
    for (i = 0; i < node.specifiers.length; i++) {
      file.moduleFormatter.exportSpecifier(node.specifiers[i], node, nodes, parent);
    }
  }

  if (node._blockHoist) {
    for (i = 0; i < nodes.length; i++) {
      nodes[i]._blockHoist = node._blockHoist;
    }
  }

  return nodes;
}
