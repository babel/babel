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

import type { Options } from "../options";
import * as N from "../types";
import {
  isKeyword,
  isReservedWord,
  isStrictReservedWord,
  isStrictBindReservedWord,
} from "../util/identifier";
import type { Pos, Position } from "../util/location";
import * as charCodes from "charcodes";
import {
  BIND_OUTSIDE,
  BIND_VAR,
  functionFlags,
  SCOPE_ARROW,
  SCOPE_CLASS,
  SCOPE_DIRECT_SUPER,
  SCOPE_SUPER,
  SCOPE_PROGRAM,
} from "../util/scopeflags";
import { types as tt, type TokenType } from "../util/token-types";

import {
  match,
  eat,
  next,
  nextToken,
  lookahead,
  readRegexp,
} from "::build-tool::bindings/tokenizer";
import { hasPlugin, getPluginOption } from "./base";
import { raise } from "./location";
import {
  expect,
  unexpected,
  expectPlugin,
  expectOnePlugin,
  isContextual,
  canInsertSemicolon,
  checkYieldAwaitInDefaultParams,
  assertNoSpace,
  addExtra,
  hasPrecedingLineBreak,
  strictDirective,
} from "./util";
import { startNode, startNodeAt, finishNode, finishNodeAt } from "./node";
import {
  toReferencedList,
  toReferencedListDeep,
  toAssignable,
  toAssignableList,
  parseSpread,
  parseRestBinding,
  parseMaybeDefault,
  checkLVal,
  checkCommaAfterRest,
  checkCommaAfterRestFromSpread,
} from "./lval";
import {
  scope,
  state,
  options,
  input,
  inModule,
  sawUnambiguousESM,
  init,
} from "./index";

import {
  parseFunction,
  parseFunctionParams,
  parseBlock,
  parseDecorators,
  parseDecorator,
  takeDecorators,
  parseClass,
} from "./statement";

function unwrapParenthesizedExpression(node) {
  return node.type === "ParenthesizedExpression"
    ? unwrapParenthesizedExpression(node.expression)
    : node;
}

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

export function checkPropClash(
  prop: N.ObjectMember | N.SpreadElement,
  propHash: { [key: string]: boolean },
): void {
  if (
    prop.type === "SpreadElement" ||
    prop.computed ||
    prop.kind ||
    // $FlowIgnore
    prop.shorthand
  ) {
    return;
  }

  const key = prop.key;
  // It is either an Identifier or a String/NumericLiteral
  const name = key.type === "Identifier" ? key.name : String(key.value);

  if (name === "__proto__") {
    if (propHash.proto) {
      raise(key.start, "Redefinition of __proto__ property");
    }
    propHash.proto = true;
  }
}

// Convenience method to parse an Expression only
export function getExpression(opts: ?Options, input: string): N.Expression {
  init(opts, input);

  if (opts && opts.strictMode) {
    state.strict = true;
  }

  scope.enter(SCOPE_PROGRAM);
  nextToken();
  const expr = parseExpression();
  if (!match(tt.eof)) {
    unexpected();
  }
  expr.comments = state.comments;
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

export function parseExpression(
  noIn?: boolean,
  refShorthandDefaultPos?: Pos,
): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;
  const expr = parseMaybeAssign(noIn, refShorthandDefaultPos);
  if (match(tt.comma)) {
    const node = startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (eat(tt.comma)) {
      node.expressions.push(parseMaybeAssign(noIn, refShorthandDefaultPos));
    }
    toReferencedList(node.expressions);
    return finishNode(node, "SequenceExpression");
  }
  return expr;
}

// Parse an assignment expression. This includes applications of
// operators like `+=`.

export function parseMaybeAssign(
  noIn?: ?boolean,
  refShorthandDefaultPos?: ?Pos,
  afterLeftParse?: Function,
  refNeedsArrowPos?: ?Pos,
): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;
  if (isContextual("yield")) {
    if (scope.inGenerator) {
      let left = parseYield(noIn);
      if (afterLeftParse) {
        left = afterLeftParse.call(this, left, startPos, startLoc);
      }
      return left;
    } else {
      // The tokenizer will assume an expression is allowed after
      // `yield`, but this isn't that kind of yield
      state.exprAllowed = false;
    }
  }

  const oldCommaAfterSpreadAt = state.commaAfterSpreadAt;
  state.commaAfterSpreadAt = -1;

  let failOnShorthandAssign;
  if (refShorthandDefaultPos) {
    failOnShorthandAssign = false;
  } else {
    refShorthandDefaultPos = { start: 0 };
    failOnShorthandAssign = true;
  }

  if (match(tt.parenL) || match(tt.name)) {
    state.potentialArrowAt = state.start;
  }

  let left = parseMaybeConditional(
    noIn,
    refShorthandDefaultPos,
    refNeedsArrowPos,
  );
  if (afterLeftParse) {
    left = afterLeftParse.call(this, left, startPos, startLoc);
  }
  if (state.type.isAssign) {
    const node = startNodeAt(startPos, startLoc);
    const operator = state.value;
    node.operator = operator;

    if (operator === "??=") {
      expectPlugin("nullishCoalescingOperator");
      expectPlugin("logicalAssignment");
    }
    if (operator === "||=" || operator === "&&=") {
      expectPlugin("logicalAssignment");
    }
    node.left = match(tt.eq)
      ? toAssignable(left, undefined, "assignment expression")
      : left;
    refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly

    checkLVal(left, undefined, undefined, "assignment expression");

    const maybePattern = unwrapParenthesizedExpression(left);

    let patternErrorMsg;
    if (maybePattern.type === "ObjectPattern") {
      patternErrorMsg = "`({a}) = 0` use `({a} = 0)`";
    } else if (maybePattern.type === "ArrayPattern") {
      patternErrorMsg = "`([a]) = 0` use `([a] = 0)`";
    }

    if (
      patternErrorMsg &&
      ((left.extra && left.extra.parenthesized) ||
        left.type === "ParenthesizedExpression")
    ) {
      raise(
        maybePattern.start,
        `You're trying to assign to a parenthesized expression, eg. instead of ${patternErrorMsg}`,
      );
    }

    if (patternErrorMsg) checkCommaAfterRestFromSpread();
    state.commaAfterSpreadAt = oldCommaAfterSpreadAt;

    next();
    node.right = parseMaybeAssign(noIn);
    return finishNode(node, "AssignmentExpression");
  } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
    unexpected(refShorthandDefaultPos.start);
  }

  state.commaAfterSpreadAt = oldCommaAfterSpreadAt;

  return left;
}

// Parse a ternary conditional (`?:`) operator.

function parseMaybeConditional(
  noIn: ?boolean,
  refShorthandDefaultPos: Pos,
  refNeedsArrowPos?: ?Pos,
): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;
  const potentialArrowAt = state.potentialArrowAt;
  const expr = parseExprOps(noIn, refShorthandDefaultPos);

  if (
    expr.type === "ArrowFunctionExpression" &&
    expr.start === potentialArrowAt
  ) {
    return expr;
  }
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;

  return parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos);
}

