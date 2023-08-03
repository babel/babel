// TODO(Babel 8) Remove this file
if (process.env.BABEL_8_BREAKING) {
  throw new Error(
    "Internal Babel error: This file should only be loaded in Babel 7",
  );
}

exports.getImportSource = function ({ node }) {
  if (node.specifiers.length === 0) return node.source.value;
};

exports.getRequireSource = function ({ node }) {
  if (node.type !== "ExpressionStatement") return;
  const { expression } = node;
  if (
    expression.type === "CallExpression" &&
    expression.callee.type === "Identifier" &&
    expression.callee.name === "require" &&
    expression.arguments.length === 1 &&
    expression.arguments[0].type === "StringLiteral"
  ) {
    return expression.arguments[0].value;
  }
};

exports.isPolyfillSource = function (source) {
  return source === "@babel/polyfill" || source === "core-js";
};
