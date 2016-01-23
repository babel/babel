import Parser from "../../parser";
import { TokenType, types as tt } from "../../tokenizer/types";

let pp = Parser.prototype;

pp.cssxParse = function () {
  let lastToken = this.cssxGetPreviousToken();
  let definition = this.startNodeAt(lastToken.start, lastToken.loc.start);

  this.skipSpace();
  this.cssxReadSelector();
  this.parseBlockBody(definition, true, false, tt.cssxEnd);
  this.finishNode(definition, 'CSSXDefinition');
  return definition;
};

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
  this.cssExpressionSet(selectorNode);
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
  this.cssxStoreCurrentToken();

  if (!this.cssxMatchNextToken(tt.braceL)) {
    this.raise(this.state.pos, 'Expected { after query definition');
  }

  ++this.state.pos;
  this.finishToken(tt.cssxMediaQueryStart);

  if (this.cssxMatchNextToken(tt.braceR)) { // empty media query
    this.cssxStoreCurrentToken();
    this.skipSpace();
    this.cssxSyncLocPropsToCurPos();
  } else {
    this.next();
    mediaQueryElement.body = [];
    if (this.match(tt.cssxSelector)) {
      mediaQueryElement.body.push(this.cssxParseElement());
      while(!this.cssxMatchNextToken(tt.braceR)) {
        if (this.match(tt.cssxRulesEnd)) {
          this.cssxReadSelector();
        }
        mediaQueryElement.body.push(this.cssxParseElement());
      }
    } else {
      this.raise(this.state.pos, "Expected css selector after media query definition");
    }
  }

  ++this.state.pos;
  this.finishToken(tt.cssxMediaQueryEnd);
  result = this.finishNodeAt(mediaQueryElement, 'CSSXMediaQueryElement', this.state.end, this.state.endLoc);
  this.next();
  return result;
};
