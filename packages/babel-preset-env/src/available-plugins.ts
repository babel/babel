/* eslint sort-keys: "error" */
/* eslint-disable @typescript-eslint/no-use-before-define */

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

import semver from "semver";

const hasOwn: <O extends object>(obj: O, key: PropertyKey) => key is keyof O =
  Function.call.bind(Object.prototype.hasOwnProperty) as any;

// Different shapes of plugins
type External = () =>
  | typeof transformArrowFunctions
  | typeof bugfixAsyncArrowsInClass
  | typeof transformModulesCommonjs;

type Desc = {
  external: External;
  externalMinVersion?: string;
  internal?: boolean;
  internalMinVersion?: string;
};

export function getMinVersion(plugin: string): string | null {
  if (!hasOwn(plugins, plugin)) return null;
  const desc: Desc | External = plugins[plugin] as any;
  if (typeof desc === "function") return null;
  return desc.externalMinVersion ?? null;
}

export function hasPlugin(plugin: string): plugin is keyof typeof plugins {
  return hasOwn(plugins, plugin);
}

export function getPlugin(name: string, version?: string) {
  if (!hasOwn(plugins, name)) {
    throw new Error(
      `Could not find plugin "${name}". Ensure there is an entry in ./available-plugins.js for it.`,
    );
  }

  const desc: Desc =
    typeof plugins[name] === "function"
      ? { external: plugins[name] as External }
      : (plugins[name] as Desc);

  if (
    desc.internal !== false &&
    semver.gte(version, desc.internalMinVersion ?? "7.19.0")
  ) {
    return `internal:${name}`;
  }

  if (
    desc.external &&
    (!desc.externalMinVersion || semver.gte(version, desc.externalMinVersion))
  ) {
    return desc.external();
  }

  return null;
}

export { plugins as default };

function extOnly(fn: External): Desc {
  return { external: fn, internal: false };
}

const plugins = {
  "bugfix-async-arrows-in-class": extOnly(() => bugfixAsyncArrowsInClass),
  "bugfix-edge-default-parameters": extOnly(() => bugfixEdgeDefaultParameters),
  "bugfix-edge-function-name": extOnly(() => bugfixEdgeFunctionName),
  "bugfix-safari-block-shadowing": extOnly(() => bugfixSafariBlockShadowing),
  "bugfix-safari-for-shadowing": extOnly(() => bugfixSafariForShadowing),
  "bugfix-safari-id-destructuring-collision-in-function-expression": {
    external: () => bugfixSafariIdDestructuringCollisionInFunctionExpression,
    externalMinVersion: "7.16.0",
  },
  "bugfix-tagged-template-caching": extOnly(() => bugfixTaggedTemplateCaching),
  "bugfix-v8-spread-parameters-in-optional-chaining": () =>
    bugfixV8SpreadParametersInOptionalChaining,
  "syntax-async-generators": extOnly(() => syntaxAsyncGenerators),
  "syntax-class-properties": extOnly(() => syntaxClassProperties),
  "syntax-class-static-block": extOnly(() => syntaxClassStaticBlock),
  "syntax-dynamic-import": extOnly(() => syntaxDynamicImport),
  "syntax-export-namespace-from": extOnly(() => syntaxExportNamespaceFrom),
  "syntax-import-assertions": extOnly(() => syntaxImportAssertions),
  "syntax-json-strings": extOnly(() => syntaxJsonStrings),
  "syntax-logical-assignment-operators": extOnly(
    () => syntaxLogicalAssignmentOperators,
  ),
  "syntax-nullish-coalescing-operator": extOnly(
    () => syntaxNullishCoalescingOperator,
  ),
  "syntax-numeric-separator": extOnly(() => syntaxNumericSeparator),
  "syntax-object-rest-spread": extOnly(() => syntaxObjectRestSpread),
  "syntax-optional-catch-binding": extOnly(() => syntaxOptionalCatchBinding),
  "syntax-optional-chaining": extOnly(() => syntaxOptionalChaining),
  "syntax-private-property-in-object": extOnly(
    () => syntaxPrivatePropertyInObject,
  ),
  "syntax-top-level-await": extOnly(() => syntaxTopLevelAwait),
  "transform-arrow-functions": () => transformArrowFunctions,
  "transform-async-generator-functions": () => proposalAsyncGeneratorFunctions,
  "transform-async-to-generator": () => transformAsyncToGenerator,
  "transform-block-scoped-functions": () => transformBlockScopedFunctions,
  "transform-block-scoping": () => transformBlockScoping,
  "transform-class-properties": () => proposalClassProperties,
  "transform-class-static-block": {
    external: () => proposalClassStaticBlock,
    externalMinVersion: "7.12.0",
  },
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
  "transform-modules-amd": extOnly(() => transformModulesAmd),
  "transform-modules-commonjs": extOnly(() => transformModulesCommonjs),
  "transform-modules-systemjs": extOnly(() => transformModulesSystemjs),
  "transform-modules-umd": extOnly(() => transformModulesUmd),
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
  "transform-private-property-in-object": {
    external: () => proposalPrivatePropertyInObject,
    externalMinVersion: "7.10.0",
  },
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
} as const;
