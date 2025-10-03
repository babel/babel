/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'yarn gulp generate-standalone'
 */
import makeNoopPlugin from "../make-noop-plugin.ts";
import externalHelpers from "@babel/plugin-external-helpers";
import syntaxDecimal from "@babel/plugin-syntax-decimal";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import syntaxDestructuringPrivate from "@babel/plugin-syntax-destructuring-private";
import syntaxDoExpressions from "@babel/plugin-syntax-do-expressions";
import syntaxExplicitResourceManagement from "@babel/plugin-syntax-explicit-resource-management";
import syntaxExportDefaultFrom from "@babel/plugin-syntax-export-default-from";
import syntaxFlow from "@babel/plugin-syntax-flow";
import syntaxFunctionBind from "@babel/plugin-syntax-function-bind";
import syntaxFunctionSent from "@babel/plugin-syntax-function-sent";
import syntaxImportAssertions from "@babel/plugin-syntax-import-assertions";
import syntaxImportAttributes from "@babel/plugin-syntax-import-attributes";
import syntaxImportReflection from "@babel/plugin-syntax-import-reflection";
import syntaxJsx from "@babel/plugin-syntax-jsx";
import syntaxModuleBlocks from "@babel/plugin-syntax-module-blocks";
import syntaxOptionalChainingAssign from "@babel/plugin-syntax-optional-chaining-assign";
import syntaxPipelineOperator from "@babel/plugin-syntax-pipeline-operator";
import syntaxTypescript from "@babel/plugin-syntax-typescript";
import transformAsyncGeneratorFunctions from "@babel/plugin-transform-async-generator-functions";
import transformClassProperties from "@babel/plugin-transform-class-properties";
import transformClassStaticBlock from "@babel/plugin-transform-class-static-block";
import proposalDecorators from "@babel/plugin-proposal-decorators";
import proposalDestructuringPrivate from "@babel/plugin-proposal-destructuring-private";
import proposalDoExpressions from "@babel/plugin-proposal-do-expressions";
import transformDuplicateNamedCapturingGroupsRegex from "@babel/plugin-transform-duplicate-named-capturing-groups-regex";
import transformDynamicImport from "@babel/plugin-transform-dynamic-import";
import proposalExportDefaultFrom from "@babel/plugin-proposal-export-default-from";
import transformExportNamespaceFrom from "@babel/plugin-transform-export-namespace-from";
import proposalFunctionBind from "@babel/plugin-proposal-function-bind";
import proposalFunctionSent from "@babel/plugin-proposal-function-sent";
import transformJsonStrings from "@babel/plugin-transform-json-strings";
import transformLogicalAssignmentOperators from "@babel/plugin-transform-logical-assignment-operators";
import transformNullishCoalescingOperator from "@babel/plugin-transform-nullish-coalescing-operator";
import transformNumericSeparator from "@babel/plugin-transform-numeric-separator";
import transformObjectRestSpread from "@babel/plugin-transform-object-rest-spread";
import transformOptionalCatchBinding from "@babel/plugin-transform-optional-catch-binding";
import transformOptionalChaining from "@babel/plugin-transform-optional-chaining";
import proposalOptionalChainingAssign from "@babel/plugin-proposal-optional-chaining-assign";
import proposalPipelineOperator from "@babel/plugin-proposal-pipeline-operator";
import transformPrivateMethods from "@babel/plugin-transform-private-methods";
import transformPrivatePropertyInObject from "@babel/plugin-transform-private-property-in-object";
import transformRegexpModifiers from "@babel/plugin-transform-regexp-modifiers";
import proposalThrowExpressions from "@babel/plugin-proposal-throw-expressions";
import transformUnicodePropertyRegex from "@babel/plugin-transform-unicode-property-regex";
import transformUnicodeSetsRegex from "@babel/plugin-transform-unicode-sets-regex";
import transformAsyncToGenerator from "@babel/plugin-transform-async-to-generator";
import transformArrowFunctions from "@babel/plugin-transform-arrow-functions";
import transformBlockScopedFunctions from "@babel/plugin-transform-block-scoped-functions";
import transformBlockScoping from "@babel/plugin-transform-block-scoping";
import transformClasses from "@babel/plugin-transform-classes";
import transformComputedProperties from "@babel/plugin-transform-computed-properties";
import transformDestructuring from "@babel/plugin-transform-destructuring";
import transformDotallRegex from "@babel/plugin-transform-dotall-regex";
import transformDuplicateKeys from "@babel/plugin-transform-duplicate-keys";
import transformExponentiationOperator from "@babel/plugin-transform-exponentiation-operator";
import transformFlowComments from "@babel/plugin-transform-flow-comments";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import transformForOf from "@babel/plugin-transform-for-of";
import transformFunctionName from "@babel/plugin-transform-function-name";
import transformInstanceof from "@babel/plugin-transform-instanceof";
import transformJscript from "@babel/plugin-transform-jscript";
import transformJsonModules from "@babel/plugin-transform-json-modules";
import transformLiterals from "@babel/plugin-transform-literals";
import transformMemberExpressionLiterals from "@babel/plugin-transform-member-expression-literals";
import transformModulesAmd from "@babel/plugin-transform-modules-amd";
import transformModulesCommonjs from "@babel/plugin-transform-modules-commonjs";
import transformModulesSystemjs from "@babel/plugin-transform-modules-systemjs";
import transformModulesUmd from "@babel/plugin-transform-modules-umd";
import transformNamedCapturingGroupsRegex from "@babel/plugin-transform-named-capturing-groups-regex";
import transformNewTarget from "@babel/plugin-transform-new-target";
import transformObjectAssign from "@babel/plugin-transform-object-assign";
import transformObjectSuper from "@babel/plugin-transform-object-super";
import transformObjectSetPrototypeOfToAssign from "@babel/plugin-transform-object-set-prototype-of-to-assign";
import transformParameters from "@babel/plugin-transform-parameters";
import transformPropertyLiterals from "@babel/plugin-transform-property-literals";
import transformPropertyMutators from "@babel/plugin-transform-property-mutators";
import transformProtoToAssign from "@babel/plugin-transform-proto-to-assign";
import transformReactConstantElements from "@babel/plugin-transform-react-constant-elements";
import transformReactDisplayName from "@babel/plugin-transform-react-display-name";
import transformReactInlineElements from "@babel/plugin-transform-react-inline-elements";
import transformReactJsx from "@babel/plugin-transform-react-jsx";
import transformReactJsxCompat from "@babel/plugin-transform-react-jsx-compat";
import transformReactJsxDevelopment from "@babel/plugin-transform-react-jsx-development";
import transformReactJsxSelf from "@babel/plugin-transform-react-jsx-self";
import transformReactJsxSource from "@babel/plugin-transform-react-jsx-source";
import transformRegenerator from "@babel/plugin-transform-regenerator";
import transformReservedWords from "@babel/plugin-transform-reserved-words";
import transformRuntime from "@babel/plugin-transform-runtime";
import transformShorthandProperties from "@babel/plugin-transform-shorthand-properties";
import transformSpread from "@babel/plugin-transform-spread";
import transformStickyRegex from "@babel/plugin-transform-sticky-regex";
import transformStrictMode from "@babel/plugin-transform-strict-mode";
import transformTemplateLiterals from "@babel/plugin-transform-template-literals";
import transformTypeofSymbol from "@babel/plugin-transform-typeof-symbol";
import transformTypescript from "@babel/plugin-transform-typescript";
import transformUnicodeEscapes from "@babel/plugin-transform-unicode-escapes";
import transformUnicodeRegex from "@babel/plugin-transform-unicode-regex";
import transformExplicitResourceManagement from "@babel/plugin-transform-explicit-resource-management";
import proposalImportDefer from "@babel/plugin-proposal-import-defer";
import syntaxRecordAndTuple from "@babel/plugin-syntax-record-and-tuple" with { if: "!process.env.BABEL_8_BREAKING" };
import proposalRecordAndTuple from "@babel/plugin-proposal-record-and-tuple" with { if: "!process.env.BABEL_8_BREAKING" };
export const syntaxAsyncGenerators = makeNoopPlugin(),
  syntaxClassProperties = makeNoopPlugin(),
  syntaxClassStaticBlock = makeNoopPlugin(),
  syntaxImportMeta = makeNoopPlugin(),
  syntaxObjectRestSpread = makeNoopPlugin(),
  syntaxOptionalCatchBinding = makeNoopPlugin(),
  syntaxTopLevelAwait = makeNoopPlugin();
