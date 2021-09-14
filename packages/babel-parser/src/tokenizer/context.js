// @flow

// The token context is used to track whether the apostrophe "`"
// starts or ends a string template

import { types as tt, tokenTypes } from "./types";

export class TokContext {
  constructor(token: string, preserveSpace?: boolean) {
    this.token = token;
    this.preserveSpace = !!preserveSpace;
  }

  token: string;
  preserveSpace: boolean;
}

export const types: {
  [key: string]: TokContext,
} = {
  brace: new TokContext("{"),
  template: new TokContext("`", true),
};

if (!process.env.BABEL_8_BREAKING) {
  tokenTypes[tt.braceR].updateContext = context => {
    context.pop();
  };

  tokenTypes[tt.braceL].updateContext =
    tokenTypes[tt.braceHashL].updateContext =
    tokenTypes[tt.dollarBraceL].updateContext =
      context => {
        context.push(types.brace);
      };

  tokenTypes[tt.backQuote].updateContext = context => {
    if (context[context.length - 1] === types.template) {
      context.pop();
    } else {
      context.push(types.template);
    }
  };
}
