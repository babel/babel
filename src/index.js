import { Parser, plugins } from "./state";
import { getOptions } from "./options";
import "./parseutil";
import "./statement";
import "./lval";
import "./expression";
import "./node";
import "./location";
import "./lookahead";
import { types as tokTypes } from "./tokentype";
import "./tokenize";
import "./tokencontext";
import "./comments";
import flowPlugin from "./plugins/flow";
import jsxPlugin from "./plugins/jsx";

plugins.flow = flowPlugin;
plugins.jsx = jsxPlugin;

export function parse(input, options) {
  return new Parser(getOptions(options), input).parse();
}

export { tokTypes };
