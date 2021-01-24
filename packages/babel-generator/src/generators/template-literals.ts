export function TaggedTemplateExpression(node: any) {
  this.print(node.tag, node);
  this.print(node.typeParameters, node); // TS
  this.print(node.quasi, node);
}

export function TemplateElement(node: any, parent: any) {
  const isFirst = parent.quasis[0] === node;
  const isLast = parent.quasis[parent.quasis.length - 1] === node;

  const value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");

  this.token(value);
}

export function TemplateLiteral(node: any) {
  const quasis = node.quasis;

  for (let i = 0; i < quasis.length; i++) {
    this.print(quasis[i], node);

    if (i + 1 < quasis.length) {
      this.print(node.expressions[i], node);
    }
  }
}
