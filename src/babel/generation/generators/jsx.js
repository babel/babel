import each from "lodash/collection/each";
import t from "../../types";

export function JSXAttribute(node, print) {
  print(node.name);
  if (node.value) {
    this.push("=");
    print(node.value);
  }
}

export function JSXIdentifier(node) {
  this.push(node.name);
}

export function JSXNamespacedName(node, print) {
  print(node.namespace);
  this.push(":");
  print(node.name);
}

export function JSXMemberExpression(node, print) {
  print(node.object);
  this.push(".");
  print(node.property);
}

export function JSXSpreadAttribute(node, print) {
  this.push("{...");
  print(node.argument);
  this.push("}");
}

export function JSXExpressionContainer(node, print) {
  this.push("{");
  print(node.expression);
  this.push("}");
}

export function JSXElement(node, print) {
  var open = node.openingElement;
  print(open);
  if (open.selfClosing) return;

  this.indent();
  each(node.children, (child) => {
    if (t.isLiteral(child)) {
      this.push(child.value);
    } else {
      print(child);
    }
  });
  this.dedent();

  print(node.closingElement);
}

export function JSXOpeningElement(node, print) {
  this.push("<");
  print(node.name);
  if (node.attributes.length > 0) {
    this.push(" ");
    print.join(node.attributes, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

export function JSXClosingElement(node, print) {
  this.push("</");
  print(node.name);
  this.push(">");
}

export function JSXEmptyExpression() {}
