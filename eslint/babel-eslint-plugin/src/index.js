import arrayBracketSpacing from "./rules/array-bracket-spacing";
import arrowParens from "./rules/arrow-parens";
import flowObjectType from "./rules/flow-object-type";
import funcParamsCommaDangle from "./rules/func-params-comma-dangle";
import generatorStarSpacing from "./rules/generator-star-spacing";
import newCap from "./rules/new-cap";
import camelcase from "./rules/camelcase";
import noAwaitInLoop from "./rules/no-await-in-loop";
import noInvalidThis from "./rules/no-invalid-this";
import noUnusedExpressions from "./rules/no-unused-expressions";
import objectCurlySpacing from "./rules/object-curly-spacing";
import objectShorthand from "./rules/object-shorthand";
import quotes from "./rules/quotes";
import semi from "./rules/semi";
import validTypeof from "./rules/valid-typeof";

module.exports = {
  rules: {
    camelcase,
    "new-cap": newCap,
    "no-invalid-this": noInvalidThis,
    "no-unused-expressions": noUnusedExpressions,
    "object-curly-spacing": objectCurlySpacing,
    quotes,
    semi,
    "valid-typeof": validTypeof,

    // Deprecated rules:
    "generator-star-spacing": generatorStarSpacing,
    "object-shorthand": objectShorthand,
    "arrow-parens": arrowParens,
    "func-params-comma-dangle": funcParamsCommaDangle,
    "array-bracket-spacing": arrayBracketSpacing,
    "flow-object-type": flowObjectType,
    "no-await-in-loop": noAwaitInLoop,
  },
  configs: {
    recommended: {
      parser: "@babel/eslint-parser",
      plugins: ["@babel/eslint-plugin"],
      rules: {
        camelcase: "off",
        "new-cap": "off",
        "no-invalid-this": "off",
        "no-unused-expressions": "off",
        "object-curly-spacing": "off",
        quotes: "off",
        semi: "off",
        "valid-typeof": "off",

        "@babel/camelcase": "error",
        "@babel/new-cap": "error",
        "@babel/no-invalid-this": "error",
        "@babel/no-unused-expressions": "error",
        "@babel/object-curly-spacing": "error",
        "@babel/quotes": "error",
        "@babel/semi": "error",
        "@babel/valid-typeof": "error",
      },
    },
  },
  // `rulesConfig` only works on ESLint 1.x:
  rulesConfig: {
    "array-bracket-spacing": "off",
    "arrow-parens": "off",
    camelcase: "off",
    "flow-object-type": "off",
    "func-params-comma-dangle": "off",
    "generator-star-spacing": "off",
    "new-cap": "off",
    "no-await-in-loop": "off",
    "no-invalid-this": "off",
    "no-unused-expressions": "off",
    "object-curly-spacing": "off",
    "object-shorthand": "off",
    quotes: "off",
    semi: "off",
    "valid-typeof": "off",
  },
};
