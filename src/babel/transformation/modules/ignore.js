import DefaultFormatter from "./_default";
import * as t from "../../types";

/**
 * [Please add a description.]
 */

export default class IgnoreFormatter extends DefaultFormatter {

  /**
   * [Please add a description.]
   */

  exportDeclaration(node, nodes) {
    var declar = t.toStatement(node.declaration, true);
    if (declar) nodes.push(t.inherits(declar, node));
  }

  /**
   * [Please add a description.]
   */

  exportAllDeclaration() {}
  importDeclaration() {}
  importSpecifier() {}
  exportSpecifier() {}
  transform() {}
}
