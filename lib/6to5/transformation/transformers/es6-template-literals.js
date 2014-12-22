var t = require("../../types");

var buildBinaryExpression = function (left, right) {
  return t.binaryExpression("+", left, right);
};

exports.TaggedTemplateExpression = function (node, parent, file) {
  var args = [];
  var quasi = node.quasi;

  var strings = [];
  var raw = [];

  for (var i in quasi.quasis) {
    var elem = quasi.quasis[i];
    strings.push(t.literal(elem.value.cooked));
    raw.push(t.literal(elem.value.raw));
  }

  args.push(t.callExpression(file.addDeclaration("tagged-template-literal"), [
    t.arrayExpression(strings),
    t.arrayExpression(raw)
  ]));

  args = args.concat(quasi.expressions);

  return t.callExpression(node.tag, args);
};

exports.TemplateLiteral = function (node) {
  var nodes = [];

  for (var i in node.quasis) {
    var elem = node.quasis[i];

    nodes.push(t.literal(elem.value.cooked));

    var expr = node.expressions.shift();
    if (expr) nodes.push(expr);
  }

  if (nodes.length > 1) {
    // remove redundant '' at the end of the expression
    var last = nodes[nodes.length - 1];
    if (t.isLiteral(last, { value: "" })) nodes.pop();

    var root = buildBinaryExpression(nodes.shift(), nodes.shift());

    for (var i in nodes) {
      root = buildBinaryExpression(root, nodes[i]);
    }

    return root;
  } else {
    return nodes[0];
  }
};
