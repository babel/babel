// @flow

import * as N from "../types";
import {
  isIdentifierChar,
  isIdentifierStart,
  keywordRelationalOperator,
} from "../util/identifier";
import { lineBreak, skipWhiteSpace } from "../util/whitespace";
import * as charCodes from "charcodes";
import {
  BIND_SIMPLE_CATCH,
  BIND_LEXICAL,
  BIND_VAR,
  BIND_FUNCTION,
  functionFlags,
  SCOPE_CLASS,
  SCOPE_OTHER,
  SCOPE_SIMPLE_CATCH,
  SCOPE_SUPER,
} from "../util/scopeflags";
import { types as tt, type TokenType } from "../util/token-types";

import {
  match,
  next,
  eat,
  lookahead,
  setStrict,
} from "::build-tool::bindings/tokenizer";
import {
  options,
  state,
  scope,
  inModule,
  input,
  length,
  sawUnambiguousESM,
} from "./index";
import {
  startNode,
  startNodeAt,
  startNodeAtNode,
  finishNode,
  finishNodeAt,
  resetStartLocationFromNode,
} from "./node";
import { hasPlugin, getPluginOption } from "./base";
import {
  addExtra,
  isContextual,
  eatContextual,
  expectContextual,
  expect,
  unexpected,
  expectPlugin,
  expectOnePlugin,
  isLineTerminator,
  semicolon,
  checkYieldAwaitInDefaultParams,
} from "./util";
import { raise } from "./location";
import {
  toAssignable,
  toReferencedList,
  checkLVal,
  parseBindingAtom,
  parseBindingList,
} from "./lval";
import {
  parseExpression,
  parseIdentifier,
  parseMaybeAssign,
  parseExprAtom,
  parsePropertyName,
  parseExprSubscripts,
  parseCallExpressionArguments,
  parseFunctionBodyAndFinish,
  parseMethod,
  initFunction,
  checkReservedWord,
  checkGetterSetterParams,
  withTopicForbiddingContext,
} from "./expression";

// Reused empty array added for node fields that are always empty.

const empty = [];

const loopLabel = { kind: "loop" },
  switchLabel = { kind: "switch" };

const FUNC_NO_FLAGS = 0b000,
  FUNC_STATEMENT = 0b001,
  FUNC_HANGING_STATEMENT = 0b010,
  FUNC_NULLABLE_ID = 0b100;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

export function parseTopLevel(file: N.File, program: N.Program): N.File {
  program.sourceType = options.sourceType;

  program.interpreter = parseInterpreterDirective();

  parseBlockBody(program, true, true, tt.eof);

  if (inModule && scope.undefinedExports.size > 0) {
    for (const [name] of Array.from(scope.undefinedExports)) {
      const pos = scope.undefinedExports.get(name);
      // $FlowIssue
      raise(pos, `Export '${name}' is not defined`);
    }
  }

  file.program = finishNode(program, "Program");
  file.comments = state.comments;

  if (options.tokens) file.tokens = state.tokens;

  return finishNode(file, "File");
}

// TODO

export function stmtToDirective(stmt: N.Statement): N.Directive {
  const expr = stmt.expression;

  const directiveLiteral = startNodeAt(expr.start, expr.loc.start);
  const directive = startNodeAt(stmt.start, stmt.loc.start);

  const raw = input.slice(expr.start, expr.end);
  const val = (directiveLiteral.value = raw.slice(1, -1)); // remove quotes

  addExtra(directiveLiteral, "raw", raw);
  addExtra(directiveLiteral, "rawValue", val);

  directive.value = finishNodeAt(
    directiveLiteral,
    "DirectiveLiteral",
    expr.end,
    expr.loc.end,
  );

  return finishNodeAt(directive, "Directive", stmt.end, stmt.loc.end);
}

function parseInterpreterDirective(): N.InterpreterDirective | null {
  if (!match(tt.interpreterDirective)) {
    return null;
  }

  const node = startNode();
  node.value = state.value;
  next();
  return finishNode(node, "InterpreterDirective");
}

export function isLet(context: ?string): boolean {
  if (!isContextual("let")) {
    return false;
  }
  skipWhiteSpace.lastIndex = state.pos;
  const skip = skipWhiteSpace.exec(input);
  // $FlowIgnore
  const next = state.pos + skip[0].length;
  const nextCh = input.charCodeAt(next);
  // For ambiguous cases, determine if a LexicalDeclaration (or only a
  // Statement) is allowed here. If context is not empty then only a Statement
  // is allowed. However, `let [` is an explicit negative lookahead for
  // ExpressionStatement, so special-case it first.
  if (nextCh === charCodes.leftSquareBracket) return true;
  if (context) return false;

  if (nextCh === charCodes.leftCurlyBrace) return true;

  if (isIdentifierStart(nextCh)) {
    let pos = next + 1;
    while (isIdentifierChar(input.charCodeAt(pos))) {
      ++pos;
    }
    const ident = input.slice(next, pos);
    if (!keywordRelationalOperator.test(ident)) return true;
  }
  return false;
}

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

export function parseStatement(
  context: ?string,
  topLevel?: boolean,
): N.Statement {
  if (match(tt.at)) {
    parseDecorators(true);
  }
  return parseStatementContent(context, topLevel);
}

