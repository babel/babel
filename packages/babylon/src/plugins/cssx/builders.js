import Parser from "../../parser";
import { TokenType, types as tt } from "../../tokenizer/types";

const pp = Parser.prototype;

pp.cssxBuildRuleNode = function (propertyNode, valueNode) {
  var node = this.startNodeAt(propertyNode.start, propertyNode.loc.start);
  var pos = valueNode.end;
  var locEnd = this.cssxClonePosition(valueNode.loc.end);

  if (this.match(tt.semi) || (this.match(tt.cssxRulesEnd) && this.cssxMatchPreviousToken(tt.semi, 1))) {
   ++locEnd.column;
   ++pos;
  }

  node.label = propertyNode;
  node.body = valueNode;

  return this.finishNodeAt(node, 'CSSXRule', pos, locEnd);
};

pp.cssxBuildRuleChildNode = function (type, value, pos, loc) {
  var node = this.startNodeAt(pos, loc);

  node.name = value;
  return this.finishNodeAt(node, type, this.state.lastTokEnd, this.state.lastTokEndLoc);
};