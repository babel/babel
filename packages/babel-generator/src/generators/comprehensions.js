/* @flow */

import type NodePrinter from "../node/printer";

export function ComprehensionBlock(node: Object, print: NodePrinter) {
  this.keyword("for");
  this.push("(");
  print.plain(node.left);
  this.push(" of ");
  print.plain(node.right);
  this.push(")");
}

export function ComprehensionExpression(node: Object, print: NodePrinter) {
  this.push(node.generator ? "(" : "[");

  print.join(node.blocks, { separator: " " });
  this.space();

  if (node.filter) {
    this.keyword("if");
    this.push("(");
    print.plain(node.filter);
    this.push(")");
    this.space();
  }

  print.plain(node.body);

  this.push(node.generator ? ")" : "]");
}