export function parseStatementContent(
  context: ?string,
  topLevel: ?boolean,
): N.Statement {
  let starttype = state.type;
  const node = startNode();
  let kind;

  if (isLet(context)) {
    starttype = tt._var;
    kind = "let";
  }

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
    case tt._break:
    case tt._continue:
      // $FlowFixMe
      return parseBreakContinueStatement(node, starttype.keyword);
    case tt._debugger:
      return parseDebuggerStatement(node);
    case tt._do:
      return parseDoStatement(node);
    case tt._for:
      return parseForStatement(node);
    case tt._function:
      if (lookahead().type === tt.dot) break;
      if (context) {
        if (state.strict) {
          raise(
            state.start,
            "In strict mode code, functions can only be declared at top level or inside a block",
          );
        } else if (context !== "if" && context !== "label") {
          raise(
            state.start,
            "In non-strict mode code, functions can only be declared at top level, " +
              "inside a block, or as the body of an if statement",
          );
        }
      }
      return parseFunctionStatement(node, false, !context);

    case tt._class:
      if (context) unexpected();
      return parseClass(node, true);

    case tt._if:
      return parseIfStatement(node);
    case tt._return:
      return parseReturnStatement(node);
    case tt._switch:
      return parseSwitchStatement(node);
    case tt._throw:
      return parseThrowStatement(node);
    case tt._try:
      return parseTryStatement(node);

    case tt._const:
    case tt._var:
      kind = kind || state.value;
      if (context && kind !== "var") {
        unexpected(
          state.start,
          "Lexical declaration cannot appear in a single-statement context",
        );
      }
      return parseVarStatement(node, kind);

    case tt._while:
      return parseWhileStatement(node);
    case tt._with:
      return parseWithStatement(node);
    case tt.braceL:
      return parseBlock();
    case tt.semi:
      return parseEmptyStatement(node);
    case tt._export:
    case tt._import: {
      const nextToken = lookahead();
      if (nextToken.type === tt.parenL || nextToken.type === tt.dot) {
        break;
      }

      if (!options.allowImportExportEverywhere && !topLevel) {
        raise(
          state.start,
          "'import' and 'export' may only appear at the top level",
        );
      }

      next();

      let result;
      if (starttype === tt._import) {
        result = parseImport(node);

        if (
          result.type === "ImportDeclaration" &&
          (!result.importKind || result.importKind === "value")
        ) {
          sawUnambiguousESM();
        }
      } else {
        result = parseExport(node);

        if (
          (result.type === "ExportNamedDeclaration" &&
            (!result.exportKind || result.exportKind === "value")) ||
          (result.type === "ExportAllDeclaration" &&
            (!result.exportKind || result.exportKind === "value")) ||
          result.type === "ExportDefaultDeclaration"
        ) {
          sawUnambiguousESM();
        }
      }

      assertModuleNodeAllowed(node);

      return result;
    }

    default: {
      if (isAsyncFunction()) {
        if (context) {
          unexpected(
            null,
            "Async functions can only be declared at the top level or inside a block",
          );
        }
        next();
        return parseFunctionStatement(node, true, !context);
      }
    }
  }

  // If the statement does not start with a statement keyword or a
  // brace, it's an ExpressionStatement or LabeledStatement. We
  // simply start parsing an expression, and afterwards, if the
  // next token is a colon and the expression was a simple
  // Identifier node, we switch to interpreting it as a label.
  const maybeName = state.value;
  const expr = parseExpression();

  if (starttype === tt.name && expr.type === "Identifier" && eat(tt.colon)) {
    return parseLabeledStatement(node, maybeName, expr, context);
  } else {
    return parseExpressionStatement(node, expr);
  }
}

export function assertModuleNodeAllowed(node: N.Node): void {
  if (!options.allowImportExportEverywhere && !inModule) {
    raise(
      node.start,
      `'import' and 'export' may appear only with 'sourceType: "module"'`,
      {
        code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
      },
    );
  }
}

export function takeDecorators(node: N.HasDecorators): void {
  const decorators = state.decoratorStack[state.decoratorStack.length - 1];
  if (decorators.length) {
    node.decorators = decorators;
    resetStartLocationFromNode(node, decorators[0]);
    state.decoratorStack[state.decoratorStack.length - 1] = [];
  }
}

export function canHaveLeadingDecorator(): boolean {
  return match(tt._class);
}

export function parseDecorators(allowExport?: boolean): void {
  const currentContextDecorators =
    state.decoratorStack[state.decoratorStack.length - 1];
  while (match(tt.at)) {
    const decorator = parseDecorator();
    currentContextDecorators.push(decorator);
  }

  if (match(tt._export)) {
    if (!allowExport) {
      unexpected();
    }

    if (
      hasPlugin("decorators") &&
      !getPluginOption("decorators", "decoratorsBeforeExport")
    ) {
      raise(
        state.start,
        "Using the export keyword between a decorator and a class is not allowed. " +
          "Please use `export @dec class` instead.",
      );
    }
  } else if (!canHaveLeadingDecorator()) {
    raise(
      state.start,
      "Leading decorators must be attached to a class declaration",
    );
  }
}

export function parseDecorator(): N.Decorator {
  expectOnePlugin(["decorators-legacy", "decorators"]);

  const node = startNode();
  next();

  if (hasPlugin("decorators")) {
    // Every time a decorator class expression is evaluated, a new empty array is pushed onto the stack
    // So that the decorators of any nested class expressions will be dealt with separately
    state.decoratorStack.push([]);

    const startPos = state.start;
    const startLoc = state.startLoc;
    let expr: N.Expression;

    if (eat(tt.parenL)) {
      expr = parseExpression();
      expect(tt.parenR);
    } else {
      expr = parseIdentifier(false);

      while (eat(tt.dot)) {
        const node = startNodeAt(startPos, startLoc);
        node.object = expr;
        node.property = parseIdentifier(true);
        node.computed = false;
        expr = finishNode(node, "MemberExpression");
      }
    }

    node.expression = parseMaybeDecoratorArguments(expr);
    state.decoratorStack.pop();
  } else {
    node.expression = parseMaybeAssign();
  }
  return finishNode(node, "Decorator");
}

export function parseMaybeDecoratorArguments(expr: N.Expression): N.Expression {
  if (eat(tt.parenL)) {
    const node = startNodeAtNode(expr);
    node.callee = expr;
    node.arguments = parseCallExpressionArguments(tt.parenR, false);
    toReferencedList(node.arguments);
    return finishNode(node, "CallExpression");
  }

  return expr;
}

function parseBreakContinueStatement(
  node: N.BreakStatement | N.ContinueStatement,
  keyword: string,
): N.BreakStatement | N.ContinueStatement {
  const isBreak = keyword === "break";
  next();

  if (isLineTerminator()) {
    node.label = null;
  } else {
    node.label = parseIdentifier();
    semicolon();
  }

  verifyBreakContinue(node, keyword);

  return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
}

export function verifyBreakContinue(
  node: N.BreakStatement | N.ContinueStatement,
  keyword: string,
) {
  const isBreak = keyword === "break";
  let i;
  for (i = 0; i < state.labels.length; ++i) {
    const lab = state.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
      if (node.label && isBreak) break;
    }
  }
  if (i === state.labels.length) {
    raise(node.start, "Unsyntactic " + keyword);
  }
}

function parseDebuggerStatement(
  node: N.DebuggerStatement,
): N.DebuggerStatement {
  next();
  semicolon();
  return finishNode(node, "DebuggerStatement");
}

function parseHeaderExpression(): N.Expression {
  expect(tt.parenL);
  const val = parseExpression();
  expect(tt.parenR);
  return val;
}

function parseDoStatement(node: N.DoWhileStatement): N.DoWhileStatement {
  next();
  state.labels.push(loopLabel);

  node.body =
    // For the smartPipelines plugin: Disable topic references from outer
    // contexts within the loop body. They are permitted in test expressions,
    // outside of the loop body.
    withTopicForbiddingContext(() =>
      // Parse the loop body's body.
      parseStatement("do"),
    );

  state.labels.pop();

  expect(tt._while);
  node.test = parseHeaderExpression();
  eat(tt.semi);
  return finishNode(node, "DoWhileStatement");
}

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

