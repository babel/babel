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

// Token-specific context update code
// Note that we should avoid accessing `this.prodParam` in context update,
// because it is executed immediately when last token is consumed, which may be
// before `this.prodParam` is updated. e.g.
// ```
// function *g() { () => yield / 2 }
// ```
// When `=>` is eaten, the context update of `yield` is executed, however,
// `this.prodParam` still has `[Yield]` production because it is not yet updated

tt.braceR.updateContext = context => {
  context.pop();
};

// we don't need to update context for tt.braceBarL because we do not pop context for tt.braceBarR
// ideally only dollarBraceL "${" needs a non-template context
// in order to indicate that the last "`" in `${`" starts a new string template
// inside a template element within outer string template.
// but when we popped such context in `}`, we lost track of whether this
// `}` matches a `${` or other tokens matching `}`, so we have to push
// such context in every token that `}` will match.
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
