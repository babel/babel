const rules = {
  "report-error-message-format": require("./rules/report-error-message-format.cjs"),
  "require-default-import-fallback": require("./rules/require-default-import-fallback.cjs"),
};

exports.rules = rules;
if (!process.env.BABEL_8_BREAKING) {
  exports.default = { rules };
}
