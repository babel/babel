/* eslint sort-keys: "error" */

import transformAsyncGeneratorFunctions from "@babel/plugin-transform-async-generator-functions";
import transformAsyncToGenerator from "@babel/plugin-transform-async-to-generator";
import transformArrowFunctions from "@babel/plugin-transform-arrow-functions";
import transformBlockScopedFunctions from "@babel/plugin-transform-block-scoped-functions";
import transformBlockScoping from "@babel/plugin-transform-block-scoping";
import transformClasses from "@babel/plugin-transform-classes";
import transformClassProperties from "@babel/plugin-transform-class-properties";
import transformClassStaticBlock from "@babel/plugin-transform-class-static-block";
import transformComputedProperties from "@babel/plugin-transform-computed-properties";
import transformDestructuring from "@babel/plugin-transform-destructuring";
import transformDotallRegex from "@babel/plugin-transform-dotall-regex";
import transformDuplicateKeys from "@babel/plugin-transform-duplicate-keys";
import transformDuplicateNamedCapturingGroupsRegex from "@babel/plugin-transform-duplicate-named-capturing-groups-regex";
import transformDynamicImport from "@babel/plugin-transform-dynamic-import";
import transformExplicitResourceManagement from "@babel/plugin-transform-explicit-resource-management";
import transformExponentialOperator from "@babel/plugin-transform-exponentiation-operator";
import transformExportNamespaceFrom from "@babel/plugin-transform-export-namespace-from";
import transformForOf from "@babel/plugin-transform-for-of";
import transformFunctionName from "@babel/plugin-transform-function-name";
import transformJsonStrings from "@babel/plugin-transform-json-strings";
import transformLiterals from "@babel/plugin-transform-literals";
import transformLogicalAssignmentOperators from "@babel/plugin-transform-logical-assignment-operators";
import transformMemberExpressionLiterals from "@babel/plugin-transform-member-expression-literals";
import transformModulesAmd from "@babel/plugin-transform-modules-amd";
import transformModulesCommonjs from "@babel/plugin-transform-modules-commonjs";
import transformModulesSystemjs from "@babel/plugin-transform-modules-systemjs";
import transformModulesUmd from "@babel/plugin-transform-modules-umd";
import transformNamedCapturingGroupsRegex from "@babel/plugin-transform-named-capturing-groups-regex";
import transformNewTarget from "@babel/plugin-transform-new-target";
import transformNullishCoalescingOperator from "@babel/plugin-transform-nullish-coalescing-operator";
import transformNumericSeparator from "@babel/plugin-transform-numeric-separator";
import transformObjectRestSpread from "@babel/plugin-transform-object-rest-spread";
import transformObjectSuper from "@babel/plugin-transform-object-super";
import transformOptionalCatchBinding from "@babel/plugin-transform-optional-catch-binding";
import transformOptionalChaining from "@babel/plugin-transform-optional-chaining";
import transformParameters from "@babel/plugin-transform-parameters";
import transformPrivateMethods from "@babel/plugin-transform-private-methods";
import transformPrivatePropertyInObject from "@babel/plugin-transform-private-property-in-object";
import transformPropertyLiterals from "@babel/plugin-transform-property-literals";
import transformRegenerator from "@babel/plugin-transform-regenerator";
import transformRegExpModifiers from "@babel/plugin-transform-regexp-modifiers";
import transformReservedWords from "@babel/plugin-transform-reserved-words";
import transformShorthandProperties from "@babel/plugin-transform-shorthand-properties";
import transformSpread from "@babel/plugin-transform-spread";
import transformStickyRegex from "@babel/plugin-transform-sticky-regex";
import transformTemplateLiterals from "@babel/plugin-transform-template-literals";
import transformTypeofSymbol from "@babel/plugin-transform-typeof-symbol";
import transformUnicodeEscapes from "@babel/plugin-transform-unicode-escapes";
import transformUnicodePropertyRegex from "@babel/plugin-transform-unicode-property-regex";
import transformUnicodeRegex from "@babel/plugin-transform-unicode-regex";
import transformUnicodeSetsRegex from "@babel/plugin-transform-unicode-sets-regex";

import bugfixAsyncArrowsInClass from "@babel/preset-modules/lib/plugins/transform-async-arrows-in-class/index.js";
import bugfixEdgeDefaultParameters from "@babel/preset-modules/lib/plugins/transform-edge-default-parameters/index.js";
import bugfixEdgeFunctionName from "@babel/preset-modules/lib/plugins/transform-edge-function-name/index.js";
import bugfixFirefoxClassInComputedKey from "@babel/plugin-bugfix-firefox-class-in-computed-class-key";
import bugfixTaggedTemplateCaching from "@babel/preset-modules/lib/plugins/transform-tagged-template-caching/index.js";
import bugfixSafariBlockShadowing from "@babel/preset-modules/lib/plugins/transform-safari-block-shadowing/index.js";
import bugfixSafariForShadowing from "@babel/preset-modules/lib/plugins/transform-safari-for-shadowing/index.js";
import bugfixSafariIdDestructuringCollisionInFunctionExpression from "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression";
import bugfixSafariClassFieldInitializerScope from "@babel/plugin-bugfix-safari-class-field-initializer-scope";
import bugfixV8SpreadParametersInOptionalChaining from "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining";
import bugfixV8StaticClassFieldsRedefineReadonly from "@babel/plugin-bugfix-v8-static-class-fields-redefine-readonly";

