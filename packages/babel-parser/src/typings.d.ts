export type Plugin =
  | "asyncDoExpressions"
  | "decorators"
  | "decorators-legacy"
  | "decoratorAutoAccessors"
  | "deferredImportEvaluation"
  | "destructuringPrivate"
  | "doExpressions"
  | "exportDefaultFrom"
  | "flow"
  | "flowComments"
  | "functionBind"
  | "functionSent"
  | "importMeta"
  | "jsx"
  | "moduleBlocks"
  | "placeholders"
  | "sourcePhaseImports"
  | "throwExpressions"
  | "v8intrinsic"
  | ParserPluginWithOptions[0];

export type ParserPluginWithOptions =
  | ["discardBinding", { syntaxType: "void" }]
  | ["estree", { classFeatures?: boolean }]
  | ["optionalChainingAssign", { version: "2023-07" }]
  | ["partialApplication", PartialApplicationPluginOptions]
  | ["pipelineOperator", PipelineOperatorPluginOptions]
  | ["flow", FlowPluginOptions]
  | ["typescript", TypeScriptPluginOptions];

export type PluginConfig = Plugin | ParserPluginWithOptions;

export type PluginOptions<PluginName extends ParserPluginWithOptions[0]> =
  Extract<ParserPluginWithOptions, [PluginName, any]>[1];

export interface PartialApplicationPluginOptions {
  version: "2018-07";
}

export interface PipelineOperatorPluginOptions {
  proposal: "fsharp" | "hack";
  topicToken?: "%" | "#" | "@@" | "^^" | "^";
}

export interface FlowPluginOptions {
  all?: boolean;
}

export interface TypeScriptPluginOptions {
  dts?: boolean;
  disallowAmbiguousJSXLike?: boolean;
}
