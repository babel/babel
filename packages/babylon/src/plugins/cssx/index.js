import { TokenType, types as tt } from "../../tokenizer/types";
import { Token } from "../../tokenizer";
import { TokContext, types as tc } from "../../tokenizer/context";
import Parser from "../../parser";
import { isIdentifierChar, isIdentifierStart } from "../../util/identifier";

let pp = Parser.prototype;

tc.cssx = new TokContext('cssx');
tc.cssxRules = new TokContext('cssxRules');

tt.cssxSelector = new TokenType('cssxSelector');
tt.cssxRulesStart = new TokenType('cssxRulesStart');
tt.cssxRulesEnd = new TokenType('cssxRulesEnd');
tt.cssxPropValue = new TokenType('cssxPropValue');

tt.cssxRulesStart.updateContext = function (prevType) {
  if (prevType === tt.cssxSelector) this.state.context.push(tc.cssxRules);
};

const CSSXElementStartAssumption = [
  tt.name, tt.star, tt.dot, tt.relational, tt.cssxSelector
];

export default function CSSX(instance) {

  instance.extend('parseStatement', function (inner) {
    return function (declaration, topLevel) {
      var fallback = () => inner.call(this, declaration, topLevel);
      var nextState, context;
      debugger;

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

      if (context === tc.cssx) {        
        this.next();
        blockStmtNode = this.startNodeAt(this.state.lastTokStart, this.state.lastTokStartLoc);
        blockStmtNode.body = [];
        this.cssxCheckForRulesEnd();
        // reading the property
        while (!this.eat(tt.cssxRulesEnd)) {
          blockStmtNode.body.push(
            this.cssxBuildRuleNode(
              this.cssxReadProperty(),
              this.cssxReadValue()
            )
          );
          this.cssxCheckForRulesEnd();
        }
        
        return this.finishNode(blockStmtNode, "CSSXRules");
      }

      return fallback();
    }
  });

  instance.extend('readToken', function (inner) {
    return function (code) {
      var fallback = () => inner.call(this, code);
      var context = this.curContext();
      
      if (this.isLookahead) return fallback();

      if (context === tc.cssx && this.lookahead().type === tt.braceL) {
        ++this.state.pos;
        this.finishToken(tt.cssxRulesStart);
        return this.next();
      }

      return fallback();  
    }
  });

};

pp.cssxParseStyles = function() {
  var elementNode = this.startNode();
  var selectorNode = this.startNode();

  selectorNode.value = this.state.value;
  elementNode.selector = this.finishNodeAt(selectorNode, 'CSSXSelector', this.state.end, this.state.endLoc);
  elementNode.body = this.parseBlock();

  this.cssxOut();
  return this.finishNode(elementNode, "CSSXElement");
};

// this function besically merged last two tokens into one
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

pp.cssxReadProperty = function() {
  var property = '';
  var pos = this.state.start;
  var loc = this.state.startLoc;

  do {
    property += this.state.value;
    this.next();
  } while (!this.eat(tt.colon));
  debugger;
  return this.cssxBuildRuleChildNode(
    'CSSXProperty',
    property,
    pos, 
    loc,
    this.state.lastTokStart,
    this.state.lastTokStartLoc
  );
};

pp.cssxReadValue = function() {
  var value = '';
  var pos = this.state.start;
  var loc = this.state.startLoc;
  var result = () => this.cssxBuildRuleChildNode(
    'CSSXValue',
    value,
    pos, 
    loc,
    this.state.lastTokEnd,
    this.state.lastTokEndLoc
  );

  while (!this.eat(tt.semi)) {
    if (this.match(tt.braceR)) {
      return result();
      break;
    }
    value += this.state.value;
    this.next();
  }
  return result();
};

pp.cssxBuildRuleNode = function (propertyNode, valueNode) {
  var node = this.startNodeAt(propertyNode.start, propertyNode.loc.start);

  node.label = propertyNode;
  node.body = valueNode;
  return this.finishNodeAt(node, 'CSSXRule', valueNode.end, valueNode.loc.end);
};

pp.cssxBuildRuleChildNode = function (type, value, pos, loc, posEnd, locEnd) {
  var node = this.startNodeAt(pos, loc);

  node.name = value;
  return this.finishNodeAt(node, type, posEnd || this.state.end, locEnd || this.state.endLoc);
};

pp.cssxCheckForRulesEnd = function () {
  if (this.match(tt.braceR)) this.finishToken(tt.cssxRulesEnd);
}

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

pp.matchOneOfThose = function (assumtion) {
  for(let i=0; i<assumtion.length; i++) {
    if (this.match(assumtion[i])) return true;
  }
  return false;
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


