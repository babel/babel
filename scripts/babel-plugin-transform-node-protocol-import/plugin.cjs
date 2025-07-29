// @ts-check
module.exports = pluginBabelTransformNodeProtocolImports;

/**
 * Remove leading `node:` from the input string
 * @param {string} input
 * @returns {string}
 */
function replaceNodeProtocol(input) {
  return input.replace(/^node:/, "");
}

/**
 * Plugin definition
 * @param {import("@babel/core").PluginAPI} api
 * @returns {import("@babel/core").PluginObject}
 */
function pluginBabelTransformNodeProtocolImports({ types: t, targets }) {
  let target;
  // Skip this plugin for Node.js >= 16, api.targets could be undefined in e2e-old-babel test
  if (
    targets &&
    (target = targets()).node &&
    +target.node.split(".")[0] >= 16
  ) {
    return {};
  }
  return {
    name: "babel-plugin-transform-node-protocol-imports",
    visitor: {
      ImportDeclaration({ node }) {
        node.source.value = replaceNodeProtocol(node.source.value);
      },
      ImportExpression({ node }) {
        if (t.isStringLiteral(node.source)) {
          node.source.value = replaceNodeProtocol(node.source.value);
        }
      },
      CallExpression({ node }) {
        if (
          t.isIdentifier(node.callee, { name: "require" }) &&
          t.isStringLiteral(node.arguments[0])
        ) {
          node.arguments[0].value = replaceNodeProtocol(
            node.arguments[0].value
          );
        }
      },
    },
  };
}
