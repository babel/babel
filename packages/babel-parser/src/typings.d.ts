type BABEL_8_BREAKING = boolean;
type IF_BABEL_7<V> = false extends BABEL_8_BREAKING ? V : never;

export type Plugin =
  | "asyncDoExpressions"
  | IF_BABEL_7<"asyncGenerators">
  | IF_BABEL_7<"bigInt">
  | IF_BABEL_7<"classPrivateMethods">
  | IF_BABEL_7<"classPrivateProperties">
  | IF_BABEL_7<"classProperties">
  | IF_BABEL_7<"classStaticBlock">
  | IF_BABEL_7<"decimal">
  | "decorators-legacy"
  | "deferredImportEvaluation"
  | "decoratorAutoAccessors"
  | "destructuringPrivate"
  | "deprecatedImportAssert"
  | "doExpressions"
  | IF_BABEL_7<"dynamicImport">
  | "explicitResourceManagement"
  | "exportDefaultFrom"
  | IF_BABEL_7<"exportNamespaceFrom">
  | "flow"
  | "flowComments"
  | "functionBind"
  | "functionSent"
  | "importMeta"
  | "jsx"
  | IF_BABEL_7<"jsonStrings">
  | IF_BABEL_7<"logicalAssignment">
  | IF_BABEL_7<"importAssertions">
  | IF_BABEL_7<"importReflection">
  | "moduleBlocks"
  | IF_BABEL_7<"moduleStringNames">
  | IF_BABEL_7<"nullishCoalescingOperator">
  | IF_BABEL_7<"numericSeparator">
  | IF_BABEL_7<"objectRestSpread">
  | IF_BABEL_7<"optionalCatchBinding">
  | IF_BABEL_7<"optionalChaining">
  | "partialApplication"
  | "placeholders"
  | IF_BABEL_7<"privateIn">
  | IF_BABEL_7<"regexpUnicodeSets">
  | "sourcePhaseImports"
  | "throwExpressions"
  | IF_BABEL_7<"topLevelAwait">
  | "v8intrinsic"
  | ParserPluginWithOptions[0];

export type ParserPluginWithOptions =
  | ["decorators", DecoratorsPluginOptions]
  | ["discardBinding", { syntaxType: "void" }]
  | ["estree", { classFeatures?: boolean }]
  | IF_BABEL_7<["importAttributes", { deprecatedAssertSyntax: boolean }]>
  | IF_BABEL_7<["moduleAttributes", { version: "may-2020" }]>
  | ["optionalChainingAssign", { version: "2023-07" }]
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
  proposal: BABEL_8_BREAKING extends false
    ? "minimal" | "fsharp" | "hack" | "smart"
    : "fsharp" | "hack";
  topicToken?: "%" | "#" | "@@" | "^^" | "^";
}

export interface RecordAndTuplePluginOptions {
  syntaxType: "bar" | "hash";
}

export type FlowPluginOptions = BABEL_8_BREAKING extends true
  ? {
      all?: boolean;
      enums?: boolean;
    }
  : {
      all?: boolean;
    };

export interface TypeScriptPluginOptions {
  dts?: boolean;
  disallowAmbiguousJSXLike?: boolean;
}
