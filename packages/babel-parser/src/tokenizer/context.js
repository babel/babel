// @flow

// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

import { lineBreak } from "../util/whitespace";

import { types as tt, type TokenType } from "../util/token-types";

import { state, scope, input } from "::build-tool::bindings/parser";
import { braceIsBlock, curContext, readTmplToken } from "./index";

export class TokContext {
  constructor(
    token: string,
    isExpr?: boolean,
    preserveSpace?: boolean,
    override?: ?Function, // Takes a Tokenizer as a this-parameter, and returns void.
  ) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
  }

  token: string;
  isExpr: boolean;
  preserveSpace: boolean;
  override: ?Function;
}

export const types: {
  [key: string]: TokContext,
} = {
  braceStatement: new TokContext("{", false),
  braceExpression: new TokContext("{", true),
  templateQuasi: new TokContext("${", false),
  parenStatement: new TokContext("(", false),
  parenExpression: new TokContext("(", true),
  template: new TokContext("`", true, true, () => readTmplToken()),
  functionExpression: new TokContext("function", true),
  functionStatement: new TokContext("function", false),

  // Used by the jsx plugin
  j_oTag: new TokContext("<tag", false),
  j_cTag: new TokContext("</tag", false),
  j_expr: new TokContext("<tag>...</tag>", true, true),
};

const updaters: Map<TokenType, (prev: TokenType) => void> = new Map();

export function updateContext(type: TokenType, prevType: TokenType): boolean {
  const updater = updaters.get(type);
  if (updater) {
    updater(prevType);
    return true;
  }
  return false;
}

// Token-specific context update code

updaters.set(tt.parenR, function() {
  if (state.context.length === 1) {
    state.exprAllowed = true;
    return;
  }

  let out = state.context.pop();
  if (out === types.braceStatement && curContext().token === "function") {
    out = state.context.pop();
  }

  state.exprAllowed = !out.isExpr;
});
// $FlowIgnore .get's return type is TokenType | void
updaters.set(tt.braceR, updaters.get(tt.parenR));

updaters.set(tt.name, function(prevType) {
  let allowed = false;
  if (prevType !== tt.dot) {
    if (
      (state.value === "of" && !state.exprAllowed) ||
      (state.value === "yield" && scope.inGenerator)
    ) {
      allowed = true;
    }
  }
  state.exprAllowed = allowed;

  if (state.isIterator) {
    state.isIterator = false;
  }
});

updaters.set(tt.braceL, function(prevType) {
  state.context.push(
    braceIsBlock(prevType) ? types.braceStatement : types.braceExpression,
  );
  state.exprAllowed = true;
});

updaters.set(tt.dollarBraceL, function() {
  state.context.push(types.templateQuasi);
  state.exprAllowed = true;
});

updaters.set(tt.parenL, function(prevType) {
  const statementParens =
    prevType === tt._if ||
    prevType === tt._for ||
    prevType === tt._with ||
    prevType === tt._while;
  state.context.push(
    statementParens ? types.parenStatement : types.parenExpression,
  );
  state.exprAllowed = true;
});

updaters.set(tt.incDec, function() {
  // tokExprAllowed stays unchanged
});

updaters.set(tt._function, function(prevType) {
  if (
    prevType.beforeExpr &&
    prevType !== tt.semi &&
    prevType !== tt._else &&
    !(
      prevType === tt._return &&
      lineBreak.test(input.slice(state.lastTokEnd, state.start))
    ) &&
    !(
      (prevType === tt.colon || prevType === tt.braceL) &&
      curContext() === types.b_stat
    )
  ) {
    state.context.push(types.functionExpression);
  } else {
    state.context.push(types.functionStatement);
  }

  state.exprAllowed = false;
});
// $FlowIgnore .get's return type is TokenType | void
updaters.set(tt._class, updaters.get(tt._function));

updaters.set(tt.backQuote, function() {
  if (curContext() === types.template) {
    state.context.pop();
  } else {
    state.context.push(types.template);
  }
  state.exprAllowed = false;
});

// Used by the JSX plugin
updaters.set(tt.jsxTagStart, function() {
  state.context.push(types.j_expr); // treat as beginning of JSX expression
  state.context.push(types.j_oTag); // start opening tag context
  state.exprAllowed = false;
});

updaters.set(tt.jsxTagEnd, function(prevType) {
  const out = state.context.pop();
  if ((out === types.j_oTag && prevType === tt.slash) || out === types.j_cTag) {
    state.context.pop();
    state.exprAllowed = curContext() === types.j_expr;
  } else {
    state.exprAllowed = true;
  }
});
