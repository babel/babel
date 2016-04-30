export function File(node: Object) {
  this.print(node.program, node);
}

export function Program(node: Object) {
  this.printInnerComments(node, false);

  this.printSequence(node.directives, node);
  if (node.directives && node.directives.length) this.newline();

  this.printSequence(node.body, node);
}

export function BlockStatement(node: Object) {
  this.token("{");
  this.printInnerComments(node);
  if (node.body.length) {
    this.newline();

    this.printSequence(node.directives, node, { indent: true });
    if (node.directives && node.directives.length) this.newline();

    this.printSequence(node.body, node, { indent: true });
    if (!this.format.retainLines && !this.format.concise) this.removeLast("\n");

    this.source("end", node.loc);
    this.rightBrace();
  } else {
    this.source("end", node.loc);
    this.token("}");
  }
}

export function Noop() {}

export function Directive(node: Object) {
  this.print(node.value, node);
  this.semicolon();
}

export { StringLiteral as DirectiveLiteral } from "./types";
