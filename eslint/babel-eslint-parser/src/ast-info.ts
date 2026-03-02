import { KEYS as ESLINT_VISITOR_KEYS } from "eslint-visitor-keys";
import { types, tokTypes } from "@babel/core";

let visitorKeys: Record<string, string[]>;
export function getVisitorKeys() {
  if (!visitorKeys) {
    // AST Types that are not presented in Babel AST
    const newTypes = {
      ChainExpression: ESLINT_VISITOR_KEYS.ChainExpression,
      ImportExpression: ESLINT_VISITOR_KEYS.ImportExpression,
      Literal: ESLINT_VISITOR_KEYS.Literal,
      MethodDefinition: ["decorators"].concat(
        ESLINT_VISITOR_KEYS.MethodDefinition,
      ),
      Property: ["decorators"].concat(ESLINT_VISITOR_KEYS.Property),
      PropertyDefinition: ["decorators", "typeAnnotation"].concat(
        ESLINT_VISITOR_KEYS.PropertyDefinition,
      ),
    };

    // AST Types that shares `"type"` property with Babel but have different shape
    const conflictTypes = {
      ExportAllDeclaration: ESLINT_VISITOR_KEYS.ExportAllDeclaration,
    };

    // @ts-expect-error(Babel 7 vs Babel 8) TODO(Babel 8)
    visitorKeys = {
      ...newTypes,
      ...types.VISITOR_KEYS,
      ...conflictTypes,
    };
  }
  return visitorKeys;
}

let tokLabels;
export function getTokLabels() {
  return (tokLabels ||= Object.fromEntries(
    Object.entries(tokTypes).map(([key, tok]) => [key, tok.label]),
  ));
}
