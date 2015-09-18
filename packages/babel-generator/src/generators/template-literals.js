export function TaggedTemplateExpression(node, print) {
  print.plain(node.tag);
  print.plain(node.quasi);
}

export function TemplateElement(node) {
  this._push(node.value.raw);
}

export function TemplateLiteral(node, print) {
  this.push("`");

  let quasis = node.quasis;
  let len    = quasis.length;

  for (let i = 0; i < len; i++) {
    print.plain(quasis[i]);

    if (i + 1 < len) {
      this.push("${ ");
      print.plain(node.expressions[i]);
      this.push(" }");
    }
  }

  this._push("`");
}
