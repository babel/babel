import { TokContext, types as tc } from "../../../tokenizer/context";
import { TokenType, types as tt } from "../../../tokenizer/types";

const MediaQueryEntryPoint = '@media ';

tc.cssxMediaQuery = new TokContext('CSSXMediaQuery');

tt.cssxMediaQuery = new TokenType('cssxMediaQuery');
tt.cssxMediaQueryStart = new TokenType('cssxMediaQueryStart');
tt.cssxMediaQueryEnd = new TokenType('cssxMediaQueryEnd');

export default function mediaQueries(pp) {
  
  pp.cssxIsMediaQuery = function () {
    if (this.state.value.toString().indexOf(MediaQueryEntryPoint) === 0) {
      return true;
    }
    return false;
  };

  pp.cssxParseMediaQueryElement = function () {
    let mediaQueryElement, result;

    mediaQueryElement = this.startNodeAt(this.state.start, this.state.startLoc);
    mediaQueryElement.query = this.state.value;
    this.cssxMediaQueryIn();
    this.finishTokenAt(tt.cssxMediaQuery, this.state.value, this.state.end, this.state.endLoc);
    
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

};
