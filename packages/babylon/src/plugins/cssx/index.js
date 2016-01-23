import { TokenType, types as tt } from "../../tokenizer/types";
import { TokContext, types as tc } from "../../tokenizer/context";
import Parser from "../../parser";
import { SourceLocation, Position } from "../../util/location";
import { posToLoc } from "./utilities";

import "./types";
import "./context";
import "./mediaqueries";
import "./parsers";
import "./readers";
import "./builders";
import "./helpers";

const pp = Parser.prototype;

export default function CSSX(instance) {

  instance.extend('parseStatement', function (inner) {
    return function (declaration, topLevel) {
      let result;
      
      if (this.cssxMatchPreviousToken(tt.cssxStart) && this.curContext() !== tc.cssxDefinition) {
        this.cssxDefinitionIn();
        return this.cssxParse();
      } else if (this.match(tt.cssxSelector)) {
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
      } else if (this.match(tt.cssxRulesEnd) && this.cssxMatchNextToken(tt.parenR)) {
        ++this.state.pos;
        this.finishToken(tt.cssxEnd);
        return;
      }

      // cssx entry point
      if (this.cssxEntryPoint()) {
        return;
      }

      // looping through the cssx elements
      if (context === tc.cssxDefinition) {
        this.skipSpace();
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
      // if (this.cssxRulesEntryPoint()) {
      //   this.cssxIn();
      //   this.state.context.push(tc.cssxRules);
      //   this.finishToken(tt.cssxRulesStart);
      //   return this.parseBlock();
      // } else 
      if (this.cssxElementEntryPoint()) {
        if (this.match(tt.parenL)) {
          --this.state.pos;
          this.cssxStoreNextCharAsToken(tt.parenL);
        }
        this.cssxIn();
        this.cssxReadSelector();
        return this.cssxParseExpression();
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
  let nextToken = this.lookahead();
  let name, parenL, future;

  if (
    nextToken.type === tt.name &&
    nextToken.value === 'cssx' &&
    this.cssxMatchNextToken(tt.name, tt.parenL)
  ) {
    this.cssxIn();
    future = this.cssxLookahead(2);
    name = future.first;
    parenL = future.last;
    this.state.pos = parenL.end;
    this.finishToken(tt.cssxStart);
    this.cssxSyncEndTokenStateToCurPos();
    this.cssxStoreCurrentToken();
    return true;
  }
  return false;
};

pp.cssxRulesEntryPoint = function (code) {
  return (
    (this.match(tt.braceL) && this.cssxMatchNextToken(tt.name, tt.colon))
  );
};

// pp.cssxElementEntryPoint = function (code) {
//   return (
//     this.cssxMatchNextToken(tt.name, tt.braceL) ||
//     this.cssxMatchNextToken(tt.name, tt.name) ||
//     this.cssxMatchNextToken(tt.star) && this.state.exprAllowed ||
//     this.cssxMatchNextToken(tt.dot, tt.name) ||
//     this.cssxMatchNextToken(tt.dot, tt._class) ||
//     this.cssxMatchNextToken(tt.name, tt.bracketL) ||
//     this.cssxMatchNextToken(tt.name, tt.prefix) ||
//     this.cssxMatchNextToken(tt.name, tt.relational) ||
//     this.cssxMatchNextToken(tt.name, tt.plusMin) ||
//     this.cssxMatchNextToken(tt.name, tt.string) ||
//     this.cssxMatchNextToken(tt.name, tt.dot) ||
//     this.cssxMatchNextToken(tt.at, tt.name) ||
//     code === 35 && this.cssxMatchNextToken(tt.string, tt.name) || // #E
//     this.match(tt.cssxSelector) && this.cssxMatchNextToken(tt.string)
//   );
// };

/* useful watchers

watch('this.state.type.label'),watch('this.state.pos'),watch('this.state.start'),watch('this.state.end'),watch('this.state.startLoc'),watch('this.state.endLoc'),watch('this.state.input.substr(0, this.state.pos)'),watch('this.curContext().token'),watch('this.lookahead().type.label')

watch('String.fromCharCode(ch) + " / " + ch')

*/
