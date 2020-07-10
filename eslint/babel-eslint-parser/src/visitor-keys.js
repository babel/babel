import { types as t } from "@babel/core";
import { KEYS as ESLINT_VISITOR_KEYS } from "eslint-visitor-keys";

/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
const { ExportAllDeclaration, ...BABEL_VISITOR_KEYS } = t.VISITOR_KEYS;

export default Object.assign(
  {
    ChainExpression: ESLINT_VISITOR_KEYS.ChainExpression,
    ExportAllDeclaration: ESLINT_VISITOR_KEYS.ExportAllDeclaration,
    Literal: ESLINT_VISITOR_KEYS.Literal,
    MethodDefinition: ["decorators"].concat(
      ESLINT_VISITOR_KEYS.MethodDefinition,
    ),
    Property: ["decorators"].concat(ESLINT_VISITOR_KEYS.Property),
  },
  BABEL_VISITOR_KEYS,
);
