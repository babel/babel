

export function JSXAttribute(node) {
  this.print(node.name, node);
  if (node.value) {
    this.push("=");
    this.print(node.value, node);
  }
}

export function JSXIdentifier(node) {
  this.push(node.name);
}

export function JSXNamespacedName(node) {
  this.print(node.namespace, node);
  this.push(":");
  this.print(node.name, node);
}

export function JSXMemberExpression(node) {
  this.print(node.object, node);
  this.push(".");
  this.print(node.property, node);
}

export function JSXSpreadAttribute(node) {
  this.push("{...");
  this.print(node.argument, node);
  this.push("}");
}

export function JSXExpressionContainer(node) {
  this.push("{");
  this.print(node.expression, node);
  this.push("}");
}

export function JSXText(node) {
  this.push(node.value, true);
}

export function JSXElement(node) {
  let open = node.openingElement;
  this.print(open, node);
  if (open.selfClosing) return;

  this.indent();
  for (let child of node.children) {
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingElement, node);
}

export function JSXOpeningElement(node) {
  this.push("<");
  this.print(node.name, node);
  if (node.attributes.length > 0) {
    this.push(" ");
    this.printJoin(node.attributes, node, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

export function JSXClosingElement(node) {
  this.push("</");
  this.print(node.name, node);
  this.push(">");
}

export function JSXEmptyExpression() {}