export function parseConditional(
  expr: N.Expression,
  noIn: ?boolean,
  startPos: number,
  startLoc: Position,
  // FIXME: Disabling this for now since can't seem to get it to play nicely
  // eslint-disable-next-line no-unused-vars
  refNeedsArrowPos?: ?Pos,
): N.Expression {
  if (eat(tt.question)) {
    const node = startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = parseMaybeAssign();
    expect(tt.colon);
    node.alternate = parseMaybeAssign(noIn);
    return finishNode(node, "ConditionalExpression");
  }
  return expr;
}

// Start the precedence parser.

function parseExprOps(
  noIn: ?boolean,
  refShorthandDefaultPos: Pos,
): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;
  const potentialArrowAt = state.potentialArrowAt;
  const expr = parseMaybeUnary(refShorthandDefaultPos);

  if (
    expr.type === "ArrowFunctionExpression" &&
    expr.start === potentialArrowAt
  ) {
    return expr;
  }
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
    return expr;
  }

  return parseExprOp(expr, startPos, startLoc, -1, noIn);
}

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

export function parseExprOp(
  left: N.Expression,
  leftStartPos: number,
  leftStartLoc: Position,
  minPrec: number,
  noIn: ?boolean,
): N.Expression {
  const prec = state.type.binop;
  if (prec != null && (!noIn || !match(tt._in))) {
    if (prec > minPrec) {
      const node = startNodeAt(leftStartPos, leftStartLoc);
      const operator = state.value;
      node.left = left;
      node.operator = operator;
      if (
        operator === "**" &&
        left.type === "UnaryExpression" &&
        (options.createParenthesizedExpressions ||
          !(left.extra && left.extra.parenthesized))
      ) {
        raise(
          left.argument.start,
          "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
        );
      }

      const op = state.type;

      if (op === tt.pipeline) {
        expectPlugin("pipelineOperator");
        state.inPipeline = true;
        checkPipelineAtInfixOperator(left, leftStartPos);
      } else if (op === tt.nullishCoalescing) {
        expectPlugin("nullishCoalescingOperator");
      }

      next();

      if (
        op === tt.pipeline &&
        getPluginOption("pipelineOperator", "proposal") === "minimal"
      ) {
        if (match(tt.name) && state.value === "await" && scope.inAsync) {
          throw raise(
            state.start,
            `Unexpected "await" after pipeline body; await must have parentheses in minimal proposal`,
          );
        }
      }

      node.right = parseExprOpRightExpr(op, prec, noIn);

      finishNode(
        node,
        op === tt.logicalOR ||
          op === tt.logicalAND ||
          op === tt.nullishCoalescing
          ? "LogicalExpression"
          : "BinaryExpression",
      );

      return parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
  }
  return left;
}

// Helper function for `parseExprOp`. Parse the right-hand side of binary-
// operator expressions, then apply any operator-specific functions.

function parseExprOpRightExpr(
  op: TokenType,
  prec: number,
  noIn: ?boolean,
): N.Expression {
  switch (op) {
    case tt.pipeline:
      if (getPluginOption("pipelineOperator", "proposal") === "smart") {
        const startPos = state.start;
        const startLoc = state.startLoc;
        return withTopicPermittingContext(() => {
          return parseSmartPipelineBody(
            parseExprOpBaseRightExpr(op, prec, noIn),
            startPos,
            startLoc,
          );
        });
      }
    // falls through

    default:
      return parseExprOpBaseRightExpr(op, prec, noIn);
  }
}

// Helper function for `parseExprOpRightExpr`. Parse the right-hand side of
// binary-operator expressions without applying any operator-specific functions.

function parseExprOpBaseRightExpr(
  op: TokenType,
  prec: number,
  noIn: ?boolean,
): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;

  return parseExprOp(
    parseMaybeUnary(),
    startPos,
    startLoc,
    op.rightAssociative ? prec - 1 : prec,
    noIn,
  );
}

// Parse unary operators, both prefix and postfix.

export function parseMaybeUnary(refShorthandDefaultPos: ?Pos): N.Expression {
  if (
    isContextual("await") &&
    (scope.inAsync || (!scope.inFunction && options.allowAwaitOutsideFunction))
  ) {
    return parseAwait();
  } else if (state.type.prefix) {
    const node = startNode();
    const update = match(tt.incDec);
    node.operator = state.value;
    node.prefix = true;

    if (node.operator === "throw") {
      expectPlugin("throwExpressions");
    }
    next();

    node.argument = parseMaybeUnary();

    if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
      unexpected(refShorthandDefaultPos.start);
    }

    if (update) {
      checkLVal(node.argument, undefined, undefined, "prefix operation");
    } else if (state.strict && node.operator === "delete") {
      const arg = node.argument;

      if (arg.type === "Identifier") {
        raise(node.start, "Deleting local variable in strict mode");
      } else if (
        arg.type === "MemberExpression" &&
        arg.property.type === "PrivateName"
      ) {
        raise(node.start, "Deleting a private field is not allowed");
      }
    }

    return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  }

  const startPos = state.start;
  const startLoc = state.startLoc;
  let expr = parseExprSubscripts(refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
  while (state.type.postfix && !canInsertSemicolon()) {
    const node = startNodeAt(startPos, startLoc);
    node.operator = state.value;
    node.prefix = false;
    node.argument = expr;
    checkLVal(expr, undefined, undefined, "postfix operation");
    next();
    expr = finishNode(node, "UpdateExpression");
  }
  return expr;
}

// Parse call, dot, and `[]`-subscript expressions.

export function parseExprSubscripts(
  refShorthandDefaultPos: ?Pos,
): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;
  const potentialArrowAt = state.potentialArrowAt;
  const expr = parseExprAtom(refShorthandDefaultPos);

  if (
    expr.type === "ArrowFunctionExpression" &&
    expr.start === potentialArrowAt
  ) {
    return expr;
  }

  if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
    return expr;
  }

  return parseSubscripts(expr, startPos, startLoc);
}

export function parseSubscripts(
  base: N.Expression,
  startPos: number,
  startLoc: Position,
  noCalls?: ?boolean,
): N.Expression {
  const maybeAsyncArrow = atPossibleAsync(base);

  const state = {
    optionalChainMember: false,
    stop: false,
  };
  do {
    base = parseSubscript(
      base,
      startPos,
      startLoc,
      noCalls,
      state,
      maybeAsyncArrow,
    );
  } while (!state.stop);
  return base;
}

/**
 * @param state Set 'state.stop = true' to indicate that we should stop parsing subscripts.
 *   state.optionalChainMember to indicate that the member is currently in OptionalChain
 */
