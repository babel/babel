// @flow

import type { Options } from "./options";
import Parser, { plugins } from "./parser";

import { types as tokTypes } from "./tokenizer/types";
import "./tokenizer/context";

import type { Expression, File } from "./types";

import estreePlugin from "./plugins/estree";
import flowPlugin from "./plugins/flow";
import jsxPlugin from "./plugins/jsx";
import typescriptPlugin from "./plugins/typescript";
plugins.estree = estreePlugin;
plugins.flow = flowPlugin;
plugins.jsx = jsxPlugin;
plugins.typescript = typescriptPlugin;

export function parse(input: string, options?: Options): File {
  if (options && options.sourceType === "unambiguous") {
    options = {
      ...options,
    };
    try {
      options.sourceType = "module";
      const parser = getParser(options, input);
      const ast = parser.parse();

      // Rather than try to parse as a script first, we opt to parse as a module and convert back
      // to a script where possible to avoid having to do a full re-parse of the input content.
      if (!parser.sawUnambiguousESM) ast.program.sourceType = "script";
      return ast;
    } catch (moduleError) {
      try {
        options.sourceType = "script";
        return getParser(options, input).parse();
      } catch (scriptError) {}

      throw moduleError;
    }
  } else {
    return getParser(options, input).parse();
  }
}

export function parseExpression(input: string, options?: Options): Expression {
  const parser = getParser(options, input);
  if (parser.options.strictMode) {
    parser.state.strict = true;
  }
  return parser.getExpression();
}

export { tokTypes };

function getParser(options: ?Options, input: string): Parser {
  const cls =
    options && options.plugins ? getParserClass(options.plugins) : Parser;
  return new cls(options, input);
}

const parserClassCache: { [key: string]: Class<Parser> } = {};

/** Get a Parser class with plugins applied. */
function getParserClass(
  pluginsFromOptions: $ReadOnlyArray<string>,
): Class<Parser> {
  if (
    hasPlugin(pluginsFromOptions, "decorators") &&
    hasPlugin(pluginsFromOptions, "decorators-legacy")
  ) {
    throw new Error(
      "Cannot use decorators and decorators-legacy plugin together",
    );
  }

  // Filter out just the plugins that have an actual mixin associated with them.
  let pluginList = pluginsFromOptions.filter(plugin => {
    const p = getPluginName(plugin);
    return p === "estree" || p === "flow" || p === "jsx" || p === "typescript";
  });

  if (hasPlugin(pluginList, "flow")) {
    // ensure flow plugin loads last
    pluginList = pluginList.filter(p => getPluginName(p) !== "flow");
    pluginList.push("flow");
  }

  if (hasPlugin(pluginList, "flow") && hasPlugin(pluginList, "typescript")) {
    throw new Error("Cannot combine flow and typescript plugins.");
  }

  if (hasPlugin(pluginList, "typescript")) {
    // ensure typescript plugin loads last
    pluginList = pluginList.filter(p => getPluginName(p) !== "typescript");
    pluginList.push("typescript");
  }

  if (hasPlugin(pluginList, "estree")) {
    // ensure estree plugin loads first
    pluginList = pluginList.filter(p => getPluginName(p) !== "estree");
    pluginList.unshift("estree");
  }

  const key = pluginList.join("/");
  let cls = parserClassCache[key];
  if (!cls) {
    cls = Parser;
    for (const plugin of pluginList) {
      cls = plugins[plugin](cls);
    }
    parserClassCache[key] = cls;
  }
  return cls;
}

function getPluginName(plugin) {
  return Array.isArray(plugin) ? plugin[0] : plugin;
}

function hasPlugin(pluginsList, name) {
  return pluginsList.some(plugin => getPluginName(plugin) === name);
}
