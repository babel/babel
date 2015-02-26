import t from "../../types";

export default class IgnoreFormatter {
  exportDeclaration(node, nodes) {
    var declar = t.toStatement(node.declaration, true);
    if (declar) nodes.push(t.inherits(declar, node));
  }

  importDeclaration() {}
  importSpecifier() {}
  exportSpecifier() {}
}
