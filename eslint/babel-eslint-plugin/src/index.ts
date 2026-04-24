import newCap from "./rules/new-cap.ts";
import noUndef from "./rules/no-undef.ts";
import noUnusedExpressions from "./rules/no-unused-expressions.ts";

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