function parseForStatement(node: N.Node): N.ForLike {
  next();
  state.labels.push(loopLabel);

  let awaitAt = -1;
  if (
    (scope.inAsync ||
      (!scope.inFunction && options.allowAwaitOutsideFunction)) &&
    eatContextual("await")
  ) {
    awaitAt = state.lastTokStart;
  }
  scope.enter(SCOPE_OTHER);
  expect(tt.parenL);

  if (match(tt.semi)) {
    if (awaitAt > -1) {
      unexpected(awaitAt);
    }
    return parseFor(node, null);
  }

  const isLetKw = isLet();
  if (match(tt._var) || match(tt._const) || isLetKw) {
    const init = startNode();
    const kind = isLetKw ? "let" : state.value;
    next();
    parseVar(init, true, kind);
    finishNode(init, "VariableDeclaration");

    if (
      (match(tt._in) || isContextual("of")) &&
      init.declarations.length === 1
    ) {
      return parseForIn(node, init, awaitAt);
    }
    if (awaitAt > -1) {
      unexpected(awaitAt);
    }
    return parseFor(node, init);
  }

  const refShorthandDefaultPos = { start: 0 };
  const init = parseExpression(true, refShorthandDefaultPos);
  if (match(tt._in) || isContextual("of")) {
    const description = isContextual("of")
      ? "for-of statement"
      : "for-in statement";
    toAssignable(init, undefined, description);
    checkLVal(init, undefined, undefined, description);
    return parseForIn(node, init, awaitAt);
  } else if (refShorthandDefaultPos.start) {
    unexpected(refShorthandDefaultPos.start);
  }
  if (awaitAt > -1) {
    unexpected(awaitAt);
  }
  return parseFor(node, init);
}

export function parseFunctionStatement(
  node: N.FunctionDeclaration,
  isAsync?: boolean,
  declarationPosition?: boolean,
): N.FunctionDeclaration {
  next();
  return parseFunction(
    node,
    FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT),
    isAsync,
  );
}

function parseIfStatement(node: N.IfStatement): N.IfStatement {
  next();
  node.test = parseHeaderExpression();
  node.consequent = parseStatement("if");
  node.alternate = eat(tt._else) ? parseStatement("if") : null;
  return finishNode(node, "IfStatement");
}

function parseReturnStatement(node: N.ReturnStatement): N.ReturnStatement {
  if (!scope.inFunction && !options.allowReturnOutsideFunction) {
    raise(state.start, "'return' outside of function");
  }

  next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (isLineTerminator()) {
    node.argument = null;
  } else {
    node.argument = parseExpression();
    semicolon();
  }

  return finishNode(node, "ReturnStatement");
}

function parseSwitchStatement(node: N.SwitchStatement): N.SwitchStatement {
  next();
  node.discriminant = parseHeaderExpression();
  const cases = (node.cases = []);
  expect(tt.braceL);
  state.labels.push(switchLabel);
  scope.enter(SCOPE_OTHER);

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  let cur;
  for (let sawDefault; !match(tt.braceR); ) {
    if (match(tt._case) || match(tt._default)) {
      const isCase = match(tt._case);
      if (cur) finishNode(cur, "SwitchCase");
      cases.push((cur = startNode()));
      cur.consequent = [];
      next();
      if (isCase) {
        cur.test = parseExpression();
      } else {
        if (sawDefault) {
          raise(state.lastTokStart, "Multiple default clauses");
        }
        sawDefault = true;
        cur.test = null;
      }
      expect(tt.colon);
    } else {
      if (cur) {
        cur.consequent.push(parseStatement(null));
      } else {
        unexpected();
      }
    }
  }
  scope.exit();
  if (cur) finishNode(cur, "SwitchCase");
  next(); // Closing brace
  state.labels.pop();
  return finishNode(node, "SwitchStatement");
}

function parseThrowStatement(node: N.ThrowStatement): N.ThrowStatement {
  next();
  if (lineBreak.test(input.slice(state.lastTokEnd, state.start))) {
    raise(state.lastTokEnd, "Illegal newline after throw");
  }
  node.argument = parseExpression();
  semicolon();
  return finishNode(node, "ThrowStatement");
}

function parseTryStatement(node: N.TryStatement): N.TryStatement {
  next();

  node.block = parseBlock();
  node.handler = null;

  if (match(tt._catch)) {
    const clause = startNode();
    next();
    if (match(tt.parenL)) {
      expect(tt.parenL);
      clause.param = parseBindingAtom();
      const simple = clause.param.type === "Identifier";
      scope.enter(simple ? SCOPE_SIMPLE_CATCH : 0);
      checkLVal(
        clause.param,
        simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL,
        null,
        "catch clause",
      );
      expect(tt.parenR);
    } else {
      clause.param = null;
      scope.enter(SCOPE_OTHER);
    }

    clause.body =
      // For the smartPipelines plugin: Disable topic references from outer
      // contexts within the function body. They are permitted in function
      // default-parameter expressions, which are part of the outer context,
      // outside of the function body.
      withTopicForbiddingContext(() =>
        // Parse the catch clause's body.
        parseBlock(false, false),
      );
    scope.exit();

    node.handler = finishNode(clause, "CatchClause");
  }

  node.guardedHandlers = empty;
  node.finalizer = eat(tt._finally) ? parseBlock() : null;

  if (!node.handler && !node.finalizer) {
    raise(node.start, "Missing catch or finally clause");
  }

  return finishNode(node, "TryStatement");
}

export function parseVarStatement(
  node: N.VariableDeclaration,
  kind: "var" | "let" | "const",
): N.VariableDeclaration {
  next();
  parseVar(node, false, kind);
  semicolon();
  return finishNode(node, "VariableDeclaration");
}

function parseWhileStatement(node: N.WhileStatement): N.WhileStatement {
  next();
  node.test = parseHeaderExpression();
  state.labels.push(loopLabel);

  node.body =
    // For the smartPipelines plugin:
    // Disable topic references from outer contexts within the loop body.
    // They are permitted in test expressions, outside of the loop body.
    withTopicForbiddingContext(() =>
      // Parse loop body.
      parseStatement("while"),
    );

  state.labels.pop();

  return finishNode(node, "WhileStatement");
}

function parseWithStatement(node: N.WithStatement): N.WithStatement {
  if (state.strict) {
    raise(state.start, "'with' in strict mode");
  }
  next();
  node.object = parseHeaderExpression();

  node.body =
    // For the smartPipelines plugin:
    // Disable topic references from outer contexts within the function body.
    // They are permitted in function default-parameter expressions, which are
    // part of the outer context, outside of the function body.
    withTopicForbiddingContext(() =>
      // Parse the statement body.
      parseStatement("with"),
    );

  return finishNode(node, "WithStatement");
}

function parseEmptyStatement(node: N.EmptyStatement): N.EmptyStatement {
  next();
  return finishNode(node, "EmptyStatement");
}

