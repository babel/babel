import { TokenType, types as tt } from "../../tokenizer/types";
import { Token } from "../../tokenizer";
import { TokContext, types as tc } from "../../tokenizer/context";
import Parser from "../../parser";
import { isIdentifierChar, isIdentifierStart } from "../../util/identifier";
import { SourceLocation, Position } from "../../util/location";
import mediaQueries from "./mediaQueries";

let pp = Parser.prototype;

mediaQueries(pp);

tc.cssx = new TokContext('cssx');
tc.cssxSelector = new TokContext('cssxSelector');
tc.cssxRules = new TokContext('cssxRules');
tc.cssxProperty = new TokContext('cssxProperty');
tc.cssxValue = new TokContext('cssxValue');

tt.cssxSelector = new TokenType('cssxSelector');
tt.cssxRulesStart = new TokenType('cssxRulesStart');
tt.cssxRulesEnd = new TokenType('cssxRulesEnd');
tt.cssxProperty = new TokenType('cssxProperty');
tt.cssxValue = new TokenType('cssxValue');

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

const CSSXElementStartAssumption = [
  tt.name,
  tt.star,
  tt.dot,
  tt.relational,
  tt.colon,
  tt.bracketL,
  tt.bracketR,
  tt.eq,
  tt.string,
  tt.prefix,
  tt.assign,
  tt.plusMin,
  tt.parenL,
  tt.parenR,
  tt._class
];
const CSSXPropertyAllowedCodes = [
  '-'
].map(stringToCode);

const CSSXValueAllowedCodes = [
  ' ' , '\n', '\t', '#', '.', '-', '(', ')', '[', ']', '\'', '"', '%', ',', ':', '/', '\\'
].map(stringToCode);

const CSSXSelectorAllowedCodes = [
  ' ', '*', '>', '+', '~', '.', ':', '(', ')', '=', '[', ']', '"', '-',
  '!', '?', '@', '#', '$', '%', '^', '&', '\'', '|'
].map(stringToCode);

export default function CSSX(instance) {

  instance.extend('parseStatement', function (inner) {
    return function (declaration, topLevel) {
      if (this.match(tt.cssxSelector)) {
        if (this.cssxIsMediaQuery()) {
          return this.cssxParseMediaQueryElement();
        }
        return this.cssxParseElement();
      }
      return inner.call(this, declaration, topLevel)
    }
  });

  instance.extend('parseBlock', function (inner) {
    return function (allowDirectives?) {
      var fallback = () => inner.call(this, allowDirectives);
      var context = this.curContext(), blockStmtNode;
      var rules = [], lastToken;

      if (context === tc.cssxRules && this.match(tt.cssxRulesStart)) {

        blockStmtNode = this.startNode();
        // no rules
        if (this.match(tt.cssxRulesStart) && this.lookahead().type === tt.braceR) {
          this.next();
        } else {
          // reading the style
          while (!this.match(tt.cssxRulesEnd)) {
            rules.push(this.cssxBuildRuleNode(this.cssxReadProperty(), this.cssxReadValue()));
          }
          if (this.state.pos >= this.input.length) this.finishToken(tt.eof);
        }
        blockStmtNode.body = rules;
        lastToken = this.cssxGetPreviousToken();
        return this.finishNodeAt(
          blockStmtNode, 'CSSXRules', lastToken.end, lastToken.loc.end
        );
      }

      return fallback();
    }
  });

  instance.extend('readToken', function (inner) {
    return function (code) {
      var fallback = () => inner.call(this, code);
      var context = this.curContext();

      if (this.isLookahead) return fallback();

      if (this.match(tt.cssxSelector) && this.cssxMatchNextToken(tt.braceL)) {
        ++this.state.pos;
        return this.finishToken(tt.cssxRulesStart);
      } else if (this.match(tt.cssxRulesStart)) {
        // no styles
        if (this.cssxMatchNextToken(tt.braceR)) {
          return this.cssxStoreNextCharAsToken(tt.cssxRulesEnd);
        } else {
          return this.finishToken(tt.cssxRulesStart);
        }
      // matching the : between the property and the value
      } else if (this.match(tt.cssxProperty) && code === 58) { // 58 = :        
        return this.cssxStoreNextCharAsToken(tt.colon);
      // matching the semicolon at the end of the rule
      } else if (this.match(tt.cssxValue) && code === 59) { // 59 = ;
        this.cssxStoreNextCharAsToken(tt.semi);
        // eding with semicolon
        if (this.cssxMatchNextToken(tt.braceR)) {
          this.cssxStoreNextCharAsToken(tt.cssxRulesEnd);
        }
        return;
      } else if (this.match(tt.cssxValue) && this.cssxMatchNextToken(tt.braceR)) {
        // ending without semicolon
        return this.cssxStoreNextCharAsToken(tt.cssxRulesEnd);
      } else if (this.match(tt.cssxRulesEnd) && context === tt.cssxMediaQuery) {
        // end of media query
        return;
      }

      // entry point
      if (context !== tc.cssx && this.cssxEntryPoint(code)) {
        this.cssxIn();
        return this.cssxReadSelector();
      }

      return fallback();  
    }
  });

  instance.extend('getTokenFromCode', function (inner) {
    return function (code) {
      var fallback = () => inner.call(this, code);

      if (code === 35 && (this.match(tt.name) || this.match(tt.eof))) { // having #
        ++this.state.pos;
        return this.finishToken(tt.string, '#');
      }

      return fallback();
    };
  });

  instance.extend("parseExprAtom", function(inner) {
    return function(refShortHandDefaultPos) {
      var node;

      if (this.cssxEntryPoint()) {
        if (this.match(tt.parenL)) {
          --this.state.pos;
          this.cssxStoreNextCharAsToken(tt.parenL);
        }
        this.cssxIn();
        this.cssxReadSelector();
        node = this.cssxParseExpression();
        return node;
      }

      return inner.call(this, refShortHandDefaultPos);
    };
  });

  instance.extend('processComment', function (inner) {
    return function (node) {
      var last;
      
      if (node.type === 'CSSXRule') {
        this.state.trailingComments.length = 0;
        this.state.leadingComments.length = 0;
      }

      return inner.call(this, node);
    };
  });

};

