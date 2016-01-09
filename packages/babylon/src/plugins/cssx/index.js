import { TokenType, types as tt } from "../../tokenizer/types";
import { Token } from "../../tokenizer";
import { TokContext, types as tc } from "../../tokenizer/context";
import Parser from "../../parser";

let pp = Parser.prototype;

tc.cssx = new TokContext('cssx');

export default function CSSX(instance) {
  instance.extend('parseStatement', function (inner) {
    return function (declaration, topLevel) {
      const fallback = () => inner.call(this, declaration, topLevel);
      debugger;

      if (this.match(tt.name)) {
        // we can't use lookahead here because we want to stay
        // in the next state
        let nextState = this.lookahead();
        // reading the actual styles
        if (nextState.type === tt.braceL) {
          this.cssxIn();
          return this.cssxParseElement(nextState);
        // reading selector
        } else if (nextState.type === tt.name) {
          this.cssxIn();
          this.cssxParseSelector(nextState);
          return this.parseStatement();
        // returning the old state and fallback to
        // the default behavior
        }
      }

      return fallback();
    }
  });
};

pp.cssxParseElement = function() {
  // we expect that state is tt.name
  var elementNode = this.startNodeAt(this.state.start, this.state.startLoc);
  var selectorNode = this.startNodeAt(this.state.start, this.state.startLoc);
  var result;

  selectorNode.value = this.state.value;
  this.next();
  elementNode.selector = this.finishNode(
    selectorNode, 'CSSXSelector', this.state.end, this.state.endLoc
  );
  elementNode.body = this.parseBlock();

  this.cssxOut();
  return this.finishNode(elementNode, "CSSXElement");
};

pp.cssxParseSelector = function (nextState) {
  var lastToken, beforeLastToken;

  /*
export class Token {
  constructor(state) {
    this.type = state.type;
    this.value = state.value;
    this.start = state.start;
    this.end = state.end;
    this.loc = new SourceLocation(state.startLoc, state.endLoc);
  }

  type: TokenType;
  value: any;
  start: number;
  end: number;
  loc: SourceLocation;
}

    this.state.end = this.state.pos;
    this.state.endLoc = this.state.curPosition();
    let prevType = this.state.type;
    this.state.type = type;
    this.state.value = val;
  */

  // getting the state into a new token
  this.next();

  // merging the newly added token into the current state
  lastToken = this.getPreviousToken();
  beforeLastToken = this.getPreviousToken(1);
  this.state.value = lastToken.value + ' ' + this.state.value;
  this.state.start = lastToken.start;
  this.state.startLoc = lastToken.loc.start;

  // restoring state properties
  if (beforeLastToken) {
    this.state.lastTokStartLoc = beforeLastToken.loc.start;
    this.state.lastTokEndLoc = beforeLastToken.loc.end;
    this.state.lastTokEnd = beforeLastToken.end;
    this.state.lastTokStart = beforeLastToken.end;
  } else {
    this.state.lastTokStartLoc = null;
    this.state.lastTokEndLoc = null;
    this.state.lastTokEnd = 0;
    this.state.lastTokStart = 0;
  }

  // the merging is done and we don't need the token
  this.state.tokens.length -= 1;
};

pp.cssxIn = function () {
  const curContext = this.curContext();

  if (curContext === tc.cssx) return this;
  this.state.context.push(tc.cssx);
  return this;
};

pp.cssxOut = function () {
  const curContext = this.curContext();

  if (curContext !== tc.cssx) {
    this.raise(this.state.start, 'Not in CSSX context');
  };
  this.state.context.pop();
  return this;
};

// utilities
pp.getPreviousToken = function (steps=0) {
  return this.state.tokens[this.state.tokens.length - (steps+1)];
};

