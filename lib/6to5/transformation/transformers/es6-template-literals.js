var t = require("../../types");
var _ = require("lodash");

var buildBinaryExpression = function (left, right) {
  return t.binaryExpression("+", left, right);
};

exports.TaggedTemplateExpression = function (node, parent, file) {
  var args = [];
  var quasi = node.quasi;

  var strings = [];
  var raw = [];

  _.each(quasi.quasis, function (elem) {
    strings.push(t.literal(elem.value.cooked));
    raw.push(t.literal(elem.value.raw));
  });

  args.push(t.callExpression(file.addDeclaration("tagged-template-literal"), [
    t.arrayExpression(strings),
    t.arrayExpression(raw)
  ]));

  args = args.concat(quasi.expressions);

  return t.callExpression(node.tag, args);
};

exports.TemplateLiteral = function (node) {
  var nodes = [];

  _.each(node.quasis, function (elem) {
    nodes.push(t.literal(elem.value.cooked));

    var expr = node.expressions.shift();
    if (expr) {
      if (t.isBinary(expr)) expr = t.parenthesizedExpression(expr);
      nodes.push(expr);
    }
  });

  if (nodes.length > 1) {
    // remove redundant '' at the end of the expression
    var last = _.last(nodes);
    if (t.isLiteral(last, { value: "" })) nodes.pop();

    var root = buildBinaryExpression(nodes.shift(), nodes.shift());

    _.each(nodes, function (node) {
      root = buildBinaryExpression(root, node);
    });

    return root;
  } else {
    return nodes[0];
  }
};