export function parseSubscript(
  base: N.Expression,
  startPos: number,
  startLoc: Position,
  noCalls: ?boolean,
  psState: N.ParseSubscriptState,
  maybeAsyncArrow: boolean,
): N.Expression {
  if (!noCalls && eat(tt.doubleColon)) {
    const node = startNodeAt(startPos, startLoc);
    node.object = base;
    node.callee = parseNoCallExpr();
    psState.stop = true;
    return parseSubscripts(
      finishNode(node, "BindExpression"),
      startPos,
      startLoc,
      noCalls,
    );
  } else if (match(tt.questionDot)) {
    expectPlugin("optionalChaining");
    psState.optionalChainMember = true;
    if (noCalls && lookahead().type === tt.parenL) {
      psState.stop = true;
      return base;
    }
    next();

    const node = startNodeAt(startPos, startLoc);

    if (eat(tt.bracketL)) {
      node.object = base;
      node.property = parseExpression();
      node.computed = true;
      node.optional = true;
      expect(tt.bracketR);
      return finishNode(node, "OptionalMemberExpression");
    } else if (eat(tt.parenL)) {
      node.callee = base;
      node.arguments = parseCallExpressionArguments(tt.parenR, false);
      node.optional = true;
      return finishNode(node, "OptionalCallExpression");
    } else {
      node.object = base;
      node.property = parseIdentifier(true);
      node.computed = false;
      node.optional = true;
      return finishNode(node, "OptionalMemberExpression");
    }
  } else if (eat(tt.dot)) {
    const node = startNodeAt(startPos, startLoc);
    node.object = base;
    node.property = parseMaybePrivateName();
    node.computed = false;
    if (psState.optionalChainMember) {
      node.optional = false;
      return finishNode(node, "OptionalMemberExpression");
    }
    return finishNode(node, "MemberExpression");
  } else if (eat(tt.bracketL)) {
    const node = startNodeAt(startPos, startLoc);
    node.object = base;
    node.property = parseExpression();
    node.computed = true;
    expect(tt.bracketR);
    if (psState.optionalChainMember) {
      node.optional = false;
      return finishNode(node, "OptionalMemberExpression");
    }
    return finishNode(node, "MemberExpression");
  } else if (!noCalls && match(tt.parenL)) {
    const oldMaybeInArrowParameters = state.maybeInArrowParameters;
    const oldYieldPos = state.yieldPos;
    const oldAwaitPos = state.awaitPos;
    state.maybeInArrowParameters = true;
    state.yieldPos = 0;
    state.awaitPos = 0;

    next();

    let node = startNodeAt(startPos, startLoc);
    node.callee = base;

    const oldCommaAfterSpreadAt = state.commaAfterSpreadAt;
    state.commaAfterSpreadAt = -1;

    node.arguments = parseCallExpressionArguments(
      tt.parenR,
      maybeAsyncArrow,
      base.type === "Import",
      base.type !== "Super",
    );
    if (!psState.optionalChainMember) {
      finishCallExpression(node);
    } else {
      finishOptionalCallExpression(node);
    }

    if (maybeAsyncArrow && shouldParseAsyncArrow()) {
      psState.stop = true;

      checkCommaAfterRestFromSpread();

      node = parseAsyncArrowFromCallExpression(
        startNodeAt(startPos, startLoc),
        node,
      );
      checkYieldAwaitInDefaultParams();
      state.yieldPos = oldYieldPos;
      state.awaitPos = oldAwaitPos;
    } else {
      toReferencedListDeep(node.arguments);

      // We keep the old value if it isn't null, for cases like
      //   (x = async(yield)) => {}
      state.yieldPos = oldYieldPos || state.yieldPos;
      state.awaitPos = oldAwaitPos || state.awaitPos;
    }

    state.maybeInArrowParameters = oldMaybeInArrowParameters;
    state.commaAfterSpreadAt = oldCommaAfterSpreadAt;

    return node;
  } else if (match(tt.backQuote)) {
    return parseTaggedTemplateExpression(startPos, startLoc, base, psState);
  } else {
    psState.stop = true;
    return base;
  }
}

export function parseTaggedTemplateExpression(
  startPos: number,
  startLoc: Position,
  base: N.Expression,
  state: N.ParseSubscriptState,
  typeArguments?: ?N.TsTypeParameterInstantiation,
): N.TaggedTemplateExpression {
  const node: N.TaggedTemplateExpression = startNodeAt(startPos, startLoc);
  node.tag = base;
  node.quasi = parseTemplate(true);
  if (typeArguments) node.typeParameters = typeArguments;
  if (state.optionalChainMember) {
    raise(
      startPos,
      "Tagged Template Literals are not allowed in optionalChain",
    );
  }
  return finishNode(node, "TaggedTemplateExpression");
}

export function atPossibleAsync(base: N.Expression): boolean {
  return (
    base.type === "Identifier" &&
    base.name === "async" &&
    state.lastTokEnd === base.end &&
    !canInsertSemicolon() &&
    input.slice(base.start, base.end) === "async"
  );
}

export function finishCallExpression(node: N.CallExpression): N.CallExpression {
  if (node.callee.type === "Import") {
    if (node.arguments.length !== 1) {
      raise(node.start, "import() requires exactly one argument");
    }

    const importArg = node.arguments[0];
    if (importArg && importArg.type === "SpreadElement") {
      raise(importArg.start, "... is not allowed in import()");
    }
  }
  return finishNode(node, "CallExpression");
}

function finishOptionalCallExpression(
  node: N.CallExpression,
): N.CallExpression {
  if (node.callee.type === "Import") {
    if (node.arguments.length !== 1) {
      raise(node.start, "import() requires exactly one argument");
    }

    const importArg = node.arguments[0];
    if (importArg && importArg.type === "SpreadElement") {
      raise(importArg.start, "... is not allowed in import()");
    }
  }
  return finishNode(node, "OptionalCallExpression");
}

export function parseCallExpressionArguments(
  close: TokenType,
  possibleAsyncArrow: boolean,
  dynamicImport?: boolean,
  allowPlaceholder?: boolean,
): $ReadOnlyArray<?N.Expression> {
  const elts = [];
  let innerParenStart;
  let first = true;

  while (!eat(close)) {
    if (first) {
      first = false;
    } else {
      expect(tt.comma);
      if (eat(close)) {
        if (dynamicImport) {
          raise(
            state.lastTokStart,
            "Trailing comma is disallowed inside import(...) arguments",
          );
        }
        break;
      }
    }

    // we need to make sure that if this is an async arrow functions,
    // that we don't allow inner parens inside the params
    if (match(tt.parenL) && !innerParenStart) {
      innerParenStart = state.start;
    }

    elts.push(
      parseExprListItem(
        false,
        possibleAsyncArrow ? { start: 0 } : undefined,
        possibleAsyncArrow ? { start: 0 } : undefined,
        allowPlaceholder,
      ),
    );
  }

  // we found an async arrow function so let's not allow any inner parens
  if (possibleAsyncArrow && innerParenStart && shouldParseAsyncArrow()) {
    unexpected();
  }

  return elts;
}

export function shouldParseAsyncArrow(): boolean {
  return match(tt.arrow) && !canInsertSemicolon();
}

export function parseAsyncArrowFromCallExpression(
  node: N.ArrowFunctionExpression,
  call: N.CallExpression,
): N.ArrowFunctionExpression {
  expect(tt.arrow);
  parseArrowExpression(node, call.arguments, true);
  return node;
}

// Parse a no-call expression (like argument of `new` or `::` operators).

function parseNoCallExpr(): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;
  return parseSubscripts(parseExprAtom(), startPos, startLoc, true);
}

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

