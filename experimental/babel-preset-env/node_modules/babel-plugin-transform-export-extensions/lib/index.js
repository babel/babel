"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function build(node, nodes, scope) {
    var first = node.specifiers[0];
    if (!t.isExportNamespaceSpecifier(first) && !t.isExportDefaultSpecifier(first)) return;

    var specifier = node.specifiers.shift();
    var uid = scope.generateUidIdentifier(specifier.exported.name);

    var newSpecifier = void 0;
    if (t.isExportNamespaceSpecifier(specifier)) {
      newSpecifier = t.importNamespaceSpecifier(uid);
    } else {
      newSpecifier = t.importDefaultSpecifier(uid);
    }

    nodes.push(t.importDeclaration([newSpecifier], node.source));
    nodes.push(t.exportNamedDeclaration(null, [t.exportSpecifier(uid, specifier.exported)]));

    build(node, nodes, scope);
  }

  return {
    inherits: require("babel-plugin-syntax-export-extensions"),

    visitor: {
      ExportNamedDeclaration: function ExportNamedDeclaration(path) {
        var node = path.node,
            scope = path.scope;

        var nodes = [];
        build(node, nodes, scope);
        if (!nodes.length) return;

        if (node.specifiers.length >= 1) {
          nodes.push(node);
        }
        path.replaceWithMultiple(nodes);
      }
    }
  };
};

module.exports = exports["default"];