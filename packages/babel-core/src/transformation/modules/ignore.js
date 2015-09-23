/* @flow */

import DefaultFormatter from "./_default";
import * as t from "babel-types";

export default class IgnoreFormatter extends DefaultFormatter {
  exportDeclaration(node, nodes) {
    let declar = t.toStatement(node.declaration, true);
    if (declar) nodes.push(t.inherits(declar, node));
  }

  exportAllDeclaration() {}
  importDeclaration() {}
  importSpecifier() {}
  exportSpecifier() {}
  transform() {}
}
