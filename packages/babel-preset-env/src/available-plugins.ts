/* eslint sort-keys: "error" */

import syntaxImportAssertions from "@babel/plugin-syntax-import-assertions";
import syntaxImportAttributes from "@babel/plugin-syntax-import-attributes";

import proposalAsyncGeneratorFunctions from "@babel/plugin-transform-async-generator-functions";
import proposalClassProperties from "@babel/plugin-transform-class-properties";
import proposalClassStaticBlock from "@babel/plugin-transform-class-static-block";
import proposalDynamicImport from "@babel/plugin-transform-dynamic-import";
import proposalExportNamespaceFrom from "@babel/plugin-transform-export-namespace-from";
import proposalJsonStrings from "@babel/plugin-transform-json-strings";
import proposalLogicalAssignmentOperators from "@babel/plugin-transform-logical-assignment-operators";
import proposalNullishCoalescingOperator from "@babel/plugin-transform-nullish-coalescing-operator";
import proposalNumericSeparator from "@babel/plugin-transform-numeric-separator";
import proposalObjectRestSpread from "@babel/plugin-transform-object-rest-spread";
import proposalOptionalCatchBinding from "@babel/plugin-transform-optional-catch-binding";
import proposalOptionalChaining from "@babel/plugin-transform-optional-chaining";
import proposalPrivateMethods from "@babel/plugin-transform-private-methods";
import proposalPrivatePropertyInObject from "@babel/plugin-transform-private-property-in-object";
import proposalUnicodePropertyRegex from "@babel/plugin-transform-unicode-property-regex";
import transformAsyncToGenerator from "@babel/plugin-transform-async-to-generator";
import transformArrowFunctions from "@babel/plugin-transform-arrow-functions";
import transformBlockScopedFunctions from "@babel/plugin-transform-block-scoped-functions";
import transformBlockScoping from "@babel/plugin-transform-block-scoping";
import transformClasses from "@babel/plugin-transform-classes";
import transformComputedProperties from "@babel/plugin-transform-computed-properties";
import transformDestructuring from "@babel/plugin-transform-destructuring";
import transformDotallRegex from "@babel/plugin-transform-dotall-regex";
import transformDuplicateKeys from "@babel/plugin-transform-duplicate-keys";
import transformExponentialOperator from "@babel/plugin-transform-exponentiation-operator";
import transformForOf from "@babel/plugin-transform-for-of";
import transformFunctionName from "@babel/plugin-transform-function-name";
import transformLiterals from "@babel/plugin-transform-literals";
import transformMemberExpressionLiterals from "@babel/plugin-transform-member-expression-literals";
import transformModulesAmd from "@babel/plugin-transform-modules-amd";
import transformModulesCommonjs from "@babel/plugin-transform-modules-commonjs";
import transformModulesSystemjs from "@babel/plugin-transform-modules-systemjs";
import transformModulesUmd from "@babel/plugin-transform-modules-umd";
import transformNamedCapturingGroupsRegex from "@babel/plugin-transform-named-capturing-groups-regex";
import transformNewTarget from "@babel/plugin-transform-new-target";
import transformObjectSuper from "@babel/plugin-transform-object-super";
import transformParameters from "@babel/plugin-transform-parameters";
import transformPropertyLiterals from "@babel/plugin-transform-property-literals";
import transformRegenerator from "@babel/plugin-transform-regenerator";
import transformReservedWords from "@babel/plugin-transform-reserved-words";
import transformShorthandProperties from "@babel/plugin-transform-shorthand-properties";
import transformSpread from "@babel/plugin-transform-spread";
import transformStickyRegex from "@babel/plugin-transform-sticky-regex";
import transformTemplateLiterals from "@babel/plugin-transform-template-literals";
import transformTypeofSymbol from "@babel/plugin-transform-typeof-symbol";
import transformUnicodeEscapes from "@babel/plugin-transform-unicode-escapes";
import transformUnicodeRegex from "@babel/plugin-transform-unicode-regex";
import transformUnicodeSetsRegex from "@babel/plugin-transform-unicode-sets-regex";

