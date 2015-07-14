import * as t from "../../../types";

function keepBlockHoist(node, nodes) {
  if (node._blockHoist) {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i]._blockHoist = node._blockHoist;
    }
  }
}

export var metadata = {
  group: "builtin-modules"
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ImportDeclaration(node, parent, scope, file) {
    // flow type
    if (node.importKind === "type" || node.importKind === "typeof") return;

    var nodes = [];

    if (node.specifiers.length) {
      for (var specifier of (node.specifiers: Array)) {
        file.moduleFormatter.importSpecifier(specifier, node, nodes, scope);
      }
    } else {
      file.moduleFormatter.importDeclaration(node, nodes, scope);
    }

    if (nodes.length === 1) {
      // inherit `_blockHoist` - this is for `_blockHoist` in File.prototype.addImport
      nodes[0]._blockHoist = node._blockHoist;
    }

    return nodes;
  },

  /**
   * [Please add a description.]
   */

  ExportAllDeclaration(node, parent, scope, file) {
    var nodes = [];
    file.moduleFormatter.exportAllDeclaration(node, nodes, scope);
    keepBlockHoist(node, nodes);
    return nodes;
  },

  /**
   * [Please add a description.]
   */

  ExportDefaultDeclaration(node, parent, scope, file) {
    var nodes = [];
    file.moduleFormatter.exportDeclaration(node, nodes, scope);
    keepBlockHoist(node, nodes);
    return nodes;
  },

  /**
   * [Please add a description.]
   */

  ExportNamedDeclaration(node, parent, scope, file) {
    // flow type
    if (this.get("declaration").isTypeAlias()) return;

    var nodes = [];

    if (node.declaration) {
      // make sure variable exports have an initializer
      // this is done here to avoid duplicating it in the module formatters
      if (t.isVariableDeclaration(node.declaration)) {
        var declar = node.declaration.declarations[0];
        declar.init = declar.init || t.identifier("undefined");
      }

      file.moduleFormatter.exportDeclaration(node, nodes, scope);
    } else if (node.specifiers) {
      for (let i = 0; i < node.specifiers.length; i++) {
        file.moduleFormatter.exportSpecifier(node.specifiers[i], node, nodes, scope);
      }
    }

    keepBlockHoist(node, nodes);

    return nodes;
  }
};
