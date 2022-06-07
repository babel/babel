const reportErrorMessageFormat = require("./rules/report-error-message-format.cjs");

const rules = {
  "report-error-message-format": reportErrorMessageFormat,
};

exports.rules = rules;
if (!process.env.BABEL_8_BREAKING) {
  exports.default = { rules };
}