export function parseExprAtom(refShorthandDefaultPos?: ?Pos): N.Expression {
  // If a division operator appears in an expression position, the
  // tokenizer got confused, and we force it to read a regexp instead.
  if (state.type === tt.slash) readRegexp();

  const canBeArrow = state.potentialArrowAt === state.start;
  let node;

  switch (state.type) {
    case tt._super:
      if (!scope.allowSuper && !options.allowSuperOutsideMethod) {
        raise(
          state.start,
          "super is only allowed in object methods and classes",
        );
      }

      node = startNode();
      next();
      if (
        match(tt.parenL) &&
        !scope.allowDirectSuper &&
        !options.allowSuperOutsideMethod
      ) {
        raise(
          node.start,
          "super() is only valid inside a class constructor of a subclass. " +
            "Maybe a typo in the method name ('constructor') or not extending another class?",
        );
      }

      if (!match(tt.parenL) && !match(tt.bracketL) && !match(tt.dot)) {
        unexpected();
      }

      return finishNode(node, "Super");

    case tt._import:
      if (lookahead().type === tt.dot) {
        return parseImportMetaProperty();
      }

      expectPlugin("dynamicImport");

      node = startNode();
      next();
      if (!match(tt.parenL)) {
        unexpected(null, tt.parenL);
      }
      return finishNode(node, "Import");

    case tt._this:
      node = startNode();
      next();
      return finishNode(node, "ThisExpression");

    case tt.name: {
      node = startNode();
      const containsEsc = state.containsEsc;
      const id = parseIdentifier();

      if (
        !containsEsc &&
        id.name === "async" &&
        match(tt._function) &&
        !canInsertSemicolon()
      ) {
        next();
        return parseFunction(node, undefined, true);
      } else if (
        canBeArrow &&
        !containsEsc &&
        id.name === "async" &&
        match(tt.name) &&
        !canInsertSemicolon()
      ) {
        const params = [parseIdentifier()];
        expect(tt.arrow);
        // let foo = async bar => {};
        parseArrowExpression(node, params, true);
        return node;
      }

      if (canBeArrow && match(tt.arrow) && !canInsertSemicolon()) {
        next();
        parseArrowExpression(node, [id], false);
        return node;
      }

      return id;
    }

    case tt._do: {
      expectPlugin("doExpressions");
      const node = startNode();
      next();
      const oldLabels = state.labels;
      state.labels = [];
      node.body = parseBlock();
      state.labels = oldLabels;
      return finishNode(node, "DoExpression");
    }

    case tt.regexp: {
      const value = state.value;
      node = parseLiteral(value.value, "RegExpLiteral");
      node.pattern = value.pattern;
      node.flags = value.flags;
      return node;
    }

    case tt.num:
      return parseLiteral(state.value, "NumericLiteral");

    case tt.bigint:
      return parseLiteral(state.value, "BigIntLiteral");

    case tt.string:
      return parseLiteral(state.value, "StringLiteral");

    case tt._null:
      node = startNode();
      next();
      return finishNode(node, "NullLiteral");

    case tt._true:
    case tt._false:
      return parseBooleanLiteral();

    case tt.parenL:
      return parseParenAndDistinguishExpression(canBeArrow);

    case tt.bracketL:
      node = startNode();
      next();
      node.elements = parseExprList(tt.bracketR, true, refShorthandDefaultPos);
      if (!state.maybeInArrowParameters) {
        // This could be an array pattern:
        //   ([a: string, b: string]) => {}
        // In this case, we don't have to call toReferencedList. We will
        // call it, if needed, when we are sure that it is a parenthesized
        // expression by calling toReferencedListDeep.
        toReferencedList(node.elements);
      }
      return finishNode(node, "ArrayExpression");

    case tt.braceL:
      return parseObj(false, refShorthandDefaultPos);

    case tt._function:
      return parseFunctionExpression();

    case tt.at:
      parseDecorators();

    case tt._class:
      node = startNode();
      takeDecorators(node);
      return parseClass(node, false);

    case tt._new:
      return parseNew();

    case tt.backQuote:
      return parseTemplate(false);

    case tt.doubleColon: {
      node = startNode();
      next();
      node.object = null;
      const callee = (node.callee = parseNoCallExpr());
      if (callee.type === "MemberExpression") {
        return finishNode(node, "BindExpression");
      } else {
        throw raise(
          callee.start,
          "Binding should be performed on object property.",
        );
      }
    }

    case tt.hash: {
      if (state.inPipeline) {
        node = startNode();

        if (getPluginOption("pipelineOperator", "proposal") !== "smart") {
          raise(
            node.start,
            "Primary Topic Reference found but pipelineOperator not passed 'smart' for 'proposal' option.",
          );
        }

        next();
        if (primaryTopicReferenceIsAllowedInCurrentTopicContext()) {
          registerTopicReference();
          return finishNode(node, "PipelinePrimaryTopicReference");
        } else {
          throw raise(
            node.start,
            `Topic reference was used in a lexical context without topic binding`,
          );
        }
      }
    }

    default:
      throw unexpected();
  }
}

function parseBooleanLiteral(): N.BooleanLiteral {
  const node = startNode();
  node.value = match(tt._true);
  next();
  return finishNode(node, "BooleanLiteral");
}

function parseMaybePrivateName(): N.PrivateName | N.Identifier {
  const isPrivate = match(tt.hash);

  if (isPrivate) {
    expectOnePlugin(["classPrivateProperties", "classPrivateMethods"]);
    const node = startNode();
    next();
    assertNoSpace("Unexpected space between # and identifier");
    node.id = parseIdentifier(true);
    return finishNode(node, "PrivateName");
  } else {
    return parseIdentifier(true);
  }
}

function parseFunctionExpression(): N.FunctionExpression | N.MetaProperty {
  const node = startNode();

  // We do not do parseIdentifier here because when parseFunctionExpression
  // is called we already know that the current token is a "name" with the value "function"
  // This will improve perf a tiny little bit as we do not do validation but more importantly
  // here is that parseIdentifier will remove an item from the expression stack
  // if "function" or "class" is parsed as identifier (in objects e.g.), which should not happen here.
  let meta = startNode();
  next();
  meta = createIdentifier(meta, "function");

  if (scope.inGenerator && eat(tt.dot)) {
    return parseMetaProperty(node, meta, "sent");
  }
  return parseFunction(node);
}

function parseMetaProperty(
  node: N.MetaProperty,
  meta: N.Identifier,
  propertyName: string,
): N.MetaProperty {
  node.meta = meta;

  if (meta.name === "function" && propertyName === "sent") {
    if (isContextual(propertyName)) {
      expectPlugin("functionSent");
    } else if (!hasPlugin("functionSent")) {
      // The code wasn't `function.sent` but just `function.`, so a simple error is less confusing.
      unexpected();
    }
  }

  const containsEsc = state.containsEsc;

  node.property = parseIdentifier(true);

  if (node.property.name !== propertyName || containsEsc) {
    raise(
      node.property.start,
      `The only valid meta property for ${meta.name} is ${
        meta.name
      }.${propertyName}`,
    );
  }

  return finishNode(node, "MetaProperty");
}

function parseImportMetaProperty(): N.MetaProperty {
  const node = startNode();
  const id = parseIdentifier(true);
  expect(tt.dot);

  if (id.name === "import") {
    if (isContextual("meta")) {
      expectPlugin("importMeta");
    } else if (!hasPlugin("importMeta")) {
      raise(id.start, `Dynamic imports require a parameter: import('a.js')`);
    }
  }

  if (!inModule) {
    raise(id.start, `import.meta may appear only with 'sourceType: "module"'`, {
      code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
    });
  }
  sawUnambiguousESM();

  return parseMetaProperty(node, id, "meta");
}

