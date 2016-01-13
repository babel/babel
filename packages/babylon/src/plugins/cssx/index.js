import { TokenType, types as tt } from "../../tokenizer/types";
import { Token } from "../../tokenizer";
import { TokContext, types as tc } from "../../tokenizer/context";
import Parser from "../../parser";
import { isIdentifierChar, isIdentifierStart } from "../../util/identifier";
import { SourceLocation } from "../../util/location";

let pp = Parser.prototype;

tc.cssx = new TokContext('cssx');
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
  if (prevType === tt.cssxValue || prevType === tt.cssxRulesStart) this.state.context.length -= 1;
};

const CSSXElementStartAssumption = [
  tt.name, tt.star, tt.dot, tt.relational, tt.cssxSelector
];

export default function CSSX(instance) {

  instance.extend('parseStatement', function (inner) {
    return function (declaration, topLevel) {
      var fallback = () => inner.call(this, declaration, topLevel);
      var nextState, context;

      if (this.matchOneOfThose(CSSXElementStartAssumption)) {
        nextState = this.lookahead();
        context = this.curContext();
        // complex selector (more then one word)
        if (nextState.type === tt.name || nextState.type === tt.relational) {
          this.cssxIn();
          this.cssxParseSelector(nextState);
          return this.parseStatement();
        // reading the actual styles
        } else if (nextState.type === tt.braceL) {
          this.cssxIn();
          this.finishToken(tt.cssxSelector, this.state.value);
          this.next();
          return this.cssxParseStyles(nextState);
        }
      }

      return fallback();
    }
  });

  instance.extend('parseBlock', function (inner) {
    return function (allowDirectives?) {
      var fallback = () => inner.call(this, allowDirectives);
      var context = this.curContext(), blockStmtNode;
      var rules = [];

      if (context === tc.cssxRules && this.match(tt.cssxRulesStart)) {
        blockStmtNode = this.startNode();
        // no rules
        if (this.match(tt.cssxRulesStart) && this.lookahead().type === tt.braceR) {
          this.skipSpace();
          this.next();
        } else {
          // reading the style        
          while (!this.match(tt.cssxRulesEnd)) {
            rules.push(this.cssxBuildRuleNode(this.cssxReadProperty(), this.cssxReadValue()));
          }
          this.next();
        }
        blockStmtNode.body = rules;
        return this.finishNode(blockStmtNode, 'CSSXRules');
      }

      return fallback();
    }
  });

  instance.extend('readToken', function (inner) {
    return function (code) {
      var fallback = () => inner.call(this, code);
      var context = this.curContext();

      if (this.isLookahead) return fallback();

      // the beginning of the rules block
      if (context === tc.cssx && this.matchNextToken(tt.braceL)) {
        ++this.state.pos;
        return this.finishToken(tt.cssxRulesStart);
      } else if (this.match(tt.cssxRulesStart)) {
        // no styles
        if (this.lookahead().type === tt.braceR) {
          ++this.state.pos;
          this.finishToken(tt.cssxRulesEnd);
          return this.next();
        // finishg the { token
        } else {
          return this.finishToken(tt.cssxRulesStart);
        }
      // matching the : between the property and the value
      } else if (this.match(tt.cssxProperty) && code === 58) { // 58 = :
        this.finishToken(tt.colon);
        ++this.state.pos;
        this.cssxStoreToken();
        this.lastTokenPlusEndPos();
        return;
      // matching the semicolon at the end of the rule
      } else if (this.match(tt.cssxValue) && code === 59) { // 59 = ;
        this.finishToken(tt.semi);
        ++this.state.pos;
        if (this.matchNextToken(tt.braceR)) {
          this.next();
          this.lastTokenPlusEndPos();
          return this.finishToken(tt.cssxRulesEnd);
        }
        this.cssxStoreToken();
        this.lastTokenPlusEndPos();
        return;
      } else if (this.match(tt.cssxValue) && this.matchNextToken(tt.braceR)) {
        // ending without semicolon
        ++this.state.pos;
        this.skipSpace();
        return this.finishToken(tt.cssxRulesEnd);
      }

      return fallback();  
    }
  });

};

// entry point
pp.cssxParseStyles = function() {
  let cssxSelectorToken = this.getPreviousToken();
  let elementNode = this.startNodeAt(cssxSelectorToken.start, cssxSelectorToken.loc.start);
  let selectorNode = this.startNodeAt(cssxSelectorToken.start, cssxSelectorToken.loc.start);

  selectorNode.value = cssxSelectorToken.value;
  elementNode.selector = this.finishNodeAt(
    selectorNode,
    'CSSXSelector',
    cssxSelectorToken.end,
    cssxSelectorToken.loc.end
  );
  elementNode.body = this.parseBlock();
  this.cssxOut();
  return this.finishNode(elementNode, 'CSSXElement');
};

