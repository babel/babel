const newCap = require("./rules/new-cap.cjs");
const noInvalidThis = require("./rules/no-invalid-this.cjs");
const noUndef = require("./rules/no-undef.cjs");
const noUnusedExpressions = require("./rules/no-unused-expressions.cjs");
const objectCurlySpacing = require("./rules/object-curly-spacing.cjs");
const semi = require("./rules/semi.cjs");

const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

const rules = {
  "new-cap": newCap,
  "no-invalid-this": noInvalidThis,
  "no-undef": noUndef,
  "no-unused-expressions": noUnusedExpressions,
  "object-curly-spacing": objectCurlySpacing,
  semi,
};

const rulesConfig = {
  "new-cap": "off",
  "no-invalid-this": "off",
  "no-undef": "off",
  "no-unused-expressions": "off",
  "object-curly-spacing": "off",
  semi: "off",
};

exports.meta = meta;
exports.rules = rules;
exports.rulesConfig = rulesConfig;

if (!process.env.BABEL_8_BREAKING) {
  exports.default = { meta, rules, rulesConfig };
}
