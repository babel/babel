export function File(node: Object) {
  if (node.program) {
    // Print this here to ensure that Program node 'leadingComments' still
    // get printed after the hashbang.
    this.print(node.program.interpreter, node);
  }

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

  const hasDirectives = node.directives && node.directives.length;

  if (node.body.length || hasDirectives) {
    this.newline();

    this.printSequence(node.directives, node, { indent: true });
    if (hasDirectives) this.newline();

    this.printSequence(node.body, node, { indent: true });
    this.removeTrailingNewline();

    this.source("end", node.loc);

    if (!this.endsWith("\n")) this.newline();

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

export function InterpreterDirective(node: Object) {
  this.token(`#!${node.value}\n`);
}

export { StringLiteral as DirectiveLiteral } from "./types";