export function parseLiteral<T: N.Literal>(
  value: any,
  type: /*T["kind"]*/ string,
  startPos?: number,
  startLoc?: Position,
): T {
  startPos = startPos || state.start;
  startLoc = startLoc || state.startLoc;

  const node = startNodeAt(startPos, startLoc);
  addExtra(node, "rawValue", value);
  addExtra(node, "raw", input.slice(startPos, state.end));
  node.value = value;
  next();
  return finishNode(node, type);
}

export function parseParenAndDistinguishExpression(
  canBeArrow: boolean,
): N.Expression {
  const startPos = state.start;
  const startLoc = state.startLoc;

  let val;
  expect(tt.parenL);

  const oldMaybeInArrowParameters = state.maybeInArrowParameters;
  const oldYieldPos = state.yieldPos;
  const oldAwaitPos = state.awaitPos;
  state.maybeInArrowParameters = true;
  state.yieldPos = 0;
  state.awaitPos = 0;

  const innerStartPos = state.start;
  const innerStartLoc = state.startLoc;
  const exprList = [];
  const refShorthandDefaultPos = { start: 0 };
  const refNeedsArrowPos = { start: 0 };
  let first = true;
  let spreadStart;
  let optionalCommaStart;

  while (!match(tt.parenR)) {
    if (first) {
      first = false;
    } else {
      expect(tt.comma, refNeedsArrowPos.start || null);
      if (match(tt.parenR)) {
        optionalCommaStart = state.start;
        break;
      }
    }

    if (match(tt.ellipsis)) {
      const spreadNodeStartPos = state.start;
      const spreadNodeStartLoc = state.startLoc;
      spreadStart = state.start;
      exprList.push(
        parseParenItem(
          parseRestBinding(),
          spreadNodeStartPos,
          spreadNodeStartLoc,
        ),
      );

      checkCommaAfterRest();

      break;
    } else {
      exprList.push(
        parseMaybeAssign(
          false,
          refShorthandDefaultPos,
          parseParenItem,
          refNeedsArrowPos,
        ),
      );
    }
  }

  const innerEndPos = state.start;
  const innerEndLoc = state.startLoc;
  expect(tt.parenR);

  state.maybeInArrowParameters = oldMaybeInArrowParameters;

  let arrowNode = startNodeAt(startPos, startLoc);
  if (canBeArrow && shouldParseArrow() && (arrowNode = parseArrow(arrowNode))) {
    checkYieldAwaitInDefaultParams();
    state.yieldPos = oldYieldPos;
    state.awaitPos = oldAwaitPos;
    for (const param of exprList) {
      if (param.extra && param.extra.parenthesized) {
        unexpected(param.extra.parenStart);
      }
    }

    parseArrowExpression(arrowNode, exprList, false);
    return arrowNode;
  }

  // We keep the old value if it isn't null, for cases like
  //   (x = (yield)) => {}
  state.yieldPos = oldYieldPos || state.yieldPos;
  state.awaitPos = oldAwaitPos || state.awaitPos;

  if (!exprList.length) {
    unexpected(state.lastTokStart);
  }
  if (optionalCommaStart) unexpected(optionalCommaStart);
  if (spreadStart) unexpected(spreadStart);
  if (refShorthandDefaultPos.start) {
    unexpected(refShorthandDefaultPos.start);
  }
  if (refNeedsArrowPos.start) unexpected(refNeedsArrowPos.start);

  toReferencedListDeep(exprList, /* isParenthesizedExpr */ true);
  if (exprList.length > 1) {
    val = startNodeAt(innerStartPos, innerStartLoc);
    val.expressions = exprList;
    finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
  } else {
    val = exprList[0];
  }

  if (!options.createParenthesizedExpressions) {
    addExtra(val, "parenthesized", true);
    addExtra(val, "parenStart", startPos);
    return val;
  }

  const parenExpression = startNodeAt(startPos, startLoc);
  parenExpression.expression = val;
  finishNode(parenExpression, "ParenthesizedExpression");
  return parenExpression;
}

export function shouldParseArrow(): boolean {
  return !canInsertSemicolon();
}

export function parseArrow(
  node: N.ArrowFunctionExpression,
): ?N.ArrowFunctionExpression {
  if (eat(tt.arrow)) {
    return node;
  }
}

