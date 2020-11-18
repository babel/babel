import { types as t } from "@babel/core";
import { KEYS as ESLINT_VISITOR_KEYS } from "eslint-visitor-keys";

// AST Types that are not presented in Babel AST
export const newTypes = {
  ChainExpression: ESLINT_VISITOR_KEYS.ChainExpression,
  ImportExpression: ESLINT_VISITOR_KEYS.ImportExpression,
  Literal: ESLINT_VISITOR_KEYS.Literal,
  MethodDefinition: ["decorators"].concat(ESLINT_VISITOR_KEYS.MethodDefinition),
  Property: ["decorators"].concat(ESLINT_VISITOR_KEYS.Property),
  // todo: remove this when Acorn supports class properties
  PropertyDefinition: t.VISITOR_KEYS.ClassProperty,
  // todo: remove this when Acorn supports class properties
  PrivateIdentifier: [],
};

// AST Types that shares `"type"` property with Babel but have different shape
export const conflictTypes = {
  // todo: remove this when we drop Babel 7 support
  ClassPrivateMethod: ["decorators"].concat(
    ESLINT_VISITOR_KEYS.MethodDefinition,
  ),
  ExportAllDeclaration: ESLINT_VISITOR_KEYS.ExportAllDeclaration,
};

export default { ...newTypes, ...t.VISITOR_KEYS, ...conflictTypes };
