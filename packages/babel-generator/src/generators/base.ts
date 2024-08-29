import type Printer from "../printer.ts";
import type * as t from "@babel/types";

export function File(this: Printer, node: t.File) {
  if (node.program) {
    // Print this here to ensure that Program node 'leadingComments' still
    // get printed after the hashbang.
    this.print(node.program.interpreter);
  }

  this.print(node.program);
}

export function Program(this: Printer, node: t.Program) {
  // An empty Program doesn't have any inner tokens, so
  // we must explicitly print its inner comments.
  this.noIndentInnerCommentsHere();
  this.printInnerComments();

  const directivesLen = node.directives?.length;
  if (directivesLen) {
    const newline = node.body.length ? 2 : 1;
    this.printSequence(node.directives, {
      trailingCommentsLineOffset: newline,
    });
    if (!node.directives[directivesLen - 1].trailingComments?.length) {
      this.newline(newline);
    }
  }

  this.printSequence(node.body);
}

export function BlockStatement(this: Printer, node: t.BlockStatement) {
  this.token("{");
  const exit = this.enterDelimited();

  const directivesLen = node.directives?.length;
  if (directivesLen) {
    const newline = node.body.length ? 2 : 1;
    this.printSequence(node.directives, {
      indent: true,
      trailingCommentsLineOffset: newline,
    });
    if (!node.directives[directivesLen - 1].trailingComments?.length) {
      this.newline(newline);
    }
  }

  this.printSequence(node.body, { indent: true });

  exit();
  this.rightBrace(node);
}

export function Directive(this: Printer, node: t.Directive) {
  this.print(node.value);
  this.semicolon();
}

// These regexes match an even number of \ followed by a quote
const unescapedSingleQuoteRE = /(?:^|[^\\])(?:\\\\)*'/;
const unescapedDoubleQuoteRE = /(?:^|[^\\])(?:\\\\)*"/;

export function DirectiveLiteral(this: Printer, node: t.DirectiveLiteral) {
  const raw = this.getPossibleRaw(node);
  if (!this.format.minified && raw !== undefined) {
    this.token(raw);
    return;
  }

  const { value } = node;

  // NOTE: In directives we can't change escapings,
  // because they change the behavior.
  // e.g. "us\x65 strict" (\x65 is e) is not a "use strict" directive.

  if (!unescapedDoubleQuoteRE.test(value)) {
    this.token(`"${value}"`);
  } else if (!unescapedSingleQuoteRE.test(value)) {
    this.token(`'${value}'`);
  } else {
    throw new Error(
      "Malformed AST: it is not possible to print a directive containing" +
        " both unescaped single and double quotes.",
    );
  }
}

export function InterpreterDirective(
  this: Printer,
  node: t.InterpreterDirective,
) {
  this.token(`#!${node.value}`);
  this.newline(1, true);
}

export function Placeholder(this: Printer, node: t.Placeholder) {
  this.token("%%");
  this.print(node.name);
  this.token("%%");

  if (node.expectedNode === "Statement") {
    this.semicolon();
  }
}
