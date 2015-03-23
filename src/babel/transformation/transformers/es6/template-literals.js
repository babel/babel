import * as t from "../../../types";

var buildBinaryExpression = function (left, right, file) {
  return t.binaryExpression("+", coerce(left, file), coerce(right, file));
};

function coerce(node, file) {
  if (file.isLoose("es7.templateLiterals") || (t.isLiteral(node) && typeof node.value === "string")) {
    return node;
  } else {
    return t.callExpression(t.identifier("String"), [node]);
  }
}

export function check(node) {
  return t.isTemplateLiteral(node) || t.isTaggedTemplateExpression(node);
}

export function TaggedTemplateExpression(node, parent, scope, file) {
  var quasi = node.quasi;
  var args  = [];

  var strings = [];
  var raw     = [];

  for (var i = 0; i < quasi.quasis.length; i++) {
    var elem = quasi.quasis[i];
    strings.push(t.literal(elem.value.cooked));
    raw.push(t.literal(elem.value.raw));
  }

  strings = t.arrayExpression(strings);
  raw = t.arrayExpression(raw);

  var templateName = "tagged-template-literal";
  if (file.isLoose("es6.templateLiterals")) templateName += "-loose";
  args.push(t.callExpression(file.addHelper(templateName), [strings, raw]));

  args = args.concat(quasi.expressions);

  return t.callExpression(node.tag, args);
}

export function TemplateLiteral(node, parent, scope, file) {
  var nodes = [];
  var i;

  for (i = 0; i < node.quasis.length; i++) {
    var elem = node.quasis[i];

    nodes.push(t.literal(elem.value.cooked));

    var expr = node.expressions.shift();
    if (expr) nodes.push(expr);
  }

  if (nodes.length > 1) {
    // remove redundant '' at the end of the expression
    var last = nodes[nodes.length - 1];
    if (t.isLiteral(last, { value: "" })) nodes.pop();

    var root = buildBinaryExpression(nodes.shift(), nodes.shift(), file);

    for (i = 0; i < nodes.length; i++) {
      root = buildBinaryExpression(root, nodes[i], file);
    }

    return root;
  } else {
    return nodes[0];
  }
}
