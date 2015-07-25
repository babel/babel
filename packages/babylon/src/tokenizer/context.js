// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

import { types as tt } from "./types";

export class TokContext {
  constructor(token, isExpr, preserveSpace, override) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
  }
}

export const types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", true),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, p => p.readTmplToken()),
  f_expr: new TokContext("function", true)
};

// Token-specific context update code

tt.parenR.updateContext = tt.braceR.updateContext = function () {
  if (this.state.context.length === 1) {
    this.state.exprAllowed = true;
    return;
  }

  let out = this.state.context.pop();
  if (out === types.b_stat && this.curContext() === types.f_expr) {
    this.state.context.pop();
    this.state.exprAllowed = false;
  } else if (out === types.b_tmpl) {
    this.state.exprAllowed = true;
  } else {
    this.state.exprAllowed = !out.isExpr;
  }
};

tt.braceL.updateContext = function (prevType) {
  this.state.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.state.exprAllowed = true;
};

tt.dollarBraceL.updateContext = function () {
  this.state.context.push(types.b_tmpl);
  this.state.exprAllowed = true;
};

tt.parenL.updateContext = function (prevType) {
  let statementParens = prevType === tt._if || prevType === tt._for || prevType === tt._with || prevType === tt._while;
  this.state.context.push(statementParens ? types.p_stat : types.p_expr);
  this.state.exprAllowed = true;
};

tt.incDec.updateContext = function () {
  // tokExprAllowed stays unchanged
};

tt._function.updateContext = function () {
  if (this.curContext() !== types.b_stat) {
    this.state.context.push(types.f_expr);
  }

  this.state.exprAllowed = false;
};

tt.backQuote.updateContext = function () {
  if (this.curContext() === types.q_tmpl) {
    this.state.context.pop();
  } else {
    this.state.context.push(types.q_tmpl);
  }
  this.state.exprAllowed = false;
};