import bugfixAsyncArrowsInClass from "@babel/preset-modules/lib/plugins/transform-async-arrows-in-class/index.js";
import bugfixEdgeDefaultParameters from "@babel/preset-modules/lib/plugins/transform-edge-default-parameters/index.js";
import bugfixEdgeFunctionName from "@babel/preset-modules/lib/plugins/transform-edge-function-name/index.js";
import bugfixTaggedTemplateCaching from "@babel/preset-modules/lib/plugins/transform-tagged-template-caching/index.js";
import bugfixSafariBlockShadowing from "@babel/preset-modules/lib/plugins/transform-safari-block-shadowing/index.js";
import bugfixSafariForShadowing from "@babel/preset-modules/lib/plugins/transform-safari-for-shadowing/index.js";
import bugfixSafariIdDestructuringCollisionInFunctionExpression from "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression";
import bugfixV8SpreadParametersInOptionalChaining from "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining";
import bugfixV8StaticClassFieldsRedefineReadonly from "@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly";

export { availablePlugins as default };
const availablePlugins = {
  "bugfix/transform-async-arrows-in-class": () => bugfixAsyncArrowsInClass,
  "bugfix/transform-edge-default-parameters": () => bugfixEdgeDefaultParameters,
  "bugfix/transform-edge-function-name": () => bugfixEdgeFunctionName,
  "bugfix/transform-safari-block-shadowing": () => bugfixSafariBlockShadowing,
  "bugfix/transform-safari-for-shadowing": () => bugfixSafariForShadowing,
  "bugfix/transform-safari-id-destructuring-collision-in-function-expression":
    () => bugfixSafariIdDestructuringCollisionInFunctionExpression,
  "bugfix/transform-tagged-template-caching": () => bugfixTaggedTemplateCaching,
  "bugfix/transform-v8-spread-parameters-in-optional-chaining": () =>
    bugfixV8SpreadParametersInOptionalChaining,
  "bugfix/transform-v8-static-class-fields-redefine-readonly": () =>
    bugfixV8StaticClassFieldsRedefineReadonly,
  "syntax-import-assertions": () => syntaxImportAssertions,
  "syntax-import-attributes": () => syntaxImportAttributes,
  "transform-arrow-functions": () => transformArrowFunctions,
  "transform-async-generator-functions": () => proposalAsyncGeneratorFunctions,
  "transform-async-to-generator": () => transformAsyncToGenerator,
  "transform-block-scoped-functions": () => transformBlockScopedFunctions,
  "transform-block-scoping": () => transformBlockScoping,
  "transform-class-properties": () => proposalClassProperties,
  "transform-class-static-block": () => proposalClassStaticBlock,
  "transform-classes": () => transformClasses,
  "transform-computed-properties": () => transformComputedProperties,
  "transform-destructuring": () => transformDestructuring,
  "transform-dotall-regex": () => transformDotallRegex,
  "transform-duplicate-keys": () => transformDuplicateKeys,
  "transform-dynamic-import": () => proposalDynamicImport,
  "transform-exponentiation-operator": () => transformExponentialOperator,
  "transform-export-namespace-from": () => proposalExportNamespaceFrom,
  "transform-for-of": () => transformForOf,
  "transform-function-name": () => transformFunctionName,
  "transform-json-strings": () => proposalJsonStrings,
  "transform-literals": () => transformLiterals,
  "transform-logical-assignment-operators": () =>
    proposalLogicalAssignmentOperators,
  "transform-member-expression-literals": () =>
    transformMemberExpressionLiterals,
  "transform-modules-amd": () => transformModulesAmd,
  "transform-modules-commonjs": () => transformModulesCommonjs,
  "transform-modules-systemjs": () => transformModulesSystemjs,
  "transform-modules-umd": () => transformModulesUmd,
  "transform-named-capturing-groups-regex": () =>
    transformNamedCapturingGroupsRegex,
  "transform-new-target": () => transformNewTarget,
  "transform-nullish-coalescing-operator": () =>
    proposalNullishCoalescingOperator,
  "transform-numeric-separator": () => proposalNumericSeparator,
  "transform-object-rest-spread": () => proposalObjectRestSpread,
  "transform-object-super": () => transformObjectSuper,
  "transform-optional-catch-binding": () => proposalOptionalCatchBinding,
  "transform-optional-chaining": () => proposalOptionalChaining,
  "transform-parameters": () => transformParameters,
  "transform-private-methods": () => proposalPrivateMethods,
  "transform-private-property-in-object": () => proposalPrivatePropertyInObject,
  "transform-property-literals": () => transformPropertyLiterals,
  "transform-regenerator": () => transformRegenerator,
  "transform-reserved-words": () => transformReservedWords,
  "transform-shorthand-properties": () => transformShorthandProperties,
  "transform-spread": () => transformSpread,
  "transform-sticky-regex": () => transformStickyRegex,
  "transform-template-literals": () => transformTemplateLiterals,
  "transform-typeof-symbol": () => transformTypeofSymbol,
  "transform-unicode-escapes": () => transformUnicodeEscapes,
  "transform-unicode-property-regex": () => proposalUnicodePropertyRegex,
  "transform-unicode-regex": () => transformUnicodeRegex,
  "transform-unicode-sets-regex": () => transformUnicodeSetsRegex,
};

