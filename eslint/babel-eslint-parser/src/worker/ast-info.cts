// @ts-expect-error no types
import _ESLINT_VISITOR_KEYS = require("eslint-visitor-keys");
import babel = require("./babel-core.cts");

const ESLINT_VISITOR_KEYS = _ESLINT_VISITOR_KEYS.KEYS;

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
      // todo: remove this when we drop Babel 7 support
      ClassPrivateMethod: ["decorators"].concat(
        ESLINT_VISITOR_KEYS.MethodDefinition,
      ),
      ExportAllDeclaration: ESLINT_VISITOR_KEYS.ExportAllDeclaration,
    };

    visitorKeys = {
      ...newTypes,
      ...babel.types.VISITOR_KEYS,
      ...conflictTypes,
    };
  }
  return visitorKeys;
}

let tokLabels;
export function getTokLabels() {
  return (tokLabels ||= (
    process.env.BABEL_8_BREAKING
      ? Object.fromEntries
      : (p: any[]) => p.reduce((o, [k, v]) => ({ ...o, [k]: v }), {})
  )(Object.entries(babel.tokTypes).map(([key, tok]) => [key, tok.label])));
}
