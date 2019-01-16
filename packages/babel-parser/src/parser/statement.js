// @flow

import * as N from "../types";
import { types as tt, type TokenType } from "../tokenizer/types";
import ExpressionParser from "./expression";
import { isIdentifierChar } from "../util/identifier";
import { lineBreak, skipWhiteSpace } from "../util/whitespace";

// Reused empty array added for node fields that are always empty.

const empty = [];

const loopLabel = { kind: "loop" },
  switchLabel = { kind: "switch" };

export default class StatementParser extends ExpressionParser {
  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  parseTopLevel(file: N.File, program: N.Program): N.File {
    program.sourceType = this.options.sourceType;

    program.interpreter = this.parseInterpreterDirective();

    this.parseBlockBody(program, true, true, tt.eof);

    file.program = this.finishNode(program, "Program");
    file.comments = this.state.comments;

    if (this.options.tokens) file.tokens = this.state.tokens;

    return this.finishNode(file, "File");
  }

  // TODO

  stmtToDirective(stmt: N.Statement): N.Directive {
    const expr = stmt.expression;

    const directiveLiteral = this.startNodeAt(expr.start, expr.loc.start);
    const directive = this.startNodeAt(stmt.start, stmt.loc.start);

    const raw = this.input.slice(expr.start, expr.end);
    const val = (directiveLiteral.value = raw.slice(1, -1)); // remove quotes

    this.addExtra(directiveLiteral, "raw", raw);
    this.addExtra(directiveLiteral, "rawValue", val);

    directive.value = this.finishNodeAt(
      directiveLiteral,
      "DirectiveLiteral",
      expr.end,
      expr.loc.end,
    );

    return this.finishNodeAt(directive, "Directive", stmt.end, stmt.loc.end);
  }

