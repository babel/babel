import t from "../../types";

export function has(node) {
  var first = node.body[0];
  return t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" });
}

export function wrap(node, callback) {
  var useStrictNode;
  if (exports.has(node)) {
    useStrictNode = node.body.shift();
  }

  callback();

  if (useStrictNode) {
    node.body.unshift(useStrictNode);
  }
}
