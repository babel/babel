/* eslint sort-keys: "error" */

import syntaxAsyncGenerators from "@babel/plugin-syntax-async-generators";
import syntaxClassProperties from "@babel/plugin-syntax-class-properties";
import syntaxClassStaticBlock from "@babel/plugin-syntax-class-static-block";
import syntaxDynamicImport from "@babel/plugin-syntax-dynamic-import";
import syntaxExportNamespaceFrom from "@babel/plugin-syntax-export-namespace-from";
import syntaxImportAssertions from "@babel/plugin-syntax-import-assertions";
import syntaxJsonStrings from "@babel/plugin-syntax-json-strings";
import syntaxLogicalAssignmentOperators from "@babel/plugin-syntax-logical-assignment-operators";
import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";
import syntaxNumericSeparator from "@babel/plugin-syntax-numeric-separator";
import syntaxObjectRestSpread from "@babel/plugin-syntax-object-rest-spread";
import syntaxOptionalCatchBinding from "@babel/plugin-syntax-optional-catch-binding";
import syntaxOptionalChaining from "@babel/plugin-syntax-optional-chaining";
import syntaxPrivatePropertyInObject from "@babel/plugin-syntax-private-property-in-object";
import syntaxTopLevelAwait from "@babel/plugin-syntax-top-level-await";
import proposalAsyncGeneratorFunctions from "@babel/plugin-proposal-async-generator-functions";
import proposalClassProperties from "@babel/plugin-proposal-class-properties";
import proposalClassStaticBlock from "@babel/plugin-proposal-class-static-block";
import proposalDynamicImport from "@babel/plugin-proposal-dynamic-import";
import proposalExportNamespaceFrom from "@babel/plugin-proposal-export-namespace-from";
import proposalJsonStrings from "@babel/plugin-proposal-json-strings";
import proposalLogicalAssignmentOperators from "@babel/plugin-proposal-logical-assignment-operators";
import proposalNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";
import proposalNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import proposalObjectRestSpread from "@babel/plugin-proposal-object-rest-spread";
import proposalOptionalCatchBinding from "@babel/plugin-proposal-optional-catch-binding";
import proposalOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import proposalPrivateMethods from "@babel/plugin-proposal-private-methods";
import proposalPrivatePropertyInObject from "@babel/plugin-proposal-private-property-in-object";
import proposalUnicodePropertyRegex from "@babel/plugin-proposal-unicode-property-regex";
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

import bugfixAsyncArrowsInClass from "@babel/preset-modules/lib/plugins/transform-async-arrows-in-class";
import bugfixEdgeDefaultParameters from "@babel/preset-modules/lib/plugins/transform-edge-default-parameters";
import bugfixEdgeFunctionName from "@babel/preset-modules/lib/plugins/transform-edge-function-name";
import bugfixTaggedTemplateCaching from "@babel/preset-modules/lib/plugins/transform-tagged-template-caching";
import bugfixSafariBlockShadowing from "@babel/preset-modules/lib/plugins/transform-safari-block-shadowing";
import bugfixSafariForShadowing from "@babel/preset-modules/lib/plugins/transform-safari-for-shadowing";
import bugfixSafariIdDestructuringCollisionInFunctionExpression from "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression";
import bugfixV8SpreadParametersInOptionalChaining from "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining";

export default {
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
  "syntax-async-generators": () => syntaxAsyncGenerators,
  "syntax-class-properties": () => syntaxClassProperties,
  "syntax-class-static-block": () => syntaxClassStaticBlock,
  "syntax-dynamic-import": () => syntaxDynamicImport,
  "syntax-export-namespace-from": () => syntaxExportNamespaceFrom,
  "syntax-import-assertions": () => syntaxImportAssertions,
  "syntax-json-strings": () => syntaxJsonStrings,
  "syntax-logical-assignment-operators": () => syntaxLogicalAssignmentOperators,
  "syntax-nullish-coalescing-operator": () => syntaxNullishCoalescingOperator,
  "syntax-numeric-separator": () => syntaxNumericSeparator,
  "syntax-object-rest-spread": () => syntaxObjectRestSpread,
  "syntax-optional-catch-binding": () => syntaxOptionalCatchBinding,
  "syntax-optional-chaining": () => syntaxOptionalChaining,
  "syntax-private-property-in-object": () => syntaxPrivatePropertyInObject,
  "syntax-top-level-await": () => syntaxTopLevelAwait,
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
};

export const minVersions = {
  "bugfix/transform-safari-id-destructuring-collision-in-function-expression":
    "7.16.0",
  "transform-class-static-block": "7.12.0",
  "transform-private-property-in-object": "7.10.0",
};