export const minVersions = {};

if (!process.env.BABEL_8_BREAKING) {
  /* eslint-disable no-restricted-globals */

  Object.assign(minVersions, {
    "bugfix/transform-safari-id-destructuring-collision-in-function-expression":
      "7.16.0",
    "bugfix/transform-v8-static-class-fields-redefine-readonly": "7.12.0",
    "syntax-import-attributes": "7.22.0",
    "transform-class-static-block": "7.12.0",
    "transform-private-property-in-object": "7.10.0",
  });

  // We cannot use the require call in ESM and when bundling.
  // Babel standalone uses a modern parser, so just include a noop plugin.
  // Use `bind` so that it's not detected as a duplicate plugin when using it.

  // This is a factory to create a function that returns a no-op plugn
  const e = () => () => () => ({});

  Object.assign(availablePlugins, {
    "syntax-async-generators":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-async-generators"),
    "syntax-class-properties":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-class-properties"),
    "syntax-class-static-block":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-class-static-block"),
    "syntax-dynamic-import":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-dynamic-import"),
    "syntax-export-namespace-from":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-export-namespace-from"),
    "syntax-import-meta":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-import-meta"),
    "syntax-json-strings":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-json-strings"),
    "syntax-logical-assignment-operators":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-logical-assignment-operators"),
    "syntax-nullish-coalescing-operator":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-nullish-coalescing-operator"),
    "syntax-numeric-separator":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-numeric-separator"),
    "syntax-object-rest-spread":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-object-rest-spread"),
    "syntax-optional-catch-binding":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-optional-catch-binding"),
    "syntax-optional-chaining":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-optional-chaining"),
    "syntax-private-property-in-object":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-private-property-in-object"),
    "syntax-top-level-await":
      USE_ESM || IS_STANDALONE
        ? e()
        : () => require("@babel/plugin-syntax-top-level-await"),
  });

  // This is a CJS plugin that depends on a package from the monorepo, so it
  // breaks using ESM. Given that ESM builds are new enough to have this
  // syntax enabled by default, we can safely skip enabling it.
  if (!USE_ESM) {
    // @ts-expect-error unknown key
    availablePlugins["unicode-sets-regex"] = IS_STANDALONE
      ? e()
      : () => require("@babel/plugin-syntax-unicode-sets-regex");
  }
}
