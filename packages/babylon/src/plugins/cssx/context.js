import { TokContext, types as tc } from "../../tokenizer/context";
import Parser from "../../parser";

tc.cssx = new TokContext('cssx');
tc.cssxSelector = new TokContext('cssxSelector');
tc.cssxRules = new TokContext('cssxRules');
tc.cssxProperty = new TokContext('cssxProperty');
tc.cssxValue = new TokContext('cssxValue');
tc.cssxMediaQuery = new TokContext('CSSXMediaQuery');

const pp = Parser.prototype;

pp.cssxIn = function () {
  const curContext = this.curContext();

  if (curContext === tc.cssx) return this;
  this.state.context.push(tc.cssx);
};

pp.cssxOut = function () {
  const curContext = this.curContext();

  if (curContext !== tc.cssx) {
    this.raise(this.state.start, 'Not in CSSX context');
  };
  this.state.context.length -= 1;
};

pp.cssxMediaQueryIn = function () {
  const curContext = this.curContext();

  if (curContext === tc.cssxMediaQuery) return this;
  this.state.context.push(tc.cssxMediaQuery);
};

pp.cssxMediaQueryOut = function () {
  const curContext = this.curContext();

  if (curContext !== tc.cssxMediaQuery) {
    this.raise(this.state.start, 'Not in CSSXMediaQuery context');
  };
  this.state.context.length -= 1;
};