import newCap from "./rules/new-cap";
import camelcase from "./rules/camelcase";
import noInvalidThis from "./rules/no-invalid-this";
import noUnusedExpressions from "./rules/no-unused-expressions";
import objectCurlySpacing from "./rules/object-curly-spacing";
import semi from "./rules/semi";

module.exports = {
  rules: {
    camelcase,
    "new-cap": newCap,
    "no-invalid-this": noInvalidThis,
    "no-unused-expressions": noUnusedExpressions,
    "object-curly-spacing": objectCurlySpacing,
    semi,
  },
  rulesConfig: {
    camelcase: "off",
    "new-cap": "off",
    "no-invalid-this": "off",
    "no-unused-expressions": "off",
    "object-curly-spacing": "off",
    semi: "off",
  },
};
