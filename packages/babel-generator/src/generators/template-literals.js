export function TaggedTemplateExpression(node: Object) {
  this.print(node.tag, node);
  this.print(node.quasi, node);
}

export function TemplateElement(node: Object) {
  this.push(node.value.raw, true/* noIndent */);
}

export function TemplateLiteral(node: Object) {
  this.push("`");

  let quasis = node.quasis;

  for (let i = 0; i < quasis.length; i++) {
    this.print(quasis[i], node);

    if (i + 1 < quasis.length) {
      this.push("${ ", true /* noIndent */);
      this.print(node.expressions[i], node);
      this.push(" }");
    }
  }

  this.push("`", true /* noIndent */);
}
