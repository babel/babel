export function TaggedTemplateExpression(node: Object) {
  this.print(node.tag, node);
  this.print(node.quasi, node);
}

export function TemplateElement(node: Object, parent: Object) {
  const isFirst = parent.quasis[0] === node;
  const isLast = parent.quasis[parent.quasis.length - 1] === node;

  let value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");

  if (!isFirst) this.space();
  this.token(value);
  if (!isLast) this.space();
}

export function TemplateLiteral(node: Object) {
  let quasis = node.quasis;

  for (let i = 0; i < quasis.length; i++) {
    this.print(quasis[i], node);

    if (i + 1 < quasis.length) {
      this.print(node.expressions[i], node);
    }
  }
}
