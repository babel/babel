import type * as N from "../types.ts";
import { getOptions } from "../options.ts";
import StatementParser from "./statement.ts";
import ScopeHandler from "../util/scope.ts";
import type { ParserOptions, ParseResult, File } from "@babel/parser";

export type PluginsMap = Map<string, Record<string, any>>;

export default class Parser extends StatementParser {
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
  }

  // This can be overwritten, for example, by the TypeScript plugin.
  getScopeHandler(): new (...args: any) => ScopeHandler {
    return ScopeHandler;
  }

  parse(): ParseResult<File> {
    this.enterInitialScopes();
    const file = this.startNode<N.File>();
    const program = this.startNode<N.Program>();
    this.nextToken();
    // @ts-expect-error "errors" does not exist on type "File"
    file.errors = [];
    const result = this.parseTopLevel(file, program) as ParseResult<File>;
    result.errors = this.state.errors;
    // @ts-expect-error todo: check if comments exist when `options.attachComment` is false
    result.comments.length = this.state.commentsLen;
    return result;
  }
}
