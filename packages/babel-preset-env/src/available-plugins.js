// @flow
/* eslint sort-keys: "error" */

import syntaxAsyncGenerators from "@babel/plugin-syntax-async-generators";
import syntaxDynamicImport from "@babel/plugin-syntax-dynamic-import";
import syntaxJsonStrings from "@babel/plugin-syntax-json-strings";
import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";
import syntaxNumericSeparator from "@babel/plugin-syntax-numeric-separator";
import syntaxObjectRestSpread from "@babel/plugin-syntax-object-rest-spread";
import syntaxOptionalCatchBinding from "@babel/plugin-syntax-optional-catch-binding";
import syntaxOptionalChaining from "@babel/plugin-syntax-optional-chaining";
import syntaxTopLevelAwait from "@babel/plugin-syntax-top-level-await";
import proposalAsyncGeneratorFunctions from "@babel/plugin-proposal-async-generator-functions";
import proposalDynamicImport from "@babel/plugin-proposal-dynamic-import";
import proposalJsonStrings from "@babel/plugin-proposal-json-strings";
import proposalNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";
import proposalNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import proposalObjectRestSpread from "@babel/plugin-proposal-object-rest-spread";
import proposalOptionalCatchBinding from "@babel/plugin-proposal-optional-catch-binding";
import proposalOptionalChaining from "@babel/plugin-proposal-optional-chaining";
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
import transformUnicodeRegex from "@babel/plugin-transform-unicode-regex";

export default {
  "proposal-async-generator-functions": proposalAsyncGeneratorFunctions,
  "proposal-dynamic-import": proposalDynamicImport,
  "proposal-json-strings": proposalJsonStrings,
  "proposal-nullish-coalescing-operator": proposalNullishCoalescingOperator,
  "proposal-object-rest-spread": proposalObjectRestSpread,
  "proposal-optional-catch-binding": proposalOptionalCatchBinding,
  "proposal-optional-chaining": proposalOptionalChaining,
  "proposal-unicode-property-regex": proposalUnicodePropertyRegex,
  "syntax-async-generators": syntaxAsyncGenerators,
  "syntax-dynamic-import": syntaxDynamicImport,
  "syntax-json-strings": syntaxJsonStrings,
  "syntax-nullish-coalescing-operator": syntaxNullishCoalescingOperator,
  "syntax-numeric-separator": syntaxNumericSeparator,
  "syntax-object-rest-spread": syntaxObjectRestSpread,
  "syntax-optional-catch-binding": syntaxOptionalCatchBinding,
  "syntax-optional-chaining": syntaxOptionalChaining,
  "syntax-top-level-await": syntaxTopLevelAwait,
  "transform-arrow-functions": transformArrowFunctions,
  "transform-async-to-generator": transformAsyncToGenerator,
  "transform-block-scoped-functions": transformBlockScopedFunctions,
  "transform-block-scoping": transformBlockScoping,
  "transform-classes": transformClasses,
  "transform-computed-properties": transformComputedProperties,
  "transform-destructuring": transformDestructuring,
  "transform-dotall-regex": transformDotallRegex,
  "transform-duplicate-keys": transformDuplicateKeys,
  "transform-exponentiation-operator": transformExponentialOperator,
  "transform-for-of": transformForOf,
  "transform-function-name": transformFunctionName,
  "transform-literals": transformLiterals,
  "transform-member-expression-literals": transformMemberExpressionLiterals,
  "transform-modules-amd": transformModulesAmd,
  "transform-modules-commonjs": transformModulesCommonjs,
  "transform-modules-systemjs": transformModulesSystemjs,
  "transform-modules-umd": transformModulesUmd,
  "transform-named-capturing-groups-regex": transformNamedCapturingGroupsRegex,
  "transform-new-target": transformNewTarget,
  "transform-object-super": transformObjectSuper,
  "transform-parameters": transformParameters,
  "transform-property-literals": transformPropertyLiterals,
  "transform-regenerator": transformRegenerator,
  "transform-reserved-words": transformReservedWords,
  "transform-shorthand-properties": transformShorthandProperties,
  "transform-spread": transformSpread,
  "transform-sticky-regex": transformStickyRegex,
  "transform-template-literals": transformTemplateLiterals,
  "transform-typeof-symbol": transformTypeofSymbol,
  "transform-unicode-regex": transformUnicodeRegex,
  "proposal-numeric-separator": proposalNumericSeparator,
};
