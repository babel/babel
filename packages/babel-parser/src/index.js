// @flow

import { load } from "::build-tool::";

import type { Options } from "./options";
import {
  hasPlugin,
  validatePlugins,
  mixinPluginNames,
  type PluginList,
} from "./plugin-utils";

export { types as tokTypes } from "./util/token-types";

import type { Expression, File } from "./types";

export function parse(input: string, options?: Options): File {
  if (options && options.sourceType === "unambiguous") {
    options = {
      ...options,
    };
    try {
      options.sourceType = "module";
      const parser = getParser(options);
      const ast = parser.parse(options, input);

      // Rather than try to parse as a script first, we opt to parse as a module and convert back
      // to a script where possible to avoid having to do a full re-parse of the input content.
      if (!parser.sawUnambiguousESM) ast.program.sourceType = "script";
      return ast;
    } catch (moduleError) {
      try {
        options.sourceType = "script";
        return getParser(options).parse(options, input);
      } catch (scriptError) {}

      throw moduleError;
    }
  } else {
    return getParser(options).parse(options, input);
  }
}

export function parseExpression(input: string, options?: Options): Expression {
  return getParser(options).getExpression(options, input);
}

function getParser(options?: Options) {
  const plugins = (options && options.plugins) || [];
  validatePlugins(plugins);

  const pluginList = mixinPluginNames.filter(name => hasPlugin(plugins, name));

  const key = pluginList.join("/");
  let parser = parserCache[key];
  if (!parser) {
    parser = createParser(plugins);
    parserCache[key] = parser;
  }
  return parser;
}

const parserCache: { [key: string]: any } = {};

function createParser(plugins: PluginList) {
  load("./tokenizer/entry.js");

  const parser = load("./parser/entry.js");

  // NOTE: order is important. estree must come first; placeholders must come last.

  if (hasPlugin(plugins, "estree")) {
    load("./plugins/estree.js");
  }

  if (hasPlugin(plugins, "jsx")) {
    load("./plugins/jsx/index.js");
  }

  if (hasPlugin(plugins, "flow")) {
    load("./plugins/flow.js");
  } else if (hasPlugin(plugins, "typescript")) {
    load("./plugins/typescript.js");
  }

  if (hasPlugin(plugins, "placeholders")) {
    load("./plugins/placeholders.js");
  }

  return parser;
}
