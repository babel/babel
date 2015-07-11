import { Parser, plugins } from "./state";
import { getOptions } from "./options";
import "./parseutil";
import "./statement";
import "./lval";
import "./expression";
import "./lookahead";
import "./tokentype";
import "./tokencontext";

export { Parser, plugins } from "./state";
export { defaultOptions } from "./options";
export { SourceLocation } from "./location";
export { getLineInfo } from "./location";
export { Node } from "./node";
export { TokenType, types as tokTypes } from "./tokentype";
export { TokContext, types as tokContexts } from "./tokencontext";
export { isIdentifierChar, isIdentifierStart } from "./identifier";
export { Token } from "./tokenize";
export { isNewLine, lineBreak, lineBreakG } from "./whitespace";

import flowPlugin from "./plugins/flow";
import jsxPlugin from "./plugins/jsx";
plugins.flow = flowPlugin;
plugins.jsx = jsxPlugin;

export function parse(input, options) {
  return new Parser(getOptions(options), input).parse();
}
