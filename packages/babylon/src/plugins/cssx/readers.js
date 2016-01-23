import Parser from "../../parser";
import { isIdentifierChar, isIdentifierStart } from "../../util/identifier";
import { TokenType, types as tt } from "../../tokenizer/types";
import { TokContext, types as tc } from "../../tokenizer/context";

import {
  CSSXPropertyAllowedCodes,
  CSSXValueAllowedCodes,
  CSSXSelectorAllowedCodes
} from "./settings";
import { isNumber } from './utilities';

let pp = Parser.prototype;

pp.cssxReadWord = function (readUntil) {
  let word = '';
  let first = true;
  let chunkStart, cut, toggle;
  let readingDataURI = false;
  let readingExpression = false;
  let dataURIPattern = ['url(data:', 41]; // 41 = )
  let expressionPattern = [96, 96]; // 96 = `
  let expression = false;
  let expressions = [];
  let numOfCharRead = 0;

  chunkStart = this.state.pos;
  cut = () => this.input.slice(chunkStart, this.state.pos);
  this.state.containsEsc = false;

  while (this.state.pos < this.input.length) {
    let ch = this.fullCharCodeAtPos();

    if (cut() === dataURIPattern[0]) readingDataURI = true;
    if (ch === dataURIPattern[1]) readingDataURI = false;

    if (
      readUntil.call(this, ch) ||
      readingDataURI ||
      ch === expressionPattern[0] ||
      expression !== false
    ) {

      let inc = (ch <= 0xffff ? 1 : 2);
      this.state.pos += inc;

      // expression block end detaction
      if (ch === expressionPattern[1] && expression) {
        expression.end = this.state.pos;
        expression.inner.end = numOfCharRead + 1;
        expressions.push(expression)
        expression = false;
      // expression block start detection
      } else if (ch === expressionPattern[0] && !expression) {
        expression = { 
          start: this.state.pos - 1,
          inner: { start: numOfCharRead }
        };
      }

      // new line detection
      if (ch === 10) { // new line
        ++this.state.curLine;
        this.state.lineStart = this.state.pos;
      }

    } else if (ch === 92) { // "\"
      this.state.containsEsc = true;

      word += this.input.slice(chunkStart, this.state.pos);
      let escStart = this.state.pos;

      if (this.input.charCodeAt(++this.state.pos) !== 117) { // "u"
        this.raise(this.state.pos, "Expecting Unicode escape sequence \\uXXXX");
      }

      ++this.state.pos;
      let esc = this.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, true)) {
        this.raise(escStart, "Invalid Unicode escape");
      }

      word += codePointToString(esc);
      chunkStart = this.state.pos;
    } else {
      break;
    }
    first = false;
    ++numOfCharRead;
  }
  word = word + cut();  
  return { str: word, expressions };
};

pp.cssxReadSelector = function (lastToken) {
  let startLoc, pos, value, node, word;
  this.state.context.push(tc.cssxSelector);

  startLoc = this.state.curPosition();
  pos = this.state.pos;

  word = this.cssxReadWord(pp.cssxReadSelectorCharUntil);
  value = this.cssxClearSpaceAtTheEnd(word.str);

  this.cssxExpressionRegister(word.expressions);
  this.state.startLoc = startLoc;
  this.state.start = pos;
  this.finishToken(tt.cssxSelector, value);
  this.skipSpace();
};

pp.cssxReadProperty = function() {
  let loc, pos, property, node, word;

  if (this.match(tt.cssxRulesStart)) this.next();

  loc = this.state.curPosition();
  pos = this.state.pos;
  word = this.cssxReadWord(pp.cssxReadPropCharUntil);
  property = word.str;

  this.cssxExpressionRegister(word.expressions);
  this.state.startLoc = loc;
  this.state.start = pos;

  this.finishToken(tt.cssxProperty, property);
  this.next();
  node = this.cssxBuildRuleChildNode('CSSXProperty', property, pos, loc);

  return node;
};

pp.cssxReadValue = function() {
  let startLoc, endLoc, pos, value, node, word;

  startLoc = this.state.curPosition();
  pos = this.state.pos;
  word = this.cssxReadWord(pp.cssxReadValueCharUntil);
  value = this.cssxClearSpaceAtTheEnd(word.str); // changes state.pos

  // if value is a string like \"<something here>\"
  if (value.charAt(0) === '"' && value.charAt(value.length-1) === '"') {
    value = value.substr(1, value.length-2);
  }
  
  this.cssxExpressionRegister(word.expressions);
  this.state.start = pos;
  this.state.startLoc = startLoc;
  this.finishToken(tt.cssxValue, value);
  this.next();
  node = this.cssxBuildRuleChildNode('CSSXValue', value, pos, startLoc);

  return node;
};

pp.cssxReadSelectorCharUntil = function (code) {
  if (CSSXSelectorAllowedCodes.indexOf(code) >= 0 || isNumber(code)) { // check for allow characters
    return true;
  } else if (code === 123) { // end the selector with {
    return false;
  }
  return isIdentifierChar(code);
};

pp.cssxReadValueCharUntil = function (code) {
  return CSSXValueAllowedCodes.indexOf(code) >= 0 ? true : isIdentifierChar(code);
};

pp.cssxReadPropCharUntil = function (code) {
  return CSSXPropertyAllowedCodes.indexOf(code) >= 0 ? true : isIdentifierChar(code);
};
