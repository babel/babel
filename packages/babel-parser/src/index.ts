import type { Options } from "./options.ts";
import {
  validatePlugins,
  mixinPluginNames,
  mixinPlugins,
} from "./plugin-utils.ts";
export type {
  PluginConfig as ParserPlugin,
  DecoratorsPluginOptions,
  FlowPluginOptions,
  PipelineOperatorPluginOptions,
  RecordAndTuplePluginOptions,
  TypeScriptPluginOptions,
} from "./typings.ts";
import Parser, { type PluginsMap } from "./parser/index.ts";

import type { ExportedTokenType } from "./tokenizer/types.ts";
import {
  getExportedToken,
  tt as internalTokenTypes,
  type InternalTokenTypes,
} from "./tokenizer/types.ts";
export type { Token } from "./tokenizer/index.ts";

// TODO: Rather than type-casting the internal AST definitions to the
// @babel/types one, we should actually unify them.
import type { Expression, File } from "@babel/types";
export type { Expression, File };

export type ParserOptions = Partial<Options>;

export interface ParseError {
  code: string;
  reasonCode: string;
}
export type ParseResult<Result extends File | Expression = File> = Result & {
  errors: null | ParseError[];
};

/**
 * Parse the provided code as an entire ECMAScript program.
 */
export function parse(
  input: string,
  options?: ParserOptions,
): ParseResult<File> {
  if (options?.sourceType === "unambiguous") {
    options = {
      ...options,
    };
    try {
      options.sourceType = "module";
      const parser = getParser(options, input);
      const ast = parser.parse();

      if (parser.sawUnambiguousESM) {
        return ast as unknown as ParseResult<File>;
      }

      if (parser.ambiguousScriptDifferentAst) {
        // Top level await introduces code which can be both a valid script and
        // a valid module, but which produces different ASTs:
        //    await
        //    0
        // can be parsed either as an AwaitExpression, or as two ExpressionStatements.
        try {
          options.sourceType = "script";
          return getParser(
            options,
            input,
          ).parse() as unknown as ParseResult<File>;
        } catch {}
      } else {
        // This is both a valid module and a valid script, but
        // we parse it as a script by default
        ast.program.sourceType = "script";
      }

      return ast as unknown as ParseResult<File>;
    } catch (moduleError) {
      try {
        options.sourceType = "script";
        return getParser(
          options,
          input,
        ).parse() as unknown as ParseResult<File>;
      } catch {}

      throw moduleError;
    }
  } else {
    return getParser(options, input).parse() as unknown as ParseResult<File>;
  }
}

export function parseExpression(
  input: string,
  options?: ParserOptions,
): ParseResult<Expression> {
  const parser = getParser(options, input);
  if (parser.options.strictMode) {
    parser.state.strict = true;
  }
  return parser.getExpression() as unknown as ParseResult<Expression>;
}

function generateExportedTokenTypes(
  internalTokenTypes: InternalTokenTypes,
): Record<string, ExportedTokenType> {
  const tokenTypes: Record<string, ExportedTokenType> = {};
  for (const typeName of Object.keys(
    internalTokenTypes,
  ) as (keyof InternalTokenTypes)[]) {
    tokenTypes[typeName] = getExportedToken(internalTokenTypes[typeName]);
  }
  return tokenTypes;
}

export const tokTypes = generateExportedTokenTypes(internalTokenTypes);

function getParser(options: Options | undefined | null, input: string): Parser {
  let cls = Parser;
  const pluginsMap: PluginsMap = new Map();
  if (options?.plugins) {
    for (const plugin of options.plugins) {
      let name, opts;
      if (typeof plugin === "string") {
        name = plugin;
      } else {
        [name, opts] = plugin;
      }
      if (!pluginsMap.has(name)) {
        pluginsMap.set(name, opts || {});
      }
    }
    validatePlugins(pluginsMap);
    cls = getParserClass(pluginsMap);
  }

  return new cls(options, input, pluginsMap);
}

const parserClassCache = new Map<string, new (...args: any) => Parser>();

/** Get a Parser class with plugins applied. */
function getParserClass(
  pluginsMap: Map<string, any>,
): new (...args: any) => Parser {
  const pluginList = [];
  for (const name of mixinPluginNames) {
    if (pluginsMap.has(name)) {
      pluginList.push(name);
    }
  }
  const key = pluginList.join("|");
  let cls = parserClassCache.get(key);
  if (!cls) {
    cls = Parser;
    for (const plugin of pluginList) {
      // @ts-expect-error todo(flow->ts)
      cls = mixinPlugins[plugin](cls);
    }
    parserClassCache.set(key, cls);
  }
  return cls;
}
