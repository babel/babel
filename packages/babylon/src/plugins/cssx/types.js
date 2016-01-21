import { TokenType, types as tt } from "../../tokenizer/types";
import { TokContext, types as tc } from "../../tokenizer/context";

tt.cssxSelector = new TokenType('cssxSelector');
tt.cssxRulesStart = new TokenType('cssxRulesStart');
tt.cssxRulesEnd = new TokenType('cssxRulesEnd');
tt.cssxProperty = new TokenType('cssxProperty');
tt.cssxValue = new TokenType('cssxValue');
tt.cssxMediaQuery = new TokenType('cssxMediaQuery');
tt.cssxMediaQueryStart = new TokenType('cssxMediaQueryStart');
tt.cssxMediaQueryEnd = new TokenType('cssxMediaQueryEnd');

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
    this.cssxOut();
  }
};
tt.cssxSelector.updateContext = function (prevType) {
  this.state.context.length -= 1;
};