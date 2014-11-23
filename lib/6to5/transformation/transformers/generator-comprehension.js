var arrayComprehension = require("./array-comprehension");
var t                  = require("../../types");

exports.ComprehensionExpression = function (node) {
  if (!node.generator) return;

  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body), true);

  body.push(arrayComprehension._build(node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
};
