import * as t from "../../types";

/**
 * Prints JSXAttribute, prints name and value.
 */

export function JSXAttribute(node, print) {
  print.plain(node.name);
  if (node.value) {
    this.push("=");
    print.plain(node.value);
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

export function JSXNamespacedName(node, print) {
  print.plain(node.namespace);
  this.push(":");
  print.plain(node.name);
}

/**
 * Prints JSXMemberExpression, prints object and property.
 */

export function JSXMemberExpression(node, print) {
  print.plain(node.object);
  this.push(".");
  print.plain(node.property);
}

/**
 * Prints JSXSpreadAttribute, prints argument.
 */

export function JSXSpreadAttribute(node, print) {
  this.push("{...");
  print.plain(node.argument);
  this.push("}");
}

/**
 * Prints JSXExpressionContainer, prints expression.
 */

export function JSXExpressionContainer(node, print) {
  this.push("{");
  print.plain(node.expression);
  this.push("}");
}

/**
 * Prints JSXElement, prints openingElement, children, and closingElement.
 */

export function JSXElement(node, print) {
  var open = node.openingElement;
  print.plain(open);
  if (open.selfClosing) return;

  this.indent();
  for (var child of (node.children: Array)) {
    if (t.isLiteral(child)) {
      this.push(child.value, true);
    } else {
      print.plain(child);
    }
  }
  this.dedent();

  print.plain(node.closingElement);
}

/**
 * Prints JSXOpeningElement, prints name and attributes, handles selfClosing.
 */

export function JSXOpeningElement(node, print) {
  this.push("<");
  print.plain(node.name);
  if (node.attributes.length > 0) {
    this.push(" ");
    print.join(node.attributes, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

/**
 * Prints JSXClosingElement, prints name.
 */

export function JSXClosingElement(node, print) {
  this.push("</");
  print.plain(node.name);
  this.push(">");
}

/**
 * Prints JSXEmptyExpression.
 */

export function JSXEmptyExpression() {}
