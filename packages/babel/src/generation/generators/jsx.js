import * as t from "../../types";

/**
 * Prints JSXAttribute, prints name and value.
 */

export function JSXAttribute(node) {
  this.print(node.name, node);
  if (node.value) {
    this.push("=");
    this.print(node.value, node);
  }
}

/**
 * Prints JSXIdentifier, prints name.
 */

export function JSXIdentifier(node) {
  this.push(node.name);
}

/**
 * Prints JSXNamespacedName, prints namespace and name.
 */

export function JSXNamespacedName(node) {
  this.print(node.namespace, node);
  this.push(":");
  this.print(node.name, node);
}

/**
 * Prints JSXMemberExpression, prints object and property.
 */

export function JSXMemberExpression(node) {
  this.print(node.object, node);
  this.push(".");
  this.print(node.property, node);
}

/**
 * Prints JSXSpreadAttribute, prints argument.
 */

export function JSXSpreadAttribute(node) {
  this.push("{...");
  this.print(node.argument, node);
  this.push("}");
}

/**
 * Prints JSXExpressionContainer, prints expression.
 */

export function JSXExpressionContainer(node) {
  this.push("{");
  this.print(node.expression, node);
  this.push("}");
}

/**
 * Prints JSXElement, prints openingElement, children, and closingElement.
 */

export function JSXElement(node) {
  var open = node.openingElement;
  this.print(open, node);
  if (open.selfClosing) return;

  this.indent();
  for (var child of (node.children: Array)) {
    if (t.isLiteral(child)) {
      this.push(child.value, true);
    } else {
      this.print(child, node);
    }
  }
  this.dedent();

  this.print(node.closingElement, node);
}

/**
 * Prints JSXOpeningElement, prints name and attributes, handles selfClosing.
 */

export function JSXOpeningElement(node) {
  this.push("<");
  this.print(node.name, node);
  if (node.attributes.length > 0) {
    this.push(" ");
    this.printJoin(node.attributes, node, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

/**
 * Prints JSXClosingElement, prints name.
 */

export function JSXClosingElement(node) {
  this.push("</");
  this.print(node.name, node);
  this.push(">");
}

/**
 * Prints JSXEmptyExpression.
 */

export function JSXEmptyExpression() {}
