/* @flow */

import type NodePrinter from "../node/printer";

export function JSXAttribute(node: Object, print: NodePrinter) {
  print.plain(node.name);
  if (node.value) {
    this.push("=");
    print.plain(node.value);
  }
}

export function JSXIdentifier(node: Object) {
  this.push(node.name);
}

export function JSXNamespacedName(node: Object, print: NodePrinter) {
  print.plain(node.namespace);
  this.push(":");
  print.plain(node.name);
}

export function JSXMemberExpression(node: Object, print: NodePrinter) {
  print.plain(node.object);
  this.push(".");
  print.plain(node.property);
}

export function JSXSpreadAttribute(node: Object, print: NodePrinter) {
  this.push("{...");
  print.plain(node.argument);
  this.push("}");
}

export function JSXExpressionContainer(node: Object, print: NodePrinter) {
  this.push("{");
  print.plain(node.expression);
  this.push("}");
}

export function JSXText(node: Object) {
  this.push(node.value, true);
}

export function JSXElement(node: Object, print: NodePrinter) {
  let open = node.openingElement;
  print.plain(open);
  if (open.selfClosing) return;

  this.indent();
  for (let child of (node.children: Array<Object>)) {
    print.plain(child);
  }
  this.dedent();

  print.plain(node.closingElement);
}

export function JSXOpeningElement(node: Object, print: NodePrinter) {
  this.push("<");
  print.plain(node.name);
  if (node.attributes.length > 0) {
    this.push(" ");
    print.join(node.attributes, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

export function JSXClosingElement(node: Object, print: NodePrinter) {
  this.push("</");
  print.plain(node.name);
  this.push(">");
}

export function JSXEmptyExpression() {}
