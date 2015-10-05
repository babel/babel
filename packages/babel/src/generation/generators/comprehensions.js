/**
 * Prints ComprehensionBlock, prints left and right.
 */

export function ComprehensionBlock(node, parent) {
  this.keyword("for");
  this.push("(");
  this.print(node.left, node);
  this.push(" of ");
  this.print(node.right, node);
  this.push(")");
}

/**
 * Prints ComprehensionExpression, prints blocks, filter, and body. Handles generators.
 */

export function ComprehensionExpression(node, parent) {
  this.push(node.generator ? "(" : "[");

  this.printJoin(node.blocks, node, { separator: " " });
  this.space();

  if (node.filter) {
    this.keyword("if");
    this.push("(");
    this.print(node.filter, node);
    this.push(")");
    this.space();
  }

  this.print(node.body, node);

  this.push(node.generator ? ")" : "]");
}
