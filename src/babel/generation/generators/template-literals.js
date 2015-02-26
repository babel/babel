import each from "lodash/collection/each";

export function TaggedTemplateExpression(node, print) {
  print(node.tag);
  print(node.quasi);
}

export function TemplateElement(node) {
  this._push(node.value.raw);
}

export function TemplateLiteral(node, print) {
  this.push("`");

  var quasis = node.quasis;
  var len    = quasis.length;

  each(quasis, (quasi, i) => {
    print(quasi);

    if (i + 1 < len) {
      this.push("${ ");
      print(node.expressions[i]);
      this.push(" }");
    }
  });

  this._push("`");
}