export {
  externalHelpers,
  syntaxDecimal,
  syntaxDecorators,
  syntaxDestructuringPrivate,
  syntaxDoExpressions,
  syntaxExplicitResourceManagement,
  syntaxExportDefaultFrom,
  syntaxFlow,
  syntaxFunctionBind,
  syntaxFunctionSent,
  syntaxImportAssertions,
  syntaxImportAttributes,
  syntaxImportReflection,
  syntaxJsx,
  syntaxModuleBlocks,
  syntaxOptionalChainingAssign,
  syntaxPipelineOperator,
  syntaxTypescript,
  transformAsyncGeneratorFunctions,
  transformClassProperties,
  transformClassStaticBlock,
  proposalDecorators,
  proposalDestructuringPrivate,
  proposalDoExpressions,
  transformDuplicateNamedCapturingGroupsRegex,
  transformDynamicImport,
  proposalExportDefaultFrom,
  transformExportNamespaceFrom,
  proposalFunctionBind,
  proposalFunctionSent,
  transformJsonStrings,
  transformLogicalAssignmentOperators,
  transformNullishCoalescingOperator,
  transformNumericSeparator,
  transformObjectRestSpread,
  transformOptionalCatchBinding,
  transformOptionalChaining,
  proposalOptionalChainingAssign,
  proposalPipelineOperator,
  transformPrivateMethods,
  transformPrivatePropertyInObject,
  transformRegexpModifiers,
  proposalThrowExpressions,
  transformUnicodePropertyRegex,
  transformUnicodeSetsRegex,
  transformAsyncToGenerator,
  transformArrowFunctions,
  transformBlockScopedFunctions,
  transformBlockScoping,
  transformClasses,
  transformComputedProperties,
  transformDestructuring,
  transformDotallRegex,
  transformDuplicateKeys,
  transformExponentiationOperator,
  transformFlowComments,
  transformFlowStripTypes,
  transformForOf,
  transformFunctionName,
  transformInstanceof,
  transformJscript,
  transformJsonModules,
  transformLiterals,
  transformMemberExpressionLiterals,
  transformModulesAmd,
  transformModulesCommonjs,
  transformModulesSystemjs,
  transformModulesUmd,
  transformNamedCapturingGroupsRegex,
  transformNewTarget,
  transformObjectAssign,
  transformObjectSuper,
  transformObjectSetPrototypeOfToAssign,
  transformParameters,
  transformPropertyLiterals,
  transformPropertyMutators,
  transformProtoToAssign,
  transformReactConstantElements,
  transformReactDisplayName,
  transformReactInlineElements,
  transformReactJsx,
  transformReactJsxCompat,
  transformReactJsxDevelopment,
  transformReactJsxSelf,
  transformReactJsxSource,
  transformRegenerator,
  transformReservedWords,
  transformRuntime,
  transformShorthandProperties,
  transformSpread,
  transformStickyRegex,
  transformStrictMode,
  transformTemplateLiterals,
  transformTypeofSymbol,
  transformTypescript,
  transformUnicodeEscapes,
  transformUnicodeRegex,
  transformExplicitResourceManagement,
  proposalImportDefer,
};
export const all: { [k: string]: any } = {
  "syntax-async-generators": syntaxAsyncGenerators,
  "syntax-class-properties": syntaxClassProperties,
  "syntax-class-static-block": syntaxClassStaticBlock,
  "syntax-import-meta": syntaxImportMeta,
  "syntax-object-rest-spread": syntaxObjectRestSpread,
  "syntax-optional-catch-binding": syntaxOptionalCatchBinding,
  "syntax-top-level-await": syntaxTopLevelAwait,
  "external-helpers": externalHelpers,
  "syntax-decimal": syntaxDecimal,
  "syntax-decorators": syntaxDecorators,
  "syntax-destructuring-private": syntaxDestructuringPrivate,
  "syntax-do-expressions": syntaxDoExpressions,
  "syntax-explicit-resource-management": syntaxExplicitResourceManagement,
  "syntax-export-default-from": syntaxExportDefaultFrom,
  "syntax-flow": syntaxFlow,
  "syntax-function-bind": syntaxFunctionBind,
  "syntax-function-sent": syntaxFunctionSent,
  "syntax-import-assertions": syntaxImportAssertions,
  "syntax-import-attributes": syntaxImportAttributes,
  "syntax-import-reflection": syntaxImportReflection,
  "syntax-jsx": syntaxJsx,
  "syntax-module-blocks": syntaxModuleBlocks,
  "syntax-optional-chaining-assign": syntaxOptionalChainingAssign,
  "syntax-pipeline-operator": syntaxPipelineOperator,
  "syntax-typescript": syntaxTypescript,
  "transform-async-generator-functions": transformAsyncGeneratorFunctions,
  "transform-class-properties": transformClassProperties,
  "transform-class-static-block": transformClassStaticBlock,
  "proposal-decorators": proposalDecorators,
  "proposal-destructuring-private": proposalDestructuringPrivate,
  "proposal-do-expressions": proposalDoExpressions,
  "transform-duplicate-named-capturing-groups-regex":
    transformDuplicateNamedCapturingGroupsRegex,
  "transform-dynamic-import": transformDynamicImport,
  "proposal-export-default-from": proposalExportDefaultFrom,
  "transform-export-namespace-from": transformExportNamespaceFrom,
  "proposal-function-bind": proposalFunctionBind,
  "proposal-function-sent": proposalFunctionSent,
  "transform-json-strings": transformJsonStrings,
  "transform-logical-assignment-operators": transformLogicalAssignmentOperators,
  "transform-nullish-coalescing-operator": transformNullishCoalescingOperator,
  "transform-numeric-separator": transformNumericSeparator,
  "transform-object-rest-spread": transformObjectRestSpread,
  "transform-optional-catch-binding": transformOptionalCatchBinding,
  "transform-optional-chaining": transformOptionalChaining,
  "proposal-optional-chaining-assign": proposalOptionalChainingAssign,
  "proposal-pipeline-operator": proposalPipelineOperator,
  "transform-private-methods": transformPrivateMethods,
  "transform-private-property-in-object": transformPrivatePropertyInObject,
  "transform-regexp-modifiers": transformRegexpModifiers,
  "proposal-throw-expressions": proposalThrowExpressions,
  "transform-unicode-property-regex": transformUnicodePropertyRegex,
  "transform-unicode-sets-regex": transformUnicodeSetsRegex,
  "transform-async-to-generator": transformAsyncToGenerator,
  "transform-arrow-functions": transformArrowFunctions,
  "transform-block-scoped-functions": transformBlockScopedFunctions,
  "transform-block-scoping": transformBlockScoping,
  "transform-classes": transformClasses,
  "transform-computed-properties": transformComputedProperties,
  "transform-destructuring": transformDestructuring,
  "transform-dotall-regex": transformDotallRegex,
  "transform-duplicate-keys": transformDuplicateKeys,
  "transform-exponentiation-operator": transformExponentiationOperator,
  "transform-flow-comments": transformFlowComments,
  "transform-flow-strip-types": transformFlowStripTypes,
  "transform-for-of": transformForOf,
  "transform-function-name": transformFunctionName,
  "transform-instanceof": transformInstanceof,
  "transform-jscript": transformJscript,
  "transform-json-modules": transformJsonModules,
  "transform-literals": transformLiterals,
  "transform-member-expression-literals": transformMemberExpressionLiterals,
  "transform-modules-amd": transformModulesAmd,
  "transform-modules-commonjs": transformModulesCommonjs,
  "transform-modules-systemjs": transformModulesSystemjs,
  "transform-modules-umd": transformModulesUmd,
  "transform-named-capturing-groups-regex": transformNamedCapturingGroupsRegex,
  "transform-new-target": transformNewTarget,
  "transform-object-assign": transformObjectAssign,
  "transform-object-super": transformObjectSuper,
  "transform-object-set-prototype-of-to-assign":
    transformObjectSetPrototypeOfToAssign,
  "transform-parameters": transformParameters,
  "transform-property-literals": transformPropertyLiterals,
  "transform-property-mutators": transformPropertyMutators,
  "transform-proto-to-assign": transformProtoToAssign,
  "transform-react-constant-elements": transformReactConstantElements,
  "transform-react-display-name": transformReactDisplayName,
  "transform-react-inline-elements": transformReactInlineElements,
  "transform-react-jsx": transformReactJsx,
  "transform-react-jsx-compat": transformReactJsxCompat,
  "transform-react-jsx-development": transformReactJsxDevelopment,
  "transform-react-jsx-self": transformReactJsxSelf,
  "transform-react-jsx-source": transformReactJsxSource,
  "transform-regenerator": transformRegenerator,
  "transform-reserved-words": transformReservedWords,
  "transform-runtime": transformRuntime,
  "transform-shorthand-properties": transformShorthandProperties,
  "transform-spread": transformSpread,
  "transform-sticky-regex": transformStickyRegex,
  "transform-strict-mode": transformStrictMode,
  "transform-template-literals": transformTemplateLiterals,
  "transform-typeof-symbol": transformTypeofSymbol,
  "transform-typescript": transformTypescript,
  "transform-unicode-escapes": transformUnicodeEscapes,
  "transform-unicode-regex": transformUnicodeRegex,
  "transform-explicit-resource-management": transformExplicitResourceManagement,
  "proposal-import-defer": proposalImportDefer,
};

export { default as syntaxRecordAndTuple } from "@babel/plugin-syntax-record-and-tuple" with { if: "!process.env.BABEL_8_BREAKING" };
if (!process.env.BABEL_8_BREAKING)
  all["syntax-record-and-tuple"] = syntaxRecordAndTuple;
export { default as proposalRecordAndTuple } from "@babel/plugin-proposal-record-and-tuple" with { if: "!process.env.BABEL_8_BREAKING" };
if (!process.env.BABEL_8_BREAKING)
  all["proposal-record-and-tuple"] = proposalRecordAndTuple;
