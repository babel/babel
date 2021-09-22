const ESLINT_VISITOR_KEYS = require("eslint-visitor-keys").KEYS;
const babel = require("./babel-core.cjs");

let visitorKeys;
exports.getVisitorKeys = function getVisitorKeys() {
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
};

let tokLabels;
exports.getTokLabels = function getTokLabels() {
  return (tokLabels ||= (
    process.env.BABEL_8_BREAKING
      ? Object.fromEntries
      : p => p.reduce((o, [k, v]) => ({ ...o, [k]: v }), {})
  )(Object.entries(babel.tokTypes).map(([key, tok]) => [key, tok.label])));
};