export { availablePlugins as default };
const availablePlugins = {
  "bugfix/transform-async-arrows-in-class": () => bugfixAsyncArrowsInClass,
  "bugfix/transform-edge-default-parameters": () => bugfixEdgeDefaultParameters,
  "bugfix/transform-edge-function-name": () => bugfixEdgeFunctionName,
  "bugfix/transform-firefox-class-in-computed-class-key": () =>
    bugfixFirefoxClassInComputedKey,
  "bugfix/transform-safari-block-shadowing": () => bugfixSafariBlockShadowing,
  "bugfix/transform-safari-class-field-initializer-scope": () =>
    bugfixSafariClassFieldInitializerScope,
  "bugfix/transform-safari-for-shadowing": () => bugfixSafariForShadowing,
  "bugfix/transform-safari-id-destructuring-collision-in-function-expression":
    () => bugfixSafariIdDestructuringCollisionInFunctionExpression,
  "bugfix/transform-tagged-template-caching": () => bugfixTaggedTemplateCaching,
  "bugfix/transform-v8-spread-parameters-in-optional-chaining": () =>
    bugfixV8SpreadParametersInOptionalChaining,
  "bugfix/transform-v8-static-class-fields-redefine-readonly": () =>
    bugfixV8StaticClassFieldsRedefineReadonly,
  "transform-arrow-functions": () => transformArrowFunctions,
  "transform-async-generator-functions": () => transformAsyncGeneratorFunctions,
  "transform-async-to-generator": () => transformAsyncToGenerator,
  "transform-block-scoped-functions": () => transformBlockScopedFunctions,
  "transform-block-scoping": () => transformBlockScoping,
  "transform-class-properties": () => transformClassProperties,
  "transform-class-static-block": () => transformClassStaticBlock,
  "transform-classes": () => transformClasses,
  "transform-computed-properties": () => transformComputedProperties,
  "transform-destructuring": () => transformDestructuring,
  "transform-dotall-regex": () => transformDotallRegex,
  "transform-duplicate-keys": () => transformDuplicateKeys,
  "transform-duplicate-named-capturing-groups-regex": () =>
    transformDuplicateNamedCapturingGroupsRegex,
  "transform-dynamic-import": () => transformDynamicImport,
  "transform-explicit-resource-management": () =>
    transformExplicitResourceManagement,
  "transform-exponentiation-operator": () => transformExponentialOperator,
  "transform-export-namespace-from": () => transformExportNamespaceFrom,
  "transform-for-of": () => transformForOf,
  "transform-function-name": () => transformFunctionName,
  "transform-json-strings": () => transformJsonStrings,
  "transform-literals": () => transformLiterals,
  "transform-logical-assignment-operators": () =>
    transformLogicalAssignmentOperators,
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
    transformNullishCoalescingOperator,
  "transform-numeric-separator": () => transformNumericSeparator,
  "transform-object-rest-spread": () => transformObjectRestSpread,
  "transform-object-super": () => transformObjectSuper,
  "transform-optional-catch-binding": () => transformOptionalCatchBinding,
  "transform-optional-chaining": () => transformOptionalChaining,
  "transform-parameters": () => transformParameters,
  "transform-private-methods": () => transformPrivateMethods,
  "transform-private-property-in-object": () =>
    transformPrivatePropertyInObject,
  "transform-property-literals": () => transformPropertyLiterals,
  "transform-regenerator": () => transformRegenerator,
  "transform-regexp-modifiers": () => transformRegExpModifiers,
  "transform-reserved-words": () => transformReservedWords,
  "transform-shorthand-properties": () => transformShorthandProperties,
  "transform-spread": () => transformSpread,
  "transform-sticky-regex": () => transformStickyRegex,
  "transform-template-literals": () => transformTemplateLiterals,
  "transform-typeof-symbol": () => transformTypeofSymbol,
  "transform-unicode-escapes": () => transformUnicodeEscapes,
  "transform-unicode-property-regex": () => transformUnicodePropertyRegex,
  "transform-unicode-regex": () => transformUnicodeRegex,
  "transform-unicode-sets-regex": () => transformUnicodeSetsRegex,
};

export const minVersions = {};
// TODO(Babel 8): Remove this
export let legacyBabel7SyntaxPlugins: Set<string>;
