// https://github.com/leebyron/ecmascript-more-export-from

import * as t from "../../../types";

export function check(node) {
  return t.isExportNamespaceDeclaration(node) || (t.isExportAllDeclaration(node) && node.exported);
}

export function ExportNamespaceDeclaration(node, parent, scope) {
  var uid = scope.generateUidIdentifier("default");
  return [
    t.importDeclaration([t.importDefaultSpecifier(uid)], node.source),
    t.exportDefaultDeclaration(uid)
  ];
}

export function ExportAllDeclaration(node, parent, scope) {
  if (node.exported) {
    var uid = scope.generateUidIdentifier(node.exported.name);
    return [
      t.importDeclaration([t.importNamespaceSpecifier(uid)], node.source),
      t.exportNamedDeclaration(null, [t.exportSpecifier(uid, node.exported)])
    ];
  }
}
