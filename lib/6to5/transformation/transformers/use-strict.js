var t = require("../../types");

exports._has = function (node) {
  var first = node.body[0];
  return t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" });
};

exports._wrap = function (node, callback) {
  var useStrictNode;
  if (exports._has(node)) {
    useStrictNode = node.body.shift();
  }

  callback();

  if (useStrictNode) {
    node.body.unshift(useStrictNode);
  }
};

exports.ast = {
  exit: function (ast) {
    if (!exports._has(ast.program)) {
      ast.program.body.unshift(t.expressionStatement(t.literal("use strict")));
    }
  }
};