function parseLabeledStatement(
  node: N.LabeledStatement,
  maybeName: string,
  expr: N.Identifier,
  context: ?string,
): N.LabeledStatement {
  for (const label of state.labels) {
    if (label.name === maybeName) {
      raise(expr.start, `Label '${maybeName}' is already declared`);
    }
  }

  const kind = state.type.isLoop ? "loop" : match(tt._switch) ? "switch" : null;
  for (let i = state.labels.length - 1; i >= 0; i--) {
    const label = state.labels[i];
    if (label.statementStart === node.start) {
      label.statementStart = state.start;
      label.kind = kind;
    } else {
      break;
    }
  }

  state.labels.push({
    name: maybeName,
    kind: kind,
    statementStart: state.start,
  });
  node.body = parseStatement(
    context
      ? context.indexOf("label") === -1
        ? context + "label"
        : context
      : "label",
  );

  state.labels.pop();
  node.label = expr;
  return finishNode(node, "LabeledStatement");
}

export function parseExpressionStatement(
  node: N.ExpressionStatement,
  expr: N.Expression,
): N.Statement {
  node.expression = expr;
  semicolon();
  return finishNode(node, "ExpressionStatement");
}

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

export function parseBlock(
  allowDirectives?: boolean = false,
  createNewLexicalScope?: boolean = true,
): N.BlockStatement {
  const node = startNode();
  expect(tt.braceL);
  if (createNewLexicalScope) {
    scope.enter(SCOPE_OTHER);
  }
  parseBlockBody(node, allowDirectives, false, tt.braceR);
  if (createNewLexicalScope) {
    scope.exit();
  }
  return finishNode(node, "BlockStatement");
}

export function isValidDirective(stmt: N.Statement): boolean {
  return (
    stmt.type === "ExpressionStatement" &&
    stmt.expression.type === "StringLiteral" &&
    !stmt.expression.extra.parenthesized
  );
}

export function parseBlockBody(
  node: N.BlockStatementLike,
  allowDirectives: ?boolean,
  topLevel: boolean,
  end: TokenType,
): void {
  const body = (node.body = []);
  const directives = (node.directives = []);
  parseBlockOrModuleBlockBody(
    body,
    allowDirectives ? directives : undefined,
    topLevel,
    end,
  );
}

// Undefined directives means that directives are not allowed.
export function parseBlockOrModuleBlockBody(
  body: N.Statement[],
  directives: ?(N.Directive[]),
  topLevel: boolean,
  end: TokenType,
): void {
  let parsedNonDirective = false;
  let oldStrict;
  let octalPosition;

  while (!eat(end)) {
    if (!parsedNonDirective && state.containsOctal && !octalPosition) {
      octalPosition = state.octalPosition;
    }

    const stmt = parseStatement(null, topLevel);

    if (directives && !parsedNonDirective && isValidDirective(stmt)) {
      const directive = stmtToDirective(stmt);
      directives.push(directive);

      if (oldStrict === undefined && directive.value.value === "use strict") {
        oldStrict = state.strict;
        setStrict(true);

        if (octalPosition) {
          raise(octalPosition, "Octal literal in strict mode");
        }
      }

      continue;
    }

    parsedNonDirective = true;
    body.push(stmt);
  }

  if (oldStrict === false) {
    setStrict(false);
  }
}

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

function parseFor(
  node: N.ForStatement,
  init: ?(N.VariableDeclaration | N.Expression),
): N.ForStatement {
  node.init = init;
  expect(tt.semi);
  node.test = match(tt.semi) ? null : parseExpression();
  expect(tt.semi);
  node.update = match(tt.parenR) ? null : parseExpression();
  expect(tt.parenR);

  node.body =
    // For the smartPipelines plugin: Disable topic references from outer
    // contexts within the loop body. They are permitted in test expressions,
    // outside of the loop body.
    withTopicForbiddingContext(() =>
      // Parse the loop body.
      parseStatement("for"),
    );

  scope.exit();
  state.labels.pop();

  return finishNode(node, "ForStatement");
}

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

function parseForIn(
  node: N.ForInOf,
  init: N.VariableDeclaration | N.AssignmentPattern,
  awaitAt: number,
): N.ForInOf {
  const isForIn = match(tt._in);
  next();

  if (isForIn) {
    if (awaitAt > -1) unexpected(awaitAt);
  } else {
    node.await = awaitAt > -1;
  }

  if (
    init.type === "VariableDeclaration" &&
    init.declarations[0].init != null &&
    (!isForIn ||
      state.strict ||
      init.kind !== "var" ||
      init.declarations[0].id.type !== "Identifier")
  ) {
    raise(
      init.start,
      `${
        isForIn ? "for-in" : "for-of"
      } loop variable declaration may not have an initializer`,
    );
  } else if (init.type === "AssignmentPattern") {
    raise(init.start, "Invalid left-hand side in for-loop");
  }

  node.left = init;
  node.right = isForIn ? parseExpression() : parseMaybeAssign();
  expect(tt.parenR);

  node.body =
    // For the smartPipelines plugin:
    // Disable topic references from outer contexts within the loop body.
    // They are permitted in test expressions, outside of the loop body.
    withTopicForbiddingContext(() =>
      // Parse loop body.
      parseStatement("for"),
    );

  scope.exit();
  state.labels.pop();

  return finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
}

// Parse a list of variable declarations.

function parseVar(
  node: N.VariableDeclaration,
  isFor: boolean,
  kind: "var" | "let" | "const",
): N.VariableDeclaration {
  const declarations = (node.declarations = []);
  const isTypescript = hasPlugin("typescript");
  node.kind = kind;
  for (;;) {
    const decl = startNode();
    parseVarId(decl, kind);
    if (eat(tt.eq)) {
      decl.init = parseMaybeAssign(isFor);
    } else {
      if (kind === "const" && !(match(tt._in) || isContextual("of"))) {
        // `const` with no initializer is allowed in TypeScript.
        // It could be a declaration like `const x: number;`.
        if (!isTypescript) {
          unexpected();
        }
      } else if (
        decl.id.type !== "Identifier" &&
        !(isFor && (match(tt._in) || isContextual("of")))
      ) {
        raise(
          state.lastTokEnd,
          "Complex binding patterns require an initialization value",
        );
      }
      decl.init = null;
    }
    declarations.push(finishNode(decl, "VariableDeclarator"));
    if (!eat(tt.comma)) break;
  }
  return node;
}

export function parseVarId(
  decl: N.VariableDeclarator,
  kind: "var" | "let" | "const",
): void {
  if ((kind === "const" || kind === "let") && isContextual("let")) {
    unexpected(null, "let is disallowed as a lexically bound name");
  }
  decl.id = parseBindingAtom();
  checkLVal(
    decl.id,
    kind === "var" ? BIND_VAR : BIND_LEXICAL,
    undefined,
    "variable declaration",
  );
}

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

