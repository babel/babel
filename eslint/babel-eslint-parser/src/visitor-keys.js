import { types as t } from "@babel/core";
import { KEYS as ESLINT_VISITOR_KEYS } from "eslint-visitor-keys";

// AST Types that are not presented in Babel AST
export const newTypes = {
  ChainExpression: ESLINT_VISITOR_KEYS.ChainExpression,
  ImportExpression: ESLINT_VISITOR_KEYS.ImportExpression,
  Literal: ESLINT_VISITOR_KEYS.Literal,
  MethodDefinition: ["decorators"].concat(ESLINT_VISITOR_KEYS.MethodDefinition),
  Property: ["decorators"].concat(ESLINT_VISITOR_KEYS.Property),
};

// AST Types that shares `"type"` property with Babel but have different shape
export const conflictTypes = {
  // todo: remove this when class features are supported
  ClassPrivateMethod: ["decorators"].concat(
    ESLINT_VISITOR_KEYS.MethodDefinition,
  ),
  ExportAllDeclaration: ESLINT_VISITOR_KEYS.ExportAllDeclaration,
};

export default Object.assign(newTypes, t.VISITOR_KEYS, conflictTypes);
