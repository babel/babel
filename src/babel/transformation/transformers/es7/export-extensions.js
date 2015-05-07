// https://github.com/leebyron/ecmascript-more-export-from

import * as t from "../../../types";

export var metadata = {
  stage: 1
};

function build(node, nodes, scope) {
  var first = node.specifiers[0];
  if (!t.isExportNamespaceSpecifier(first) && !t.isExportDefaultSpecifier(first)) return;

  var specifier = node.specifiers.shift();
  var uid = scope.generateUidIdentifier(specifier.exported.name);

  var newSpecifier;
  if (t.isExportNamespaceSpecifier(specifier)) {
    newSpecifier = t.importNamespaceSpecifier(uid);
  } else {
    newSpecifier = t.importDefaultSpecifier(uid);
  }

  nodes.push(t.importDeclaration([newSpecifier], node.source));
  nodes.push(t.exportNamedDeclaration(null, [t.exportSpecifier(uid, specifier.exported)]));

  build(node, nodes, scope);
}

export function ExportNamedDeclaration(node, parent, scope) {
  var nodes = [];
  build(node, nodes, scope);
  if (!nodes.length) return;

  if (node.specifiers.length >= 1) {
    nodes.push(node);
  }

  return nodes;
}
