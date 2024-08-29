import type Printer from "../printer.ts";
import type * as t from "@babel/types";

export function JSXAttribute(this: Printer, node: t.JSXAttribute) {
  this.print(node.name);
  if (node.value) {
    this.token("=");
    this.print(node.value);
  }
}

export function JSXIdentifier(this: Printer, node: t.JSXIdentifier) {
  this.word(node.name);
}

export function JSXNamespacedName(this: Printer, node: t.JSXNamespacedName) {
  this.print(node.namespace);
  this.token(":");
  this.print(node.name);
}

export function JSXMemberExpression(
  this: Printer,
  node: t.JSXMemberExpression,
) {
  this.print(node.object);
  this.token(".");
  this.print(node.property);
}

export function JSXSpreadAttribute(this: Printer, node: t.JSXSpreadAttribute) {
  this.token("{");
  this.token("...");
  this.print(node.argument);
  this.rightBrace(node);
}

export function JSXExpressionContainer(
  this: Printer,
  node: t.JSXExpressionContainer,
) {
  this.token("{");
  this.print(node.expression);
  this.rightBrace(node);
}

export function JSXSpreadChild(this: Printer, node: t.JSXSpreadChild) {
  this.token("{");
  this.token("...");
  this.print(node.expression);
  this.rightBrace(node);
}

export function JSXText(this: Printer, node: t.JSXText) {
  const raw = this.getPossibleRaw(node);

  if (raw !== undefined) {
    this.token(raw, true);
  } else {
    this.token(node.value, true);
  }
}

export function JSXElement(this: Printer, node: t.JSXElement) {
  const open = node.openingElement;
  this.print(open);
  if (open.selfClosing) return;

  this.indent();
  for (const child of node.children) {
    this.print(child);
  }
  this.dedent();

  this.print(node.closingElement);
}

function spaceSeparator(this: Printer) {
  this.space();
}

export function JSXOpeningElement(this: Printer, node: t.JSXOpeningElement) {
  this.token("<");
  this.print(node.name);
  this.print(node.typeParameters); // TS
  if (node.attributes.length > 0) {
    this.space();
    this.printJoin(node.attributes, { separator: spaceSeparator });
  }
  if (node.selfClosing) {
    this.space();
    this.token("/>");
  } else {
    this.token(">");
  }
}

export function JSXClosingElement(this: Printer, node: t.JSXClosingElement) {
  this.token("</");
  this.print(node.name);
  this.token(">");
}

export function JSXEmptyExpression(this: Printer) {
  // This node is empty, so forcefully print its inner comments.
  this.printInnerComments();
}

export function JSXFragment(this: Printer, node: t.JSXFragment) {
  this.print(node.openingFragment);

  this.indent();
  for (const child of node.children) {
    this.print(child);
  }
  this.dedent();

  this.print(node.closingFragment);
}

export function JSXOpeningFragment(this: Printer) {
  this.token("<");
  this.token(">");
}

export function JSXClosingFragment(this: Printer) {
  this.token("</");
  this.token(">");
}
