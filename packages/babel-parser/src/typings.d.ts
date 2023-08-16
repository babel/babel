export type Plugin =
  | "asyncDoExpressions"
  | "asyncGenerators"
  | "bigInt"
  | "classPrivateMethods"
  | "classPrivateProperties"
  | "classProperties"
  | "classStaticBlock" // Enabled by default
  | "decimal"
  | "decorators-legacy"
  | "deferredImportEvaluation"
  | "decoratorAutoAccessors"
  | "destructuringPrivate"
  | "doExpressions"
  | "dynamicImport"
  | "explicitResourceManagement"
  | "exportDefaultFrom"
  | "exportNamespaceFrom" // deprecated
  | "flow"
  | "flowComments"
  | "functionBind"
  | "functionSent"
  | "importMeta"
  | "jsx"
  | "logicalAssignment"
  | "importAssertions" // deprecated
  | "importAttributes"
  | "importReflection"
  | "moduleBlocks"
  | "moduleStringNames"
  | "nullishCoalescingOperator"
  | "numericSeparator"
  | "objectRestSpread"
  | "optionalCatchBinding"
  | "optionalChaining"
  | "partialApplication"
  | "placeholders"
  | "privateIn" // Enabled by default
  | "regexpUnicodeSets" // Enabled by default
  | "sourcePhaseImports"
  | "throwExpressions"
  | "topLevelAwait"
  | "v8intrinsic"
  | ParserPluginWithOptions[0];

export type ParserPluginWithOptions =
  | ["decorators", DecoratorsPluginOptions]
  | ["estree", { classFeatures?: boolean }]
  | ["importAttributes", { deprecatedAssertSyntax: boolean }]
  // @deprecated
  | ["moduleAttributes", { version: "may-2020" }]
  | ["pipelineOperator", PipelineOperatorPluginOptions]
  | ["recordAndTuple", RecordAndTuplePluginOptions]
  | ["flow", FlowPluginOptions]
  | ["typescript", TypeScriptPluginOptions];

export type PluginConfig = Plugin | ParserPluginWithOptions;

export type PluginOptions<PluginName extends ParserPluginWithOptions[0]> =
  Extract<ParserPluginWithOptions, [PluginName, any]>[1];

export interface DecoratorsPluginOptions {
  decoratorsBeforeExport?: boolean;
  allowCallParenthesized?: boolean;
}

export interface PipelineOperatorPluginOptions {
  proposal: "minimal" | "fsharp" | "hack" | "smart";
  topicToken?: "%" | "#" | "@@" | "^^" | "^";
}

export interface RecordAndTuplePluginOptions {
  syntaxType: "bar" | "hash";
}

export interface FlowPluginOptions {
  all?: boolean;
  enums?: boolean;
}

export interface TypeScriptPluginOptions {
  dts?: boolean;
  disallowAmbiguousJSXLike?: boolean;
}
