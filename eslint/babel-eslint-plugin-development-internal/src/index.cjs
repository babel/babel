const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

const rules = {
  "report-error-message-format": require("./rules/report-error-message-format.cjs"),
};

exports.meta = meta;
exports.rules = rules;
