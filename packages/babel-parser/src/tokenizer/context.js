// @flow

// The token context is used to track whether the apostrophe "`"
// starts or ends a string template

import { types as tt } from "./types";

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
  tt.braceR.updateContext = context => {
    context.pop();
  };

  tt.braceL.updateContext =
    tt.braceHashL.updateContext =
    tt.dollarBraceL.updateContext =
      context => {
        context.push(types.brace);
      };

  tt.backQuote.updateContext = context => {
    if (context[context.length - 1] === types.template) {
      context.pop();
    } else {
      context.push(types.template);
    }
  };
}
