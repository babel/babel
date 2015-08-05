/**
 * Prints TaggedTemplateExpression, prints tag and quasi.
 */

export function TaggedTemplateExpression(node) {
  this.print(node.tag, node);
  this.print(node.quasi, node);
}

/**
 * Prints TemplateElement, prints value.
 */

export function TemplateElement(node) {
  this._push(node.value.raw);
}

/**
 * Prints TemplateLiteral, prints quasis, and expressions.
 */

export function TemplateLiteral(node) {
  this.push("`");

  var quasis = node.quasis;
  var len    = quasis.length;

  for (var i = 0; i < len; i++) {
    this.print(quasis[i], node);

    if (i + 1 < len) {
      this.push("${ ");
      this.print(node.expressions[i], node);
      this.push(" }");
    }
  }

  this._push("`");
}
