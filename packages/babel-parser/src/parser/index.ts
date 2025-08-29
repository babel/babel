import type * as N from "../types.ts";
import { getOptions, OptionFlags } from "../options.ts";
import StatementParser from "./statement.ts";
import ScopeHandler from "../util/scope.ts";
import type { ParserOptions } from "@babel/parser";

export type PluginsMap = Map<
  string,
  {
    [x: string]: any;
  }
>;

export default class Parser extends StatementParser {
  // Forward-declaration so typescript plugin can override jsx plugin
  // todo(flow->ts) - this probably can be removed
  // abstract jsxParseOpeningElementAfterName(
  //   node: N.JSXOpeningElement,
  // ): N.JSXOpeningElement;

  constructor(
    options: ParserOptions | undefined | null,
    input: string,
    pluginsMap: PluginsMap,
  ) {
    const normalizedOptions = getOptions(options);
    super(normalizedOptions, input);

    this.options = normalizedOptions;
    this.initializeScopes();
    this.plugins = pluginsMap;
    this.filename = normalizedOptions.sourceFilename;
    this.startIndex = normalizedOptions.startIndex;

    let optionFlags = 0;
    if (normalizedOptions.allowAwaitOutsideFunction) {
      optionFlags |= OptionFlags.AllowAwaitOutsideFunction;
    }
    if (normalizedOptions.allowReturnOutsideFunction) {
      optionFlags |= OptionFlags.AllowReturnOutsideFunction;
    }
    if (normalizedOptions.allowImportExportEverywhere) {
      optionFlags |= OptionFlags.AllowImportExportEverywhere;
    }
    if (normalizedOptions.allowSuperOutsideMethod) {
      optionFlags |= OptionFlags.AllowSuperOutsideMethod;
    }
    if (normalizedOptions.allowUndeclaredExports) {
      optionFlags |= OptionFlags.AllowUndeclaredExports;
    }
    if (normalizedOptions.allowNewTargetOutsideFunction) {
      optionFlags |= OptionFlags.AllowNewTargetOutsideFunction;
    }
    if (normalizedOptions.allowYieldOutsideFunction) {
      optionFlags |= OptionFlags.AllowYieldOutsideFunction;
    }
    if (normalizedOptions.ranges) {
      optionFlags |= OptionFlags.Ranges;
    }
    if (normalizedOptions.tokens) {
      optionFlags |= OptionFlags.Tokens;
    }
    if (normalizedOptions.createImportExpressions) {
      optionFlags |= OptionFlags.CreateImportExpressions;
    }
    if (normalizedOptions.createParenthesizedExpressions) {
      optionFlags |= OptionFlags.CreateParenthesizedExpressions;
    }
    if (normalizedOptions.errorRecovery) {
      optionFlags |= OptionFlags.ErrorRecovery;
    }
    if (normalizedOptions.attachComment) {
      optionFlags |= OptionFlags.AttachComment;
    }
    if (normalizedOptions.annexB) {
      optionFlags |= OptionFlags.AnnexB;
    }

    this.optionFlags = optionFlags;
  }

  // This can be overwritten, for example, by the TypeScript plugin.
  getScopeHandler(): new (...args: any) => ScopeHandler {
    return ScopeHandler;
  }

  parse(): N.File {
    this.enterInitialScopes();
    const file = this.startNode<N.File>();
    const program = this.startNode<N.Program>();
    this.nextToken();
    // @ts-expect-error define later
    file.errors = null;
    this.parseTopLevel(file, program);
    file.errors = this.state.errors;
    file.comments.length = this.state.commentsLen;
    return file as N.File;
  }
}
