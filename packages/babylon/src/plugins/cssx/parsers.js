import Parser from "../../parser";
import { TokenType, types as tt } from "../../tokenizer/types";

let pp = Parser.prototype;

pp.cssxParseExpression = function () {
  let exprNode, lastToken, result;

  lastToken = this.cssxGetPreviousToken();
  exprNode = this.startNodeAt(lastToken.start, lastToken.loc.start);
  exprNode.body = [];

  while(this.match(tt.cssxSelector)) {
    if (this.cssxIsMediaQuery()) {
      exprNode.body.push(this.cssxParseMediaQueryElement());
    } else {
      exprNode.body.push(this.cssxParseElement());
    }
  }

  result = this.finishNodeAt(exprNode, 'CSSXExpression', this.state.end, this.state.endLoc);
  this.next();
  return result;
};

pp.cssxParseElement = function() {
  let elementNode, selectorNode, result, lastToken;

  elementNode = this.startNodeAt(this.state.start, this.state.startLoc);
  selectorNode = this.startNodeAt(this.state.start, this.state.startLoc);
  
  selectorNode.value = this.state.value;  
  elementNode.selector = this.finishNodeAt(
    selectorNode, 'CSSXSelector', this.state.end, this.state.endLoc
  );
  this.next();
  elementNode.body = this.parseBlock();
  lastToken = this.cssxGetPreviousToken();
  result = this.finishNodeAt(elementNode, 'CSSXElement', lastToken.end, lastToken.loc.end);
  this.nextToken();
  return result;
};

pp.cssxParseMediaQueryElement = function () {
  let mediaQueryElement, result;

  mediaQueryElement = this.startNodeAt(this.state.start, this.state.startLoc);
  mediaQueryElement.query = this.state.value;
  this.cssxMediaQueryIn();
  this.cssxFinishTokenAt(tt.cssxMediaQuery, this.state.value, this.state.end, this.state.endLoc);
  
  if (!this.cssxMatchNextToken(tt.braceL)) {
    this.raise(this.state.pos, "Expected { after query definition");
  }
  this.next();

  // removing the context added by tt.braceL type
  // so we stay with CSSXMediaQuery
  this.state.context.length -= 1;

  this.replaceCurrentTokenType(tt.cssxMediaQueryStart);

  this.next();

  mediaQueryElement.body = [];

  if (!this.match(tt.braceR)) {
    mediaQueryElement.body.push(this.cssxParseElement());

    if (this.match(tt.cssxSelector)) {
      while(!this.match(tt.braceR)) {
        mediaQueryElement.body.push(this.cssxParseElement());
      }
    } else if (!this.match(tt.braceR)) {
      this.raise(this.state.pos, "Expected } as end of the media query definition");
    }
  }

  result = this.finishNodeAt(mediaQueryElement, 'CSSXMediaQueryElement', this.state.end, this.state.endLoc);
  this.finishToken(tt.cssxMediaQueryEnd);
  this.next();
  return result;
};