export function parseParenItem(
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

function parseNew(): N.NewExpression | N.MetaProperty {
  const node = startNode();
  const meta = parseIdentifier(true);

  if (eat(tt.dot)) {
    const metaProp = parseMetaProperty(node, meta, "target");

    if (!scope.inNonArrowFunction && !state.inClassProperty) {
      let error = "new.target can only be used in functions";

      if (hasPlugin("classProperties")) {
        error += " or class properties";
      }

      raise(metaProp.start, error);
    }

    return metaProp;
  }

  node.callee = parseNoCallExpr();

  if (node.callee.type === "Import") {
    raise(node.callee.start, "Cannot use new with import(...)");
  } else if (
    node.callee.type === "OptionalMemberExpression" ||
    node.callee.type === "OptionalCallExpression"
  ) {
    raise(
      state.lastTokEnd,
      "constructors in/after an Optional Chain are not allowed",
    );
  } else if (eat(tt.questionDot)) {
    raise(
      state.start,
      "constructors in/after an Optional Chain are not allowed",
    );
  }

  parseNewArguments(node);
  return finishNode(node, "NewExpression");
}

export function parseNewArguments(node: N.NewExpression): void {
  if (eat(tt.parenL)) {
    const args = parseExprList(tt.parenR);
    toReferencedList(args);
    // $FlowFixMe (parseExprList should be all non-null in this case)
    node.arguments = args;
  } else {
    node.arguments = [];
  }
}

// Parse template expression.

function parseTemplateElement(isTagged: boolean): N.TemplateElement {
  const elem = startNode();
  if (state.value === null) {
    if (!isTagged) {
      // TODO: fix this
      raise(
        state.invalidTemplateEscapePosition || 0,
        "Invalid escape sequence in template",
      );
    } else {
      state.invalidTemplateEscapePosition = null;
    }
  }
  elem.value = {
    raw: input.slice(state.start, state.end).replace(/\r\n?/g, "\n"),
    cooked: state.value,
  };
  next();
  elem.tail = match(tt.backQuote);
  return finishNode(elem, "TemplateElement");
}

export function parseTemplate(isTagged: boolean): N.TemplateLiteral {
  const node = startNode();
  next();
  node.expressions = [];
  let curElt = parseTemplateElement(isTagged);
  node.quasis = [curElt];
  while (!curElt.tail) {
    expect(tt.dollarBraceL);
    node.expressions.push(parseExpression());
    expect(tt.braceR);
    node.quasis.push((curElt = parseTemplateElement(isTagged)));
  }
  next();
  return finishNode(node, "TemplateLiteral");
}

// Parse an object literal or binding pattern.

export function parseObj<T: N.ObjectPattern | N.ObjectExpression>(
  isPattern: boolean,
  refShorthandDefaultPos?: ?Pos,
): T {
  const propHash: any = Object.create(null);
  let first = true;
  const node = startNode();

  node.properties = [];
  next();

  while (!eat(tt.braceR)) {
    if (first) {
      first = false;
    } else {
      expect(tt.comma);
      if (eat(tt.braceR)) break;
    }

    const prop = parseObjectMember(isPattern, refShorthandDefaultPos);
    // $FlowIgnore RestElement will never be returned if !isPattern
    if (!isPattern) checkPropClash(prop, propHash);

    // $FlowIgnore
    if (prop.shorthand) {
      addExtra(prop, "shorthand", true);
    }

    node.properties.push(prop);
  }

  return finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
}

function isAsyncProp(prop: N.ObjectProperty): boolean {
  return (
    !prop.computed &&
    prop.key.type === "Identifier" &&
    prop.key.name === "async" &&
    (match(tt.name) ||
      match(tt.num) ||
      match(tt.string) ||
      match(tt.bracketL) ||
      state.type.keyword ||
      match(tt.star)) &&
    !hasPrecedingLineBreak()
  );
}

function parseObjectMember(
  isPattern: boolean,
  refShorthandDefaultPos: ?Pos,
): N.ObjectMember | N.SpreadElement | N.RestElement {
  let decorators = [];
  if (match(tt.at)) {
    if (hasPlugin("decorators")) {
      raise(
        state.start,
        "Stage 2 decorators disallow object literal property decorators",
      );
    } else {
      // we needn't check if decorators (stage 0) plugin is enabled since it's checked by
      // the call to parseDecorator
      while (match(tt.at)) {
        decorators.push(parseDecorator());
      }
    }
  }

  const prop = startNode();
  let isGenerator = false;
  let isAsync = false;
  let startPos;
  let startLoc;

  if (match(tt.ellipsis)) {
    if (decorators.length) unexpected();
    if (isPattern) {
      next();
      // Don't use parseRestBinding() as we only allow Identifier here.
      prop.argument = parseIdentifier();
      checkCommaAfterRest();
      return finishNode(prop, "RestElement");
    }

    return parseSpread();
  }

  if (decorators.length) {
    prop.decorators = decorators;
    decorators = [];
  }

  prop.method = false;

  if (isPattern || refShorthandDefaultPos) {
    startPos = state.start;
    startLoc = state.startLoc;
  }

  if (!isPattern) {
    isGenerator = eat(tt.star);
  }

  const containsEsc = state.containsEsc;
  parsePropertyName(prop);

  if (!isPattern && !containsEsc && !isGenerator && isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = eat(tt.star);
    parsePropertyName(prop);
  } else {
    isAsync = false;
  }

  parseObjPropValue(
    prop,
    startPos,
    startLoc,
    isGenerator,
    isAsync,
    isPattern,
    refShorthandDefaultPos,
    containsEsc,
  );

  return prop;
}

function isGetterOrSetterMethod(
  prop: N.ObjectMethod,
  isPattern: boolean,
): boolean {
  return (
    !isPattern &&
    !prop.computed &&
    prop.key.type === "Identifier" &&
    (prop.key.name === "get" || prop.key.name === "set") &&
    (match(tt.string) || // get "string"() {}
    match(tt.num) || // get 1() {}
    match(tt.bracketL) || // get ["string"]() {}
    match(tt.name) || // get foo() {}
      !!state.type.keyword) // get debugger() {}
  );
}

export function getGetterSetterExpectedParamCount(
  method: N.ObjectMethod | N.ClassMethod,
): number {
  return method.kind === "get" ? 0 : 1;
}

// get methods aren't allowed to have any parameters
// set methods must have exactly 1 parameter which is not a rest parameter
export function checkGetterSetterParams(
  method: N.ObjectMethod | N.ClassMethod,
): void {
  const paramCount = getGetterSetterExpectedParamCount(method);
  const start = method.start;
  if (method.params.length !== paramCount) {
    if (method.kind === "get") {
      raise(start, "getter must not have any formal parameters");
    } else {
      raise(start, "setter must have exactly one formal parameter");
    }
  }

  if (
    method.kind === "set" &&
    method.params[method.params.length - 1].type === "RestElement"
  ) {
    raise(start, "setter function argument must not be a rest parameter");
  }
}

export function parseObjectMethod(
  prop: N.ObjectMethod,
  isGenerator: boolean,
  isAsync: boolean,
  isPattern: boolean,
  containsEsc: boolean,
): ?N.ObjectMethod {
  if (isAsync || isGenerator || match(tt.parenL)) {
    if (isPattern) unexpected();
    prop.kind = "method";
    prop.method = true;
    return parseMethod(
      prop,
      isGenerator,
      isAsync,
      /* isConstructor */ false,
      false,
      "ObjectMethod",
    );
  }

  if (!containsEsc && isGetterOrSetterMethod(prop, isPattern)) {
    if (isGenerator || isAsync) unexpected();
    prop.kind = prop.key.name;
    parsePropertyName(prop);
    parseMethod(
      prop,
      /* isGenerator */ false,
      /* isAsync */ false,
      /* isConstructor */ false,
      false,
      "ObjectMethod",
    );
    checkGetterSetterParams(prop);
    return prop;
  }
}

export function parseObjectProperty(
  prop: N.ObjectProperty,
  startPos: ?number,
  startLoc: ?Position,
  isPattern: boolean,
  refShorthandDefaultPos: ?Pos,
): ?N.ObjectProperty {
  prop.shorthand = false;

  if (eat(tt.colon)) {
    prop.value = isPattern
      ? parseMaybeDefault(state.start, state.startLoc)
      : parseMaybeAssign(false, refShorthandDefaultPos);

    return finishNode(prop, "ObjectProperty");
  }

  if (!prop.computed && prop.key.type === "Identifier") {
    checkReservedWord(prop.key.name, prop.key.start, true, true);

    if (isPattern) {
      prop.value = parseMaybeDefault(startPos, startLoc, prop.key.__clone());
    } else if (match(tt.eq) && refShorthandDefaultPos) {
      if (!refShorthandDefaultPos.start) {
        refShorthandDefaultPos.start = state.start;
      }
      prop.value = parseMaybeDefault(startPos, startLoc, prop.key.__clone());
    } else {
      prop.value = prop.key.__clone();
    }
    prop.shorthand = true;

    return finishNode(prop, "ObjectProperty");
  }
}

export function parseObjPropValue(
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
    parseObjectMethod(prop, isGenerator, isAsync, isPattern, containsEsc) ||
    parseObjectProperty(
      prop,
      startPos,
      startLoc,
      isPattern,
      refShorthandDefaultPos,
    );

  if (!node) unexpected();

  // $FlowFixMe
  return node;
}

export function parsePropertyName(
  prop: N.ObjectOrClassMember | N.ClassMember | N.TsNamedTypeElementBase,
): N.Expression | N.Identifier {
  if (eat(tt.bracketL)) {
    (prop: $FlowSubtype<N.ObjectOrClassMember>).computed = true;
    prop.key = parseMaybeAssign();
    expect(tt.bracketR);
  } else {
    const oldInPropertyName = state.inPropertyName;
    state.inPropertyName = true;
    // We check if it's valid for it to be a private name when we push it.
    (prop: $FlowFixMe).key =
      match(tt.num) || match(tt.string)
        ? parseExprAtom()
        : parseMaybePrivateName();

    if (prop.key.type !== "PrivateName") {
      // ClassPrivateProperty is never computed, so we don't assign in that case.
      prop.computed = false;
    }

    state.inPropertyName = oldInPropertyName;
  }

  return prop.key;
}

// Initialize empty function node.

export function initFunction(
  node: N.BodilessFunctionOrMethodBase,
  isAsync: ?boolean,
): void {
  node.id = null;
  node.generator = false;
  node.async = !!isAsync;
}

// Parse object or class method.

export function parseMethod<T: N.MethodLike>(
  node: T,
  isGenerator: boolean,
  isAsync: boolean,
  isConstructor: boolean,
  allowDirectSuper: boolean,
  type: string,
  inClassScope: boolean = false,
): T {
  const oldYieldPos = state.yieldPos;
  const oldAwaitPos = state.awaitPos;
  state.yieldPos = 0;
  state.awaitPos = 0;

  initFunction(node, isAsync);
  node.generator = !!isGenerator;
  const allowModifiers = isConstructor; // For TypeScript parameter properties
  scope.enter(
    functionFlags(isAsync, node.generator) |
      SCOPE_SUPER |
      (inClassScope ? SCOPE_CLASS : 0) |
      (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0),
  );
  parseFunctionParams((node: any), allowModifiers);
  checkYieldAwaitInDefaultParams();
  parseFunctionBodyAndFinish(node, type, true);

  state.yieldPos = oldYieldPos;
  state.awaitPos = oldAwaitPos;

  return node;
}

// Parse arrow function expression.
// If the parameters are provided, they will be converted to an
// assignable list.
export function parseArrowExpression(
  node: N.ArrowFunctionExpression,
  params: ?(N.Expression[]),
  isAsync: boolean,
): N.ArrowFunctionExpression {
  scope.enter(functionFlags(isAsync, false) | SCOPE_ARROW);
  initFunction(node, isAsync);

  const oldMaybeInArrowParameters = state.maybeInArrowParameters;
  const oldYieldPos = state.yieldPos;
  const oldAwaitPos = state.awaitPos;
  state.maybeInArrowParameters = false;
  state.yieldPos = 0;
  state.awaitPos = 0;

  if (params) setArrowFunctionParameters(node, params);
  parseFunctionBody(node, true);

  state.maybeInArrowParameters = oldMaybeInArrowParameters;
  state.yieldPos = oldYieldPos;
  state.awaitPos = oldAwaitPos;

  return finishNode(node, "ArrowFunctionExpression");
}

export function setArrowFunctionParameters(
  node: N.ArrowFunctionExpression,
  params: N.Expression[],
): void {
  node.params = toAssignableList(params, true, "arrow function parameters");
}

export function isStrictBody(node: { body: N.BlockStatement }): boolean {
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

export function parseFunctionBodyAndFinish(
  node: N.BodilessFunctionOrMethodBase,
  type: string,
  isMethod?: boolean = false,
): void {
  // $FlowIgnore (node is not bodiless if we get here)
  parseFunctionBody(node, false, isMethod);
  finishNode(node, type);
}

// Parse function body and check parameters.
export function parseFunctionBody(
  node: N.Function,
  allowExpression: ?boolean,
  isMethod?: boolean = false,
): void {
  const isExpression = allowExpression && !match(tt.braceL);
  const oldStrict = state.strict;
  let useStrict = false;

  const oldInParameters = state.inParameters;
  state.inParameters = false;

  if (isExpression) {
    node.body = parseMaybeAssign();
    checkParams(node, false, allowExpression);
  } else {
    const nonSimple = !isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = strictDirective(state.end);
      // If this is a strict mode function, verify that argument names
      // are not repeated, and it does not try to bind the words `eval`
      // or `arguments`.
      if (useStrict && nonSimple) {
        // This logic is here to align the error location with the estree plugin
        const errorPos =
          // $FlowIgnore
          (node.kind === "method" || node.kind === "constructor") &&
          // $FlowIgnore
          !!node.key
            ? node.key.end
            : node.start;
        raise(
          errorPos,
          "Illegal 'use strict' directive in function with non-simple parameter list",
        );
      }
    }
    // Start a new scope with regard to labels
    // flag (restore them to their old value afterwards).
    const oldLabels = state.labels;
    state.labels = [];
    if (useStrict) state.strict = true;
    // Add the params to varDeclaredNames to ensure that an error is thrown
    // if a let/const declaration in the function clashes with one of the params.
    checkParams(
      node,
      !oldStrict && !useStrict && !allowExpression && !isMethod && !nonSimple,
      allowExpression,
    );
    node.body = parseBlock(true, false);
    state.labels = oldLabels;
  }
  scope.exit();

  state.inParameters = oldInParameters;
  // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
  if (state.strict && node.id) {
    checkLVal(node.id, BIND_OUTSIDE, undefined, "function name");
  }
  state.strict = oldStrict;
}

function isSimpleParamList(
  params: $ReadOnlyArray<N.Pattern | N.TSParameterProperty>,
): boolean {
  for (let i = 0, len = params.length; i < len; i++) {
    if (params[i].type !== "Identifier") return false;
  }
  return true;
}

export function checkParams(
  node: N.Function,
  allowDuplicates: boolean,
  // eslint-disable-next-line no-unused-vars
  isArrowFunction: ?boolean,
): void {
  // $FlowIssue
  const nameHash: {} = Object.create(null);
  for (let i = 0; i < node.params.length; i++) {
    checkLVal(
      node.params[i],
      BIND_VAR,
      allowDuplicates ? null : nameHash,
      "function paramter list",
    );
  }
}

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

function parseExprList(
  close: TokenType,
  allowEmpty?: boolean,
  refShorthandDefaultPos?: ?Pos,
): $ReadOnlyArray<?N.Expression> {
  const elts = [];
  let first = true;

  while (!eat(close)) {
    if (first) {
      first = false;
    } else {
      expect(tt.comma);
      if (eat(close)) break;
    }

    elts.push(parseExprListItem(allowEmpty, refShorthandDefaultPos));
  }
  return elts;
}

function parseExprListItem(
  allowEmpty: ?boolean,
  refShorthandDefaultPos: ?Pos,
  refNeedsArrowPos: ?Pos,
  allowPlaceholder: ?boolean,
): ?N.Expression {
  let elt;
  if (allowEmpty && match(tt.comma)) {
    elt = null;
  } else if (match(tt.ellipsis)) {
    const spreadNodeStartPos = state.start;
    const spreadNodeStartLoc = state.startLoc;
    elt = parseParenItem(
      parseSpread(refShorthandDefaultPos, refNeedsArrowPos),
      spreadNodeStartPos,
      spreadNodeStartLoc,
    );
  } else if (match(tt.question)) {
    expectPlugin("partialApplication");
    if (!allowPlaceholder) {
      raise(state.start, "Unexpected argument placeholder");
    }
    const node = startNode();
    next();
    elt = finishNode(node, "ArgumentPlaceholder");
  } else {
    elt = parseMaybeAssign(
      false,
      refShorthandDefaultPos,
      parseParenItem,
      refNeedsArrowPos,
    );
  }
  return elt;
}

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

export function parseIdentifier(liberal?: boolean): N.Identifier {
  const node = startNode();
  const name = parseIdentifierName(node.start, liberal);

  return createIdentifier(node, name);
}

export function createIdentifier(
  node: N.Identifier,
  name: string,
): N.Identifier {
  node.name = name;
  node.loc.identifierName = name;

  return finishNode(node, "Identifier");
}

export function parseIdentifierName(pos: number, liberal?: boolean): string {
  let name: string;

  if (match(tt.name)) {
    name = state.value;
  } else if (state.type.keyword) {
    name = state.type.keyword;

    // `class` and `function` keywords push new context into context.
    // But there is no chance to pop the context if the keyword is consumed
    // as an identifier such as a property name.
    // If the previous token is a dot, this does not apply because the
    // context-managing code already ignored the keyword
    if (
      (name === "class" || name === "function") &&
      (state.lastTokEnd !== state.lastTokStart + 1 ||
        input.charCodeAt(state.lastTokStart) !== charCodes.dot)
    ) {
      state.context.pop();
    }
  } else {
    throw unexpected();
  }

  if (!liberal) {
    checkReservedWord(name, state.start, !!state.type.keyword, false);
  }

  next();

  return name;
}

export function checkReservedWord(
  word: string,
  startLoc: number,
  checkKeywords: boolean,
  isBinding: boolean,
): void {
  if (scope.inGenerator && word === "yield") {
    raise(startLoc, "Can not use 'yield' as identifier inside a generator");
  }

  if (scope.inAsync && word === "await") {
    raise(
      startLoc,
      "Can not use 'await' as identifier inside an async function",
    );
  }

  if (state.inClassProperty && word === "arguments") {
    raise(startLoc, "'arguments' is not allowed in class field initializer");
  }
  if (checkKeywords && isKeyword(word)) {
    raise(startLoc, `Unexpected keyword '${word}'`);
  }

  const reservedTest = !state.strict
    ? isReservedWord
    : isBinding
    ? isStrictBindReservedWord
    : isStrictReservedWord;

  if (reservedTest(word, inModule)) {
    if (!scope.inAsync && word === "await") {
      raise(startLoc, "Can not use keyword 'await' outside an async function");
    }
    raise(startLoc, `Unexpected reserved word '${word}'`);
  }
}

// Parses await expression inside async function.

function parseAwait(): N.AwaitExpression {
  if (!state.awaitPos) {
    state.awaitPos = state.start;
  }
  const node = startNode();

  next();

  if (state.inParameters) {
    raise(node.start, "await is not allowed in async function parameters");
  }
  if (match(tt.star)) {
    raise(
      node.start,
      "await* has been removed from the async functions proposal. Use Promise.all() instead.",
    );
  }

  node.argument = parseMaybeUnary();
  return finishNode(node, "AwaitExpression");
}

// Parses yield expression inside generator.

function parseYield(noIn?: ?boolean): N.YieldExpression {
  if (!state.yieldPos) {
    state.yieldPos = state.start;
  }
  const node = startNode();

  if (state.inParameters) {
    raise(node.start, "yield is not allowed in generator parameters");
  }

  next();
  if (
    match(tt.semi) ||
    (!match(tt.star) && !state.type.startsExpr) ||
    canInsertSemicolon()
  ) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = eat(tt.star);
    node.argument = parseMaybeAssign(noIn);
  }
  return finishNode(node, "YieldExpression");
}

