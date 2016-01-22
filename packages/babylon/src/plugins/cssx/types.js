import { TokenType, types as tt } from "../../tokenizer/types";
import { TokContext, types as tc } from "../../tokenizer/context";

tt.cssxStart = new TokenType('CSSXStart');
tt.cssxEnd = new TokenType('CSSXEnd');
tt.cssxSelector = new TokenType('CSSXSelector');
tt.cssxRulesStart = new TokenType('CSSXRulesStart');
tt.cssxRulesEnd = new TokenType('CSSXRulesEnd');
tt.cssxProperty = new TokenType('CSSXProperty');
tt.cssxValue = new TokenType('CSSXValue');
tt.cssxMediaQuery = new TokenType('CSSXMediaQuery');
tt.cssxMediaQueryStart = new TokenType('CSSXMediaQueryStart');
tt.cssxMediaQueryEnd = new TokenType('CSSXMediaQueryEnd');

tt.cssxRulesStart.updateContext = function (prevType) {
  if (prevType === tt.cssxSelector) this.state.context.push(tc.cssxRules);
};
tt.cssxRulesEnd.updateContext = function (prevType) {
  if (
    prevType === tt.cssxValue ||
    prevType === tt.cssxRulesStart ||
    prevType === tt.semi
  ) {
    this.state.context.length -= 1; // out of cssxRules
  }
};
tt.cssxEnd.updateContext = function (prevType) {
  this.cssxDefinitionOut();
  this.cssxOut();
};
tt.cssxSelector.updateContext = function (prevType) {
  this.state.context.length -= 1;
};