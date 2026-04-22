import newCap from "./rules/new-cap.js";
import noUndef from "./rules/no-undef.js";
import noUnusedExpressions from "./rules/no-unused-expressions.js";

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
  "object-curly-spacing": "off",
};

export default { meta, rules, rulesConfig };
