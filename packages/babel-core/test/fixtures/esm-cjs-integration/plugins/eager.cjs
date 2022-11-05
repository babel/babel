const { types: t } = require("../../../../cjs-proxy.cjs");

module.exports = function () {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "REPLACE_ME") {
          path.replaceWith(t.stringLiteral("Replaced!"));
        }
      },
    },
  };
};