export function parseFunction<T: N.NormalFunction>(
  node: T,
  statement?: number = FUNC_NO_FLAGS,
  isAsync?: boolean = false,
): T {
  const isStatement = statement & FUNC_STATEMENT;
  const isHangingStatement = statement & FUNC_HANGING_STATEMENT;
  const requireId = !!isStatement && !(statement & FUNC_NULLABLE_ID);

  initFunction(node, isAsync);

  if (match(tt.star) && isHangingStatement) {
    unexpected(
      state.start,
      "Generators can only be declared at the top level or inside a block",
    );
  }
  node.generator = eat(tt.star);

  if (isStatement) {
    node.id = parseFunctionId(requireId);
    if (node.id && !isHangingStatement) {
      // If it is a regular function declaration in sloppy mode, then it is
      // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
      // mode depends on properties of the current scope (see
      // treatFunctionsAsVar).
      checkLVal(
        node.id,
        state.strict || node.generator || node.async
          ? scope.treatFunctionsAsVar
            ? BIND_VAR
            : BIND_LEXICAL
          : BIND_FUNCTION,
        null,
        "function name",
      );
    }
  }

  const oldInClassProperty = state.inClassProperty;
  const oldYieldPos = state.yieldPos;
  const oldAwaitPos = state.awaitPos;
  state.inClassProperty = false;
  state.yieldPos = 0;
  state.awaitPos = 0;
  scope.enter(functionFlags(node.async, node.generator));

  if (!isStatement) {
    node.id = parseFunctionId();
  }

  parseFunctionParams(node);

  // For the smartPipelines plugin: Disable topic references from outer
  // contexts within the function body. They are permitted in test
  // expressions, outside of the function body.
  withTopicForbiddingContext(() => {
    // Parse the function body.
    parseFunctionBodyAndFinish(
      node,
      isStatement ? "FunctionDeclaration" : "FunctionExpression",
    );
  });

  state.inClassProperty = oldInClassProperty;
  state.yieldPos = oldYieldPos;
  state.awaitPos = oldAwaitPos;

  return node;
}

export function parseFunctionId(requireId?: boolean): ?N.Identifier {
  return requireId || match(tt.name) ? parseIdentifier() : null;
}

export function parseFunctionParams(
  node: N.Function,
  allowModifiers?: boolean,
): void {
  const oldInParameters = state.inParameters;
  state.inParameters = true;

  expect(tt.parenL);
  node.params = parseBindingList(
    tt.parenR,
    /* allowEmpty */ false,
    allowModifiers,
  );

  state.inParameters = oldInParameters;
  checkYieldAwaitInDefaultParams();
}

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

export function parseClass<T: N.Class>(
  node: T,
  isStatement: /* T === ClassDeclaration */ boolean,
  optionalId?: boolean,
): T {
  next();
  takeDecorators(node);

  // A class definition is always strict mode code.
  const oldStrict = state.strict;
  state.strict = true;

  parseClassId(node, isStatement, optionalId);
  parseClassSuper(node);
  node.body = parseClassBody(!!node.superClass);

  state.strict = oldStrict;

  return finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
}

export function isClassProperty(): boolean {
  return match(tt.eq) || match(tt.semi) || match(tt.braceR);
}

export function isClassMethod(): boolean {
  return match(tt.parenL);
}

export function isNonstaticConstructor(
  method: N.ClassMethod | N.ClassProperty,
): boolean {
  return (
    !method.computed &&
    !method.static &&
    (method.key.name === "constructor" || // Identifier
      method.key.value === "constructor") // String literal
  );
}

export function parseClassBody(constructorAllowsSuper: boolean): N.ClassBody {
  state.classLevel++;

  const classState = { hadConstructor: false };
  let decorators: N.Decorator[] = [];
  const classBody: N.ClassBody = startNode();
  classBody.body = [];

  expect(tt.braceL);

  // For the smartPipelines plugin: Disable topic references from outer
  // contexts within the class body. They are permitted in test expressions,
  // outside of the class body.
  withTopicForbiddingContext(() => {
    while (!eat(tt.braceR)) {
      if (eat(tt.semi)) {
        if (decorators.length > 0) {
          raise(
            state.lastTokEnd,
            "Decorators must not be followed by a semicolon",
          );
        }
        continue;
      }

      if (match(tt.at)) {
        decorators.push(parseDecorator());
        continue;
      }

      const member = startNode();

      // steal the decorators if there are any
      if (decorators.length) {
        member.decorators = decorators;
        resetStartLocationFromNode(member, decorators[0]);
        decorators = [];
      }

      parseClassMember(classBody, member, classState, constructorAllowsSuper);

      if (
        member.kind === "constructor" &&
        member.decorators &&
        member.decorators.length > 0
      ) {
        raise(
          member.start,
          "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
        );
      }
    }
  });

  if (decorators.length) {
    raise(state.start, "You have trailing decorators with no method");
  }

  state.classLevel--;

  return finishNode(classBody, "ClassBody");
}

export function parseClassMember(
  classBody: N.ClassBody,
  member: N.ClassMember,
  classState: { hadConstructor: boolean },
  constructorAllowsSuper: boolean,
): void {
  let isStatic = false;
  const containsEsc = state.containsEsc;

  if (match(tt.name) && state.value === "static") {
    const key = parseIdentifier(true); // eats 'static'

    if (isClassMethod()) {
      const method: N.ClassMethod = (member: any);

      // a method named 'static'
      method.kind = "method";
      method.computed = false;
      method.key = key;
      method.static = false;
      pushClassMethod(
        classBody,
        method,
        false,
        false,
        /* isConstructor */ false,
        false,
      );
      return;
    } else if (isClassProperty()) {
      const prop: N.ClassProperty = (member: any);

      // a property named 'static'
      prop.computed = false;
      prop.key = key;
      prop.static = false;
      classBody.body.push(parseClassProperty(prop));
      return;
    } else if (containsEsc) {
      throw unexpected();
    }

    // otherwise something static
    isStatic = true;
  }

  parseClassMemberWithIsStatic(
    classBody,
    member,
    classState,
    isStatic,
    constructorAllowsSuper,
  );
}

