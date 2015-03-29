// https://github.com/leebyron/ecmascript-more-export-from

import * as t from "../../../types";

export function check(node) {
  return t.isExportDefaultSpecifier(node) || t.isExportNamespaceSpecifier(node);
}

export function ExportNamedDeclaration(node, parent, scope) {
  var nodes = [];

  if (t.isExportNamespaceSpecifier(node.specifiers[0])) {
    var specifier = node.specifiers.shift();
    var uid = scope.generateUidIdentifier(specifier.exported.name);
    nodes.push(
      t.importDeclaration([t.importNamespaceSpecifier(uid)], node.source),
      t.exportNamedDeclaration(null, [t.exportSpecifier(uid, specifier.exported)])
    );
  } else if (t.isExportDefaultSpecifier(node.specifiers[0])) {
    var specifier = node.specifiers.shift();
    var uid = scope.generateUidIdentifier(specifier.exported.name);
    nodes.push(
      t.importDeclaration([t.importSpecifier(uid, specifier.exported)], node.source),
      t.exportNamedDeclaration(null, [t.exportSpecifier(uid, specifier.exported)])
    );
  }

  if (!nodes.length) return;

  if (node.specifiers.length > 1) {
    nodes.push(node);
  }

  return nodes;
}
