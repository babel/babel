import type Printer from "../printer";
export function JSXAttribute(this: Printer, node: any) {
  this.print(node.name, node);
  if (node.value) {
    this.token("=");
    this.print(node.value, node);
  }
}

export function JSXIdentifier(this: Printer, node: any) {
  this.word(node.name);
}

export function JSXNamespacedName(this: Printer, node: any) {
  this.print(node.namespace, node);
  this.token(":");
  this.print(node.name, node);
}

export function JSXMemberExpression(this: Printer, node: any) {
  this.print(node.object, node);
  this.token(".");
  this.print(node.property, node);
}

export function JSXSpreadAttribute(this: Printer, node: any) {
  this.token("{");
  this.token("...");
  this.print(node.argument, node);
  this.token("}");
}

export function JSXExpressionContainer(this: Printer, node: any) {
  this.token("{");
  this.print(node.expression, node);
  this.token("}");
}

export function JSXSpreadChild(this: Printer, node: any) {
  this.token("{");
  this.token("...");
  this.print(node.expression, node);
  this.token("}");
}

export function JSXText(this: Printer, node: any) {
  const raw = this.getPossibleRaw(node);

  if (raw != null) {
    this.token(raw);
  } else {
    this.token(node.value);
  }
}

export function JSXElement(this: Printer, node: any) {
  const open = node.openingElement;
  this.print(open, node);
  if (open.selfClosing) return;

  this.indent();
  for (const child of node.children as Array<any>) {
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingElement, node);
}

function spaceSeparator() {
  this.space();
}

export function JSXOpeningElement(this: Printer, node: any) {
  this.token("<");
  this.print(node.name, node);
  this.print(node.typeParameters, node); // TS
  if (node.attributes.length > 0) {
    this.space();
    this.printJoin(node.attributes, node, { separator: spaceSeparator });
  }
  if (node.selfClosing) {
    this.space();
    this.token("/>");
  } else {
    this.token(">");
  }
}

export function JSXClosingElement(this: Printer, node: any) {
  this.token("</");
  this.print(node.name, node);
  this.token(">");
}

export function JSXEmptyExpression(this: Printer, node: any) {
  this.printInnerComments(node);
}

export function JSXFragment(this: Printer, node: any) {
  this.print(node.openingFragment, node);

  this.indent();
  for (const child of node.children as Array<any>) {
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingFragment, node);
}

export function JSXOpeningFragment(this: Printer) {
  this.token("<");
  this.token(">");
}

export function JSXClosingFragment(this: Printer) {
  this.token("</");
  this.token(">");
}
