const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

const rules = {
  "report-error-message-format": require("./rules/report-error-message-format.cjs"),
  "require-default-import-fallback": require("./rules/require-default-import-fallback.cjs"),
};

exports.meta = meta;
exports.rules = rules;
if (!process.env.BABEL_8_BREAKING) {
  exports.default = { meta, rules };
}