// Validates a pipeline (for any of the pipeline Babylon plugins) at the point
// of the infix operator `|>`.

function checkPipelineAtInfixOperator(
  left: N.Expression,
  leftStartPos: number,
) {
  if (getPluginOption("pipelineOperator", "proposal") === "smart") {
    if (left.type === "SequenceExpression") {
      // Ensure that the pipeline head is not a comma-delimited
      // sequence expression.
      throw raise(
        leftStartPos,
        `Pipeline head should not be a comma-separated sequence expression`,
      );
    }
  }
}

function parseSmartPipelineBody(
  childExpression: N.Expression,
  startPos: number,
  startLoc: Position,
): N.PipelineBody {
  const pipelineStyle = checkSmartPipelineBodyStyle(childExpression);

  checkSmartPipelineBodyEarlyErrors(childExpression, pipelineStyle, startPos);

  return parseSmartPipelineBodyInStyle(
    childExpression,
    pipelineStyle,
    startPos,
    startLoc,
  );
}

function checkSmartPipelineBodyEarlyErrors(
  childExpression: N.Expression,
  pipelineStyle: N.PipelineStyle,
  startPos: number,
): void {
  if (match(tt.arrow)) {
    // If the following token is invalidly `=>`, then throw a human-friendly error
    // instead of something like 'Unexpected token, expected ";"'.
    throw raise(
      state.start,
      `Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized`,
    );
  } else if (
    pipelineStyle === "PipelineTopicExpression" &&
    childExpression.type === "SequenceExpression"
  ) {
    throw raise(
      startPos,
      `Pipeline body may not be a comma-separated sequence expression`,
    );
  }
}