  parseInterpreterDirective(): N.InterpreterDirective | null {
    if (!this.match(tt.interpreterDirective)) {
      return null;
    }

    const node = this.startNode();
    node.value = this.state.value;
    this.next();
    return this.finishNode(node, "InterpreterDirective");
  }

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo)`, where looking at the previous token
  // does not help.

  parseStatement(declaration: boolean, topLevel?: boolean): N.Statement {
    if (this.match(tt.at)) {
      this.parseDecorators(true);
    }
    return this.parseStatementContent(declaration, topLevel);
  }

  parseStatementContent(declaration: boolean, topLevel: ?boolean): N.Statement {
    const starttype = this.state.type;
    const node = this.startNode();

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
      case tt._break:
      case tt._continue:
        // $FlowFixMe
        return this.parseBreakContinueStatement(node, starttype.keyword);
      case tt._case:
        return this.parseCaseStatement(node);
      case tt._debugger:
        return this.parseDebuggerStatement(node);
      case tt._do:
        return this.parseDoStatement(node);
      case tt._for:
        return this.parseForStatement(node);
      case tt._function:
        if (this.lookahead().type === tt.dot) break;
        if (!declaration) this.unexpected();
        return this.parseFunctionStatement(node);

      case tt._class:
        if (!declaration) this.unexpected();
        return this.parseClass(node, true);

      case tt._if:
        return this.parseIfStatement(node);
      case tt._return:
        return this.parseReturnStatement(node);
      case tt._switch:
        return this.parseSwitchStatement(node);
      case tt._throw:
        return this.parseThrowStatement(node);
      case tt._try:
        return this.parseTryStatement(node);

      case tt._let:
      case tt._const:
        if (!declaration) this.unexpected(); // NOTE: falls through to _var

      case tt._var:
        return this.parseVarStatement(node, starttype);

      case tt._while:
        return this.parseWhileStatement(node);
      case tt._with:
        return this.parseWithStatement(node);
      case tt.braceL:
        return this.parseBlock();
      case tt.semi:
        return this.parseEmptyStatement(node);
      case tt._export:
      case tt._import: {
        const nextToken = this.lookahead();
        if (nextToken.type === tt.parenL || nextToken.type === tt.dot) {
          break;
        }

        if (!this.options.allowImportExportEverywhere && !topLevel) {
          this.raise(
            this.state.start,
            "'import' and 'export' may only appear at the top level",
          );
        }

        this.next();

        let result;
        if (starttype == tt._import) {
          result = this.parseImport(node);

          if (
            result.type === "ImportDeclaration" &&
            (!result.importKind || result.importKind === "value")
          ) {
            this.sawUnambiguousESM = true;
          }
        } else {
          result = this.parseExport(node);

          if (
            (result.type === "ExportNamedDeclaration" &&
              (!result.exportKind || result.exportKind === "value")) ||
            (result.type === "ExportAllDeclaration" &&
              (!result.exportKind || result.exportKind === "value")) ||
            result.type === "ExportDefaultDeclaration"
          ) {
            this.sawUnambiguousESM = true;
          }
        }

        this.assertModuleNodeAllowed(node);

        return result;
      }
      case tt.name:
        if (this.isContextual("async")) {
          // peek ahead and see if next token is a function
          const state = this.state.clone();
          this.next();
          if (this.match(tt._function) && !this.canInsertSemicolon()) {
            this.expect(tt._function);
            return this.parseFunction(node, true, false, true);
          } else {
            this.state = state;
          }
        }
    }

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    const maybeName = this.state.value;
    const expr = this.parseExpression();

    if (
      starttype === tt.name &&
      expr.type === "Identifier" &&
      this.eat(tt.colon)
    ) {
      return this.parseLabeledStatement(node, maybeName, expr);
    } else {
      return this.parseExpressionStatement(node, expr);
    }
  }

  assertModuleNodeAllowed(node: N.Node): void {
    if (!this.options.allowImportExportEverywhere && !this.inModule) {
      this.raise(
        node.start,
        `'import' and 'export' may appear only with 'sourceType: "module"'`,
        {
          code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
        },
      );
    }
  }

  takeDecorators(node: N.HasDecorators): void {
    const decorators = this.state.decoratorStack[
      this.state.decoratorStack.length - 1
    ];
    if (decorators.length) {
      node.decorators = decorators;
      this.resetStartLocationFromNode(node, decorators[0]);
      this.state.decoratorStack[this.state.decoratorStack.length - 1] = [];
    }
  }

  canHaveLeadingDecorator(): boolean {
    return this.match(tt._class);
  }

  parseDecorators(allowExport?: boolean): void {
    const currentContextDecorators = this.state.decoratorStack[
      this.state.decoratorStack.length - 1
    ];
    while (this.match(tt.at)) {
      const decorator = this.parseDecorator();
      currentContextDecorators.push(decorator);
    }

    if (this.match(tt._export)) {
      if (!allowExport) {
        this.unexpected();
      }

      if (
        this.hasPlugin("decorators") &&
        !this.getPluginOption("decorators", "decoratorsBeforeExport")
      ) {
        this.raise(
          this.state.start,
          "Using the export keyword between a decorator and a class is not allowed. " +
            "Please use `export @dec class` instead.",
        );
      }
    } else if (!this.canHaveLeadingDecorator()) {
      this.raise(
        this.state.start,
        "Leading decorators must be attached to a class declaration",
      );
    }
  }

  parseDecorator(): N.Decorator {
    this.expectOnePlugin(["decorators-legacy", "decorators"]);

    const node = this.startNode();
    this.next();

    if (this.hasPlugin("decorators")) {
      // Every time a decorator class expression is evaluated, a new empty array is pushed onto the stack
      // So that the decorators of any nested class expressions will be dealt with separately
      this.state.decoratorStack.push([]);

      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      let expr: N.Expression;

      if (this.eat(tt.parenL)) {
        expr = this.parseExpression();
        this.expect(tt.parenR);
      } else {
        expr = this.parseIdentifier(false);

        while (this.eat(tt.dot)) {
          const node = this.startNodeAt(startPos, startLoc);
          node.object = expr;
          node.property = this.parseIdentifier(true);
          node.computed = false;
          expr = this.finishNode(node, "MemberExpression");
        }
      }

      node.expression = this.parseMaybeDecoratorArguments(expr);
      this.state.decoratorStack.pop();
    } else {
      node.expression = this.parseMaybeAssign();
    }
    return this.finishNode(node, "Decorator");
  }

  parseMaybeDecoratorArguments(expr: N.Expression): N.Expression {
    if (this.eat(tt.parenL)) {
      const node = this.startNodeAtNode(expr);
      node.callee = expr;
      node.arguments = this.parseCallExpressionArguments(tt.parenR, false);
      this.toReferencedList(node.arguments);
      return this.finishNode(node, "CallExpression");
    }

    return expr;
  }

  parseBreakContinueStatement(
    node: N.BreakStatement | N.ContinueStatement,
    keyword: string,
  ): N.BreakStatement | N.ContinueStatement {
    const isBreak = keyword === "break";
    this.next();

    if (this.isLineTerminator()) {
      node.label = null;
    } else if (!this.match(tt.name)) {
      this.unexpected();
    } else {
      node.label = this.parseIdentifier();
      this.semicolon();
    }

    // Verify that there is an actual destination to break or
    // continue to.
    let i;
    for (i = 0; i < this.state.labels.length; ++i) {
      const lab = this.state.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
        if (node.label && isBreak) break;
      }
    }
    if (i === this.state.labels.length) {
      this.raise(node.start, "Unsyntactic " + keyword);
    }
    return this.finishNode(
      node,
      isBreak ? "BreakStatement" : "ContinueStatement",
    );
  }

  parseCaseStatement(node: N.CaseStatement): N.CaseStatement {
    this.next();
    node.discriminant = this.parseParenExpression();

    const cases = [];

    this.expect(tt.braceL);
    while (!this.match(tt.braceR)) {
      this.expect(tt._when);
      cases.push(this.parseWhenClause());
    }
    this.next();

    node.cases = cases;
    return this.finishNode(node, "CaseStatement");
  }

  parseWhenClause(): N.WhenClause {
    const node = this.startNode();

    node.pattern = this.parseWhenClausePattern();

    if (this.match(tt._if)) {
      this.next();
      node.matchGuard = this.parseParenExpression();
    }

    this.expect(tt.thinArrow);

    if (this.match(tt.braceL)) {
      node.body = this.parseBlock(false);
    } else {
      node.body = this.parseStatement(false);
    }

    return this.finishNode(node, "WhenClause");
  }

  parseWhenClausePattern(): N.MatchPattern | void {
    let node;

    if (this.match(tt.regexp)) {
      const value = this.state.value;
      node = this.parseLiteral(value.value, "RegExpLiteral");
      node.pattern = value.pattern;
      node.flags = value.flags;
      return node;
    }

    return this.parseMatchPatternAtom();
  }

  parseMatchPatternAtom(): N.MatchPattern | void {
    let node;

    switch (this.state.type) {
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

      case tt.name:
        return this.parseIdentifier();
      case tt.braceL:
        return this.parseObjectMatchPattern();
      case tt.bracketL:
        return this.parseArrayMatchPattern();

      default:
        this.unexpected();
    }
  }

  parseObjectMatchPattern(): N.ObjectMatchPattern {
    const node = this.startNode();
    this.expect(tt.braceL);

    const properties = [];
    if (!this.match(tt.bracketR)) {
      while (true) {
        properties.push(this.parseObjectMatchProperty());
        if (this.match(tt.braceR)) {
          break;
        } else {
          this.expect(tt.comma);
        }
      }
    }
    node.properties = properties;

    this.next();
    return this.finishNode(node, "ObjectMatchPattern");
  }

  parseObjectMatchProperty(): N.ObjectMatchProperty {
    if (this.match(tt.ellipsis)) {
      return this.parseMatchRestElement();
    }
    const node = this.startNode();
    node.key = this.parseIdentifier();
    if (this.match(tt.colon)) {
      this.next();
      node.element = this.parseMatchPatternAtom();
    }
    return this.finishNode(node, "ObjectMatchProperty");
  }

  parseArrayMatchPattern(): N.ArrayMatchPattern {
    const node = this.startNode();
    this.expect(tt.bracketL);

    const elements = [];
    if (!this.match(tt.bracketR)) {
      while (true) {
        if (this.match(tt.ellipsis)) {
          elements.push(this.parseMatchRestElement());
        } else {
          elements.push(this.parseMatchPatternAtom());
        }

        if (this.match(tt.bracketR)) {
          break;
        } else {
          this.expect(tt.comma);
        }
      }
    }

    this.next();
    node.elements = elements;
    return this.finishNode(node, "ArrayMatchPattern");
  }

  parseMatchRestElement(): N.MatchRestElement {
    const node = this.startNode();
    this.next();
    node.body = this.parseMatchPatternAtom();
    return this.finishNode(node, "MatchRestElement");
  }

  parseDebuggerStatement(node: N.DebuggerStatement): N.DebuggerStatement {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  }

  parseDoStatement(node: N.DoWhileStatement): N.DoWhileStatement {
    this.next();
    this.state.labels.push(loopLabel);

    node.body =
      // For the smartPipelines plugin: Disable topic references from outer
      // contexts within the loop body. They are permitted in test expressions,
      // outside of the loop body.
      this.withTopicForbiddingContext(() =>
        // Parse the loop body's body.
        this.parseStatement(false),
      );

    this.state.labels.pop();

    this.expect(tt._while);
    node.test = this.parseParenExpression();
    this.eat(tt.semi);
    return this.finishNode(node, "DoWhileStatement");
  }

  // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
  // loop is non-trivial. Basically, we have to parse the init `var`
  // statement or expression, disallowing the `in` operator (see
  // the second parameter to `parseExpression`), and then check
  // whether the next token is `in` or `of`. When there is no init
  // part (semicolon immediately after the opening parenthesis), it
  // is a regular `for` loop.

  parseForStatement(node: N.Node): N.ForLike {
    this.next();
    this.state.labels.push(loopLabel);

    let forAwait = false;
    if (this.state.inAsync && this.isContextual("await")) {
      forAwait = true;
      this.next();
    }
    this.expect(tt.parenL);

    if (this.match(tt.semi)) {
      if (forAwait) {
        this.unexpected();
      }
      return this.parseFor(node, null);
    }

    if (this.match(tt._var) || this.match(tt._let) || this.match(tt._const)) {
      const init = this.startNode();
      const varKind = this.state.type;
      this.next();
      this.parseVar(init, true, varKind);
      this.finishNode(init, "VariableDeclaration");

      if (this.match(tt._in) || this.isContextual("of")) {
        if (init.declarations.length === 1) {
          const declaration = init.declarations[0];
          const isForInInitializer =
            varKind === tt._var &&
            declaration.init &&
            declaration.id.type != "ObjectPattern" &&
            declaration.id.type != "ArrayPattern" &&
            !this.isContextual("of");
          if (this.state.strict && isForInInitializer) {
            this.raise(this.state.start, "for-in initializer in strict mode");
          } else if (isForInInitializer || !declaration.init) {
            return this.parseForIn(node, init, forAwait);
          }
        }
      }
      if (forAwait) {
        this.unexpected();
      }
      return this.parseFor(node, init);
    }

    const refShorthandDefaultPos = { start: 0 };
    const init = this.parseExpression(true, refShorthandDefaultPos);
    if (this.match(tt._in) || this.isContextual("of")) {
      const description = this.isContextual("of")
        ? "for-of statement"
        : "for-in statement";
      this.toAssignable(init, undefined, description);
      this.checkLVal(init, undefined, undefined, description);
      return this.parseForIn(node, init, forAwait);
    } else if (refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }
    if (forAwait) {
      this.unexpected();
    }
    return this.parseFor(node, init);
  }

  parseFunctionStatement(node: N.FunctionDeclaration): N.FunctionDeclaration {
    this.next();
    return this.parseFunction(node, true);
  }

  parseIfStatement(node: N.IfStatement): N.IfStatement {
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement(false);
    node.alternate = this.eat(tt._else) ? this.parseStatement(false) : null;
    return this.finishNode(node, "IfStatement");
  }

  parseReturnStatement(node: N.ReturnStatement): N.ReturnStatement {
    if (!this.state.inFunction && !this.options.allowReturnOutsideFunction) {
      this.raise(this.state.start, "'return' outside of function");
    }

    this.next();

    // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    if (this.isLineTerminator()) {
      node.argument = null;
    } else {
      node.argument = this.parseExpression();
      this.semicolon();
    }

    return this.finishNode(node, "ReturnStatement");
  }

  parseSwitchStatement(node: N.SwitchStatement): N.SwitchStatement {
    this.next();
    node.discriminant = this.parseParenExpression();
    const cases = (node.cases = []);
    this.expect(tt.braceL);
    this.state.labels.push(switchLabel);

    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    let cur;
    for (let sawDefault; !this.match(tt.braceR); ) {
      if (this.match(tt._case) || this.match(tt._default)) {
        const isCase = this.match(tt._case);
        if (cur) this.finishNode(cur, "SwitchCase");
        cases.push((cur = this.startNode()));
        cur.consequent = [];
        this.next();
        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) {
            this.raise(this.state.lastTokStart, "Multiple default clauses");
          }
          sawDefault = true;
          cur.test = null;
        }
        this.expect(tt.colon);
      } else {
        if (cur) {
          cur.consequent.push(this.parseStatement(true));
        } else {
          this.unexpected();
        }
      }
    }
    if (cur) this.finishNode(cur, "SwitchCase");
    this.next(); // Closing brace
    this.state.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  }

  parseThrowStatement(node: N.ThrowStatement): N.ThrowStatement {
    this.next();
    if (
      lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start))
    ) {
      this.raise(this.state.lastTokEnd, "Illegal newline after throw");
    }
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  }

  parseTryStatement(node: N.TryStatement): N.TryStatement {
    this.next();

    node.block = this.parseBlock();
    node.handler = null;

    if (this.match(tt._catch)) {
      const clause = this.startNode();
      this.next();
      if (this.match(tt.parenL)) {
        this.expect(tt.parenL);
        clause.param = this.parseBindingAtom();
        const clashes: any = Object.create(null);
        this.checkLVal(clause.param, true, clashes, "catch clause");
        this.expect(tt.parenR);
      } else {
        clause.param = null;
      }

      clause.body =
        // For the smartPipelines plugin: Disable topic references from outer
        // contexts within the function body. They are permitted in function
        // default-parameter expressions, which are part of the outer context,
        // outside of the function body.
        this.withTopicForbiddingContext(() =>
          // Parse the catch clause's body.
          this.parseBlock(false),
        );

      node.handler = this.finishNode(clause, "CatchClause");
    }

    node.guardedHandlers = empty;
    node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;

    if (!node.handler && !node.finalizer) {
      this.raise(node.start, "Missing catch or finally clause");
    }

    return this.finishNode(node, "TryStatement");
  }

  parseVarStatement(
    node: N.VariableDeclaration,
    kind: TokenType,
  ): N.VariableDeclaration {
    this.next();
    this.parseVar(node, false, kind);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  }

  parseWhileStatement(node: N.WhileStatement): N.WhileStatement {
    this.next();
    node.test = this.parseParenExpression();
    this.state.labels.push(loopLabel);

    node.body =
      // For the smartPipelines plugin:
      // Disable topic references from outer contexts within the loop body.
      // They are permitted in test expressions, outside of the loop body.
      this.withTopicForbiddingContext(() =>
        // Parse loop body.
        this.parseStatement(false),
      );

    this.state.labels.pop();

    return this.finishNode(node, "WhileStatement");
  }

  parseWithStatement(node: N.WithStatement): N.WithStatement {
    if (this.state.strict) {
      this.raise(this.state.start, "'with' in strict mode");
    }
    this.next();
    node.object = this.parseParenExpression();

    node.body =
      // For the smartPipelines plugin:
      // Disable topic references from outer contexts within the function body.
      // They are permitted in function default-parameter expressions, which are
      // part of the outer context, outside of the function body.
      this.withTopicForbiddingContext(() =>
        // Parse the statement body.
        this.parseStatement(false),
      );

    return this.finishNode(node, "WithStatement");
  }

  parseEmptyStatement(node: N.EmptyStatement): N.EmptyStatement {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  }

  parseLabeledStatement(
    node: N.LabeledStatement,
    maybeName: string,
    expr: N.Identifier,
  ): N.LabeledStatement {
    for (const label of this.state.labels) {
      if (label.name === maybeName) {
        this.raise(expr.start, `Label '${maybeName}' is already declared`);
      }
    }

    const kind = this.state.type.isLoop
      ? "loop"
      : this.match(tt._switch)
      ? "switch"
      : null;
    for (let i = this.state.labels.length - 1; i >= 0; i--) {
      const label = this.state.labels[i];
      if (label.statementStart === node.start) {
        label.statementStart = this.state.start;
        label.kind = kind;
      } else {
        break;
      }
    }

    this.state.labels.push({
      name: maybeName,
      kind: kind,
      statementStart: this.state.start,
    });
    node.body = this.parseStatement(true);

    if (
      node.body.type == "ClassDeclaration" ||
      (node.body.type == "VariableDeclaration" && node.body.kind !== "var") ||
      (node.body.type == "FunctionDeclaration" &&
        (this.state.strict || node.body.generator || node.body.async))
    ) {
      this.raise(node.body.start, "Invalid labeled declaration");
    }

    this.state.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  }

  parseExpressionStatement(
    node: N.ExpressionStatement,
    expr: N.Expression,
  ): N.ExpressionStatement {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  }

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  parseBlock(allowDirectives?: boolean): N.BlockStatement {
    const node = this.startNode();
    this.expect(tt.braceL);
    this.parseBlockBody(node, allowDirectives, false, tt.braceR);
    return this.finishNode(node, "BlockStatement");
  }

  isValidDirective(stmt: N.Statement): boolean {
    return (
      stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "StringLiteral" &&
      !stmt.expression.extra.parenthesized
    );
  }

  parseBlockBody(
    node: N.BlockStatementLike,
    allowDirectives: ?boolean,
    topLevel: boolean,
    end: TokenType,
  ): void {
    const body = (node.body = []);
    const directives = (node.directives = []);
    this.parseBlockOrModuleBlockBody(
      body,
      allowDirectives ? directives : undefined,
      topLevel,
      end,
    );
  }

  // Undefined directives means that directives are not allowed.
  parseBlockOrModuleBlockBody(
    body: N.Statement[],
    directives: ?(N.Directive[]),
    topLevel: boolean,
    end: TokenType,
  ): void {
    let parsedNonDirective = false;
    let oldStrict;
    let octalPosition;

    while (!this.eat(end)) {
      if (!parsedNonDirective && this.state.containsOctal && !octalPosition) {
        octalPosition = this.state.octalPosition;
      }

      const stmt = this.parseStatement(true, topLevel);

      if (directives && !parsedNonDirective && this.isValidDirective(stmt)) {
        const directive = this.stmtToDirective(stmt);
        directives.push(directive);

        if (oldStrict === undefined && directive.value.value === "use strict") {
          oldStrict = this.state.strict;
          this.setStrict(true);

          if (octalPosition) {
            this.raise(octalPosition, "Octal literal in strict mode");
          }
        }

        continue;
      }

      parsedNonDirective = true;
      body.push(stmt);
    }

    if (oldStrict === false) {
      this.setStrict(false);
    }
  }

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  parseFor(
    node: N.ForStatement,
    init: ?(N.VariableDeclaration | N.Expression),
  ): N.ForStatement {
    node.init = init;
    this.expect(tt.semi);
    node.test = this.match(tt.semi) ? null : this.parseExpression();
    this.expect(tt.semi);
    node.update = this.match(tt.parenR) ? null : this.parseExpression();
    this.expect(tt.parenR);

    node.body =
      // For the smartPipelines plugin: Disable topic references from outer
      // contexts within the loop body. They are permitted in test expressions,
      // outside of the loop body.
      this.withTopicForbiddingContext(() =>
        // Parse the loop body.
        this.parseStatement(false),
      );

    this.state.labels.pop();

    return this.finishNode(node, "ForStatement");
  }

  // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.

  parseForIn(
    node: N.ForInOf,
    init: N.VariableDeclaration,
    forAwait: boolean,
  ): N.ForInOf {
    const type = this.match(tt._in) ? "ForInStatement" : "ForOfStatement";
    if (forAwait) {
      this.eatContextual("of");
    } else {
      this.next();
    }
    if (type === "ForOfStatement") {
      node.await = !!forAwait;
    }
    node.left = init;
    node.right = this.parseExpression();
    this.expect(tt.parenR);

    node.body =
      // For the smartPipelines plugin:
      // Disable topic references from outer contexts within the loop body.
      // They are permitted in test expressions, outside of the loop body.
      this.withTopicForbiddingContext(() =>
        // Parse loop body.
        this.parseStatement(false),
      );

    this.state.labels.pop();

    return this.finishNode(node, type);
  }

  // Parse a list of variable declarations.

  parseVar(
    node: N.VariableDeclaration,
    isFor: boolean,
    kind: TokenType,
  ): N.VariableDeclaration {
    const declarations = (node.declarations = []);
    // $FlowFixMe
    node.kind = kind.keyword;
    for (;;) {
      const decl = this.startNode();
      this.parseVarHead(decl);
      if (this.eat(tt.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else {
        if (
          kind === tt._const &&
          !(this.match(tt._in) || this.isContextual("of"))
        ) {
          // `const` with no initializer is allowed in TypeScript.
          // It could be a declaration like `const x: number;`.
          if (!this.hasPlugin("typescript")) {
            this.unexpected();
          }
        } else if (
          decl.id.type !== "Identifier" &&
          !(isFor && (this.match(tt._in) || this.isContextual("of")))
        ) {
          this.raise(
            this.state.lastTokEnd,
            "Complex binding patterns require an initialization value",
          );
        }
        decl.init = null;
      }
      declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(tt.comma)) break;
    }
    return node;
  }

  parseVarHead(decl: N.VariableDeclarator): void {
    decl.id = this.parseBindingAtom();
    this.checkLVal(decl.id, true, undefined, "variable declaration");
  }

  // Parse a function declaration or literal (depending on the
  // `isStatement` parameter).

  parseFunction<T: N.NormalFunction>(
    node: T,
    isStatement: boolean,
    allowExpressionBody?: boolean = false,
    isAsync?: boolean = false,
    optionalId?: boolean = false,
  ): T {
    const oldInFunc = this.state.inFunction;
    const oldInMethod = this.state.inMethod;
    const oldInAsync = this.state.inAsync;
    const oldInGenerator = this.state.inGenerator;
    const oldInClassProperty = this.state.inClassProperty;
    this.state.inFunction = true;
    this.state.inMethod = false;
    this.state.inClassProperty = false;

    this.initFunction(node, isAsync);

    if (this.match(tt.star)) {
      node.generator = true;
      this.next();
    }

    if (
      isStatement &&
      !optionalId &&
      !this.match(tt.name) &&
      !this.match(tt._yield)
    ) {
      this.unexpected();
    }

    // When parsing function expression, the binding identifier is parsed
    // according to the rules inside the function.
    // e.g. (function* yield() {}) is invalid because "yield" is disallowed in
    // generators.
    // This isn't the case with function declarations: function* yield() {} is
    // valid because yield is parsed as if it was outside the generator.
    // Therefore, this.state.inGenerator is set before or after parsing the
    // function id according to the "isStatement" parameter.
    // The same applies to await & async functions.
    if (!isStatement) {
      this.state.inAsync = isAsync;
      this.state.inGenerator = node.generator;
    }
    if (this.match(tt.name) || this.match(tt._yield)) {
      node.id = this.parseBindingIdentifier();
    }
    if (isStatement) {
      this.state.inAsync = isAsync;
      this.state.inGenerator = node.generator;
    }

    this.parseFunctionParams(node);

    // For the smartPipelines plugin: Disable topic references from outer
    // contexts within the function body. They are permitted in test
    // expressions, outside of the function body.
    this.withTopicForbiddingContext(() => {
      // Parse the function body.
      this.parseFunctionBodyAndFinish(
        node,
        isStatement ? "FunctionDeclaration" : "FunctionExpression",
        allowExpressionBody,
      );
    });

    this.state.inFunction = oldInFunc;
    this.state.inMethod = oldInMethod;
    this.state.inAsync = oldInAsync;
    this.state.inGenerator = oldInGenerator;
    this.state.inClassProperty = oldInClassProperty;

    return node;
  }

  parseFunctionParams(node: N.Function, allowModifiers?: boolean): void {
    const oldInParameters = this.state.inParameters;
    this.state.inParameters = true;

    this.expect(tt.parenL);
    node.params = this.parseBindingList(
      tt.parenR,
      /* allowEmpty */ false,
      allowModifiers,
    );

    this.state.inParameters = oldInParameters;
  }

  // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).

  parseClass<T: N.Class>(
    node: T,
    isStatement: /* T === ClassDeclaration */ boolean,
    optionalId?: boolean,
  ): T {
    this.next();
    this.takeDecorators(node);
    this.parseClassId(node, isStatement, optionalId);
    this.parseClassSuper(node);
    this.parseClassBody(node);
    return this.finishNode(
      node,
      isStatement ? "ClassDeclaration" : "ClassExpression",
    );
  }

  isClassProperty(): boolean {
    return this.match(tt.eq) || this.match(tt.semi) || this.match(tt.braceR);
  }

  isClassMethod(): boolean {
    return this.match(tt.parenL);
  }

  isNonstaticConstructor(method: N.ClassMethod | N.ClassProperty): boolean {
    return (
      !method.computed &&
      !method.static &&
      (method.key.name === "constructor" || // Identifier
        method.key.value === "constructor") // String literal
    );
  }

  parseClassBody(node: N.Class): void {
    // class bodies are implicitly strict
    const oldStrict = this.state.strict;
    this.state.strict = true;
    this.state.classLevel++;

    const state = { hadConstructor: false };
    let decorators: N.Decorator[] = [];
    const classBody: N.ClassBody = this.startNode();

    classBody.body = [];

    this.expect(tt.braceL);

    // For the smartPipelines plugin: Disable topic references from outer
    // contexts within the class body. They are permitted in test expressions,
    // outside of the class body.
    this.withTopicForbiddingContext(() => {
      while (!this.eat(tt.braceR)) {
        if (this.eat(tt.semi)) {
          if (decorators.length > 0) {
            this.raise(
              this.state.lastTokEnd,
              "Decorators must not be followed by a semicolon",
            );
          }
          continue;
        }

        if (this.match(tt.at)) {
          decorators.push(this.parseDecorator());
          continue;
        }

        const member = this.startNode();

        // steal the decorators if there are any
        if (decorators.length) {
          member.decorators = decorators;
          this.resetStartLocationFromNode(member, decorators[0]);
          decorators = [];
        }

        this.parseClassMember(classBody, member, state);

        if (
          member.kind === "constructor" &&
          member.decorators &&
          member.decorators.length > 0
        ) {
          this.raise(
            member.start,
            "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
          );
        }
      }
    });

    if (decorators.length) {
      this.raise(
        this.state.start,
        "You have trailing decorators with no method",
      );
    }

    node.body = this.finishNode(classBody, "ClassBody");

    this.state.classLevel--;
    this.state.strict = oldStrict;
  }

  parseClassMember(
    classBody: N.ClassBody,
    member: N.ClassMember,
    state: { hadConstructor: boolean },
  ): void {
    let isStatic = false;
    const containsEsc = this.state.containsEsc;

    if (this.match(tt.name) && this.state.value === "static") {
      const key = this.parseIdentifier(true); // eats 'static'

      if (this.isClassMethod()) {
        const method: N.ClassMethod = (member: any);

        // a method named 'static'
        method.kind = "method";
        method.computed = false;
        method.key = key;
        method.static = false;
        this.pushClassMethod(
          classBody,
          method,
          false,
          false,
          /* isConstructor */ false,
        );
        return;
      } else if (this.isClassProperty()) {
        const prop: N.ClassProperty = (member: any);

        // a property named 'static'
        prop.computed = false;
        prop.key = key;
        prop.static = false;
        classBody.body.push(this.parseClassProperty(prop));
        return;
      } else if (containsEsc) {
        throw this.unexpected();
      }

      // otherwise something static
      isStatic = true;
    }

    this.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
  }

  parseClassMemberWithIsStatic(
    classBody: N.ClassBody,
    member: N.ClassMember,
    state: { hadConstructor: boolean },
    isStatic: boolean,
  ) {
    const publicMethod: $FlowSubtype<N.ClassMethod> = member;
    const privateMethod: $FlowSubtype<N.ClassPrivateMethod> = member;
    const publicProp: $FlowSubtype<N.ClassMethod> = member;
    const privateProp: $FlowSubtype<N.ClassPrivateMethod> = member;

    const method: typeof publicMethod | typeof privateMethod = publicMethod;
    const publicMember: typeof publicMethod | typeof publicProp = publicMethod;

    member.static = isStatic;

    if (this.eat(tt.star)) {
      // a generator
      method.kind = "method";
      this.parseClassPropertyName(method);

      if (method.key.type === "PrivateName") {
        // Private generator method
        this.pushClassPrivateMethod(classBody, privateMethod, true, false);
        return;
      }

      if (this.isNonstaticConstructor(publicMethod)) {
        this.raise(publicMethod.key.start, "Constructor can't be a generator");
      }

      this.pushClassMethod(
        classBody,
        publicMethod,
        true,
        false,
        /* isConstructor */ false,
      );

      return;
    }

    const key = this.parseClassPropertyName(member);
    const isPrivate = key.type === "PrivateName";
    // Check the key is not a computed expression or string literal.
    const isSimple = key.type === "Identifier";

    this.parsePostMemberNameModifiers(publicMember);

    if (this.isClassMethod()) {
      method.kind = "method";

      if (isPrivate) {
        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
        return;
      }

      // a normal method
      const isConstructor = this.isNonstaticConstructor(publicMethod);

      if (isConstructor) {
        publicMethod.kind = "constructor";

        if (publicMethod.decorators) {
          this.raise(
            publicMethod.start,
            "You can't attach decorators to a class constructor",
          );
        }

        // TypeScript allows multiple overloaded constructor declarations.
        if (state.hadConstructor && !this.hasPlugin("typescript")) {
          this.raise(key.start, "Duplicate constructor in the same class");
        }
        state.hadConstructor = true;
      }

      this.pushClassMethod(
        classBody,
        publicMethod,
        false,
        false,
        isConstructor,
      );
    } else if (this.isClassProperty()) {
      if (isPrivate) {
        this.pushClassPrivateProperty(classBody, privateProp);
      } else {
        this.pushClassProperty(classBody, publicProp);
      }
    } else if (isSimple && key.name === "async" && !this.isLineTerminator()) {
      // an async method
      const isGenerator = this.eat(tt.star);

      method.kind = "method";
      // The so-called parsed name would have been "async": get the real name.
      this.parseClassPropertyName(method);

      if (method.key.type === "PrivateName") {
        // private async method
        this.pushClassPrivateMethod(
          classBody,
          privateMethod,
          isGenerator,
          true,
        );
      } else {
        if (this.isNonstaticConstructor(publicMethod)) {
          this.raise(
            publicMethod.key.start,
            "Constructor can't be an async function",
          );
        }

        this.pushClassMethod(
          classBody,
          publicMethod,
          isGenerator,
          true,
          /* isConstructor */ false,
        );
      }
    } else if (
      isSimple &&
      (key.name === "get" || key.name === "set") &&
      !(this.isLineTerminator() && this.match(tt.star))
    ) {
      // `get\n*` is an uninitialized property named 'get' followed by a generator.
      // a getter or setter
      method.kind = key.name;
      // The so-called parsed name would have been "get/set": get the real name.
      this.parseClassPropertyName(publicMethod);

      if (method.key.type === "PrivateName") {
        // private getter/setter
        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
      } else {
        if (this.isNonstaticConstructor(publicMethod)) {
          this.raise(
            publicMethod.key.start,
            "Constructor can't have get/set modifier",
          );
        }
        this.pushClassMethod(
          classBody,
          publicMethod,
          false,
          false,
          /* isConstructor */ false,
        );
      }

      this.checkGetterSetterParams(publicMethod);
    } else if (this.isLineTerminator()) {
      // an uninitialized class property (due to ASI, since we don't otherwise recognize the next token)
      if (isPrivate) {
        this.pushClassPrivateProperty(classBody, privateProp);
      } else {
        this.pushClassProperty(classBody, publicProp);
      }
    } else {
      this.unexpected();
    }
  }

  parseClassPropertyName(member: N.ClassMember): N.Expression | N.Identifier {
    const key = this.parsePropertyName(member);

    if (
      !member.computed &&
      member.static &&
      ((key: $FlowSubtype<N.Identifier>).name === "prototype" ||
        (key: $FlowSubtype<N.StringLiteral>).value === "prototype")
    ) {
      this.raise(
        key.start,
        "Classes may not have static property named prototype",
      );
    }

    if (key.type === "PrivateName" && key.id.name === "constructor") {
      this.raise(
        key.start,
        "Classes may not have a private field named '#constructor'",
      );
    }

    return key;
  }

  pushClassProperty(classBody: N.ClassBody, prop: N.ClassProperty) {
    // This only affects properties, not methods.
    if (this.isNonstaticConstructor(prop)) {
      this.raise(
        prop.key.start,
        "Classes may not have a non-static field named 'constructor'",
      );
    }
    classBody.body.push(this.parseClassProperty(prop));
  }

  pushClassPrivateProperty(
    classBody: N.ClassBody,
    prop: N.ClassPrivateProperty,
  ) {
    this.expectPlugin("classPrivateProperties", prop.key.start);
    classBody.body.push(this.parseClassPrivateProperty(prop));
  }

  pushClassMethod(
    classBody: N.ClassBody,
    method: N.ClassMethod,
    isGenerator: boolean,
    isAsync: boolean,
    isConstructor: boolean,
  ): void {
    classBody.body.push(
      this.parseMethod(
        method,
        isGenerator,
        isAsync,
        isConstructor,
        "ClassMethod",
      ),
    );
  }

  pushClassPrivateMethod(
    classBody: N.ClassBody,
    method: N.ClassPrivateMethod,
    isGenerator: boolean,
    isAsync: boolean,
  ): void {
    this.expectPlugin("classPrivateMethods", method.key.start);
    classBody.body.push(
      this.parseMethod(
        method,
        isGenerator,
        isAsync,
        /* isConstructor */ false,
        "ClassPrivateMethod",
      ),
    );
  }

  // Overridden in typescript.js
  parsePostMemberNameModifiers(
    // eslint-disable-next-line no-unused-vars
    methodOrProp: N.ClassMethod | N.ClassProperty,
  ): void {}

  // Overridden in typescript.js
  parseAccessModifier(): ?N.Accessibility {
    return undefined;
  }

  parseClassPrivateProperty(
    node: N.ClassPrivateProperty,
  ): N.ClassPrivateProperty {
    const oldInMethod = this.state.inMethod;
    this.state.inMethod = false;
    this.state.inClassProperty = true;
    node.value = this.eat(tt.eq) ? this.parseMaybeAssign() : null;
    this.semicolon();
    this.state.inClassProperty = false;
    this.state.inMethod = oldInMethod;
    return this.finishNode(node, "ClassPrivateProperty");
  }

  parseClassProperty(node: N.ClassProperty): N.ClassProperty {
    if (!node.typeAnnotation) {
      this.expectPlugin("classProperties");
    }

    const oldInMethod = this.state.inMethod;
    this.state.inMethod = false;
    this.state.inClassProperty = true;

    if (this.match(tt.eq)) {
      this.expectPlugin("classProperties");
      this.next();
      node.value = this.parseMaybeAssign();
    } else {
      node.value = null;
    }
    this.semicolon();
    this.state.inClassProperty = false;
    this.state.inMethod = oldInMethod;

    return this.finishNode(node, "ClassProperty");
  }

  parseClassId(
    node: N.Class,
    isStatement: boolean,
    optionalId: ?boolean,
  ): void {
    if (this.match(tt.name)) {
      node.id = this.parseIdentifier();
    } else {
      if (optionalId || !isStatement) {
        node.id = null;
      } else {
        this.unexpected(null, "A class name is required");
      }
    }
  }

  parseClassSuper(node: N.Class): void {
    node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
  }

  // Parses module export declaration.

  // TODO: better type. Node is an N.AnyExport.
  parseExport(node: N.Node): N.Node {
    // export * from '...'
    if (this.shouldParseExportStar()) {
      this.parseExportStar(node);
      if (node.type === "ExportAllDeclaration") return node;
    } else if (this.isExportDefaultSpecifier()) {
      this.expectPlugin("exportDefaultFrom");
      const specifier = this.startNode();
      specifier.exported = this.parseIdentifier(true);
      const specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];
      node.specifiers = specifiers;
      if (this.match(tt.comma) && this.lookahead().type === tt.star) {
        this.expect(tt.comma);
        const specifier = this.startNode();
        this.expect(tt.star);
        this.expectContextual("as");
        specifier.exported = this.parseIdentifier();
        specifiers.push(this.finishNode(specifier, "ExportNamespaceSpecifier"));
      } else {
        this.parseExportSpecifiersMaybe(node);
      }
      this.parseExportFrom(node, true);
    } else if (this.eat(tt._default)) {
      // export default ...
      node.declaration = this.parseExportDefaultExpression();
      this.checkExport(node, true, true);
      return this.finishNode(node, "ExportDefaultDeclaration");
    } else if (this.shouldParseExportDeclaration()) {
      if (this.isContextual("async")) {
        const next = this.lookahead();

        // export async;
        if (next.type !== tt._function) {
          this.unexpected(next.start, `Unexpected token, expected "function"`);
        }
      }

      node.specifiers = [];
      node.source = null;
      node.declaration = this.parseExportDeclaration(node);
    } else {
      // export { x, y as z } [from '...']
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers();
      this.parseExportFrom(node);
    }
    this.checkExport(node, true);
    return this.finishNode(node, "ExportNamedDeclaration");
  }

  isAsyncFunction() {
    if (!this.isContextual("async")) return false;

    const { input, pos } = this.state;

    skipWhiteSpace.lastIndex = pos;
    const skip = skipWhiteSpace.exec(input);

    if (!skip || !skip.length) return false;

    const next = pos + skip[0].length;

    return (
      !lineBreak.test(input.slice(pos, next)) &&
      input.slice(next, next + 8) === "function" &&
      (next + 8 === input.length || !isIdentifierChar(input.charAt(next + 8)))
    );
  }

  parseExportDefaultExpression(): N.Expression | N.Declaration {
    const expr = this.startNode();

    const isAsync = this.isAsyncFunction();

    if (this.eat(tt._function) || isAsync) {
      if (isAsync) {
        this.eatContextual("async");
        this.expect(tt._function);
      }

      return this.parseFunction(expr, true, false, isAsync, true);
    } else if (this.match(tt._class)) {
      return this.parseClass(expr, true, true);
    } else if (this.match(tt.at)) {
      if (
        this.hasPlugin("decorators") &&
        this.getPluginOption("decorators", "decoratorsBeforeExport")
      ) {
        this.unexpected(
          this.state.start,
          "Decorators must be placed *before* the 'export' keyword." +
            " You can set the 'decoratorsBeforeExport' option to false to use" +
            " the 'export @decorator class {}' syntax",
        );
      }
      this.parseDecorators(false);
      return this.parseClass(expr, true, true);
    } else if (
      this.match(tt._let) ||
      this.match(tt._const) ||
      this.match(tt._var)
    ) {
      return this.raise(
        this.state.start,
        "Only expressions, functions or classes are allowed as the `default` export.",
      );
    } else {
      const res = this.parseMaybeAssign();
      this.semicolon();
      return res;
    }
  }

  // eslint-disable-next-line no-unused-vars
  parseExportDeclaration(node: N.ExportNamedDeclaration): ?N.Declaration {
    return this.parseStatement(true);
  }

  isExportDefaultSpecifier(): boolean {
    if (this.match(tt.name)) {
      return this.state.value !== "async";
    }

    if (!this.match(tt._default)) {
      return false;
    }

    const lookahead = this.lookahead();
    return (
      lookahead.type === tt.comma ||
      (lookahead.type === tt.name && lookahead.value === "from")
    );
  }

  parseExportSpecifiersMaybe(node: N.ExportNamedDeclaration): void {
    if (this.eat(tt.comma)) {
      node.specifiers = node.specifiers.concat(this.parseExportSpecifiers());
    }
  }

  parseExportFrom(node: N.ExportNamedDeclaration, expect?: boolean): void {
    if (this.eatContextual("from")) {
      node.source = this.match(tt.string)
        ? this.parseExprAtom()
        : this.unexpected();
      this.checkExport(node);
    } else {
      if (expect) {
        this.unexpected();
      } else {
        node.source = null;
      }
    }

    this.semicolon();
  }

  shouldParseExportStar(): boolean {
    return this.match(tt.star);
  }

  parseExportStar(node: N.ExportNamedDeclaration): void {
    this.expect(tt.star);

    if (this.isContextual("as")) {
      this.parseExportNamespace(node);
    } else {
      this.parseExportFrom(node, true);
      this.finishNode(node, "ExportAllDeclaration");
    }
  }

  parseExportNamespace(node: N.ExportNamedDeclaration): void {
    this.expectPlugin("exportNamespaceFrom");

    const specifier = this.startNodeAt(
      this.state.lastTokStart,
      this.state.lastTokStartLoc,
    );

    this.next();

    specifier.exported = this.parseIdentifier(true);

    node.specifiers = [this.finishNode(specifier, "ExportNamespaceSpecifier")];

    this.parseExportSpecifiersMaybe(node);
    this.parseExportFrom(node, true);
  }

  shouldParseExportDeclaration(): boolean {
    if (this.match(tt.at)) {
      this.expectOnePlugin(["decorators", "decorators-legacy"]);
      if (this.hasPlugin("decorators")) {
        if (this.getPluginOption("decorators", "decoratorsBeforeExport")) {
          this.unexpected(
            this.state.start,
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
      this.state.type.keyword === "var" ||
      this.state.type.keyword === "const" ||
      this.state.type.keyword === "let" ||
      this.state.type.keyword === "function" ||
      this.state.type.keyword === "class" ||
      this.isAsyncFunction()
    );
  }

  checkExport(
    node: N.ExportNamedDeclaration,
    checkNames: ?boolean,
    isDefault?: boolean,
  ): void {
    if (checkNames) {
      // Check for duplicate exports
      if (isDefault) {
        // Default exports
        this.checkDuplicateExports(node, "default");
      } else if (node.specifiers && node.specifiers.length) {
        // Named exports
        for (const specifier of node.specifiers) {
          this.checkDuplicateExports(specifier, specifier.exported.name);
        }
      } else if (node.declaration) {
        // Exported declarations
        if (
          node.declaration.type === "FunctionDeclaration" ||
          node.declaration.type === "ClassDeclaration"
        ) {
          const id = node.declaration.id;
          if (!id) throw new Error("Assertion failure");

          this.checkDuplicateExports(node, id.name);
        } else if (node.declaration.type === "VariableDeclaration") {
          for (const declaration of node.declaration.declarations) {
            this.checkDeclaration(declaration.id);
          }
        }
      }
    }

    const currentContextDecorators = this.state.decoratorStack[
      this.state.decoratorStack.length - 1
    ];
    if (currentContextDecorators.length) {
      const isClass =
        node.declaration &&
        (node.declaration.type === "ClassDeclaration" ||
          node.declaration.type === "ClassExpression");
      if (!node.declaration || !isClass) {
        throw this.raise(
          node.start,
          "You can only use decorators on an export when exporting a class",
        );
      }
      this.takeDecorators(node.declaration);
    }
  }

  checkDeclaration(node: N.Pattern | N.ObjectProperty): void {
    if (node.type === "ObjectPattern") {
      for (const prop of node.properties) {
        this.checkDeclaration(prop);
      }
    } else if (node.type === "ArrayPattern") {
      for (const elem of node.elements) {
        if (elem) {
          this.checkDeclaration(elem);
        }
      }
    } else if (node.type === "ObjectProperty") {
      this.checkDeclaration(node.value);
    } else if (node.type === "RestElement") {
      this.checkDeclaration(node.argument);
    } else if (node.type === "Identifier") {
      this.checkDuplicateExports(node, node.name);
    }
  }

  checkDuplicateExports(
    node: N.Identifier | N.ExportNamedDeclaration | N.ExportSpecifier,
    name: string,
  ): void {
    if (this.state.exportedIdentifiers.indexOf(name) > -1) {
      this.raiseDuplicateExportError(node, name);
    }
    this.state.exportedIdentifiers.push(name);
  }

  raiseDuplicateExportError(
    node: N.Identifier | N.ExportNamedDeclaration | N.ExportSpecifier,
    name: string,
  ): empty {
    throw this.raise(
      node.start,
      name === "default"
        ? "Only one default export allowed per module."
        : `\`${name}\` has already been exported. Exported identifiers must be unique.`,
    );
  }

  // Parses a comma-separated list of module exports.

  parseExportSpecifiers(): Array<N.ExportSpecifier> {
    const nodes = [];
    let first = true;
    let needsFrom;

    // export { x, y as z } [from '...']
    this.expect(tt.braceL);

    while (!this.eat(tt.braceR)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.eat(tt.braceR)) break;
      }

      const isDefault = this.match(tt._default);
      if (isDefault && !needsFrom) needsFrom = true;

      const node = this.startNode();
      node.local = this.parseIdentifier(isDefault);
      node.exported = this.eatContextual("as")
        ? this.parseIdentifier(true)
        : node.local.__clone();
      nodes.push(this.finishNode(node, "ExportSpecifier"));
    }

    // https://github.com/ember-cli/ember-cli/pull/3739
    if (needsFrom && !this.isContextual("from")) {
      this.unexpected();
    }

    return nodes;
  }

  // Parses import declaration.

  parseImport(node: N.Node): N.ImportDeclaration | N.TsImportEqualsDeclaration {
    // import '...'
    if (this.match(tt.string)) {
      node.specifiers = [];
      node.source = this.parseExprAtom();
    } else {
      node.specifiers = [];
      this.parseImportSpecifiers(node);
      this.expectContextual("from");
      node.source = this.match(tt.string)
        ? this.parseExprAtom()
        : this.unexpected();
    }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  }

  // eslint-disable-next-line no-unused-vars
  shouldParseDefaultImport(node: N.ImportDeclaration): boolean {
    return this.match(tt.name);
  }

  parseImportSpecifierLocal(
    node: N.ImportDeclaration,
    specifier: N.Node,
    type: string,
    contextDescription: string,
  ): void {
    specifier.local = this.parseIdentifier();
    this.checkLVal(specifier.local, true, undefined, contextDescription);
    node.specifiers.push(this.finishNode(specifier, type));
  }

  // Parses a comma-separated list of module imports.
  parseImportSpecifiers(node: N.ImportDeclaration): void {
    let first = true;
    if (this.shouldParseDefaultImport(node)) {
      // import defaultObj, { x, y as z } from '...'
      this.parseImportSpecifierLocal(
        node,
        this.startNode(),
        "ImportDefaultSpecifier",
        "default import specifier",
      );

      if (!this.eat(tt.comma)) return;
    }

    if (this.match(tt.star)) {
      const specifier = this.startNode();
      this.next();
      this.expectContextual("as");

      this.parseImportSpecifierLocal(
        node,
        specifier,
        "ImportNamespaceSpecifier",
        "import namespace specifier",
      );

      return;
    }

    this.expect(tt.braceL);
    while (!this.eat(tt.braceR)) {
      if (first) {
        first = false;
      } else {
        // Detect an attempt to deep destructure
        if (this.eat(tt.colon)) {
          this.unexpected(
            null,
            "ES2015 named imports do not destructure. " +
              "Use another statement for destructuring after the import.",
          );
        }

        this.expect(tt.comma);
        if (this.eat(tt.braceR)) break;
      }

      this.parseImportSpecifier(node);
    }
  }

  parseImportSpecifier(node: N.ImportDeclaration): void {
    const specifier = this.startNode();
    specifier.imported = this.parseIdentifier(true);
    if (this.eatContextual("as")) {
      specifier.local = this.parseIdentifier();
    } else {
      this.checkReservedWord(
        specifier.imported.name,
        specifier.start,
        true,
        true,
      );
      specifier.local = specifier.imported.__clone();
    }
    this.checkLVal(specifier.local, true, undefined, "import specifier");
    node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
  }
}