export function parseClassMemberWithIsStatic(
  classBody: N.ClassBody,
  member: N.ClassMember,
  classState: { hadConstructor: boolean },
  isStatic: boolean,
  constructorAllowsSuper: boolean,
) {
  const publicMethod: $FlowSubtype<N.ClassMethod> = member;
  const privateMethod: $FlowSubtype<N.ClassPrivateMethod> = member;
  const publicProp: $FlowSubtype<N.ClassMethod> = member;
  const privateProp: $FlowSubtype<N.ClassPrivateMethod> = member;

  const method: typeof publicMethod | typeof privateMethod = publicMethod;
  const publicMember: typeof publicMethod | typeof publicProp = publicMethod;

  member.static = isStatic;

  if (eat(tt.star)) {
    // a generator
    method.kind = "method";
    parseClassPropertyName(method);

    if (method.key.type === "PrivateName") {
      // Private generator method
      pushClassPrivateMethod(classBody, privateMethod, true, false);
      return;
    }

    if (isNonstaticConstructor(publicMethod)) {
      raise(publicMethod.key.start, "Constructor can't be a generator");
    }

    pushClassMethod(
      classBody,
      publicMethod,
      true,
      false,
      /* isConstructor */ false,
      false,
    );

    return;
  }

  const containsEsc = state.containsEsc;
  const key = parseClassPropertyName(member);
  const isPrivate = key.type === "PrivateName";
  // Check the key is not a computed expression or string literal.
  const isSimple = key.type === "Identifier";

  parsePostMemberNameModifiers(publicMember);

  if (isClassMethod()) {
    method.kind = "method";

    if (isPrivate) {
      pushClassPrivateMethod(classBody, privateMethod, false, false);
      return;
    }

    // a normal method
    const isConstructor = isNonstaticConstructor(publicMethod);
    let allowsDirectSuper = false;
    if (isConstructor) {
      publicMethod.kind = "constructor";

      if (publicMethod.decorators) {
        raise(
          publicMethod.start,
          "You can't attach decorators to a class constructor",
        );
      }

      // TypeScript allows multiple overloaded constructor declarations.
      if (classState.hadConstructor && !hasPlugin("typescript")) {
        raise(key.start, "Duplicate constructor in the same class");
      }
      classState.hadConstructor = true;
      allowsDirectSuper = constructorAllowsSuper;
    }

    pushClassMethod(
      classBody,
      publicMethod,
      false,
      false,
      isConstructor,
      allowsDirectSuper,
    );
  } else if (isClassProperty()) {
    if (isPrivate) {
      pushClassPrivateProperty(classBody, privateProp);
    } else {
      pushClassProperty(classBody, publicProp);
    }
  } else if (
    isSimple &&
    key.name === "async" &&
    !containsEsc &&
    !isLineTerminator()
  ) {
    // an async method
    const isGenerator = eat(tt.star);

    method.kind = "method";
    // The so-called parsed name would have been "async": get the real name.
    parseClassPropertyName(method);

    if (method.key.type === "PrivateName") {
      // private async method
      pushClassPrivateMethod(classBody, privateMethod, isGenerator, true);
    } else {
      if (isNonstaticConstructor(publicMethod)) {
        raise(publicMethod.key.start, "Constructor can't be an async function");
      }

      pushClassMethod(
        classBody,
        publicMethod,
        isGenerator,
        true,
        /* isConstructor */ false,
        false,
      );
    }
  } else if (
    isSimple &&
    (key.name === "get" || key.name === "set") &&
    !containsEsc &&
    !(match(tt.star) && isLineTerminator())
  ) {
    // `get\n*` is an uninitialized property named 'get' followed by a generator.
    // a getter or setter
    method.kind = key.name;
    // The so-called parsed name would have been "get/set": get the real name.
    parseClassPropertyName(publicMethod);

    if (method.key.type === "PrivateName") {
      // private getter/setter
      pushClassPrivateMethod(classBody, privateMethod, false, false);
    } else {
      if (isNonstaticConstructor(publicMethod)) {
        raise(
          publicMethod.key.start,
          "Constructor can't have get/set modifier",
        );
      }
      pushClassMethod(
        classBody,
        publicMethod,
        false,
        false,
        /* isConstructor */ false,
        false,
      );
    }

    checkGetterSetterParams(publicMethod);
  } else if (isLineTerminator()) {
    // an uninitialized class property (due to ASI, since we don't otherwise recognize the next token)
    if (isPrivate) {
      pushClassPrivateProperty(classBody, privateProp);
    } else {
      pushClassProperty(classBody, publicProp);
    }
  } else {
    unexpected();
  }
}

export function parseClassPropertyName(
  member: N.ClassMember,
): N.Expression | N.Identifier {
  const key = parsePropertyName(member);

  if (
    !member.computed &&
    member.static &&
    ((key: $FlowSubtype<N.Identifier>).name === "prototype" ||
      (key: $FlowSubtype<N.StringLiteral>).value === "prototype")
  ) {
    raise(key.start, "Classes may not have static property named prototype");
  }

  if (key.type === "PrivateName" && key.id.name === "constructor") {
    raise(
      key.start,
      "Classes may not have a private field named '#constructor'",
    );
  }

  return key;
}

export function pushClassProperty(
  classBody: N.ClassBody,
  prop: N.ClassProperty,
) {
  // This only affects properties, not methods.
  if (isNonstaticConstructor(prop)) {
    raise(
      prop.key.start,
      "Classes may not have a non-static field named 'constructor'",
    );
  }
  classBody.body.push(parseClassProperty(prop));
}

export function pushClassPrivateProperty(
  classBody: N.ClassBody,
  prop: N.ClassPrivateProperty,
) {
  expectPlugin("classPrivateProperties", prop.key.start);
  classBody.body.push(parseClassPrivateProperty(prop));
}

export function pushClassMethod(
  classBody: N.ClassBody,
  method: N.ClassMethod,
  isGenerator: boolean,
  isAsync: boolean,
  isConstructor: boolean,
  allowsDirectSuper: boolean,
): void {
  classBody.body.push(
    parseMethod(
      method,
      isGenerator,
      isAsync,
      isConstructor,
      allowsDirectSuper,
      "ClassMethod",
      true,
    ),
  );
}

export function pushClassPrivateMethod(
  classBody: N.ClassBody,
  method: N.ClassPrivateMethod,
  isGenerator: boolean,
  isAsync: boolean,
): void {
  expectPlugin("classPrivateMethods", method.key.start);
  classBody.body.push(
    parseMethod(
      method,
      isGenerator,
      isAsync,
      /* isConstructor */ false,
      false,
      "ClassPrivateMethod",
      true,
    ),
  );
}

// Overridden in typescript.js
export function parsePostMemberNameModifiers(
  // eslint-disable-next-line no-unused-vars
  methodOrProp: N.ClassMethod | N.ClassProperty,
): void {}

// Overridden in typescript.js
export function parseAccessModifier(): ?N.Accessibility {
  return undefined;
}

export function parseClassPrivateProperty(
  node: N.ClassPrivateProperty,
): N.ClassPrivateProperty {
  state.inClassProperty = true;

  scope.enter(SCOPE_CLASS | SCOPE_SUPER);

  node.value = eat(tt.eq) ? parseMaybeAssign() : null;
  semicolon();
  state.inClassProperty = false;

  scope.exit();

  return finishNode(node, "ClassPrivateProperty");
}

export function parseClassProperty(node: N.ClassProperty): N.ClassProperty {
  if (!node.typeAnnotation) {
    expectPlugin("classProperties");
  }

  state.inClassProperty = true;

  scope.enter(SCOPE_CLASS | SCOPE_SUPER);

  if (match(tt.eq)) {
    expectPlugin("classProperties");
    next();
    node.value = parseMaybeAssign();
  } else {
    node.value = null;
  }
  semicolon();
  state.inClassProperty = false;

  scope.exit();

  return finishNode(node, "ClassProperty");
}

