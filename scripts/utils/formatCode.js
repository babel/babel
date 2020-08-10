"use strict";

// TODO: Remove this `if` in Babel 8
// Prettier only supports Node.js 10+, so we can fallback to not formatting
// o CI on older Node.js versions

if (process.env.CI && parseInt(process.versions.node, 10) < 10) {
  module.exports = function formatCode(code) {
    return code;
  };
} else {
  const prettier = require("prettier");

  module.exports = function formatCode(code, filename) {
    filename = filename || __filename;
    const prettierConfig = prettier.resolveConfig.sync(filename);
    prettierConfig.filepath = filename;
    prettierConfig.parser = "babel";

    return prettier.format(code, prettierConfig);
  };
}