pp.cssxEntryPoint = function (code) {
  return (
    this.cssxMatchNextToken(tt.name, tt.braceL) ||
    this.cssxMatchNextToken(tt.name, tt.name) ||
    this.cssxMatchNextToken(tt.star) && this.state.exprAllowed ||
    this.cssxMatchNextToken(tt.dot, tt.name) ||
    this.cssxMatchNextToken(tt.dot, tt._class) ||
    this.cssxMatchNextToken(tt.name, tt.colon) ||
    this.cssxMatchNextToken(tt.name, tt.bracketL) ||
    this.cssxMatchNextToken(tt.name, tt.bracketR) ||
    this.cssxMatchNextToken(tt.name, tt.prefix) ||
    this.cssxMatchNextToken(tt.name, tt.relational) ||
    this.cssxMatchNextToken(tt.name, tt.plusMin) ||
    this.cssxMatchNextToken(tt.name, tt.string) ||
    this.cssxMatchNextToken(tt.name, tt.dot) ||
    this.cssxMatchNextToken(tt.at, tt.name) ||
    code === 35 && this.cssxMatchNextToken(tt.string, tt.name) || // #E
    this.match(tt.cssxSelector) && this.cssxMatchNextToken(tt.string)
  );
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

pp.cssxReadWord = function (readUntil) {
  let word = '';
  let first = true;
  let chunkStart, cut;
  let readingDataURI = false;
  let dataURIPattern = ['url(data:', 41]; // 41 = )

  chunkStart = this.state.pos;
  cut = () => this.input.slice(chunkStart, this.state.pos);
  this.state.containsEsc = false;

  while (this.state.pos < this.input.length) {
    let ch = this.fullCharCodeAtPos();
    if (cut() === dataURIPattern[0]) readingDataURI = true;
    if (ch === dataURIPattern[1]) readingDataURI = false;
    if (readUntil.call(this, ch) || readingDataURI) {
      let inc = (ch <= 0xffff ? 1 : 2);
      this.state.pos += inc;
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
  }
  word = word + cut();
  return word;
};

pp.cssxReadSelector = function (lastToken) {
  let startLoc, pos, value, node;

  this.state.context.push(tc.cssxSelector);

  startLoc = this.state.curPosition();
  pos = this.state.pos;
  value = this.cssxClearSpaceAtTheEnd(this.cssxReadWord(pp.cssxReadSelectorCharUntil));

  this.state.startLoc = startLoc;
  this.state.start = pos;
  this.finishToken(tt.cssxSelector, value);
  this.skipSpace();
};

pp.cssxReadProperty = function() {
  let loc, pos, property, node;

  if (this.match(tt.cssxRulesStart)) this.next();

  loc = this.state.curPosition();
  pos = this.state.pos;
  property = this.cssxReadWord(pp.cssxReadPropCharUntil);

  this.state.startLoc = loc;
  this.state.start = pos;

  this.finishToken(tt.cssxProperty, property);
  this.next();
  node = this.cssxBuildRuleChildNode('CSSXProperty', property, pos, loc);

  return node;
};

pp.cssxReadValue = function() {
  let startLoc, endLoc, pos, value, node;

  startLoc = this.state.curPosition();
  pos = this.state.pos;
  value = this.cssxReadWord(pp.cssxReadValueCharUntil); // changes state.pos

  // if value is a string like \"<something here>\"
  if (value.charAt(0) === '"' && value.charAt(value.length-1) === '"') {
    value = value.substr(1, value.length-2);
  }
  
  this.state.start = pos;
  this.state.startLoc = startLoc;
  this.finishToken(tt.cssxValue, value);
  this.next();
  node = this.cssxBuildRuleChildNode('CSSXValue', value, pos, startLoc);

  return node;
};

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

pp.cssxStoreNextCharAsToken = function (type) {
  let curContext = this.curContext();

  ++this.state.pos;
  this.finishToken(type);

  if (!this.isLookahead) {
    this.state.tokens.push(new Token(this.state));
  }

  if (!curContext || !curContext.preserveSpace) this.skipSpace();
  this.cssxSyncLocPropsToCurPos();
};

pp.cssxSyncLocPropsToCurPos = function (p) {
  let pos = typeof p === 'undefined' ? this.state.pos : p;

  this.state.start = this.state.end = pos;
  this.state.startLoc = this.state.endLoc = posToLoc(pos, this.state.input);
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

// utilities

pp.cssxGetPreviousToken = function (steps=0) {
  return this.state.tokens[this.state.tokens.length - (steps+1)];
};

pp.cssxMatchPreviousToken = function (type, step) {
  let previous = this.cssxGetPreviousToken(step);

  if (previous && previous.type === type) return true;
  return false;
};

pp.cssxMatchNextToken = function () {
  let next, nextA, nextB, old;

  if (arguments.length === 1) {
    next = this.lookahead();
    if (next && next.type === arguments[0]) return true;
    return false;
  } else if (arguments.length === 2) {
    old = this.state;
    this.state = old.clone(true);

    this.isLookahead = true;
    this.next();
    nextA = this.state.clone(true);
    this.next();
    nextB = this.state.clone(true);
    this.isLookahead = false;
    this.state = old;
    if (
      nextA && nextA.type === arguments[0] &&
      nextB && nextB.type === arguments[1]
    ) {
      return true;
    }
    return false;
  }
};

pp.cssxClonePosition = function (loc) {
  return {
    line: loc.line,
    column: loc.column
  }
};

pp.cssxDebugComments = function (comments) {
  if (!comments || comments.length === 0) return null;
  return JSON.stringify(comments.map(function (c) {
    return { type: c.type, value: c.value };
  }));
};

pp.cssxClearSpaceAtTheEnd = function (value) {
  if (value.charAt(value.length-1) === ' ') {
    --this.state.pos;
    return value.substr(0, value.length-1);
  }
  return value;
};

pp.finishTokenAt = function (type, val, pos, loc) {
  this.state.end = pos;
  this.state.endLoc = loc;
  let prevType = this.state.type;
  this.state.type = type;
  this.state.value = val;

  this.updateContext(prevType);
};

pp.replaceCurrentTokenType = function (type) {
  this.state.type = type;
};

// utilities that are not babylon specific

function stringToCode (ch) {
  return String(ch).charCodeAt(0);
};

function posToLoc (pos, input) {
  var line=1, loopPos=0, linePos = 0;

  while(loopPos < input.length && loopPos !== pos) {
    if (input.charAt(loopPos) === '\n') {
      linePos = 0;
      ++line;
    } else {
      ++linePos;
    }
    ++loopPos;
  }
  return { line, column: linePos };
};

function isNumber(code) {
  return code > 47 && code < 58;
}


/* watchers

watch('this.state.type.label'),watch('this.state.pos'),watch('this.state.start'),watch('this.state.end'),watch('this.state.startLoc'),watch('this.state.endLoc'),watch('this.state.input.substr(0, this.state.pos)'),watch('this.curContext().token'),watch('this.lookahead().type.label')

watch('String.fromCharCode(ch) + " / " + ch')

*/