export function parseClassId(
  node: N.Class,
  isStatement: boolean,
  optionalId: ?boolean,
): void {
  if (match(tt.name)) {
    node.id = parseIdentifier();
    if (isStatement) {
      checkLVal(node.id, BIND_LEXICAL, undefined, "class name");
    }
  } else {
    if (optionalId || !isStatement) {
      node.id = null;
    } else {
      unexpected(null, "A class name is required");
    }
  }
}

export function parseClassSuper(node: N.Class): void {
  node.superClass = eat(tt._extends) ? parseExprSubscripts() : null;
}

// Parses module export declaration.

export function parseExport(node: N.Node): N.AnyExport {
  const hasDefault = maybeParseExportDefaultSpecifier(node);
  const parseAfterDefault = !hasDefault || eat(tt.comma);
  const hasStar = parseAfterDefault && eatExportStar(node);
  const hasNamespace = hasStar && maybeParseExportNamespaceSpecifier(node);
  const parseAfterNamespace =
    parseAfterDefault && (!hasNamespace || eat(tt.comma));
  const isFromRequired = hasDefault || hasStar;

  if (hasStar && !hasNamespace) {
    if (hasDefault) unexpected();
    parseExportFrom(node, true);

    return finishNode(node, "ExportAllDeclaration");
  }

  const hasSpecifiers = maybeParseExportNamedSpecifiers(node);

  if (
    (hasDefault && parseAfterDefault && !hasStar && !hasSpecifiers) ||
    (hasNamespace && parseAfterNamespace && !hasSpecifiers)
  ) {
    throw unexpected(null, tt.braceL);
  }

  let hasDeclaration;
  if (isFromRequired || hasSpecifiers) {
    hasDeclaration = false;
    parseExportFrom(node, isFromRequired);
  } else {
    hasDeclaration = maybeParseExportDeclaration(node);
  }

  if (isFromRequired || hasSpecifiers || hasDeclaration) {
    checkExport(node, true, false, !!node.source);
    return finishNode(node, "ExportNamedDeclaration");
  }

  if (eat(tt._default)) {
    // export default ...
    node.declaration = parseExportDefaultExpression();
    checkExport(node, true, true);

    return finishNode(node, "ExportDefaultDeclaration");
  }

  throw unexpected(null, tt.braceL);
}

// eslint-disable-next-line no-unused-vars
export function eatExportStar(node: N.Node): boolean {
  return eat(tt.star);
}

export function maybeParseExportDefaultSpecifier(node: N.Node): boolean {
  if (isExportDefaultSpecifier()) {
    // export defaultObj ...
    expectPlugin("exportDefaultFrom");
    const specifier = startNode();
    specifier.exported = parseIdentifier(true);
    node.specifiers = [finishNode(specifier, "ExportDefaultSpecifier")];
    return true;
  }
  return false;
}

export function maybeParseExportNamespaceSpecifier(node: N.Node): boolean {
  if (isContextual("as")) {
    if (!node.specifiers) node.specifiers = [];
    expectPlugin("exportNamespaceFrom");

    const specifier = startNodeAt(state.lastTokStart, state.lastTokStartLoc);

    next();

    specifier.exported = parseIdentifier(true);
    node.specifiers.push(finishNode(specifier, "ExportNamespaceSpecifier"));
    return true;
  }
  return false;
}

function maybeParseExportNamedSpecifiers(node: N.Node): boolean {
  if (match(tt.braceL)) {
    if (!node.specifiers) node.specifiers = [];
    node.specifiers.push(...parseExportSpecifiers());

    node.source = null;
    node.declaration = null;

    return true;
  }
  return false;
}

function maybeParseExportDeclaration(node: N.Node): boolean {
  if (shouldParseExportDeclaration()) {
    if (isContextual("async")) {
      const next = lookahead();

      // export async;
      if (next.type !== tt._function) {
        unexpected(next.start, `Unexpected token, expected "function"`);
      }
    }

    node.specifiers = [];
    node.source = null;
    node.declaration = parseExportDeclaration(node);

    return true;
  }
  return false;
}

function isAsyncFunction(): boolean {
  if (!isContextual("async")) return false;

  const { pos } = state;

  skipWhiteSpace.lastIndex = pos;
  const skip = skipWhiteSpace.exec(input);

  if (!skip || !skip.length) return false;

  const next = pos + skip[0].length;

  return (
    !lineBreak.test(input.slice(pos, next)) &&
    input.slice(next, next + 8) === "function" &&
    (next + 8 === length || !isIdentifierChar(input.charCodeAt(next + 8)))
  );
}

export function parseExportDefaultExpression(): N.Expression | N.Declaration {
  const expr = startNode();

  const isAsync = isAsyncFunction();

  if (match(tt._function) || isAsync) {
    next();
    if (isAsync) {
      next();
    }

    return parseFunction(expr, FUNC_STATEMENT | FUNC_NULLABLE_ID, isAsync);
  } else if (match(tt._class)) {
    return parseClass(expr, true, true);
  } else if (match(tt.at)) {
    if (
      hasPlugin("decorators") &&
      getPluginOption("decorators", "decoratorsBeforeExport")
    ) {
      unexpected(
        state.start,
        "Decorators must be placed *before* the 'export' keyword." +
          " You can set the 'decoratorsBeforeExport' option to false to use" +
          " the 'export @decorator class {}' syntax",
      );
    }
    parseDecorators(false);
    return parseClass(expr, true, true);
  } else if (match(tt._const) || match(tt._var) || isLet()) {
    return raise(
      state.start,
      "Only expressions, functions or classes are allowed as the `default` export.",
    );
  } else {
    const res = parseMaybeAssign();
    semicolon();
    return res;
  }
}

export function parseExportDeclaration(
  // eslint-disable-next-line no-unused-vars
  node: N.ExportNamedDeclaration,
): ?N.Declaration {
  return parseStatement(null);
}

export function isExportDefaultSpecifier(): boolean {
  if (match(tt.name)) {
    return state.value !== "async" && state.value !== "let";
  }

  if (!match(tt._default)) {
    return false;
  }

  const next = lookahead();
  return (
    next.type === tt.comma || (next.type === tt.name && next.value === "from")
  );
}

export function parseExportFrom(
  node: N.ExportNamedDeclaration,
  expect?: boolean,
): void {
  if (eatContextual("from")) {
    node.source = parseImportSource();
    checkExport(node);
  } else {
    if (expect) {
      unexpected();
    } else {
      node.source = null;
    }
  }

  semicolon();
}

export function shouldParseExportDeclaration(): boolean {
  if (match(tt.at)) {
    expectOnePlugin(["decorators", "decorators-legacy"]);
    if (hasPlugin("decorators")) {
      if (getPluginOption("decorators", "decoratorsBeforeExport")) {
        unexpected(
          state.start,
          "Decorators must be placed *before* the 'export' keyword." +
            " You can set the 'decoratorsBeforeExport' option to false to use" +
            " the 'export @decorator class {}' syntax",
        );
      } else {
        return true;
      }
    }
  }

  return (
    state.type.keyword === "var" ||
    state.type.keyword === "const" ||
    state.type.keyword === "function" ||
    state.type.keyword === "class" ||
    isLet() ||
    isAsyncFunction()
  );
}

