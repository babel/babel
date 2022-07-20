export type PluginConfig =
  | "asyncDoExpressions"
  | "asyncGenerators"
  | "bigInt"
  | "classPrivateMethods"
  | "classPrivateProperties"
  | "classProperties"
  | "classStaticBlock" // Enabled by default
  | "decimal"
  | "decorators"
  | "decorators-legacy"
  | "decoratorAutoAccessors"
  | "destructuringPrivate"
  | "doExpressions"
  | "dynamicImport"
  | "estree"
  | "exportDefaultFrom"
  | "exportNamespaceFrom" // deprecated
  | "flow"
  | "flowComments"
  | "functionBind"
  | "functionSent"
  | "importMeta"
  | "jsx"
  | "logicalAssignment"
  | "importAssertions"
  | "moduleBlocks"
  | "moduleStringNames"
  | "nullishCoalescingOperator"
  | "numericSeparator"
  | "objectRestSpread"
  | "optionalCatchBinding"
  | "optionalChaining"
  | "partialApplication"
  | "pipelineOperator"
  | "placeholders"
  | "privateIn" // Enabled by default
  | "regexpUnicodeSets"
  | "throwExpressions"
  | "topLevelAwait"
  | "typescript"
  | "v8intrinsic"
  | ParserPluginWithOptions;

export type ParserPluginWithOptions =
  | ["decorators", DecoratorsPluginOptions]
  | ["pipelineOperator", PipelineOperatorPluginOptions]
  | ["recordAndTuple", RecordAndTuplePluginOptions]
  | ["flow", FlowPluginOptions]
  | ["typescript", TypeScriptPluginOptions];

export interface DecoratorsPluginOptions {
  decoratorsBeforeExport?: boolean;
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
