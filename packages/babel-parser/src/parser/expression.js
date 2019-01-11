// @flow

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

import { types as tt, type TokenType } from "../tokenizer/types";
import * as N from "../types";
import LValParser from "./lval";
import { reservedWords } from "../util/identifier";
import type { Pos, Position } from "../util/location";
import * as charCodes from "charcodes";

export default class ExpressionParser extends LValParser {
  // Forward-declaration: defined in statement.js
  +parseBlock: (allowDirectives?: boolean) => N.BlockStatement;
  +parseClass: (
    node: N.Class,
    isStatement: boolean,
    optionalId?: boolean,
  ) => N.Class;
  +parseDecorators: (allowExport?: boolean) => void;
  +parseFunction: <T: N.NormalFunction>(
    node: T,
    isStatement: boolean,
    allowExpressionBody?: boolean,
    isAsync?: boolean,
    optionalId?: boolean,
  ) => T;
  +parseFunctionParams: (node: N.Function, allowModifiers?: boolean) => void;
  +takeDecorators: (node: N.HasDecorators) => void;

  // Check if property name clashes with already added.
  // Object/class getters and setters are not allowed to clash —
  // either with each other or with an init property — and in
  // strict mode, init properties are also not allowed to be repeated.

  checkPropClash(
    prop: N.ObjectMember,
    propHash: { [key: string]: boolean },
  ): void {
    if (prop.computed || prop.kind) return;

    const key = prop.key;
    // It is either an Identifier or a String/NumericLiteral
    const name = key.type === "Identifier" ? key.name : String(key.value);

    if (name === "__proto__") {
      if (propHash.proto) {
        this.raise(key.start, "Redefinition of __proto__ property");
      }
      propHash.proto = true;
    }
  }

  // Convenience method to parse an Expression only
  getExpression(): N.Expression {
    this.nextToken();
    const expr = this.parseExpression();
    if (!this.match(tt.eof)) {
      this.unexpected();
    }
    expr.comments = this.state.comments;
    return expr;
  }

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function (s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The optional arguments are used to
  // forbid the `in` operator (in for loops initialization expressions)
  // and provide reference for storing '=' operator inside shorthand
  // property assignment in contexts where both object expression
  // and object pattern might appear (so it's possible to raise
  // delayed syntax error at correct position).

  parseExpression(noIn?: boolean, refShorthandDefaultPos?: Pos): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const expr = this.parseMaybeAssign(noIn, refShorthandDefaultPos);
    if (this.match(tt.comma)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.expressions = [expr];
      while (this.eat(tt.comma)) {
        node.expressions.push(
          this.parseMaybeAssign(noIn, refShorthandDefaultPos),
        );
      }
      this.toReferencedList(node.expressions);
      return this.finishNode(node, "SequenceExpression");
    }
    return expr;
  }

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  parseMaybeAssign(
    noIn?: ?boolean,
    refShorthandDefaultPos?: ?Pos,
    afterLeftParse?: Function,
    refNeedsArrowPos?: ?Pos,
  ): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    if (this.match(tt._yield) && this.state.inGenerator) {
      let left = this.parseYield();
      if (afterLeftParse) {
        left = afterLeftParse.call(this, left, startPos, startLoc);
      }
      return left;
    }

    const oldCommaAfterSpreadAt = this.state.commaAfterSpreadAt;
    this.state.commaAfterSpreadAt = -1;

    let failOnShorthandAssign;
    if (refShorthandDefaultPos) {
      failOnShorthandAssign = false;
    } else {
      refShorthandDefaultPos = { start: 0 };
      failOnShorthandAssign = true;
    }

    if (this.match(tt.parenL) || this.match(tt.name) || this.match(tt._yield)) {
      this.state.potentialArrowAt = this.state.start;
    }

