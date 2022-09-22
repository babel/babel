const hasOwn: <O extends object>(obj: O, key: unknown) => key is keyof O =
  Function.call.bind(Object.prototype.hasOwnProperty) as any;

export function getInternal(type: "plugin" | "preset", name: string) {
  const match = name.match(/^internal:transform-(.+)/);
  if (type === "plugin" && match && hasOwn(plugins, match[1])) {
    return plugins[match[1]]();
  }

  return null;
}

import transformArrowFunctions from "@babel/plugin-transform-arrow-functions";
import transformAsyncToGenerator from "@babel/plugin-transform-async-to-generator";
import transformBlockScopedFunctions from "@babel/plugin-transform-block-scoped-functions";
import transformBlockScoping from "@babel/plugin-transform-block-scoping";
import transformClasses from "@babel/plugin-transform-classes";
import transformComputedProperties from "@babel/plugin-transform-computed-properties";
import transformDestructuring from "@babel/plugin-transform-destructuring";
import transformDotallRegex from "@babel/plugin-transform-dotall-regex";
import transformDuplicateKeys from "@babel/plugin-transform-duplicate-keys";
import transformExponentiationOperator from "@babel/plugin-transform-exponentiation-operator";
import transformForOf from "@babel/plugin-transform-for-of";
import transformFunctionName from "@babel/plugin-transform-function-name";
import transformLiterals from "@babel/plugin-transform-literals";
import transformMemberExpressionLiterals from "@babel/plugin-transform-member-expression-literals";
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

// We use functions here so that the `lazy` CJS transform avoids loading the
// plugins until they are needed.
const plugins = {
  "block-scoped-functions": () => transformBlockScopedFunctions,
  "function-name": () => transformFunctionName,
  // Merge these three plugins in a single reserved-words one?
  "member-expression-literals": () => transformMemberExpressionLiterals,
  "property-literals": () => transformPropertyLiterals,
  "reserved-words": () => transformReservedWords,

  // ES2015
  "arrow-functions": () => transformArrowFunctions,
  "block-scoping": () => transformBlockScoping, // RENAME: let-const
  classes: () => transformClasses,
  "computed-properties": () => transformComputedProperties,
  destructuring: () => transformDestructuring,
  "duplicate-keys": () => transformDuplicateKeys,
  "for-of": () => transformForOf,
  literals: () => transformLiterals,
  "new-target": () => transformNewTarget,
  "object-super": () => transformObjectSuper,
  parameters: () => transformParameters,
  regenerator: () => transformRegenerator, // RENAME: generators
  spread: () => transformSpread, // RENAME: array-spread
  "shorthand-properties": () => transformShorthandProperties,
  "sticky-regex": () => transformStickyRegex, // RENAME: regex-sticky
  "template-literals": () => transformTemplateLiterals,
  "typeof-symbol": () => transformTypeofSymbol,
  "unicode-regex": () => transformUnicodeRegex, // RENAME: regex-unicode
  "unicode-escapes": () => transformUnicodeEscapes,

  // ES2016
  "exponentiation-operator": () => transformExponentiationOperator,

  // ES2017
  "async-to-generator": () => transformAsyncToGenerator, // RENAME: async-functions

  // ES2018
  "async-generator-functions": () => proposalAsyncGeneratorFunctions,
  "dotall-regex": () => transformDotallRegex, // RENAME: regex-dotall
  "named-capturing-groups-regex": () => transformNamedCapturingGroupsRegex, // RENAME: regex-...
  "object-rest-spread": () => proposalObjectRestSpread,
  "unicode-property-regex": () => proposalUnicodePropertyRegex, // RENAME: regex-...

  // ES2019
  "json-strings": () => proposalJsonStrings,
  "optional-catch-binding": () => proposalOptionalCatchBinding,

  // ES2020
  "dynamic-import": () => proposalDynamicImport,
  "export-namespace-from": () => proposalExportNamespaceFrom,
  "nullish-coalescing-operator": () => proposalNullishCoalescingOperator,
  "optional-chaining": () => proposalOptionalChaining,

  // ES2021
  "logical-assignment-operators": () => proposalLogicalAssignmentOperators,
  "numeric-separator": () => proposalNumericSeparator, // RENAME: numeric-separators

  // ES2022
  "class-properties": () => proposalClassProperties,
  "class-static-block": () => proposalClassStaticBlock, // RENAME: class-static-blocks
  "private-methods": () => proposalPrivateMethods,
  "private-property-in-object": () => proposalPrivatePropertyInObject,
};