export function checkExport(
  node: N.ExportNamedDeclaration,
  checkNames?: boolean,
  isDefault?: boolean,
  isFrom?: boolean,
): void {
  if (checkNames) {
    // Check for duplicate exports
    if (isDefault) {
      // Default exports
      checkDuplicateExports(node, "default");
    } else if (node.specifiers && node.specifiers.length) {
      // Named exports
      for (const specifier of node.specifiers) {
        checkDuplicateExports(specifier, specifier.exported.name);
        // $FlowIgnore
        if (!isFrom && specifier.local) {
          // check for keywords used as local names
          checkReservedWord(
            specifier.local.name,
            specifier.local.start,
            true,
            false,
          );
          // check if export is defined
          // $FlowIgnore
          scope.checkLocalExport(specifier.local);
        }
      }
    } else if (node.declaration) {
      // Exported declarations
      if (
        node.declaration.type === "FunctionDeclaration" ||
        node.declaration.type === "ClassDeclaration"
      ) {
        const id = node.declaration.id;
        if (!id) throw new Error("Assertion failure");

        checkDuplicateExports(node, id.name);
      } else if (node.declaration.type === "VariableDeclaration") {
        for (const declaration of node.declaration.declarations) {
          checkDeclaration(declaration.id);
        }
      }
    }
  }

  const currentContextDecorators =
    state.decoratorStack[state.decoratorStack.length - 1];
  if (currentContextDecorators.length) {
    const isClass =
      node.declaration &&
      (node.declaration.type === "ClassDeclaration" ||
        node.declaration.type === "ClassExpression");
    if (!node.declaration || !isClass) {
      throw raise(
        node.start,
        "You can only use decorators on an export when exporting a class",
      );
    }
    takeDecorators(node.declaration);
  }
}

export function checkDeclaration(node: N.Pattern | N.ObjectProperty): void {
  if (node.type === "Identifier") {
    checkDuplicateExports(node, node.name);
  } else if (node.type === "ObjectPattern") {
    for (const prop of node.properties) {
      checkDeclaration(prop);
    }
  } else if (node.type === "ArrayPattern") {
    for (const elem of node.elements) {
      if (elem) {
        checkDeclaration(elem);
      }
    }
  } else if (node.type === "ObjectProperty") {
    checkDeclaration(node.value);
  } else if (node.type === "RestElement") {
    checkDeclaration(node.argument);
  } else if (node.type === "AssignmentPattern") {
    checkDeclaration(node.left);
  }
}

export function checkDuplicateExports(
  node:
    | N.Identifier
    | N.ExportNamedDeclaration
    | N.ExportSpecifier
    | N.ExportDefaultSpecifier,
  name: string,
): void {
  if (state.exportedIdentifiers.indexOf(name) > -1) {
    throw raise(
      node.start,
      name === "default"
        ? "Only one default export allowed per module."
        : `\`${name}\` has already been exported. Exported identifiers must be unique.`,
    );
  }
  state.exportedIdentifiers.push(name);
}

// Parses a comma-separated list of module exports.

export function parseExportSpecifiers(): Array<N.ExportSpecifier> {
  const nodes = [];
  let first = true;

  // export { x, y as z } [from '...']
  expect(tt.braceL);

  while (!eat(tt.braceR)) {
    if (first) {
      first = false;
    } else {
      expect(tt.comma);
      if (eat(tt.braceR)) break;
    }

    const node = startNode();
    node.local = parseIdentifier(true);
    node.exported = eatContextual("as")
      ? parseIdentifier(true)
      : node.local.__clone();
    nodes.push(finishNode(node, "ExportSpecifier"));
  }

  return nodes;
}

// Parses import declaration.

export function parseImport(node: N.Node): N.AnyImport {
  // import '...'
  node.specifiers = [];
  if (!match(tt.string)) {
    const hasDefault = maybeParseDefaultImportSpecifier(node);
    const parseNext = !hasDefault || eat(tt.comma);
    const hasStar = parseNext && maybeParseStarImportSpecifier(node);
    if (parseNext && !hasStar) parseNamedImportSpecifiers(node);
    expectContextual("from");
  }
  node.source = parseImportSource();
  semicolon();
  return finishNode(node, "ImportDeclaration");
}

export function parseImportSource(): N.StringLiteral {
  if (!match(tt.string)) unexpected();
  return parseExprAtom();
}

// eslint-disable-next-line no-unused-vars
export function shouldParseDefaultImport(node: N.ImportDeclaration): boolean {
  return match(tt.name);
}

export function parseImportSpecifierLocal(
  node: N.ImportDeclaration,
  specifier: N.Node,
  type: string,
  contextDescription: string,
): void {
  specifier.local = parseIdentifier();
  checkLVal(specifier.local, BIND_LEXICAL, undefined, contextDescription);
  node.specifiers.push(finishNode(specifier, type));
}

export function maybeParseDefaultImportSpecifier(
  node: N.ImportDeclaration,
): boolean {
  if (shouldParseDefaultImport(node)) {
    // import defaultObj, { x, y as z } from '...'
    parseImportSpecifierLocal(
      node,
      startNode(),
      "ImportDefaultSpecifier",
      "default import specifier",
    );
    return true;
  }
  return false;
}

export function maybeParseStarImportSpecifier(
  node: N.ImportDeclaration,
): boolean {
  if (match(tt.star)) {
    const specifier = startNode();
    next();
    expectContextual("as");

    parseImportSpecifierLocal(
      node,
      specifier,
      "ImportNamespaceSpecifier",
      "import namespace specifier",
    );
    return true;
  }
  return false;
}

export function parseNamedImportSpecifiers(node: N.ImportDeclaration) {
  let first = true;
  expect(tt.braceL);
  while (!eat(tt.braceR)) {
    if (first) {
      first = false;
    } else {
      // Detect an attempt to deep destructure
      if (eat(tt.colon)) {
        unexpected(
          null,
          "ES2015 named imports do not destructure. " +
            "Use another statement for destructuring after the import.",
        );
      }

      expect(tt.comma);
      if (eat(tt.braceR)) break;
    }

    parseImportSpecifier(node);
  }
}

export function parseImportSpecifier(node: N.ImportDeclaration): void {
  const specifier = startNode();
  specifier.imported = parseIdentifier(true);
  if (eatContextual("as")) {
    specifier.local = parseIdentifier();
  } else {
    checkReservedWord(specifier.imported.name, specifier.start, true, true);
    specifier.local = specifier.imported.__clone();
  }
  checkLVal(specifier.local, BIND_LEXICAL, undefined, "import specifier");
  node.specifiers.push(finishNode(specifier, "ImportSpecifier"));
}
