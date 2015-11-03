/* @flow */

export function TaggedTemplateExpression(node: Object) {
  this.print(node.tag, node);
  this.print(node.quasi, node);
}

export function TemplateElement(node: Object) {
  this._push(node.value.raw);
}

export function TemplateLiteral(node: Object) {
  this.push("`");

  let quasis = node.quasis;

  for (let i = 0; i < quasis.length; i++) {
    this.print(quasis[i], node);

    if (i + 1 < quasis.length) {
      this._push("${ ");
      this.print(node.expressions[i], node);
      this.push(" }");
    }
  }

  this._push("`");
}
