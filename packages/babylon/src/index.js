import { Parser, plugins } from "./state";
import "./parseutil";
import "./statement";
import "./lval";
import "./expression";
import "./node";
import "./location";
import "./lookahead";
import { types as tokTypes } from "./tokenizer/types";
import "./tokenizer";
import "./tokenizer/context";
import "./comments";
import flowPlugin from "./plugins/flow";
import jsxPlugin from "./plugins/jsx";

plugins.flow = flowPlugin;
plugins.jsx = jsxPlugin;

export function parse(input, options) {
  return new Parser(options, input).parse();
}

export { tokTypes };
