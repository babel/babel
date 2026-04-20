const newCap = require("./rules/new-cap.cjs");
const noUndef = require("./rules/no-undef.cjs");
const noUnusedExpressions = require("./rules/no-unused-expressions.cjs");

const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

const rules = {
  "new-cap": newCap,
  "no-undef": noUndef,
  "no-unused-expressions": noUnusedExpressions,
};

const rulesConfig = {
  "new-cap": "off",
  "no-undef": "off",
  "no-unused-expressions": "off",
};

exports.meta = meta;
exports.rules = rules;
exports.rulesConfig = rulesConfig;
