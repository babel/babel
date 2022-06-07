const noDeprecatedClone = require("./rules/no-deprecated-clone.cjs");
const noUndefinedIdentifier = require("./rules/no-undefined-identifier.cjs");
const pluginName = require("./rules/plugin-name.cjs");

const rules = {
  "no-deprecated-clone": noDeprecatedClone,
  "no-undefined-identifier": noUndefinedIdentifier,
  "plugin-name": pluginName,
};

exports.rules = rules;
if (!process.env.BABEL_8_BREAKING) {
  exports.default = { rules };
}