    let left = this.parseMaybeConditional(
      noIn,
      refShorthandDefaultPos,
      refNeedsArrowPos,
    );
    if (afterLeftParse) {
      left = afterLeftParse.call(this, left, startPos, startLoc);
    }
    if (this.state.type.isAssign) {
      const node = this.startNodeAt(startPos, startLoc);
      const operator = this.state.value;
      node.operator = operator;

      if (operator === "??=") {
        this.expectPlugin("nullishCoalescingOperator");
        this.expectPlugin("logicalAssignment");
      }
      if (operator === "||=" || operator === "&&=") {
        this.expectPlugin("logicalAssignment");
      }
      node.left = this.match(tt.eq)
        ? this.toAssignable(left, undefined, "assignment expression")
        : left;
      refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly

      this.checkLVal(left, undefined, undefined, "assignment expression");

      let patternErrorMsg;
      let elementName;
      if (left.type === "ObjectPattern") {
        patternErrorMsg = "`({a}) = 0` use `({a} = 0)`";
        elementName = "property";
      } else if (left.type === "ArrayPattern") {
        patternErrorMsg = "`([a]) = 0` use `([a] = 0)`";
        elementName = "element";
      }

      if (patternErrorMsg && left.extra && left.extra.parenthesized) {
        this.raise(
          left.start,
          `You're trying to assign to a parenthesized expression, eg. instead of ${patternErrorMsg}`,
        );
      }

      if (elementName) this.checkCommaAfterRestFromSpread(elementName);
      this.state.commaAfterSpreadAt = oldCommaAfterSpreadAt;

      this.next();
      node.right = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "AssignmentExpression");
    } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }

    this.state.commaAfterSpreadAt = oldCommaAfterSpreadAt;

    return left;
  }

  // Parse a ternary conditional (`?:`) operator.

  parseMaybeConditional(
    noIn: ?boolean,
    refShorthandDefaultPos: Pos,
    refNeedsArrowPos?: ?Pos,
  ): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const potentialArrowAt = this.state.potentialArrowAt;
    const expr = this.parseExprOps(noIn, refShorthandDefaultPos);

    if (
      expr.type === "ArrowFunctionExpression" &&
      expr.start === potentialArrowAt
    ) {
      return expr;
    }
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;

    return this.parseConditional(
      expr,
      noIn,
      startPos,
      startLoc,
      refNeedsArrowPos,
    );
  }

  parseConditional(
    expr: N.Expression,
    noIn: ?boolean,
    startPos: number,
    startLoc: Position,
    // FIXME: Disabling this for now since can't seem to get it to play nicely
    // eslint-disable-next-line no-unused-vars
    refNeedsArrowPos?: ?Pos,
  ): N.Expression {
    if (this.eat(tt.question)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(tt.colon);
      node.alternate = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  }

  // Start the precedence parser.

  parseExprOps(noIn: ?boolean, refShorthandDefaultPos: Pos): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    const potentialArrowAt = this.state.potentialArrowAt;
    const expr = this.parseMaybeUnary(refShorthandDefaultPos);

    if (
      expr.type === "ArrowFunctionExpression" &&
      expr.start === potentialArrowAt
    ) {
      return expr;
    }
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
      return expr;
    }

    return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
  }

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  parseExprOp(
    left: N.Expression,
    leftStartPos: number,
    leftStartLoc: Position,
    minPrec: number,
    noIn: ?boolean,
  ): N.Expression {
    const prec = this.state.type.binop;
    if (prec != null && (!noIn || !this.match(tt._in))) {
      if (prec > minPrec) {
        const node = this.startNodeAt(leftStartPos, leftStartLoc);
        const operator = this.state.value;
        node.left = left;
        node.operator = operator;

        if (
          operator === "**" &&
          left.type === "UnaryExpression" &&
          !(left.extra && left.extra.parenthesized)
        ) {
          this.raise(
            left.argument.start,
            "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
          );
        }

        const op = this.state.type;

        if (op === tt.pipeline) {
          this.expectPlugin("pipelineOperator");
          this.state.inPipeline = true;
          this.checkPipelineAtInfixOperator(left, leftStartPos);
        } else if (op === tt.nullishCoalescing) {
          this.expectPlugin("nullishCoalescingOperator");
        }

        this.next();

        if (
          op === tt.pipeline &&
          this.getPluginOption("pipelineOperator", "proposal") === "minimal"
        ) {
          if (
            this.match(tt.name) &&
            this.state.value === "await" &&
            this.state.inAsync
          ) {
            throw this.raise(
              this.state.start,
              `Unexpected "await" after pipeline body; await must have parentheses in minimal proposal`,
            );
          }
        }

        node.right = this.parseExprOpRightExpr(op, prec, noIn);

        this.finishNode(
          node,
          op === tt.logicalOR ||
            op === tt.logicalAND ||
            op === tt.nullishCoalescing
            ? "LogicalExpression"
            : "BinaryExpression",
        );

        return this.parseExprOp(
          node,
          leftStartPos,
          leftStartLoc,
          minPrec,
          noIn,
        );
      }
    }
    return left;
  }

  // Helper function for `parseExprOp`. Parse the right-hand side of binary-
  // operator expressions, then apply any operator-specific functions.

  parseExprOpRightExpr(
    op: TokenType,
    prec: number,
    noIn: ?boolean,
  ): N.Expression {
    switch (op) {
      case tt.pipeline:
        if (this.getPluginOption("pipelineOperator", "proposal") === "smart") {
          const startPos = this.state.start;
          const startLoc = this.state.startLoc;
          return this.withTopicPermittingContext(() => {
            return this.parseSmartPipelineBody(
              this.parseExprOpBaseRightExpr(op, prec, noIn),
              startPos,
              startLoc,
            );
          });
        }
      // falls through

      default:
        return this.parseExprOpBaseRightExpr(op, prec, noIn);
    }
  }

  // Helper function for `parseExprOpRightExpr`. Parse the right-hand side of
  // binary-operator expressions without applying any operator-specific functions.

  parseExprOpBaseRightExpr(
    op: TokenType,
    prec: number,
    noIn: ?boolean,
  ): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;

    return this.parseExprOp(
      this.parseMaybeUnary(),
      startPos,
      startLoc,
      op.rightAssociative ? prec - 1 : prec,
      noIn,
    );
  }

  // Parse unary operators, both prefix and postfix.

  parseMaybeUnary(refShorthandDefaultPos: ?Pos): N.Expression {
    if (this.state.type.prefix) {
      const node = this.startNode();
      const update = this.match(tt.incDec);
      node.operator = this.state.value;
      node.prefix = true;

      if (node.operator === "throw") {
        this.expectPlugin("throwExpressions");
      }
      this.next();

      node.argument = this.parseMaybeUnary();

      if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
        this.unexpected(refShorthandDefaultPos.start);
      }

      if (update) {
        this.checkLVal(node.argument, undefined, undefined, "prefix operation");
      } else if (this.state.strict && node.operator === "delete") {
        const arg = node.argument;

        if (arg.type === "Identifier") {
          this.raise(node.start, "Deleting local variable in strict mode");
        } else if (
          arg.type === "MemberExpression" &&
          arg.property.type === "PrivateName"
        ) {
          this.raise(node.start, "Deleting a private field is not allowed");
        }
      }

      return this.finishNode(
        node,
        update ? "UpdateExpression" : "UnaryExpression",
      );
    }

    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    let expr = this.parseExprSubscripts(refShorthandDefaultPos);
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
    while (this.state.type.postfix && !this.canInsertSemicolon()) {
      const node = this.startNodeAt(startPos, startLoc);
      node.operator = this.state.value;
      node.prefix = false;
      node.argument = expr;
      this.checkLVal(expr, undefined, undefined, "postfix operation");
      this.next();
      expr = this.finishNode(node, "UpdateExpression");
    }
    return expr;
  }

  // Parse call, dot, and `[]`-subscript expressions.

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

    return this.parseSubscripts(expr, startPos, startLoc);
  }

  parseSubscripts(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    noCalls?: ?boolean,
  ): N.Expression {
    const state = {
      optionalChainMember: false,
      stop: false,
    };
    do {
      base = this.parseSubscript(base, startPos, startLoc, noCalls, state);
    } while (!state.stop);
    return base;
  }

  /**
   * @param state Set 'state.stop = true' to indicate that we should stop parsing subscripts.
   *   state.optionalChainMember to indicate that the member is currently in OptionalChain
   */
  parseSubscript(
    base: N.Expression,
    startPos: number,
    startLoc: Position,
    noCalls: ?boolean,
    state: N.ParseSubscriptState,
  ): N.Expression {
    if (!noCalls && this.eat(tt.doubleColon)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.callee = this.parseNoCallExpr();
      state.stop = true;
      return this.parseSubscripts(
        this.finishNode(node, "BindExpression"),
        startPos,
        startLoc,
        noCalls,
      );
    } else if (this.match(tt.questionDot)) {
      this.expectPlugin("optionalChaining");
      state.optionalChainMember = true;
      if (noCalls && this.lookahead().type == tt.parenL) {
        state.stop = true;
        return base;
      }
      this.next();

      const node = this.startNodeAt(startPos, startLoc);

      if (this.eat(tt.bracketL)) {
        node.object = base;
        node.property = this.parseExpression();
        node.computed = true;
        node.optional = true;
        this.expect(tt.bracketR);
        return this.finishNode(node, "OptionalMemberExpression");
      } else if (this.eat(tt.parenL)) {
        const possibleAsync = this.atPossibleAsync(base);

        node.callee = base;
        node.arguments = this.parseCallExpressionArguments(
          tt.parenR,
          possibleAsync,
        );
        node.optional = true;
        return this.finishNode(node, "OptionalCallExpression");
      } else {
        node.object = base;
        node.property = this.parseIdentifier(true);
        node.computed = false;
        node.optional = true;
        return this.finishNode(node, "OptionalMemberExpression");
      }
    } else if (this.eat(tt.dot)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = this.parseMaybePrivateName();
      node.computed = false;
      if (state.optionalChainMember) {
        node.optional = false;
        return this.finishNode(node, "OptionalMemberExpression");
      }
      return this.finishNode(node, "MemberExpression");
    } else if (this.eat(tt.bracketL)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = this.parseExpression();
      node.computed = true;
      this.expect(tt.bracketR);
      if (state.optionalChainMember) {
        node.optional = false;
        return this.finishNode(node, "OptionalMemberExpression");
      }
      return this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.match(tt.parenL)) {
      const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
      const oldYOAIPAP = this.state.yieldOrAwaitInPossibleArrowParameters;
      this.state.maybeInArrowParameters = true;
      this.state.yieldOrAwaitInPossibleArrowParameters = null;

      const possibleAsync = this.atPossibleAsync(base);
      this.next();

      let node = this.startNodeAt(startPos, startLoc);
      node.callee = base;

      const oldCommaAfterSpreadAt = this.state.commaAfterSpreadAt;
      this.state.commaAfterSpreadAt = -1;

      node.arguments = this.parseCallExpressionArguments(
        tt.parenR,
        possibleAsync,
      );
      if (!state.optionalChainMember) {
        this.finishCallExpression(node);
      } else {
        this.finishOptionalCallExpression(node);
      }

      if (possibleAsync && this.shouldParseAsyncArrow()) {
        state.stop = true;

        this.checkCommaAfterRestFromSpread("parameter");

        node = this.parseAsyncArrowFromCallExpression(
          this.startNodeAt(startPos, startLoc),
          node,
        );
        this.state.yieldOrAwaitInPossibleArrowParameters = oldYOAIPAP;
      } else {
        this.toReferencedListDeep(node.arguments);

        // We keep the old value if it isn't null, for cases like
        //   (x = async(yield)) => {}
        this.state.yieldOrAwaitInPossibleArrowParameters =
          this.state.yieldOrAwaitInPossibleArrowParameters || oldYOAIPAP;
      }

      this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
      this.state.commaAfterSpreadAt = oldCommaAfterSpreadAt;

      return node;
    } else if (this.match(tt.backQuote)) {
      return this.parseTaggedTemplateExpression(
        startPos,
        startLoc,
        base,
        state,
      );
    } else {
      state.stop = true;
      return base;
    }
  }

  parseTaggedTemplateExpression(
    startPos: number,
    startLoc: Position,
    base: N.Expression,
    state: N.ParseSubscriptState,
    typeArguments?: ?N.TsTypeParameterInstantiation,
  ): N.TaggedTemplateExpression {
    const node: N.TaggedTemplateExpression = this.startNodeAt(
      startPos,
      startLoc,
    );
    node.tag = base;
    node.quasi = this.parseTemplate(true);
    if (typeArguments) node.typeParameters = typeArguments;
    if (state.optionalChainMember) {
      this.raise(
        startPos,
        "Tagged Template Literals are not allowed in optionalChain",
      );
    }
    return this.finishNode(node, "TaggedTemplateExpression");
  }

  atPossibleAsync(base: N.Expression): boolean {
    return (
      !this.state.containsEsc &&
      this.state.potentialArrowAt === base.start &&
      base.type === "Identifier" &&
      base.name === "async" &&
      !this.canInsertSemicolon()
    );
  }

  finishCallExpression(node: N.CallExpression): N.CallExpression {
    if (node.callee.type === "Import") {
      if (node.arguments.length !== 1) {
        this.raise(node.start, "import() requires exactly one argument");
      }

      const importArg = node.arguments[0];
      if (importArg && importArg.type === "SpreadElement") {
        this.raise(importArg.start, "... is not allowed in import()");
      }
    }
    return this.finishNode(node, "CallExpression");
  }

  finishOptionalCallExpression(node: N.CallExpression): N.CallExpression {
    if (node.callee.type === "Import") {
      if (node.arguments.length !== 1) {
        this.raise(node.start, "import() requires exactly one argument");
      }

      const importArg = node.arguments[0];
      if (importArg && importArg.type === "SpreadElement") {
        this.raise(importArg.start, "... is not allowed in import()");
      }
    }
    return this.finishNode(node, "OptionalCallExpression");
  }

  parseCallExpressionArguments(
    close: TokenType,
    possibleAsyncArrow: boolean,
  ): $ReadOnlyArray<?N.Expression> {
    const elts = [];
    let innerParenStart;
    let first = true;

    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.eat(close)) break;
      }

      // we need to make sure that if this is an async arrow functions,
      // that we don't allow inner parens inside the params
      if (this.match(tt.parenL) && !innerParenStart) {
        innerParenStart = this.state.start;
      }

      elts.push(
        this.parseExprListItem(
          false,
          possibleAsyncArrow ? { start: 0 } : undefined,
          possibleAsyncArrow ? { start: 0 } : undefined,
        ),
      );
    }

    // we found an async arrow function so let's not allow any inner parens
    if (possibleAsyncArrow && innerParenStart && this.shouldParseAsyncArrow()) {
      this.unexpected();
    }

    return elts;
  }

  shouldParseAsyncArrow(): boolean {
    return this.match(tt.arrow);
  }

  parseAsyncArrowFromCallExpression(
    node: N.ArrowFunctionExpression,
    call: N.CallExpression,
  ): N.ArrowFunctionExpression {
    this.expect(tt.arrow);
    this.parseArrowExpression(node, call.arguments, true);
    return node;
  }

  // Parse a no-call expression (like argument of `new` or `::` operators).

  parseNoCallExpr(): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;
    return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
  }

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  parseExprAtom(refShorthandDefaultPos?: ?Pos): N.Expression {
    // If a division operator appears in an expression position, the
    // tokenizer got confused, and we force it to read a regexp instead.
    if (this.state.type === tt.slash) this.readRegexp();

    const canBeArrow = this.state.potentialArrowAt === this.state.start;
    let node;

    switch (this.state.type) {
      case tt._super:
        if (
          !this.state.inMethod &&
          !this.state.inClassProperty &&
          !this.options.allowSuperOutsideMethod
        ) {
          this.raise(
            this.state.start,
            "super is only allowed in object methods and classes",
          );
        }

        node = this.startNode();
        this.next();
        if (
          !this.match(tt.parenL) &&
          !this.match(tt.bracketL) &&
          !this.match(tt.dot)
        ) {
          this.unexpected();
        }
        if (
          this.match(tt.parenL) &&
          this.state.inMethod !== "constructor" &&
          !this.options.allowSuperOutsideMethod
        ) {
          this.raise(
            node.start,
            "super() is only valid inside a class constructor. " +
              "Make sure the method name is spelled exactly as 'constructor'.",
          );
        }
        return this.finishNode(node, "Super");

      case tt._import:
        if (this.lookahead().type === tt.dot) {
          return this.parseImportMetaProperty();
        }

        this.expectPlugin("dynamicImport");

        node = this.startNode();
        this.next();
        if (!this.match(tt.parenL)) {
          this.unexpected(null, tt.parenL);
        }
        return this.finishNode(node, "Import");

      case tt._this:
        node = this.startNode();
        this.next();
        return this.finishNode(node, "ThisExpression");

      case tt._yield:
        if (this.state.inGenerator) this.unexpected();

      case tt.name: {
        node = this.startNode();
        const allowAwait =
          this.state.value === "await" &&
          (this.state.inAsync ||
            (!this.state.inFunction && this.options.allowAwaitOutsideFunction));

        const containsEsc = this.state.containsEsc;
        const allowYield = this.shouldAllowYieldIdentifier();
        const id = this.parseIdentifier(allowAwait || allowYield);

        if (id.name === "await") {
          if (
            this.state.inAsync ||
            this.inModule ||
            (!this.state.inFunction && this.options.allowAwaitOutsideFunction)
          ) {
            return this.parseAwait(node);
          }
        } else if (
          !containsEsc &&
          id.name === "async" &&
          this.match(tt._function) &&
          !this.canInsertSemicolon()
        ) {
          this.next();
          return this.parseFunction(node, false, false, true);
        } else if (
          canBeArrow &&
          !this.canInsertSemicolon() &&
          id.name === "async" &&
          this.match(tt.name)
        ) {
          const oldYOAIPAP = this.state.yieldOrAwaitInPossibleArrowParameters;
          const oldInAsync = this.state.inAsync;
          this.state.yieldOrAwaitInPossibleArrowParameters = null;
          this.state.inAsync = true;
          const params = [this.parseIdentifier()];
          this.expect(tt.arrow);
          // let foo = async bar => {};
          this.parseArrowExpression(node, params, true);
          this.state.yieldOrAwaitInPossibleArrowParameters = oldYOAIPAP;
          this.state.inAsync = oldInAsync;
          return node;
        }

        if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) {
          const oldYOAIPAP = this.state.yieldOrAwaitInPossibleArrowParameters;
          this.state.yieldOrAwaitInPossibleArrowParameters = null;
          this.parseArrowExpression(node, [id]);
          this.state.yieldOrAwaitInPossibleArrowParameters = oldYOAIPAP;
          return node;
        }

        return id;
      }

      case tt._do: {
        this.expectPlugin("doExpressions");
        const node = this.startNode();
        this.next();
        const oldInFunction = this.state.inFunction;
        const oldLabels = this.state.labels;
        this.state.labels = [];
        this.state.inFunction = false;
        node.body = this.parseBlock(false);
        this.state.inFunction = oldInFunction;
        this.state.labels = oldLabels;
        return this.finishNode(node, "DoExpression");
      }

      case tt.regexp: {
        const value = this.state.value;
        node = this.parseLiteral(value.value, "RegExpLiteral");
        node.pattern = value.pattern;
        node.flags = value.flags;
        return node;
      }

      case tt.num:
        return this.parseLiteral(this.state.value, "NumericLiteral");

      case tt.bigint:
        return this.parseLiteral(this.state.value, "BigIntLiteral");

      case tt.string:
        return this.parseLiteral(this.state.value, "StringLiteral");

      case tt._null:
        node = this.startNode();
        this.next();
        return this.finishNode(node, "NullLiteral");

      case tt._true:
      case tt._false:
        return this.parseBooleanLiteral();

      case tt.parenL:
        return this.parseParenAndDistinguishExpression(canBeArrow);

      case tt.bracketL:
        node = this.startNode();
        this.next();
        node.elements = this.parseExprList(
          tt.bracketR,
          true,
          refShorthandDefaultPos,
        );
        if (!this.state.maybeInArrowParameters) {
          // This could be an array pattern:
          //   ([a: string, b: string]) => {}
          // In this case, we don't have to call toReferencedList. We will
          // call it, if needed, when we are sure that it is a parenthesized
          // expression by calling toReferencedListDeep.
          this.toReferencedList(node.elements);
        }
        return this.finishNode(node, "ArrayExpression");

      case tt.braceL:
        return this.parseObj(false, refShorthandDefaultPos);

      case tt._function:
        return this.parseFunctionExpression();

      case tt.at:
        this.parseDecorators();

      case tt._class:
        node = this.startNode();
        this.takeDecorators(node);
        return this.parseClass(node, false);

      case tt._new:
        return this.parseNew();

      case tt.backQuote:
        return this.parseTemplate(false);

      case tt.doubleColon: {
        node = this.startNode();
        this.next();
        node.object = null;
        const callee = (node.callee = this.parseNoCallExpr());
        if (callee.type === "MemberExpression") {
          return this.finishNode(node, "BindExpression");
        } else {
          throw this.raise(
            callee.start,
            "Binding should be performed on object property.",
          );
        }
      }

      case tt.hash: {
        if (this.state.inPipeline) {
          node = this.startNode();

          if (
            this.getPluginOption("pipelineOperator", "proposal") !== "smart"
          ) {
            this.raise(
              node.start,
              "Primary Topic Reference found but pipelineOperator not passed 'smart' for 'proposal' option.",
            );
          }

          this.next();
          if (this.primaryTopicReferenceIsAllowedInCurrentTopicContext()) {
            this.registerTopicReference();
            return this.finishNode(node, "PipelinePrimaryTopicReference");
          } else {
            throw this.raise(
              node.start,
              `Topic reference was used in a lexical context without topic binding`,
            );
          }
        }
      }

      default:
        throw this.unexpected();
    }
  }

  parseBooleanLiteral(): N.BooleanLiteral {
    const node = this.startNode();
    node.value = this.match(tt._true);
    this.next();
    return this.finishNode(node, "BooleanLiteral");
  }

  parseMaybePrivateName(): N.PrivateName | N.Identifier {
    const isPrivate = this.match(tt.hash);

    if (isPrivate) {
      this.expectOnePlugin(["classPrivateProperties", "classPrivateMethods"]);
      const node = this.startNode();
      const columnHashEnd = this.state.end;
      this.next();
      const columnIdentifierStart = this.state.start;

      const spacesBetweenHashAndIdentifier =
        columnIdentifierStart - columnHashEnd;
      if (spacesBetweenHashAndIdentifier != 0) {
        this.raise(
          columnIdentifierStart,
          "Unexpected space between # and identifier",
        );
      }

      node.id = this.parseIdentifier(true);
      return this.finishNode(node, "PrivateName");
    } else {
      return this.parseIdentifier(true);
    }
  }

  parseFunctionExpression(): N.FunctionExpression | N.MetaProperty {
    const node = this.startNode();

    // We do not do parseIdentifier here because when parseFunctionExpression
    // is called we already know that the current token is a "name" with the value "function"
    // This will improve perf a tiny little bit as we do not do validation but more importantly
    // here is that parseIdentifier will remove an item from the expression stack
    // if "function" or "class" is parsed as identifier (in objects e.g.), which should not happen here.
    let meta = this.startNode();
    this.next();
    meta = this.createIdentifier(meta, "function");

    if (this.state.inGenerator && this.eat(tt.dot)) {
      return this.parseMetaProperty(node, meta, "sent");
    }
    return this.parseFunction(node, false);
  }

  parseMetaProperty(
    node: N.MetaProperty,
    meta: N.Identifier,
    propertyName: string,
  ): N.MetaProperty {
    node.meta = meta;

    if (meta.name === "function" && propertyName === "sent") {
      if (this.isContextual(propertyName)) {
        this.expectPlugin("functionSent");
      } else if (!this.hasPlugin("functionSent")) {
        // The code wasn't `function.sent` but just `function.`, so a simple error is less confusing.
        this.unexpected();
      }
    }

    const containsEsc = this.state.containsEsc;

    node.property = this.parseIdentifier(true);

    if (node.property.name !== propertyName || containsEsc) {
      this.raise(
        node.property.start,
        `The only valid meta property for ${meta.name} is ${
          meta.name
        }.${propertyName}`,
      );
    }

    return this.finishNode(node, "MetaProperty");
  }

  parseImportMetaProperty(): N.MetaProperty {
    const node = this.startNode();
    const id = this.parseIdentifier(true);
    this.expect(tt.dot);

    if (id.name === "import") {
      if (this.isContextual("meta")) {
        this.expectPlugin("importMeta");
      } else if (!this.hasPlugin("importMeta")) {
        this.raise(
          id.start,
          `Dynamic imports require a parameter: import('a.js')`,
        );
      }
    }

    if (!this.inModule) {
      this.raise(
        id.start,
        `import.meta may appear only with 'sourceType: "module"'`,
        { code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED" },
      );
    }
    this.sawUnambiguousESM = true;

    return this.parseMetaProperty(node, id, "meta");
  }

  parseLiteral<T: N.Literal>(
    value: any,
    type: /*T["kind"]*/ string,
    startPos?: number,
    startLoc?: Position,
  ): T {
    startPos = startPos || this.state.start;
    startLoc = startLoc || this.state.startLoc;

    const node = this.startNodeAt(startPos, startLoc);
    this.addExtra(node, "rawValue", value);
    this.addExtra(node, "raw", this.input.slice(startPos, this.state.end));
    node.value = value;
    this.next();
    return this.finishNode(node, type);
  }

  parseParenExpression(): N.Expression {
    this.expect(tt.parenL);
    const val = this.parseExpression();
    this.expect(tt.parenR);
    return val;
  }

  parseParenAndDistinguishExpression(canBeArrow: boolean): N.Expression {
    const startPos = this.state.start;
    const startLoc = this.state.startLoc;

    let val;
    this.expect(tt.parenL);

    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    const oldYOAIPAP = this.state.yieldOrAwaitInPossibleArrowParameters;
    this.state.maybeInArrowParameters = true;
    this.state.yieldOrAwaitInPossibleArrowParameters = null;

    const innerStartPos = this.state.start;
    const innerStartLoc = this.state.startLoc;
    const exprList = [];
    const refShorthandDefaultPos = { start: 0 };
    const refNeedsArrowPos = { start: 0 };
    let first = true;
    let spreadStart;
    let optionalCommaStart;

    while (!this.match(tt.parenR)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma, refNeedsArrowPos.start || null);
        if (this.match(tt.parenR)) {
          optionalCommaStart = this.state.start;
          break;
        }
      }

      if (this.match(tt.ellipsis)) {
        const spreadNodeStartPos = this.state.start;
        const spreadNodeStartLoc = this.state.startLoc;
        spreadStart = this.state.start;
        exprList.push(
          this.parseParenItem(
            this.parseRest(),
            spreadNodeStartPos,
            spreadNodeStartLoc,
          ),
        );

        this.checkCommaAfterRest(tt.parenR, "parameter");

        break;
      } else {
        exprList.push(
          this.parseMaybeAssign(
            false,
            refShorthandDefaultPos,
            this.parseParenItem,
            refNeedsArrowPos,
          ),
        );
      }
    }

    const innerEndPos = this.state.start;
    const innerEndLoc = this.state.startLoc;
    this.expect(tt.parenR);

    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;

    let arrowNode = this.startNodeAt(startPos, startLoc);
    if (
      canBeArrow &&
      this.shouldParseArrow() &&
      (arrowNode = this.parseArrow(arrowNode))
    ) {
      for (const param of exprList) {
        if (param.extra && param.extra.parenthesized) {
          this.unexpected(param.extra.parenStart);
        }
      }

      this.parseArrowExpression(arrowNode, exprList);
      this.state.yieldOrAwaitInPossibleArrowParameters = oldYOAIPAP;
      return arrowNode;
    }

    // We keep the old value if it isn't null, for cases like
    //   (x = (yield)) => {}
    this.state.yieldOrAwaitInPossibleArrowParameters =
      this.state.yieldOrAwaitInPossibleArrowParameters || oldYOAIPAP;

    if (!exprList.length) {
      this.unexpected(this.state.lastTokStart);
    }
    if (optionalCommaStart) this.unexpected(optionalCommaStart);
    if (spreadStart) this.unexpected(spreadStart);
    if (refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }
    if (refNeedsArrowPos.start) this.unexpected(refNeedsArrowPos.start);

    this.toReferencedListDeep(exprList, /* isParenthesizedExpr */ true);
    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }

    this.addExtra(val, "parenthesized", true);
    this.addExtra(val, "parenStart", startPos);

    return val;
  }

  shouldParseArrow(): boolean {
    return !this.canInsertSemicolon();
  }

  parseArrow(node: N.ArrowFunctionExpression): ?N.ArrowFunctionExpression {
    if (this.eat(tt.arrow)) {
      return node;
    }
  }

  parseParenItem(
    node: N.Expression,
    startPos: number, // eslint-disable-line no-unused-vars
    startLoc: Position, // eslint-disable-line no-unused-vars
  ): N.Expression {
    return node;
  }

  // New's precedence is slightly tricky. It must allow its argument to
  // be a `[]` or dot subscript expression, but not a call — at least,
  // not without wrapping it in parentheses. Thus, it uses the noCalls
  // argument to parseSubscripts to prevent it from consuming the
  // argument list.

  parseNew(): N.NewExpression | N.MetaProperty {
    const node = this.startNode();
    const meta = this.parseIdentifier(true);

    if (this.eat(tt.dot)) {
      const metaProp = this.parseMetaProperty(node, meta, "target");

      if (!this.state.inFunction && !this.state.inClassProperty) {
        let error = "new.target can only be used in functions";

        if (this.hasPlugin("classProperties")) {
          error += " or class properties";
        }

        this.raise(metaProp.start, error);
      }

      return metaProp;
    }

    node.callee = this.parseNoCallExpr();

    if (node.callee.type === "Import") {
      this.raise(node.callee.start, "import(...) can't be constructed");
    } else if (
      node.callee.type === "OptionalMemberExpression" ||
      node.callee.type === "OptionalCallExpression"
    ) {
      this.raise(
        this.state.lastTokEnd,
        "constructors in/after an Optional Chain are not allowed",
      );
    } else if (this.eat(tt.questionDot)) {
      this.raise(
        this.state.start,
        "constructors in/after an Optional Chain are not allowed",
      );
    }

    this.parseNewArguments(node);
    return this.finishNode(node, "NewExpression");
  }

  parseNewArguments(node: N.NewExpression): void {
    if (this.eat(tt.parenL)) {
      const args = this.parseExprList(tt.parenR);
      this.toReferencedList(args);
      // $FlowFixMe (parseExprList should be all non-null in this case)
      node.arguments = args;
    } else {
      node.arguments = [];
    }
  }

  // Parse template expression.

  parseTemplateElement(isTagged: boolean): N.TemplateElement {
    const elem = this.startNode();
    if (this.state.value === null) {
      if (!isTagged) {
        // TODO: fix this
        this.raise(
          this.state.invalidTemplateEscapePosition || 0,
          "Invalid escape sequence in template",
        );
      } else {
        this.state.invalidTemplateEscapePosition = null;
      }
    }
    elem.value = {
      raw: this.input
        .slice(this.state.start, this.state.end)
        .replace(/\r\n?/g, "\n"),
      cooked: this.state.value,
    };
    this.next();
    elem.tail = this.match(tt.backQuote);
    return this.finishNode(elem, "TemplateElement");
  }

  parseTemplate(isTagged: boolean): N.TemplateLiteral {
    const node = this.startNode();
    this.next();
    node.expressions = [];
    let curElt = this.parseTemplateElement(isTagged);
    node.quasis = [curElt];
    while (!curElt.tail) {
      this.expect(tt.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(tt.braceR);
      node.quasis.push((curElt = this.parseTemplateElement(isTagged)));
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral");
  }

  // Parse an object literal or binding pattern.

  parseObj<T: N.ObjectPattern | N.ObjectExpression>(
    isPattern: boolean,
    refShorthandDefaultPos?: ?Pos,
  ): T {
    let decorators = [];
    const propHash: any = Object.create(null);
    let first = true;
    const node = this.startNode();

    node.properties = [];
    this.next();

    while (!this.eat(tt.braceR)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.eat(tt.braceR)) break;
      }

      if (this.match(tt.at)) {
        if (this.hasPlugin("decorators")) {
          this.raise(
            this.state.start,
            "Stage 2 decorators disallow object literal property decorators",
          );
        } else {
          // we needn't check if decorators (stage 0) plugin is enabled since it's checked by
          // the call to this.parseDecorator
          while (this.match(tt.at)) {
            decorators.push(this.parseDecorator());
          }
        }
      }

      let prop = this.startNode(),
        isGenerator = false,
        isAsync = false,
        startPos,
        startLoc;
      if (decorators.length) {
        prop.decorators = decorators;
        decorators = [];
      }

      if (this.match(tt.ellipsis)) {
        prop = this.parseSpread(isPattern ? { start: 0 } : undefined);
        node.properties.push(prop);
        if (isPattern) {
          this.toAssignable(prop, true, "object pattern");
          this.checkCommaAfterRest(tt.braceR, "property");
          this.expect(tt.braceR);
          break;
        }
        continue;
      }

      prop.method = false;

      if (isPattern || refShorthandDefaultPos) {
        startPos = this.state.start;
        startLoc = this.state.startLoc;
      }

      if (!isPattern) {
        isGenerator = this.eat(tt.star);
      }

      const containsEsc = this.state.containsEsc;

      if (!isPattern && this.isContextual("async")) {
        if (isGenerator) this.unexpected();

        const asyncId = this.parseIdentifier();
        if (
          this.match(tt.colon) ||
          this.match(tt.parenL) ||
          this.match(tt.braceR) ||
          this.match(tt.eq) ||
          this.match(tt.comma)
        ) {
          prop.key = asyncId;
          prop.computed = false;
        } else {
          isAsync = true;
          isGenerator = this.eat(tt.star);
          this.parsePropertyName(prop);
        }
      } else {
        this.parsePropertyName(prop);
      }

      this.parseObjPropValue(
        prop,
        startPos,
        startLoc,
        isGenerator,
        isAsync,
        isPattern,
        refShorthandDefaultPos,
        containsEsc,
      );
      this.checkPropClash(prop, propHash);

      if (prop.shorthand) {
        this.addExtra(prop, "shorthand", true);
      }

      node.properties.push(prop);
    }

    if (decorators.length) {
      this.raise(
        this.state.start,
        "You have trailing decorators with no property",
      );
    }

    return this.finishNode(
      node,
      isPattern ? "ObjectPattern" : "ObjectExpression",
    );
  }

  isGetterOrSetterMethod(prop: N.ObjectMethod, isPattern: boolean): boolean {
    return (
      !isPattern &&
      !prop.computed &&
      prop.key.type === "Identifier" &&
      (prop.key.name === "get" || prop.key.name === "set") &&
      (this.match(tt.string) || // get "string"() {}
      this.match(tt.num) || // get 1() {}
      this.match(tt.bracketL) || // get ["string"]() {}
      this.match(tt.name) || // get foo() {}
        !!this.state.type.keyword) // get debugger() {}
    );
  }

  // get methods aren't allowed to have any parameters
  // set methods must have exactly 1 parameter which is not a rest parameter
  checkGetterSetterParams(method: N.ObjectMethod | N.ClassMethod): void {
    const paramCount = method.kind === "get" ? 0 : 1;
    const start = method.start;
    if (method.params.length !== paramCount) {
      if (method.kind === "get") {
        this.raise(start, "getter must not have any formal parameters");
      } else {
        this.raise(start, "setter must have exactly one formal parameter");
      }
    }

    if (method.kind === "set" && method.params[0].type === "RestElement") {
      this.raise(
        start,
        "setter function argument must not be a rest parameter",
      );
    }
  }

  parseObjectMethod(
    prop: N.ObjectMethod,
    isGenerator: boolean,
    isAsync: boolean,
    isPattern: boolean,
    containsEsc: boolean,
  ): ?N.ObjectMethod {
    if (isAsync || isGenerator || this.match(tt.parenL)) {
      if (isPattern) this.unexpected();
      prop.kind = "method";
      prop.method = true;
      return this.parseMethod(
        prop,
        isGenerator,
        isAsync,
        /* isConstructor */ false,
        "ObjectMethod",
      );
    }

    if (!containsEsc && this.isGetterOrSetterMethod(prop, isPattern)) {
      if (isGenerator || isAsync) this.unexpected();
      prop.kind = prop.key.name;
      this.parsePropertyName(prop);
      this.parseMethod(
        prop,
        /* isGenerator */ false,
        /* isAsync */ false,
        /* isConstructor */ false,
        "ObjectMethod",
      );
      this.checkGetterSetterParams(prop);
      return prop;
    }
  }

  parseObjectProperty(
    prop: N.ObjectProperty,
    startPos: ?number,
    startLoc: ?Position,
    isPattern: boolean,
    refShorthandDefaultPos: ?Pos,
  ): ?N.ObjectProperty {
    prop.shorthand = false;

    if (this.eat(tt.colon)) {
      prop.value = isPattern
        ? this.parseMaybeDefault(this.state.start, this.state.startLoc)
        : this.parseMaybeAssign(false, refShorthandDefaultPos);

      return this.finishNode(prop, "ObjectProperty");
    }

    if (!prop.computed && prop.key.type === "Identifier") {
      this.checkReservedWord(prop.key.name, prop.key.start, true, true);

      if (isPattern) {
        prop.value = this.parseMaybeDefault(
          startPos,
          startLoc,
          prop.key.__clone(),
        );
      } else if (this.match(tt.eq) && refShorthandDefaultPos) {
        if (!refShorthandDefaultPos.start) {
          refShorthandDefaultPos.start = this.state.start;
        }
        prop.value = this.parseMaybeDefault(
          startPos,
          startLoc,
          prop.key.__clone(),
        );
      } else {
        prop.value = prop.key.__clone();
      }
      prop.shorthand = true;

      return this.finishNode(prop, "ObjectProperty");
    }
  }

  parseObjPropValue(
    prop: any,
    startPos: ?number,
    startLoc: ?Position,
    isGenerator: boolean,
    isAsync: boolean,
    isPattern: boolean,
    refShorthandDefaultPos: ?Pos,
    containsEsc: boolean,
  ): void {
    const node =
      this.parseObjectMethod(
        prop,
        isGenerator,
        isAsync,
        isPattern,
        containsEsc,
      ) ||
      this.parseObjectProperty(
        prop,
        startPos,
        startLoc,
        isPattern,
        refShorthandDefaultPos,
      );

    if (!node) this.unexpected();

    // $FlowFixMe
    return node;
  }

  parsePropertyName(
    prop: N.ObjectOrClassMember | N.ClassMember | N.TsNamedTypeElementBase,
  ): N.Expression | N.Identifier {
    if (this.eat(tt.bracketL)) {
      (prop: $FlowSubtype<N.ObjectOrClassMember>).computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(tt.bracketR);
    } else {
      const oldInPropertyName = this.state.inPropertyName;
      this.state.inPropertyName = true;
      // We check if it's valid for it to be a private name when we push it.
      (prop: $FlowFixMe).key =
        this.match(tt.num) || this.match(tt.string)
          ? this.parseExprAtom()
          : this.parseMaybePrivateName();

      if (prop.key.type !== "PrivateName") {
        // ClassPrivateProperty is never computed, so we don't assign in that case.
        prop.computed = false;
      }

      this.state.inPropertyName = oldInPropertyName;
    }

    return prop.key;
  }

  // Initialize empty function node.

  initFunction(node: N.BodilessFunctionOrMethodBase, isAsync: ?boolean): void {
    node.id = null;
    node.generator = false;
    node.async = !!isAsync;
  }

  // Parse object or class method.

  parseMethod<T: N.MethodLike>(
    node: T,
    isGenerator: boolean,
    isAsync: boolean,
    isConstructor: boolean,
    type: string,
  ): T {
    const oldInFunc = this.state.inFunction;
    const oldInMethod = this.state.inMethod;
    const oldInAsync = this.state.inAsync;
    const oldInGenerator = this.state.inGenerator;
    this.state.inFunction = true;
    this.state.inMethod = node.kind || true;
    this.state.inAsync = isAsync;
    this.state.inGenerator = isGenerator;

    this.initFunction(node, isAsync);
    node.generator = !!isGenerator;
    const allowModifiers = isConstructor; // For TypeScript parameter properties
    this.parseFunctionParams((node: any), allowModifiers);
    this.parseFunctionBodyAndFinish(node, type);

    this.state.inFunction = oldInFunc;
    this.state.inMethod = oldInMethod;
    this.state.inAsync = oldInAsync;
    this.state.inGenerator = oldInGenerator;

    return node;
  }

  // Parse arrow function expression.
  // If the parameters are provided, they will be converted to an
  // assignable list.
  parseArrowExpression(
    node: N.ArrowFunctionExpression,
    params?: ?(N.Expression[]),
    isAsync?: boolean = false,
  ): N.ArrowFunctionExpression {
    // if we got there, it's no more "yield in possible arrow parameters";
    // it's just "yield in arrow parameters"
    const yOAIPAP = this.state.yieldOrAwaitInPossibleArrowParameters;
    if (yOAIPAP) {
      if (yOAIPAP.type === "YieldExpression") {
        this.raise(
          yOAIPAP.start,
          "yield is not allowed in the parameters of an arrow function" +
            " inside a generator",
        );
      } else {
        this.raise(
          yOAIPAP.start,
          "await is not allowed in the parameters of an arrow function" +
            " inside an async function",
        );
      }
    }

    const oldInFunc = this.state.inFunction;
    this.state.inFunction = true;
    this.initFunction(node, isAsync);
    if (params) this.setArrowFunctionParameters(node, params);

    const oldInAsync = this.state.inAsync;
    const oldInGenerator = this.state.inGenerator;
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    this.state.inAsync = isAsync;
    this.state.inGenerator = false;
    this.state.maybeInArrowParameters = false;
    this.parseFunctionBody(node, true);
    this.state.inAsync = oldInAsync;
    this.state.inGenerator = oldInGenerator;
    this.state.inFunction = oldInFunc;
    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;

    return this.finishNode(node, "ArrowFunctionExpression");
  }

  setArrowFunctionParameters(
    node: N.ArrowFunctionExpression,
    params: N.Expression[],
  ): void {
    node.params = this.toAssignableList(
      params,
      true,
      "arrow function parameters",
    );
  }

  isStrictBody(node: { body: N.BlockStatement }): boolean {
    const isBlockStatement = node.body.type === "BlockStatement";

    if (isBlockStatement && node.body.directives.length) {
      for (const directive of node.body.directives) {
        if (directive.value.value === "use strict") {
          return true;
        }
      }
    }

    return false;
  }

  parseFunctionBodyAndFinish(
    node: N.BodilessFunctionOrMethodBase,
    type: string,
    allowExpressionBody?: boolean,
  ): void {
    // $FlowIgnore (node is not bodiless if we get here)
    this.parseFunctionBody(node, allowExpressionBody);
    this.finishNode(node, type);
  }

  // Parse function body and check parameters.
  parseFunctionBody(node: N.Function, allowExpression: ?boolean): void {
    const isExpression = allowExpression && !this.match(tt.braceL);

    const oldInParameters = this.state.inParameters;
    this.state.inParameters = false;

    if (isExpression) {
      node.body = this.parseMaybeAssign();
    } else {
      // Start a new scope with regard to labels and the `inGenerator`
      // flag (restore them to their old value afterwards).
      const oldInGen = this.state.inGenerator;
      const oldInFunc = this.state.inFunction;
      const oldLabels = this.state.labels;
      this.state.inGenerator = node.generator;
      this.state.inFunction = true;
      this.state.labels = [];
      node.body = this.parseBlock(true);
      this.state.inFunction = oldInFunc;
      this.state.inGenerator = oldInGen;
      this.state.labels = oldLabels;
    }

    this.checkFunctionNameAndParams(node, allowExpression);
    this.state.inParameters = oldInParameters;
  }

  checkFunctionNameAndParams(
    node: N.Function,
    isArrowFunction: ?boolean,
  ): void {
    // If this is a strict mode function, verify that argument names
    // are not repeated, and it does not try to bind the words `eval`
    // or `arguments`.
    const isStrict = this.isStrictBody(node);
    // Also check for arrow functions
    const checkLVal = this.state.strict || isStrict || isArrowFunction;

    const oldStrict = this.state.strict;
    if (isStrict) this.state.strict = isStrict;

    if (checkLVal) {
      const nameHash: any = Object.create(null);
      if (node.id) {
        this.checkLVal(node.id, true, undefined, "function name");
      }
      for (const param of node.params) {
        if (isStrict && param.type !== "Identifier") {
          this.raise(param.start, "Non-simple parameter in strict mode");
        }
        this.checkLVal(param, true, nameHash, "function parameter list");
      }
    }
    this.state.strict = oldStrict;
  }

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  parseExprList(
    close: TokenType,
    allowEmpty?: boolean,
    refShorthandDefaultPos?: ?Pos,
  ): $ReadOnlyArray<?N.Expression> {
    const elts = [];
    let first = true;

    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.eat(close)) break;
      }

      elts.push(this.parseExprListItem(allowEmpty, refShorthandDefaultPos));
    }
    return elts;
  }

  parseExprListItem(
    allowEmpty: ?boolean,
    refShorthandDefaultPos: ?Pos,
    refNeedsArrowPos: ?Pos,
  ): ?N.Expression {
    let elt;
    if (allowEmpty && this.match(tt.comma)) {
      elt = null;
    } else if (this.match(tt.ellipsis)) {
      const spreadNodeStartPos = this.state.start;
      const spreadNodeStartLoc = this.state.startLoc;
      elt = this.parseParenItem(
        this.parseSpread(refShorthandDefaultPos, refNeedsArrowPos),
        spreadNodeStartPos,
        spreadNodeStartLoc,
      );
    } else {
      elt = this.parseMaybeAssign(
        false,
        refShorthandDefaultPos,
        this.parseParenItem,
        refNeedsArrowPos,
      );
    }
    return elt;
  }

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  parseIdentifier(liberal?: boolean): N.Identifier {
    const node = this.startNode();
    const name = this.parseIdentifierName(node.start, liberal);

    return this.createIdentifier(node, name);
  }

  createIdentifier(node: N.Identifier, name: string): N.Identifier {
    node.name = name;
    node.loc.identifierName = name;

    return this.finishNode(node, "Identifier");
  }

  parseIdentifierName(pos: number, liberal?: boolean): string {
    if (!liberal) {
      this.checkReservedWord(
        this.state.value,
        this.state.start,
        !!this.state.type.keyword,
        false,
      );
    }

    let name: string;

    if (this.match(tt.name)) {
      name = this.state.value;
    } else if (this.state.type.keyword) {
      name = this.state.type.keyword;

      // `class` and `function` keywords push new context into this.context.
      // But there is no chance to pop the context if the keyword is consumed
      // as an identifier such as a property name.
      // If the previous token is a dot, this does not apply because the
      // context-managing code already ignored the keyword
      if (
        (name === "class" || name === "function") &&
        (this.state.lastTokEnd !== this.state.lastTokStart + 1 ||
          this.input.charCodeAt(this.state.lastTokStart) !== charCodes.dot)
      ) {
        this.state.context.pop();
      }
    } else {
      throw this.unexpected();
    }

    if (!liberal && name === "await" && this.state.inAsync) {
      this.raise(pos, "invalid use of await inside of an async function");
    }

    this.next();
    return name;
  }

  checkReservedWord(
    word: string,
    startLoc: number,
    checkKeywords: boolean,
    isBinding: boolean,
  ): void {
    if (
      this.state.strict &&
      (reservedWords.strict(word) ||
        (isBinding && reservedWords.strictBind(word)))
    ) {
      this.raise(startLoc, word + " is a reserved word in strict mode");
    }

    if (this.state.inGenerator && word === "yield") {
      this.raise(
        startLoc,
        "yield is a reserved word inside generator functions",
      );
    }

    if (this.state.inClassProperty && word === "arguments") {
      this.raise(
        startLoc,
        "'arguments' is not allowed in class field initializer",
      );
    }

    if (this.isReservedWord(word) || (checkKeywords && this.isKeyword(word))) {
      this.raise(startLoc, word + " is a reserved word");
    }
  }

  // Parses await expression inside async function.

  parseAwait(node: N.AwaitExpression): N.AwaitExpression {
    // istanbul ignore next: this condition is checked at the call site so won't be hit here
    if (
      !this.state.inAsync &&
      (this.state.inFunction || !this.options.allowAwaitOutsideFunction)
    ) {
      this.unexpected();
    }
    if (this.state.inParameters) {
      this.raise(
        node.start,
        "await is not allowed in async function parameters",
      );
    }
    if (this.match(tt.star)) {
      this.raise(
        node.start,
        "await* has been removed from the async functions proposal. Use Promise.all() instead.",
      );
    }
    if (
      this.state.maybeInArrowParameters &&
      // We only set yieldOrAwaitInPossibleArrowParameters if we haven't already
      // found a possible invalid AwaitExpression.
      !this.state.yieldOrAwaitInPossibleArrowParameters
    ) {
      this.state.yieldOrAwaitInPossibleArrowParameters = node;
    }

    node.argument = this.parseMaybeUnary();
    return this.finishNode(node, "AwaitExpression");
  }

  // Parses yield expression inside generator.

  parseYield(): N.YieldExpression {
    const node = this.startNode();

    if (this.state.inParameters) {
      this.raise(node.start, "yield is not allowed in generator parameters");
    }
    if (
      this.state.maybeInArrowParameters &&
      // We only set yieldOrAwaitInPossibleArrowParameters if we haven't already
      // found a possible invalid YieldExpression.
      !this.state.yieldOrAwaitInPossibleArrowParameters
    ) {
      this.state.yieldOrAwaitInPossibleArrowParameters = node;
    }

    this.next();
    if (
      this.match(tt.semi) ||
      this.canInsertSemicolon() ||
      (!this.match(tt.star) && !this.state.type.startsExpr)
    ) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(tt.star);
      node.argument = this.parseMaybeAssign();
    }
    return this.finishNode(node, "YieldExpression");
  }

  // Validates a pipeline (for any of the pipeline Babylon plugins) at the point
  // of the infix operator `|>`.

  checkPipelineAtInfixOperator(left: N.Expression, leftStartPos: number) {
    if (this.getPluginOption("pipelineOperator", "proposal") === "smart") {
      if (left.type === "SequenceExpression") {
        // Ensure that the pipeline head is not a comma-delimited
        // sequence expression.
        throw this.raise(
          leftStartPos,
          `Pipeline head should not be a comma-separated sequence expression`,
        );
      }
    }
  }

  parseSmartPipelineBody(
    childExpression: N.Expression,
    startPos: number,
    startLoc: Position,
  ): N.PipelineBody {
    const pipelineStyle = this.checkSmartPipelineBodyStyle(childExpression);

    this.checkSmartPipelineBodyEarlyErrors(
      childExpression,
      pipelineStyle,
      startPos,
    );

    return this.parseSmartPipelineBodyInStyle(
      childExpression,
      pipelineStyle,
      startPos,
      startLoc,
    );
  }

  checkSmartPipelineBodyEarlyErrors(
    childExpression: N.Expression,
    pipelineStyle: N.PipelineStyle,
    startPos: number,
  ): void {
    if (this.match(tt.arrow)) {
      // If the following token is invalidly `=>`, then throw a human-friendly error
      // instead of something like 'Unexpected token, expected ";"'.
      throw this.raise(
        this.state.start,
        `Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized`,
      );
    } else if (
      pipelineStyle === "PipelineTopicExpression" &&
      childExpression.type === "SequenceExpression"
    ) {
      throw this.raise(
        startPos,
        `Pipeline body may not be a comma-separated sequence expression`,
      );
    }
  }

  parseSmartPipelineBodyInStyle(
    childExpression: N.Expression,
    pipelineStyle: N.PipelineStyle,
    startPos: number,
    startLoc: Position,
  ): N.PipelineBody {
    const bodyNode = this.startNodeAt(startPos, startLoc);
    switch (pipelineStyle) {
      case "PipelineBareFunction":
        bodyNode.callee = childExpression;
        break;
      case "PipelineBareConstructor":
        bodyNode.callee = childExpression.callee;
        break;
      case "PipelineBareAwaitedFunction":
        bodyNode.callee = childExpression.argument;
        break;
      case "PipelineTopicExpression":
        if (!this.topicReferenceWasUsedInCurrentTopicContext()) {
          throw this.raise(
            startPos,
            `Pipeline is in topic style but does not use topic reference`,
          );
        }
        bodyNode.expression = childExpression;
        break;
      default:
        throw this.raise(startPos, `Unknown pipeline style ${pipelineStyle}`);
    }
    return this.finishNode(bodyNode, pipelineStyle);
  }

  checkSmartPipelineBodyStyle(expression: N.Expression): N.PipelineStyle {
    switch (expression.type) {
      default:
        return this.isSimpleReference(expression)
          ? "PipelineBareFunction"
          : "PipelineTopicExpression";
    }
  }

  isSimpleReference(expression: N.Expression): boolean {
    switch (expression.type) {
      case "MemberExpression":
        return (
          !expression.computed && this.isSimpleReference(expression.object)
        );
      case "Identifier":
        return true;
      default:
        return false;
    }
  }

  // Enable topic references from outer contexts within smart pipeline bodies.
  // The function modifies the parser's topic-context state to enable or disable
  // the use of topic references with the smartPipelines plugin. They then run a
  // callback, then they reset the parser to the old topic-context state that it
  // had before the function was called.

  withTopicPermittingContext<T>(callback: () => T): T {
    const outerContextTopicState = this.state.topicContext;
    this.state.topicContext = {
      // Enable the use of the primary topic reference.
      maxNumOfResolvableTopics: 1,
      // Hide the use of any topic references from outer contexts.
      maxTopicIndex: null,
    };

    try {
      return callback();
    } finally {
      this.state.topicContext = outerContextTopicState;
    }
  }

  // Disable topic references from outer contexts within syntax constructs
  // such as the bodies of iteration statements.
  // The function modifies the parser's topic-context state to enable or disable
  // the use of topic references with the smartPipelines plugin. They then run a
  // callback, then they reset the parser to the old topic-context state that it
  // had before the function was called.

  withTopicForbiddingContext<T>(callback: () => T): T {
    const outerContextTopicState = this.state.topicContext;
    this.state.topicContext = {
      // Disable the use of the primary topic reference.
      maxNumOfResolvableTopics: 0,
      // Hide the use of any topic references from outer contexts.
      maxTopicIndex: null,
    };

    try {
      return callback();
    } finally {
      this.state.topicContext = outerContextTopicState;
    }
  }

  // Register the use of a primary topic reference (`#`) within the current
  // topic context.
  registerTopicReference(): void {
    this.state.topicContext.maxTopicIndex = 0;
  }

  primaryTopicReferenceIsAllowedInCurrentTopicContext(): boolean {
    return this.state.topicContext.maxNumOfResolvableTopics >= 1;
  }

  topicReferenceWasUsedInCurrentTopicContext(): boolean {
    return (
      this.state.topicContext.maxTopicIndex != null &&
      this.state.topicContext.maxTopicIndex >= 0
    );
  }
}
