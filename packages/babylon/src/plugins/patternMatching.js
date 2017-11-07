// @flow

import { types as tt } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";
import type { Pos } from "../util/location";

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    // ==================================
    // Overrides
    // ==================================

    // Parse call, dot, and `[]`-subscript expressions.
    // maybe a match expression

    parseExprSubscripts(refShorthandDefaultPos: ?Pos): N.Expression {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      const potentialArrowAt = this.state.potentialArrowAt;
      const expr = this.parseExprAtom(refShorthandDefaultPos);

      if (
        expr.type === "ArrowFunctionExpression" &&
        expr.start === potentialArrowAt
      ) {
        return expr;
      }

      if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
        return expr;
      }

      const tmp = this.parseSubscripts(expr, startPos, startLoc);
      if (
        tmp.type === "CallExpression" &&
        tmp.callee.type === "Identifier" &&
        tmp.callee.name === "match" &&
        tmp.arguments.length === 1 &&
        this.match(tt.braceL)
      ) {
        // properbly a match expression
        this.next();
        const node = this.startNodeAt(startPos, startLoc);

        if (this.match(tt.braceR)) {
          this.raise(
            this.state.pos,
            "there are no clauses in match expression",
          );
        }

        const firstClause = this.parseMatchClause();

        node.expression = tmp.arguments[0];
        node.clauses = [firstClause];

        while (this.match(tt.comma)) {
          this.next();

          if (this.match(tt.braceR)) {
            break;
          }

          node.clauses.push(this.parseMatchClause());
        }

        this.eat(tt.braceR);
        return this.finishNode(node, "MatchExpression");
      } else {
        return tmp;
      }
    }

    // pattern ':' expression
    parseMatchClause(): N.MatchExpressionClause {
      const node = this.startNode();

      const pattern = this.parseMatchPattern();

      if (!this.eat(tt.colon)) {
        this.unexpected(this.state.pos, tt.colon);
      }

      node.pattern = pattern;
      this.parseClauseBody(node, true);

      return this.finishNode(node, "MatchExpressionClause");
    }

    parseClauseBody(
      node: N.MatchExpressionClause,
      allowExpression: ?boolean,
    ): void {
      const isExpression = allowExpression && !this.match(tt.braceL);

      const oldInParameters = this.state.inParameters;
      const oldInAsync = this.state.inAsync;
      this.state.inParameters = false;
      this.state.inAsync = false;

      if (isExpression) {
        node.body = this.parseMaybeAssign();
        node.expression = true;
      } else {
        // Start a new scope with regard to labels and the `inGenerator`
        // flag (restore them to their old value afterwards).
        const oldInGen = this.state.inGenerator;
        const oldInFunc = this.state.inFunction;
        const oldLabels = this.state.labels;
        this.state.inGenerator = false;
        this.state.inFunction = true;
        this.state.labels = [];
        node.body = this.parseBlock(true);
        node.expression = false;
        this.state.inFunction = oldInFunc;
        this.state.inGenerator = oldInGen;
        this.state.labels = oldLabels;
      }
      this.state.inAsync = oldInAsync;

      this.state.inParameters = oldInParameters;
    }

    parseMatchPattern(): N.MatchExpressionPattern | null {
      const basic = this.parseBasicMatchPattern();
      if (basic === null) {
        if (this.match(tt._else)) {
          this.next();
          return "else";
        } else {
          this.unexpected();
          return null;
        }
      } else {
        return basic;
      }
    }

    parseBasicMatchPattern(): N.MatchExpressionPattern | null {
      let node;

      if (this.match(tt.braceL)) {
        return this.parseObjectPattern();
      } else if (this.match(tt.bracketL)) {
        return this.parseArrayPattern();
      } else if (this.match(tt.num)) {
        return this.parseLiteral(this.state.value, "NumericLiteral");
      } else if (this.match(tt.bigint)) {
        return this.parseLiteral(this.state.value, "BigIntLiteral");
      } else if (this.match(tt.string)) {
        return this.parseLiteral(this.state.value, "StringLiteral");
      } else if (this.match(tt._null)) {
        node = this.startNode();
        this.next();
        return this.finishNode(node, "NullLiteral");
      } else if (this.match(tt._true)) {
        return this.parseLiteral(true, "BooleanLiteral");
      } else if (this.match(tt._false)) {
        return this.parseLiteral(false, "BooleanLiteral");
      } else if (this.match(tt.name)) {
        return this.parseIdentifier(false);
      } else {
        return null;
      }
    }

    // '{' ( propertyPattern ',')+ propertyPattern? '}'
    parseObjectPattern(): N.ObjectMatchPattern {
      const node = this.startNode();
      if (!this.eat(tt.braceL)) {
        this.unexpected(this.state.pos, tt.braceL);
      }

      node.children = [];
      node.restIdentifier = null;

      while (!this.match(tt.braceR)) {
        if (this.match(tt.ellipsis)) {
          this.next();
          const id = this.parseIdentifier();
          node.restIdentifier = id;

          if (!this.eat(tt.braceR)) {
            this.unexpected(this.state.pos, tt.braceR);
          }
        } else {
          const pattern = this.parseObjectPropertyPattern();
          node.children.push(pattern);
        }

        // the next token must be close bracket or comma
        if (this.match(tt.comma)) {
          this.next();
        } else if (!this.match(tt.braceR)) {
          this.unexpected(this.state.pos, "comma or braceR");
        }
      }

      this.eat(tt.braceR);
      return this.finishNode(node, "ObjectMatchPattern");
    }

    parseObjectPropertyPattern(): N.ObjectPropertyMatchPattern {
      const node = this.startNode();

      node.key = this.parseIdentifier();
      node.value = null;

      if (this.match(tt.colon)) {
        this.next();
        node.value = this.parseBasicMatchPattern();
        if (node.value === null) {
          this.raise(this.state.pos, "not a correct pattern");
        }
      }

      return this.finishNode(node, "ObjectPropertyMatchPattern");
    }

    // '[' ( pattern ',' )+ pattern? ']'
    parseArrayPattern(): N.ArrayMatchPattern {
      const node = this.startNode();
      if (!this.eat(tt.bracketL)) {
        this.unexpected(this.state.pos, tt.braceL);
      }

      node.children = [];
      node.hasRest = false;

      while (!this.match(tt.bracketR)) {
        if (this.match(tt.ellipsis)) {
          this.next();
          node.hasRest = true;
          if (!this.eat(tt.bracketR)) {
            this.unexpected(this.state.pos, tt.braceR);
          }
          return this.finishNode(node, "ArrayMatchPattern");
        } else {
          const pattern = this.parseBasicMatchPattern();
          node.children.push(pattern);
        }

        // the next token must be close bracket or comma
        if (!this.match(tt.bracketR)) {
          if (!this.eat(tt.comma)) {
            this.unexpected(this.state.pos, tt.comma);
          }
        }
      }

      this.eat(tt.bracketR);
      return this.finishNode(node, "ArrayMatchPattern");
    }
  };
