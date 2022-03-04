const newCap = require("./rules/new-cap.cjs");
const noInvalidThis = require("./rules/no-invalid-this.cjs");
const noUnusedExpressions = require("./rules/no-unused-expressions.cjs");
const objectCurlySpacing = require("./rules/object-curly-spacing.cjs");
const semi = require("./rules/semi.cjs");

const rules = {
  "new-cap": newCap,
  "no-invalid-this": noInvalidThis,
  "no-unused-expressions": noUnusedExpressions,
  "object-curly-spacing": objectCurlySpacing,
  semi,
};

const rulesConfig = {
  "new-cap": "off",
  "no-invalid-this": "off",
  "no-unused-expressions": "off",
  "object-curly-spacing": "off",
  semi: "off",
};

exports.rules = rules;
exports.rulesConfig = rulesConfig;

if (!process.env.BABEL_8_BREAKING) {
  exports.default = { rules, rulesConfig };
}
