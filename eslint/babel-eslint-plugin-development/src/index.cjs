const noDeprecatedClone = require("./rules/no-deprecated-clone.cjs");
const noUndefinedIdentifier = require("./rules/no-undefined-identifier.cjs");
const pluginName = require("./rules/plugin-name.cjs");

const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

const rules = {
  "no-deprecated-clone": noDeprecatedClone,
  "no-undefined-identifier": noUndefinedIdentifier,
  "plugin-name": pluginName,
};

exports.meta = meta;
exports.rules = rules;
if (!process.env.BABEL_8_BREAKING) {
  exports.default = { meta, rules };
}
