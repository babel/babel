const fs = require("fs");
const path = require("path");

function inlinePlugin(api, { filename }) {
  const { types: t } = api;

  const contents = api.cache.using(() => fs.readFileSync(filename, "utf8"));
  api.addExternalDependency(filename);

  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "REPLACE_ME") {
          path.replaceWith(t.stringLiteral(contents));
        }
      },
    },
  };
}

module.exports = {
  plugins: [
    [inlinePlugin, { filename: path.resolve(__dirname, "./file.txt") }],
  ],
};