function parseSmartPipelineBodyInStyle(
  childExpression: N.Expression,
  pipelineStyle: N.PipelineStyle,
  startPos: number,
  startLoc: Position,
): N.PipelineBody {
  const bodyNode = startNodeAt(startPos, startLoc);
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
      if (!topicReferenceWasUsedInCurrentTopicContext()) {
        throw raise(
          startPos,
          `Pipeline is in topic style but does not use topic reference`,
        );
      }
      bodyNode.expression = childExpression;
      break;
    default:
      throw raise(startPos, `Unknown pipeline style ${pipelineStyle}`);
  }
  return finishNode(bodyNode, pipelineStyle);
}

function checkSmartPipelineBodyStyle(
  expression: N.Expression,
): N.PipelineStyle {
  switch (expression.type) {
    default:
      return isSimpleReference(expression)
        ? "PipelineBareFunction"
        : "PipelineTopicExpression";
  }
}

function isSimpleReference(expression: N.Expression): boolean {
  switch (expression.type) {
    case "MemberExpression":
      return !expression.computed && isSimpleReference(expression.object);
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

function withTopicPermittingContext<T>(callback: () => T): T {
  const outerContextTopicState = state.topicContext;
  state.topicContext = {
    // Enable the use of the primary topic reference.
    maxNumOfResolvableTopics: 1,
    // Hide the use of any topic references from outer contexts.
    maxTopicIndex: null,
  };

  try {
    return callback();
  } finally {
    state.topicContext = outerContextTopicState;
  }
}

// Disable topic references from outer contexts within syntax constructs
// such as the bodies of iteration statements.
// The function modifies the parser's topic-context state to enable or disable
// the use of topic references with the smartPipelines plugin. They then run a
// callback, then they reset the parser to the old topic-context state that it
// had before the function was called.

export function withTopicForbiddingContext<T>(callback: () => T): T {
  const outerContextTopicState = state.topicContext;
  state.topicContext = {
    // Disable the use of the primary topic reference.
    maxNumOfResolvableTopics: 0,
    // Hide the use of any topic references from outer contexts.
    maxTopicIndex: null,
  };

  try {
    return callback();
  } finally {
    state.topicContext = outerContextTopicState;
  }
}

// Register the use of a primary topic reference (`#`) within the current
// topic context.
function registerTopicReference(): void {
  state.topicContext.maxTopicIndex = 0;
}

function primaryTopicReferenceIsAllowedInCurrentTopicContext(): boolean {
  return state.topicContext.maxNumOfResolvableTopics >= 1;
}

function topicReferenceWasUsedInCurrentTopicContext(): boolean {
  return (
    state.topicContext.maxTopicIndex != null &&
    state.topicContext.maxTopicIndex >= 0
  );
}
