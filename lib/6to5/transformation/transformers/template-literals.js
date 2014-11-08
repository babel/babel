var t = require("../../types");
var _ = require("lodash");

var buildBinaryExpression = function (left, right) {
  return t.binaryExpression("+", left, right);
};

exports.TaggedTemplateExpression = function (node) {
  var args = [];
  var quasi = node.quasi;

  var strings = quasi.quasis.map(function (elem) {
    return t.literal(elem.value.raw);
  });
  args.push(t.arrayExpression(strings));

  _.each(quasi.expressions, function (expr) {
    args.push(expr);
  });

  return t.callExpression(node.tag, args);
};

exports.TemplateLiteral = function (node) {
  var nodes = [];

  _.each(node.quasis, function (elem) {
    nodes.push(t.literal(elem.value.raw));

    var expr = node.expressions.shift();
    if (expr) nodes.push(expr);
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
