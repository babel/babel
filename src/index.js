import Parser, { plugins } from "./parser";
import "./parser/util";
import "./parser/statement";
import "./parser/lval";
import "./parser/expression";
import "./parser/node";
import "./parser/location";
import "./parser/comments";

import { types as tokTypes } from "./tokenizer/types";
import "./tokenizer";
import "./tokenizer/context";

import estreePlugin from "./plugins/estree";
import flowPlugin from "./plugins/flow";
import jsxPlugin from "./plugins/jsx";
plugins.estree = estreePlugin;
plugins.flow = flowPlugin;
plugins.jsx = jsxPlugin;

export function parse(input, options) {
  return getParser(options, input).parse();
}

export function parseExpression(input, options) {
  const parser = getParser(options, input);
  if (parser.options.strictMode) {
    parser.state.strict = true;
  }
  return parser.getExpression();
}


export { tokTypes };

function getParser(options, input) {
  const cls = options && options.plugins ? getParserClass(options.plugins) : Parser;
  return new cls(options, input);
}

const parserClassCache = {};

/** Get a Parser class with plugins applied. */
function getParserClass(pluginsFromOptions) {
  // Filter out just the plugins that have an actual mixin associated with them.
  let pluginList = pluginsFromOptions.filter((p) => p === "estree" || p === "flow" || p === "jsx");

  if (pluginList.indexOf("flow") >= 0) {
    // ensure flow plugin loads last
    pluginList = pluginList.filter((plugin) => plugin !== "flow");
    pluginList.push("flow");
  }

  if (pluginList.indexOf("estree") >= 0) {
    // ensure estree plugin loads first
    pluginList = pluginList.filter((plugin) => plugin !== "estree");
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
