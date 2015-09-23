/* @flow */

import type NodePrinter from "../node/printer";

export function File(node: Object, print: NodePrinter) {
  print.plain(node.program);
}

export function Program(node: Object, print: NodePrinter) {
  print.sequence(node.body);
}

export function BlockStatement(node: Object, print: NodePrinter) {
  this.push("{");
  if (node.body.length) {
    this.newline();
    print.sequence(node.body, { indent: true });
    if (!this.format.retainLines) this.removeLast("\n");
    this.rightBrace();
  } else {
    print.printInnerComments();
    this.push("}");
  }
}

export function Noop() {}