// merges last two tokens into one
pp.cssxParseSelector = function (nextState) {
  var lastToken, beforeLastToken;

  // getting the state into a new token
  this.next();

  // merging the newly added token into the current state
  lastToken = this.getPreviousToken();
  beforeLastToken = this.getPreviousToken(1);
  this.state.value = this.cssxReadSelector(lastToken);
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

  // the merging is done so we erase the last registered token
  this.state.tokens.length -= 1;
};

pp.cssxReadSelector = function (token) {
  if (token.type === tt.dot) {
    return '.' + this.state.value;
  }
  return token.value + ' ' + this.state.value
};

pp.cssxReadWord = function (readUntil) {
  let word = '';
  let first = true;
  let chunkStart;

  chunkStart = this.state.pos;
  
  this.state.containsEsc = false;
  
  while (this.state.pos < this.input.length) {
    let ch = this.fullCharCodeAtPos();
    if (readUntil(ch)) {
      this.state.pos += ch <= 0xffff ? 1 : 2;
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
  word = word + this.input.slice(chunkStart, this.state.pos);
  return word;
};

pp.cssxReadProperty = function() {
  let loc, pos, property;

  if (this.match(tt.cssxRulesStart)) this.next();
  this.skipSpace();

  loc = this.state.curPosition();
  pos = this.state.pos;
  property = this.cssxReadWord(isIdentifierChar);

  this.state.startLoc = loc;
  this.finishToken(tt.cssxProperty, property);
  this.next();
  return this.cssxBuildRuleChildNode('CSSXProperty', property, pos, loc);
};

pp.cssxReadValue = function() {
  let loc, pos, value;

  this.skipSpace();

  loc = this.state.curPosition();
  pos = this.state.pos;
  value = this.cssxReadWord(isIdentifierChar);
  this.state.startLoc = loc;
  this.finishToken(tt.cssxValue, value);
  this.next();
  return this.cssxBuildRuleChildNode('CSSXValue', value, pos, loc);
};

pp.cssxBuildRuleNode = function (propertyNode, valueNode) {
  var node = this.startNodeAt(propertyNode.start, propertyNode.loc.start);
  var pos = this.state.pos;
  var locEnd = this.clonePosition(valueNode.loc.end);

  if (this.match(tt.semi) || (this.match(tt.cssxRulesEnd) && this.matchPreviousToken(tt.semi))) {
   ++locEnd.column;
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

pp.cssxStoreToken = function () {
  if (!this.isLookahead) {
    this.state.tokens.push(new Token(this.state));
  }

  this.state.lastTokEnd = this.state.end;
  this.state.lastTokStart = this.state.start;
  this.state.lastTokEndLoc = this.state.endLoc;
  this.state.lastTokStartLoc = this.state.startLoc;
};

// utilities

pp.getPreviousToken = function (steps=0) {
  return this.state.tokens[this.state.tokens.length - (steps+1)];
};

pp.matchPreviousToken = function (type, step) {
  let previous = this.getPreviousToken(step);

  if (previous && previous.type === type) return true;
  return false;
};

pp.matchNextToken = function (type) {
  let next = this.lookahead();

  if (next && next.type === type) return true;
  return false;
};

pp.matchOneOfThose = function (assumtion) {
  for(let i=0; i<assumtion.length; i++) {
    if (this.match(assumtion[i])) return true;
  }
  return false;
};

pp.charAtPos = function () {
  return String.fromCharCode(this.fullCharCodeAtPos());
};

pp.printTokens = function () {
  this.state.tokens.forEach(t => {
    console.log(t.type.label + ' value=' + t.value);
  });
};

pp.printContext = function () {
  this.state.context.forEach(c => {
    console.log(c.token);
  });
};

pp.printSoFar = function () {
  console.log(this.state.input.substr(0, this.state.pos));
};

pp.clonePosition = function (loc) {
  return {
    line: loc.line,
    column: loc.column
  }
};

pp.lastTokenPlusEndPos = function () {
  var token = this.getPreviousToken();
  var locEnd = this.clonePosition(token.loc.end);
  var locStart = this.clonePosition(token.loc.start);

  ++token.end;
  ++locEnd.column;
  token.loc = new SourceLocation(locStart, locEnd);
};