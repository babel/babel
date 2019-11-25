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
    "array-bracket-spacing": arrayBracketSpacing,
    "arrow-parens": arrowParens,
    "flow-object-type": flowObjectType,
    "func-params-comma-dangle": funcParamsCommaDangle,
    "generator-star-spacing": generatorStarSpacing,
    "new-cap": newCap,
    camelcase,
    "no-await-in-loop": noAwaitInLoop,
    "no-invalid-this": noInvalidThis,
    "no-unused-expressions": noUnusedExpressions,
    "object-curly-spacing": objectCurlySpacing,
    "object-shorthand": objectShorthand,
    quotes,
    semi,
    "valid-typeof": validTypeof,
  },
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
