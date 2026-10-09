const { types: t } = require("../../../../lib/index.js");

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
