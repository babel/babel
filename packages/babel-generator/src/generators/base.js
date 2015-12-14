/* @flow */

import * as punctuators from "../fragments/punctuators";

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
  this.push(new punctuators.CurlyLPunctuator);
  this.printInnerComments(node);
  if (node.body.length) {
    this.printSequence(node.directives, node, { indent: true });
    this.printSequence(node.body, node, { indent: true });
  }

  this.push(new punctuators.CurlyRPunctuator);
}

export function Noop() {}

export function Directive(node: Object) {
  this.print(node.value, node);
  this.push(new punctuators.SemicolonPunctuator);
}

export function DirectiveLiteral(node: Object) {
  this.push(this._stringLiteral(node.value));
}
