import type * as N from "../types";
import {
  tokenIsIdentifier,
  tokenIsLoop,
  tokenIsTemplate,
  tt,
  type TokenType,
  getExportedToken,
} from "../tokenizer/types";
import ExpressionParser from "./expression";
import { Errors } from "../parse-error";
import { isIdentifierChar, isIdentifierStart } from "../util/identifier";
import { lineBreak } from "../util/whitespace";
import * as charCodes from "charcodes";
import {
  BIND_CLASS,
  BIND_LEXICAL,
  BIND_VAR,
  BIND_FUNCTION,
  SCOPE_CLASS,
  SCOPE_FUNCTION,
  SCOPE_OTHER,
  SCOPE_SIMPLE_CATCH,
  SCOPE_STATIC_BLOCK,
  SCOPE_SUPER,
  CLASS_ELEMENT_OTHER,
  CLASS_ELEMENT_INSTANCE_GETTER,
  CLASS_ELEMENT_INSTANCE_SETTER,
  CLASS_ELEMENT_STATIC_GETTER,
  CLASS_ELEMENT_STATIC_SETTER,
  type BindingTypes,
} from "../util/scopeflags";
import { ExpressionErrors } from "./util";
import { PARAM, functionFlags } from "../util/production-parameter";
import {
  newExpressionScope,
  newParameterDeclarationScope,
} from "../util/expression-scope";
import type { SourceType } from "../options";
import { Token } from "../tokenizer";
import type { Position } from "../util/location";
import { createPositionWithColumnOffset } from "../util/location";
import { cloneStringLiteral, cloneIdentifier, type Undone } from "./node";
import type Parser from "./index";

const loopLabel = { kind: "loop" } as const,
  switchLabel = { kind: "switch" } as const;

const FUNC_NO_FLAGS = 0b000,
  FUNC_STATEMENT = 0b001,
  FUNC_HANGING_STATEMENT = 0b010,
  FUNC_NULLABLE_ID = 0b100;

const loneSurrogate = /[\uD800-\uDFFF]/u;

const keywordRelationalOperator = /in(?:stanceof)?/y;

/**
 * Convert tokens for backward Babel 7 compat.
 * tt.privateName => tt.hash + tt.name
 * tt.templateTail => tt.backquote/tt.braceR + tt.template + tt.backquote
 * tt.templateNonTail => tt.backquote/tt.braceR + tt.template + tt.dollarBraceL
 * For performance reasons this routine mutates `tokens`, it is okay
 * here since we execute `parseTopLevel` once for every file.
 * @param {*} tokens
 * @returns
 */
function babel7CompatTokens(tokens: (Token | N.Comment)[], input: string) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const { type } = token;
    if (typeof type === "number") {
      if (!process.env.BABEL_8_BREAKING) {
        if (type === tt.privateName) {
          const { loc, start, value, end } = token;
          const hashEndPos = start + 1;
          const hashEndLoc = createPositionWithColumnOffset(loc.start, 1);
          tokens.splice(
            i,
            1,
            new Token({
              // @ts-expect-error: hacky way to create token
              type: getExportedToken(tt.hash),
              value: "#",
              start: start,
              end: hashEndPos,
              startLoc: loc.start,
              endLoc: hashEndLoc,
            }),
            new Token({
              // @ts-expect-error: hacky way to create token
              type: getExportedToken(tt.name),
              value: value,
              start: hashEndPos,
              end: end,
              startLoc: hashEndLoc,
              endLoc: loc.end,
            }),
          );
          i++;
          continue;
        }

        if (tokenIsTemplate(type)) {
          const { loc, start, value, end } = token;
          const backquoteEnd = start + 1;
          const backquoteEndLoc = createPositionWithColumnOffset(loc.start, 1);
          let startToken;
          if (input.charCodeAt(start) === charCodes.graveAccent) {
            startToken = new Token({
              // @ts-expect-error: hacky way to create token
              type: getExportedToken(tt.backQuote),
              value: "`",
              start: start,
              end: backquoteEnd,
              startLoc: loc.start,
              endLoc: backquoteEndLoc,
            });
          } else {
            startToken = new Token({
              // @ts-expect-error: hacky way to create token
              type: getExportedToken(tt.braceR),
              value: "}",
              start: start,
              end: backquoteEnd,
              startLoc: loc.start,
              endLoc: backquoteEndLoc,
            });
          }
          let templateValue,
            templateElementEnd,
            templateElementEndLoc,
            endToken;
          if (type === tt.templateTail) {
            // ends with '`'
            templateElementEnd = end - 1;
            templateElementEndLoc = createPositionWithColumnOffset(loc.end, -1);
            templateValue = value === null ? null : value.slice(1, -1);
            endToken = new Token({
              // @ts-expect-error: hacky way to create token
              type: getExportedToken(tt.backQuote),
              value: "`",
              start: templateElementEnd,
              end: end,
              startLoc: templateElementEndLoc,
              endLoc: loc.end,
            });
          } else {
            // ends with `${`
            templateElementEnd = end - 2;
            templateElementEndLoc = createPositionWithColumnOffset(loc.end, -2);
            templateValue = value === null ? null : value.slice(1, -2);
            endToken = new Token({
              // @ts-expect-error: hacky way to create token
              type: getExportedToken(tt.dollarBraceL),
              value: "${",
              start: templateElementEnd,
              end: end,
              startLoc: templateElementEndLoc,
              endLoc: loc.end,
            });
          }
          tokens.splice(
            i,
            1,
            startToken,
            new Token({
              // @ts-expect-error: hacky way to create token
              type: getExportedToken(tt.template),
              value: templateValue,
              start: backquoteEnd,
              end: templateElementEnd,
              startLoc: backquoteEndLoc,
              endLoc: templateElementEndLoc,
            }),
            endToken,
          );
          i += 2;
          continue;
        }
      }
      // @ts-expect-error: we manipulate `token` for performance reasons
      token.type = getExportedToken(type);
    }
  }
  return tokens;
}
export default abstract class StatementParser extends ExpressionParser {
  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  parseTopLevel(this: Parser, file: N.File, program: N.Program): N.File {
    file.program = this.parseProgram(program);
    file.comments = this.state.comments;

    if (this.options.tokens) {
      file.tokens = babel7CompatTokens(this.tokens, this.input);
    }

    return this.finishNode(file, "File");
  }

  parseProgram(
    this: Parser,
    program: Undone<N.Program>,
    end: TokenType = tt.eof,
    sourceType: SourceType = this.options.sourceType,
  ): N.Program {
    program.sourceType = sourceType;
    program.interpreter = this.parseInterpreterDirective();
    this.parseBlockBody(program, true, true, end);
    if (
      this.inModule &&
      !this.options.allowUndeclaredExports &&
      this.scope.undefinedExports.size > 0
    ) {
      for (const [localName, at] of Array.from(this.scope.undefinedExports)) {
        this.raise(Errors.ModuleExportUndefined, { at, localName });
      }
    }
    let finishedProgram: N.Program;
    if (end === tt.eof) {
      // finish at eof for top level program
      finishedProgram = this.finishNode(program, "Program");
    } else {
      // finish immediately before the end token
      finishedProgram = this.finishNodeAt(
        program,
        "Program",
        createPositionWithColumnOffset(this.state.startLoc, -1),
      );
    }
    return finishedProgram;
  }

  // TODO

  /**
   * cast a Statement to a Directive. This method mutates input statement.
   *
   * @param {N.Statement} stmt
   * @returns {N.Directive}
   * @memberof StatementParser
   */
  stmtToDirective(stmt: N.Statement): N.Directive {
    const directive = stmt as any;
    directive.type = "Directive";
    directive.value = directive.expression;
    delete directive.expression;

    const directiveLiteral = directive.value;
    const expressionValue = directiveLiteral.value;
    const raw = this.input.slice(directiveLiteral.start, directiveLiteral.end);
    const val = (directiveLiteral.value = raw.slice(1, -1)); // remove quotes

    this.addExtra(directiveLiteral, "raw", raw);
    this.addExtra(directiveLiteral, "rawValue", val);
    this.addExtra(directiveLiteral, "expressionValue", expressionValue);

    directiveLiteral.type = "DirectiveLiteral";

    return directive;
  }

  parseInterpreterDirective(): N.InterpreterDirective | null {
    if (!this.match(tt.interpreterDirective)) {
      return null;
    }

    const node = this.startNode<N.InterpreterDirective>();
    node.value = this.state.value;
    this.next();
    return this.finishNode(node, "InterpreterDirective");
  }

  isLet(context?: string | null): boolean {
    if (!this.isContextual(tt._let)) {
      return false;
    }
    return this.hasFollowingIdentifier(context);
  }

  /**
   * Assuming we have seen a contextual `let`, check if it starts a variable declaration
   so that `left` should be interpreted as a `let` keyword.
   *
   * @param {?string} context When `context` is non nullish, it will return early and _skip_ checking
                              if the next token after `let` is `{` or a keyword relational operator
   * @returns {boolean}
   * @memberof StatementParser
   */
  hasFollowingIdentifier(context?: string | null): boolean {
    const next = this.nextTokenStart();
    const nextCh = this.codePointAtPos(next);
    // For ambiguous cases, determine if a LexicalDeclaration (or only a
    // Statement) is allowed here. If context is not empty then only a Statement
    // is allowed. However, `let [` is an explicit negative lookahead for
    // ExpressionStatement, so special-case it first.
    // Also, `let \` is never valid as an expression so this must be a keyword.
    if (
      nextCh === charCodes.backslash ||
      nextCh === charCodes.leftSquareBracket
    ) {
      return true;
    }
    if (context) return false;

    if (nextCh === charCodes.leftCurlyBrace) return true;

    if (isIdentifierStart(nextCh)) {
      keywordRelationalOperator.lastIndex = next;
      if (keywordRelationalOperator.test(this.input)) {
        // We have seen `in` or `instanceof` so far, now check if the identfier
        // ends here
        const endCh = this.codePointAtPos(keywordRelationalOperator.lastIndex);
        if (!isIdentifierChar(endCh) && endCh !== charCodes.backslash) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  startsUsingForOf(): boolean {
    const lookahead = this.lookahead();
    if (lookahead.type === tt._of && !lookahead.containsEsc) {
      // `using of` must start a for-lhs-of statement
      return false;
    } else {
      this.expectPlugin("explicitResourceManagement");
      return true;
    }
  }

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo)`, where looking at the previous token
  // does not help.
  // https://tc39.es/ecma262/#prod-Statement
  // ImportDeclaration and ExportDeclaration are also handled here so we can throw recoverable errors
  // when they are not at the top level
  parseStatement(
    this: Parser,
    context?: string | null,
    topLevel?: boolean,
  ): N.Statement {
    let decorators: N.Decorator[] | null = null;

    if (this.match(tt.at)) {
      decorators = this.parseDecorators(true);
    }
    return this.parseStatementContent(context, topLevel, decorators);
  }

  parseStatementContent(
    this: Parser,
    context?: string | null,
    topLevel?: boolean | null,
    decorators?: N.Decorator[] | null,
  ): N.Statement {
    const starttype = this.state.type;
    const node = this.startNode();

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
      case tt._break:
        return this.parseBreakContinueStatement(node, /* isBreak */ true);
      case tt._continue:
        return this.parseBreakContinueStatement(node, /* isBreak */ false);
      case tt._debugger:
        return this.parseDebuggerStatement(node as Undone<N.DebuggerStatement>);
      case tt._do:
        return this.parseDoStatement(node as Undone<N.DoWhileStatement>);
      case tt._for:
        return this.parseForStatement(node as Undone<N.ForStatement>);
      case tt._function:
        if (this.lookaheadCharCode() === charCodes.dot) break;
        if (context) {
          if (this.state.strict) {
            this.raise(Errors.StrictFunction, { at: this.state.startLoc });
          } else if (context !== "if" && context !== "label") {
            this.raise(Errors.SloppyFunction, { at: this.state.startLoc });
          }
        }
        return this.parseFunctionStatement(
          node as Undone<N.FunctionDeclaration>,
          false,
          !context,
        );

      case tt._class:
        if (context) this.unexpected();
        return this.parseClass(
          this.maybeTakeDecorators(
            decorators,
            node as Undone<N.ClassDeclaration>,
          ),
          true,
        );

      case tt._if:
        return this.parseIfStatement(node as Undone<N.IfStatement>);
      case tt._return:
        return this.parseReturnStatement(node as Undone<N.ReturnStatement>);
      case tt._switch:
        return this.parseSwitchStatement(node as Undone<N.SwitchStatement>);
      case tt._throw:
        return this.parseThrowStatement(node as Undone<N.ThrowStatement>);
      case tt._try:
        return this.parseTryStatement(node as Undone<N.TryStatement>);

      case tt._using:
        // using [no LineTerminator here] BindingList[+Using]
        if (this.hasFollowingLineBreak()) {
          break;
        }
      // fall through
      case tt._let:
        if (this.state.containsEsc || !this.hasFollowingIdentifier(context)) {
          break;
        }
      // fall through
      case tt._const:
      case tt._var: {
        const kind = this.state.value;
        if (kind === "using") {
          this.expectPlugin("explicitResourceManagement");
          if (!this.scope.inModule && this.scope.inTopLevel) {
            this.raise(Errors.UnexpectedUsingDeclaration, {
              at: this.state.startLoc,
            });
          }
        }
        if (context && kind !== "var") {
          this.raise(Errors.UnexpectedLexicalDeclaration, {
            at: this.state.startLoc,
          });
        }
        return this.parseVarStatement(
          node as Undone<N.VariableDeclaration>,
          kind,
        );
      }
      case tt._while:
        return this.parseWhileStatement(node as Undone<N.WhileStatement>);
      case tt._with:
        return this.parseWithStatement(node as Undone<N.WithStatement>);
      case tt.braceL:
        return this.parseBlock();
      case tt.semi:
        return this.parseEmptyStatement(node as Undone<N.EmptyStatement>);
      case tt._import: {
        const nextTokenCharCode = this.lookaheadCharCode();
        if (
          nextTokenCharCode === charCodes.leftParenthesis || // import()
          nextTokenCharCode === charCodes.dot // import.meta
        ) {
          break;
        }
      }
      // fall through
      case tt._export: {
        if (!this.options.allowImportExportEverywhere && !topLevel) {
          this.raise(Errors.UnexpectedImportExport, {
            at: this.state.startLoc,
          });
        }

        this.next(); // eat `import`/`export`

        let result;
        if (starttype === tt._import) {
          result = this.parseImport(node as Undone<N.ImportDeclaration>);

          if (
            result.type === "ImportDeclaration" &&
            (!result.importKind || result.importKind === "value")
          ) {
            this.sawUnambiguousESM = true;
          }
        } else {
          result = this.parseExport(
            node as Undone<
              | N.ExportAllDeclaration
              | N.ExportDefaultDeclaration
              | N.ExportDefaultDeclaration
            >,
            decorators,
          );

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

        this.assertModuleNodeAllowed(result);

        return result;
      }

      default: {
        if (this.isAsyncFunction()) {
          if (context) {
            this.raise(Errors.AsyncFunctionInSingleStatementContext, {
              at: this.state.startLoc,
            });
          }
          this.next();
          return this.parseFunctionStatement(
            node as Undone<N.FunctionDeclaration>,
            true,
            !context,
          );
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
      tokenIsIdentifier(starttype) &&
      expr.type === "Identifier" &&
      this.eat(tt.colon)
    ) {
      return this.parseLabeledStatement(
        node as Undone<N.LabeledStatement>,
        maybeName,
        // @ts-expect-error migrate to Babel types
        expr,
        context,
      );
    } else {
      return this.parseExpressionStatement(
        node as Undone<N.ExpressionStatement>,
        expr,
        decorators,
      );
    }
  }

  assertModuleNodeAllowed(node: N.Node): void {
    if (!this.options.allowImportExportEverywhere && !this.inModule) {
      this.raise(Errors.ImportOutsideModule, { at: node });
    }
  }

  decoratorsEnabledBeforeExport(): boolean {
    if (this.hasPlugin("decorators-legacy")) return true;
    return (
      this.hasPlugin("decorators") &&
      !!this.getPluginOption("decorators", "decoratorsBeforeExport")
    );
  }

  // Attach the decorators to the given class.
  // NOTE: This method changes the .start location of the class, and thus
  // can affect comment attachment. Calling it before or after finalizing
  // the class node (and thus finalizing its comments) changes how comments
  // before the `class` keyword or before the final .start location of the
  // class are attached.
  maybeTakeDecorators<T extends Undone<N.Class>>(
    maybeDecorators: N.Decorator[] | null,
    classNode: T,
    exportNode?: Undone<N.ExportDefaultDeclaration | N.ExportNamedDeclaration>,
  ): T {
    if (maybeDecorators) {
      classNode.decorators = maybeDecorators;
      this.resetStartLocationFromNode(classNode, maybeDecorators[0]);
      if (exportNode) this.resetStartLocationFromNode(exportNode, classNode);
    }
    return classNode;
  }

  canHaveLeadingDecorator(): boolean {
    return this.match(tt._class);
  }

  parseDecorators(this: Parser, allowExport?: boolean): N.Decorator[] {
    const decorators = [];
    do {
      decorators.push(this.parseDecorator());
    } while (this.match(tt.at));

    if (this.match(tt._export)) {
      if (!allowExport) {
        this.unexpected();
      }

      if (!this.decoratorsEnabledBeforeExport()) {
        this.raise(Errors.DecoratorExportClass, { at: this.state.startLoc });
      }
    } else if (!this.canHaveLeadingDecorator()) {
      throw this.raise(Errors.UnexpectedLeadingDecorator, {
        at: this.state.startLoc,
      });
    }

    return decorators;
  }

  parseDecorator(this: Parser): N.Decorator {
    this.expectOnePlugin(["decorators", "decorators-legacy"]);

    const node = this.startNode<N.Decorator>();
    this.next();

    if (this.hasPlugin("decorators")) {
      const startLoc = this.state.startLoc;
      let expr: N.Expression;

      if (this.match(tt.parenL)) {
        const startLoc = this.state.startLoc;
        this.next(); // eat '('
        expr = this.parseExpression();
        this.expect(tt.parenR);
        expr = this.wrapParenthesis(startLoc, expr);

        const paramsStartLoc = this.state.startLoc;
        node.expression = this.parseMaybeDecoratorArguments(expr);
        if (
          this.getPluginOption("decorators", "allowCallParenthesized") ===
            false &&
          node.expression !== expr
        ) {
          this.raise(Errors.DecoratorArgumentsOutsideParentheses, {
            at: paramsStartLoc,
          });
        }
      } else {
        expr = this.parseIdentifier(false);

        while (this.eat(tt.dot)) {
          const node = this.startNodeAt(startLoc);
          node.object = expr;
          if (this.match(tt.privateName)) {
            this.classScope.usePrivateName(
              this.state.value,
              this.state.startLoc,
            );
            node.property = this.parsePrivateName();
          } else {
            node.property = this.parseIdentifier(true);
          }
          node.computed = false;
          expr = this.finishNode(node, "MemberExpression");
        }

        node.expression = this.parseMaybeDecoratorArguments(expr);
      }
    } else {
      node.expression = this.parseExprSubscripts();
    }
    return this.finishNode(node, "Decorator");
  }

  parseMaybeDecoratorArguments(this: Parser, expr: N.Expression): N.Expression {
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
    node: Undone<N.Node>,
    isBreak: true,
  ): N.BreakStatement;
  parseBreakContinueStatement(
    node: Undone<N.Node>,
    isBreak: false,
  ): N.ContinueStatement;
  parseBreakContinueStatement(
    node: Undone<N.BreakStatement | N.ContinueStatement>,
    isBreak: boolean,
  ): N.BreakStatement | N.ContinueStatement {
    this.next();

    if (this.isLineTerminator()) {
      node.label = null;
    } else {
      node.label = this.parseIdentifier();
      this.semicolon();
    }

    this.verifyBreakContinue(node, isBreak);

    return this.finishNode(
      node,
      isBreak ? "BreakStatement" : "ContinueStatement",
    );
  }

  verifyBreakContinue(
    node: Undone<N.BreakStatement | N.ContinueStatement>,
    isBreak: boolean,
  ) {
    let i;
    for (i = 0; i < this.state.labels.length; ++i) {
      const lab = this.state.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
        if (node.label && isBreak) break;
      }
    }
    if (i === this.state.labels.length) {
      const type = isBreak ? "BreakStatement" : "ContinueStatement";
      this.raise(Errors.IllegalBreakContinue, { at: node, type });
    }
  }

  parseDebuggerStatement(
    node: Undone<N.DebuggerStatement>,
  ): N.DebuggerStatement {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  }

  parseHeaderExpression(this: Parser): N.Expression {
    this.expect(tt.parenL);
    const val = this.parseExpression();
    this.expect(tt.parenR);
    return val;
  }

  parseDoStatement(
    this: Parser,
    node: Undone<N.DoWhileStatement>,
  ): N.DoWhileStatement {
    this.next();
    this.state.labels.push(loopLabel);

    // Parse the loop body's body.
    node.body =
      // For the smartPipelines plugin: Disable topic references from outer
      // contexts within the loop body. They are permitted in test expressions,
      // outside of the loop body.
      this.withSmartMixTopicForbiddingContext(() =>
        // Parse the loop body's body.
        this.parseStatement("do"),
      );

    this.state.labels.pop();

    this.expect(tt._while);
    node.test = this.parseHeaderExpression();
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

  parseForStatement(
    this: Parser,
    node: Undone<N.ForStatement | N.ForInOf>,
  ): N.ForLike {
    this.next();
    this.state.labels.push(loopLabel);

    let awaitAt = null;

    if (this.isAwaitAllowed() && this.eatContextual(tt._await)) {
      awaitAt = this.state.lastTokStartLoc;
    }
    this.scope.enter(SCOPE_OTHER);
    this.expect(tt.parenL);

    if (this.match(tt.semi)) {
      if (awaitAt !== null) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node as Undone<N.ForStatement>, null);
    }

    const startsWithLet = this.isContextual(tt._let);
    const startsWithUsing =
      this.isContextual(tt._using) && !this.hasFollowingLineBreak();
    const isLetOrUsing =
      (startsWithLet && this.hasFollowingIdentifier()) ||
      (startsWithUsing &&
        this.hasFollowingIdentifier() &&
        this.startsUsingForOf());
    if (this.match(tt._var) || this.match(tt._const) || isLetOrUsing) {
      const initNode = this.startNode<N.VariableDeclaration>();
      const kind = this.state.value;
      this.next();
      this.parseVar(initNode, true, kind);
      const init = this.finishNode(initNode, "VariableDeclaration");

      const isForIn = this.match(tt._in);
      if (isForIn && startsWithUsing) {
        this.raise(Errors.ForInUsing, { at: init });
      }
      if (
        (isForIn || this.isContextual(tt._of)) &&
        init.declarations.length === 1
      ) {
        return this.parseForIn(node as Undone<N.ForInOf>, init, awaitAt);
      }
      if (awaitAt !== null) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node as Undone<N.ForStatement>, init);
    }

    // Check whether the first token is possibly a contextual keyword, so that
    // we can forbid `for (async of` if this turns out to be a for-of loop.
    const startsWithAsync = this.isContextual(tt._async);

    const refExpressionErrors = new ExpressionErrors();
    const init = this.parseExpression(true, refExpressionErrors);
    const isForOf = this.isContextual(tt._of);
    if (isForOf) {
      // Check for leading tokens that are forbidden in for-of loops:
      if (startsWithLet) {
        this.raise(Errors.ForOfLet, { at: init });
      }

      if (
        // `for await (async of []);` is allowed.
        awaitAt === null &&
        startsWithAsync &&
        init.type === "Identifier"
      ) {
        // This catches the case where the `async` in `for (async of` was
        // parsed as an identifier. If it was parsed as the start of an async
        // arrow function (e.g. `for (async of => {} of []);`), the LVal check
        // further down will raise a more appropriate error.
        this.raise(Errors.ForOfAsync, { at: init });
      }
    }
    if (isForOf || this.match(tt._in)) {
      this.checkDestructuringPrivate(refExpressionErrors);
      this.toAssignable(init, /* isLHS */ true);
      const type = isForOf ? "ForOfStatement" : "ForInStatement";
      this.checkLVal(init, { in: { type } });
      return this.parseForIn(
        node as Undone<N.ForInStatement | N.ForOfStatement>,
        // @ts-expect-error init has been transformed to an assignable
        init,
        awaitAt,
      );
    } else {
      this.checkExpressionErrors(refExpressionErrors, true);
    }
    if (awaitAt !== null) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node as Undone<N.ForStatement>, init);
  }

  parseFunctionStatement(
    this: Parser,
    node: Undone<N.FunctionDeclaration>,
    isAsync?: boolean,
    declarationPosition?: boolean,
  ): N.FunctionDeclaration {
    this.next();
    return this.parseFunction(
      node,
      FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT),
      isAsync,
    );
  }

  parseIfStatement(this: Parser, node: Undone<N.IfStatement>) {
    this.next();
    node.test = this.parseHeaderExpression();
    node.consequent = this.parseStatement("if");
    node.alternate = this.eat(tt._else) ? this.parseStatement("if") : null;
    return this.finishNode(node, "IfStatement");
  }

  parseReturnStatement(this: Parser, node: Undone<N.ReturnStatement>) {
    if (!this.prodParam.hasReturn && !this.options.allowReturnOutsideFunction) {
      this.raise(Errors.IllegalReturn, { at: this.state.startLoc });
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

  parseSwitchStatement(this: Parser, node: Undone<N.SwitchStatement>) {
    this.next();
    node.discriminant = this.parseHeaderExpression();
    const cases: N.SwitchStatement["cases"] = (node.cases = []);
    this.expect(tt.braceL);
    this.state.labels.push(switchLabel);
    this.scope.enter(SCOPE_OTHER);

    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    let cur;
    for (let sawDefault; !this.match(tt.braceR); ) {
      if (this.match(tt._case) || this.match(tt._default)) {
        const isCase = this.match(tt._case);
        if (cur) this.finishNode(cur, "SwitchCase");
        // @ts-expect-error Fixme
        cases.push((cur = this.startNode()));
        cur.consequent = [];
        this.next();
        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) {
            this.raise(Errors.MultipleDefaultsInSwitch, {
              at: this.state.lastTokStartLoc,
            });
          }
          sawDefault = true;
          cur.test = null;
        }
        this.expect(tt.colon);
      } else {
        if (cur) {
          cur.consequent.push(this.parseStatement(null));
        } else {
          this.unexpected();
        }
      }
    }
    this.scope.exit();
    if (cur) this.finishNode(cur, "SwitchCase");
    this.next(); // Closing brace
    this.state.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  }

  parseThrowStatement(this: Parser, node: Undone<N.ThrowStatement>) {
    this.next();
    if (this.hasPrecedingLineBreak()) {
      this.raise(Errors.NewlineAfterThrow, { at: this.state.lastTokEndLoc });
    }
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  }

  parseCatchClauseParam(this: Parser): N.Pattern {
    const param = this.parseBindingAtom();

    const simple = param.type === "Identifier";
    this.scope.enter(simple ? SCOPE_SIMPLE_CATCH : 0);
    this.checkLVal(param, {
      in: { type: "CatchClause" },
      binding: BIND_LEXICAL,
      allowingSloppyLetBinding: true,
    });

    return param;
  }

  parseTryStatement(
    this: Parser,
    node: Undone<N.TryStatement>,
  ): N.TryStatement {
    this.next();

    node.block = this.parseBlock();
    node.handler = null;

    if (this.match(tt._catch)) {
      const clause = this.startNode<N.CatchClause>();
      this.next();
      if (this.match(tt.parenL)) {
        this.expect(tt.parenL);
        clause.param = this.parseCatchClauseParam();
        this.expect(tt.parenR);
      } else {
        clause.param = null;
        this.scope.enter(SCOPE_OTHER);
      }

      // Parse the catch clause's body.
      clause.body =
        // For the smartPipelines plugin: Disable topic references from outer
        // contexts within the catch clause's body.
        this.withSmartMixTopicForbiddingContext(() =>
          // Parse the catch clause's body.
          this.parseBlock(false, false),
        );

      this.scope.exit();
      node.handler = this.finishNode(clause, "CatchClause");
    }

    node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;

    if (!node.handler && !node.finalizer) {
      this.raise(Errors.NoCatchOrFinally, { at: node });
    }

    return this.finishNode(node, "TryStatement");
  }

  parseVarStatement(
    this: Parser,
    node: Undone<N.VariableDeclaration>,
    kind: "var" | "let" | "const" | "using",
    allowMissingInitializer: boolean = false,
  ): N.VariableDeclaration {
    this.next();
    this.parseVar(node, false, kind, allowMissingInitializer);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  }

  parseWhileStatement(
    this: Parser,
    node: Undone<N.WhileStatement>,
  ): N.WhileStatement {
    this.next();
    node.test = this.parseHeaderExpression();
    this.state.labels.push(loopLabel);

    // Parse the loop body.
    node.body =
      // For the smartPipelines plugin:
      // Disable topic references from outer contexts within the loop body.
      // They are permitted in test expressions, outside of the loop body.
      this.withSmartMixTopicForbiddingContext(() =>
        // Parse loop body.
        this.parseStatement("while"),
      );

    this.state.labels.pop();

    return this.finishNode(node, "WhileStatement");
  }

  parseWithStatement(
    this: Parser,
    node: Undone<N.WithStatement>,
  ): N.WithStatement {
    if (this.state.strict) {
      this.raise(Errors.StrictWith, { at: this.state.startLoc });
    }
    this.next();
    node.object = this.parseHeaderExpression();

    // Parse the statement body.
    node.body =
      // For the smartPipelines plugin:
      // Disable topic references from outer contexts within the with statement's body.
      // They are permitted in function default-parameter expressions, which are
      // part of the outer context, outside of the with statement's body.
      this.withSmartMixTopicForbiddingContext(() =>
        // Parse the statement body.
        this.parseStatement("with"),
      );

    return this.finishNode(node, "WithStatement");
  }

  parseEmptyStatement(node: Undone<N.EmptyStatement>): N.EmptyStatement {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  }

  parseLabeledStatement(
    this: Parser,
    node: Undone<N.LabeledStatement>,
    maybeName: string,
    expr: N.Identifier,
    context?: string | null,
  ): N.LabeledStatement {
    for (const label of this.state.labels) {
      if (label.name === maybeName) {
        this.raise(Errors.LabelRedeclaration, {
          at: expr,
          labelName: maybeName,
        });
      }
    }

    const kind = tokenIsLoop(this.state.type)
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
    node.body = this.parseStatement(
      context
        ? context.indexOf("label") === -1
          ? context + "label"
          : context
        : "label",
    );

    this.state.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  }

  parseExpressionStatement(
    node: Undone<N.ExpressionStatement>,
    expr: N.Expression,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in TypeScript parser */
    decorators: N.Decorator[] | null,
  ) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  }

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowDirectives` is true (used for
  // function bodies).

  parseBlock(
    this: Parser,
    allowDirectives: boolean = false,
    createNewLexicalScope: boolean = true,
    afterBlockParse?: (hasStrictModeDirective: boolean) => void,
  ): N.BlockStatement {
    const node = this.startNode<N.BlockStatement>();
    if (allowDirectives) {
      this.state.strictErrors.clear();
    }
    this.expect(tt.braceL);
    if (createNewLexicalScope) {
      this.scope.enter(SCOPE_OTHER);
    }
    this.parseBlockBody(
      node,
      allowDirectives,
      false,
      tt.braceR,
      afterBlockParse,
    );
    if (createNewLexicalScope) {
      this.scope.exit();
    }
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
    this: Parser,
    node: Undone<N.BlockStatementLike>,
    allowDirectives: boolean | undefined | null,
    topLevel: boolean,
    end: TokenType,
    afterBlockParse?: (hasStrictModeDirective: boolean) => void,
  ): void {
    const body: N.BlockStatementLike["body"] = (node.body = []);
    const directives: N.BlockStatementLike["directives"] = (node.directives =
      []);
    this.parseBlockOrModuleBlockBody(
      body,
      allowDirectives ? directives : undefined,
      topLevel,
      end,
      afterBlockParse,
    );
  }

  // Undefined directives means that directives are not allowed.
  // https://tc39.es/ecma262/#prod-Block
  // https://tc39.es/ecma262/#prod-ModuleBody
  parseBlockOrModuleBlockBody(
    this: Parser,
    body: N.Statement[],
    directives: N.Directive[] | undefined | null,
    topLevel: boolean,
    end: TokenType,
    afterBlockParse?: (hasStrictModeDirective: boolean) => void,
  ): void {
    const oldStrict = this.state.strict;
    let hasStrictModeDirective = false;
    let parsedNonDirective = false;

    while (!this.match(end)) {
      const stmt = this.parseStatement(null, topLevel);

      if (directives && !parsedNonDirective) {
        if (this.isValidDirective(stmt)) {
          const directive = this.stmtToDirective(stmt);
          directives.push(directive);

          if (
            !hasStrictModeDirective &&
            directive.value.value === "use strict"
          ) {
            hasStrictModeDirective = true;
            this.setStrict(true);
          }

          continue;
        }
        parsedNonDirective = true;
        // clear strict errors since the strict mode will not change within the block
        this.state.strictErrors.clear();
      }
      body.push(stmt);
    }

    if (afterBlockParse) {
      afterBlockParse.call(this, hasStrictModeDirective);
    }

    if (!oldStrict) {
      this.setStrict(false);
    }

    this.next();
  }

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  parseFor(
    this: Parser,
    node: Undone<N.ForStatement>,
    init?: N.VariableDeclaration | N.Expression | null,
  ): N.ForStatement {
    node.init = init;
    this.semicolon(/* allowAsi */ false);
    node.test = this.match(tt.semi) ? null : this.parseExpression();
    this.semicolon(/* allowAsi */ false);
    node.update = this.match(tt.parenR) ? null : this.parseExpression();
    this.expect(tt.parenR);

    // Parse the loop body.
    node.body =
      // For the smartPipelines plugin: Disable topic references from outer
      // contexts within the loop body. They are permitted in test expressions,
      // outside of the loop body.
      this.withSmartMixTopicForbiddingContext(() =>
        // Parse the loop body.
        this.parseStatement("for"),
      );

    this.scope.exit();
    this.state.labels.pop();

    return this.finishNode(node, "ForStatement");
  }

  // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.

  parseForIn(
    this: Parser,
    node: Undone<N.ForInOf>,
    init: N.VariableDeclaration | N.AssignmentPattern,
    awaitAt?: Position | null,
  ): N.ForInOf {
    const isForIn = this.match(tt._in);
    this.next();

    if (isForIn) {
      if (awaitAt !== null) this.unexpected(awaitAt);
    } else {
      node.await = awaitAt !== null;
    }

    if (
      init.type === "VariableDeclaration" &&
      init.declarations[0].init != null &&
      (!isForIn ||
        this.state.strict ||
        init.kind !== "var" ||
        init.declarations[0].id.type !== "Identifier")
    ) {
      this.raise(Errors.ForInOfLoopInitializer, {
        at: init,
        type: isForIn ? "ForInStatement" : "ForOfStatement",
      });
    }

    if (init.type === "AssignmentPattern") {
      this.raise(Errors.InvalidLhs, {
        at: init,
        ancestor: { type: "ForStatement" },
      });
    }

    node.left = init;
    node.right = isForIn
      ? this.parseExpression()
      : this.parseMaybeAssignAllowIn();
    this.expect(tt.parenR);

    // Parse the loop body.
    node.body =
      // For the smartPipelines plugin:
      // Disable topic references from outer contexts within the loop body.
      // They are permitted in test expressions, outside of the loop body.
      this.withSmartMixTopicForbiddingContext(() =>
        // Parse loop body.
        this.parseStatement("for"),
      );

    this.scope.exit();
    this.state.labels.pop();

    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  }

  // Parse a list of variable declarations.

  parseVar(
    this: Parser,
    node: Undone<N.VariableDeclaration>,
    isFor: boolean,
    kind: "var" | "let" | "const" | "using",
    allowMissingInitializer: boolean = false,
  ): Undone<N.VariableDeclaration> {
    const declarations: N.VariableDeclarator[] = (node.declarations = []);
    node.kind = kind;
    for (;;) {
      const decl = this.startNode<N.VariableDeclarator>();
      this.parseVarId(decl, kind);
      decl.init = !this.eat(tt.eq)
        ? null
        : isFor
        ? this.parseMaybeAssignDisallowIn()
        : this.parseMaybeAssignAllowIn();

      if (decl.init === null && !allowMissingInitializer) {
        if (
          decl.id.type !== "Identifier" &&
          !(isFor && (this.match(tt._in) || this.isContextual(tt._of)))
        ) {
          this.raise(Errors.DeclarationMissingInitializer, {
            at: this.state.lastTokEndLoc,
            kind: "destructuring",
          });
        } else if (
          kind === "const" &&
          !(this.match(tt._in) || this.isContextual(tt._of))
        ) {
          this.raise(Errors.DeclarationMissingInitializer, {
            at: this.state.lastTokEndLoc,
            kind: "const",
          });
        }
      }
      declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(tt.comma)) break;
    }
    return node;
  }

  parseVarId(
    this: Parser,
    decl: Undone<N.VariableDeclarator>,
    kind: "var" | "let" | "const" | "using",
  ): void {
    const id = this.parseBindingAtom();
    if (kind === "using" && id.type !== "Identifier") {
      this.raise(Errors.UsingDeclarationHasBindingPattern, { at: id });
    }
    this.checkLVal(id, {
      in: { type: "VariableDeclarator" },
      binding: kind === "var" ? BIND_VAR : BIND_LEXICAL,
    });
    decl.id = id;
  }

  // Parse a function declaration or literal (depending on the
  // `isStatement` parameter).

  parseFunction<T extends N.NormalFunction>(
    this: Parser,
    node: Undone<T>,
    statement: number = FUNC_NO_FLAGS,
    isAsync: boolean = false,
  ): T {
    const isStatement = statement & FUNC_STATEMENT;
    const isHangingStatement = statement & FUNC_HANGING_STATEMENT;
    const requireId = !!isStatement && !(statement & FUNC_NULLABLE_ID);

    this.initFunction(node, isAsync);

    if (this.match(tt.star) && isHangingStatement) {
      this.raise(Errors.GeneratorInSingleStatementContext, {
        at: this.state.startLoc,
      });
    }
    node.generator = this.eat(tt.star);

    if (isStatement) {
      node.id = this.parseFunctionId(requireId);
    }

    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    this.state.maybeInArrowParameters = false;
    this.scope.enter(SCOPE_FUNCTION);
    this.prodParam.enter(functionFlags(isAsync, node.generator));

    if (!isStatement) {
      node.id = this.parseFunctionId();
    }

    this.parseFunctionParams(node, /* allowModifiers */ false);

    // For the smartPipelines plugin: Disable topic references from outer
    // contexts within the function body. They are permitted in function
    // default-parameter expressions, outside of the function body.
    this.withSmartMixTopicForbiddingContext(() => {
      // Parse the function body.
      this.parseFunctionBodyAndFinish(
        node,
        isStatement ? "FunctionDeclaration" : "FunctionExpression",
      );
    });

    this.prodParam.exit();
    this.scope.exit();

    if (isStatement && !isHangingStatement) {
      // We need to register this _after_ parsing the function body
      // because of TypeScript body-less function declarations,
      // which shouldn't be added to the scope.
      this.registerFunctionStatementId(node as T);
    }

    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
    return node as T;
  }

  parseFunctionId(requireId?: boolean): N.Identifier | undefined | null {
    return requireId || tokenIsIdentifier(this.state.type)
      ? this.parseIdentifier()
      : null;
  }

  parseFunctionParams(
    this: Parser,
    node: Undone<N.Function>,
    allowModifiers?: boolean,
  ): void {
    this.expect(tt.parenL);
    this.expressionScope.enter(newParameterDeclarationScope());
    node.params = this.parseBindingList(
      tt.parenR,
      charCodes.rightParenthesis,
      /* allowEmpty */ false,
      allowModifiers,
    );

    this.expressionScope.exit();
  }

  registerFunctionStatementId(node: N.Function): void {
    if (!node.id) return;

    // If it is a regular function declaration in sloppy mode, then it is
    // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
    // mode depends on properties of the current scope (see
    // treatFunctionsAsVar).
    this.scope.declareName(
      node.id.name,
      this.state.strict || node.generator || node.async
        ? this.scope.treatFunctionsAsVar
          ? BIND_VAR
          : BIND_LEXICAL
        : BIND_FUNCTION,
      node.id.loc.start,
    );
  }

  // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).

  parseClass<T extends N.Class>(
    this: Parser,
    node: Undone<T>,
    isStatement: /* T === ClassDeclaration */ boolean,
    optionalId?: boolean,
  ): T {
    this.next(); // 'class'

    // A class definition is always strict mode code.
    const oldStrict = this.state.strict;
    this.state.strict = true;

    this.parseClassId(node, isStatement, optionalId);
    this.parseClassSuper(node);
    // this.state.strict is restored in parseClassBody
    node.body = this.parseClassBody(!!node.superClass, oldStrict);

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

  // https://tc39.es/ecma262/#prod-ClassBody
  parseClassBody(
    this: Parser,
    hadSuperClass: boolean,
    oldStrict: boolean,
  ): N.ClassBody {
    this.classScope.enter();

    const state: N.ParseClassMemberState = {
      hadConstructor: false,
      hadSuperClass,
    };
    let decorators: N.Decorator[] = [];
    const classBody = this.startNode<N.ClassBody>();
    classBody.body = [];

    this.expect(tt.braceL);

    // For the smartPipelines plugin: Disable topic references from outer
    // contexts within the class body.
    this.withSmartMixTopicForbiddingContext(() => {
      // Parse the contents within the braces.
      while (!this.match(tt.braceR)) {
        if (this.eat(tt.semi)) {
          if (decorators.length > 0) {
            throw this.raise(Errors.DecoratorSemicolon, {
              at: this.state.lastTokEndLoc,
            });
          }
          continue;
        }

        if (this.match(tt.at)) {
          decorators.push(this.parseDecorator());
          continue;
        }

        const member = this.startNode<N.ClassMember>();

        // steal the decorators if there are any
        if (decorators.length) {
          // @ts-expect-error Fixme
          member.decorators = decorators;
          this.resetStartLocationFromNode(member, decorators[0]);
          decorators = [];
        }

        this.parseClassMember(classBody, member, state);

        if (
          // @ts-expect-error Fixme
          member.kind === "constructor" &&
          // @ts-expect-error Fixme
          member.decorators &&
          // @ts-expect-error Fixme
          member.decorators.length > 0
        ) {
          this.raise(Errors.DecoratorConstructor, { at: member });
        }
      }
    });

    this.state.strict = oldStrict;

    this.next(); // eat `}`

    if (decorators.length) {
      throw this.raise(Errors.TrailingDecorator, { at: this.state.startLoc });
    }

    this.classScope.exit();

    return this.finishNode(classBody, "ClassBody");
  }

  // returns true if the current identifier is a method/field name,
  // false if it is a modifier
  parseClassMemberFromModifier(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    member: Undone<N.ClassMember>,
  ): boolean {
    const key = this.parseIdentifier(true); // eats the modifier

    if (this.isClassMethod()) {
      const method: N.ClassMethod = member as any;

      // a method named like the modifier
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
        false,
      );
      return true;
    } else if (this.isClassProperty()) {
      const prop: N.ClassProperty = member as any;

      // a property named like the modifier
      prop.computed = false;
      prop.key = key;
      prop.static = false;
      classBody.body.push(this.parseClassProperty(prop));
      return true;
    }
    this.resetPreviousNodeTrailingComments(key);
    return false;
  }

  parseClassMember(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    member: Undone<N.ClassMember>,
    state: N.ParseClassMemberState,
  ): void {
    const isStatic = this.isContextual(tt._static);

    if (isStatic) {
      if (this.parseClassMemberFromModifier(classBody, member)) {
        // a class element named 'static'
        return;
      }
      if (this.eat(tt.braceL)) {
        this.parseClassStaticBlock(classBody, member as any as N.StaticBlock);
        return;
      }
    }

    this.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
  }

  parseClassMemberWithIsStatic(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    member: Undone<N.ClassMember>,
    state: N.ParseClassMemberState,
    isStatic: boolean,
  ) {
    const publicMethod = member as N.ClassMethod;
    const privateMethod = member as N.ClassPrivateMethod;
    const publicProp = member as N.ClassProperty;
    const privateProp = member as N.ClassPrivateProperty;
    const accessorProp = member as N.ClassAccessorProperty;

    const method: typeof publicMethod | typeof privateMethod = publicMethod;
    const publicMember: typeof publicMethod | typeof publicProp = publicMethod;

    member.static = isStatic;
    this.parsePropertyNamePrefixOperator(member);

    if (this.eat(tt.star)) {
      // a generator
      method.kind = "method";
      const isPrivateName = this.match(tt.privateName);
      this.parseClassElementName(method);

      if (isPrivateName) {
        // Private generator method
        this.pushClassPrivateMethod(classBody, privateMethod, true, false);
        return;
      }

      if (this.isNonstaticConstructor(publicMethod)) {
        this.raise(Errors.ConstructorIsGenerator, {
          at: publicMethod.key,
        });
      }

      this.pushClassMethod(
        classBody,
        publicMethod,
        true,
        false,
        /* isConstructor */ false,
        false,
      );

      return;
    }

    const isContextual =
      tokenIsIdentifier(this.state.type) && !this.state.containsEsc;
    const isPrivate = this.match(tt.privateName);
    const key = this.parseClassElementName(member);
    const maybeQuestionTokenStartLoc = this.state.startLoc;

    this.parsePostMemberNameModifiers(publicMember);

    if (this.isClassMethod()) {
      method.kind = "method";

      if (isPrivate) {
        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
        return;
      }

      // a normal method
      const isConstructor = this.isNonstaticConstructor(publicMethod);
      let allowsDirectSuper = false;
      if (isConstructor) {
        publicMethod.kind = "constructor";

        // TypeScript allows multiple overloaded constructor declarations.
        if (state.hadConstructor && !this.hasPlugin("typescript")) {
          this.raise(Errors.DuplicateConstructor, { at: key });
        }
        if (isConstructor && this.hasPlugin("typescript") && member.override) {
          this.raise(Errors.OverrideOnConstructor, { at: key });
        }
        state.hadConstructor = true;
        allowsDirectSuper = state.hadSuperClass;
      }

      this.pushClassMethod(
        classBody,
        publicMethod,
        false,
        false,
        isConstructor,
        allowsDirectSuper,
      );
    } else if (this.isClassProperty()) {
      if (isPrivate) {
        this.pushClassPrivateProperty(classBody, privateProp);
      } else {
        this.pushClassProperty(classBody, publicProp);
      }
    } else if (
      isContextual &&
      key.name === "async" &&
      !this.isLineTerminator()
    ) {
      // an async method
      this.resetPreviousNodeTrailingComments(key);
      const isGenerator = this.eat(tt.star);

      if (publicMember.optional) {
        this.unexpected(maybeQuestionTokenStartLoc);
      }

      method.kind = "method";
      // The so-called parsed name would have been "async": get the real name.
      const isPrivate = this.match(tt.privateName);
      this.parseClassElementName(method);
      this.parsePostMemberNameModifiers(publicMember);

      if (isPrivate) {
        // private async method
        this.pushClassPrivateMethod(
          classBody,
          privateMethod,
          isGenerator,
          true,
        );
      } else {
        if (this.isNonstaticConstructor(publicMethod)) {
          this.raise(Errors.ConstructorIsAsync, { at: publicMethod.key });
        }

        this.pushClassMethod(
          classBody,
          publicMethod,
          isGenerator,
          true,
          /* isConstructor */ false,
          false,
        );
      }
    } else if (
      isContextual &&
      (key.name === "get" || key.name === "set") &&
      !(this.match(tt.star) && this.isLineTerminator())
    ) {
      // `get\n*` is an uninitialized property named 'get' followed by a generator.
      // a getter or setter
      this.resetPreviousNodeTrailingComments(key);
      method.kind = key.name;
      // The so-called parsed name would have been "get/set": get the real name.
      const isPrivate = this.match(tt.privateName);
      this.parseClassElementName(publicMethod);

      if (isPrivate) {
        // private getter/setter
        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
      } else {
        if (this.isNonstaticConstructor(publicMethod)) {
          this.raise(Errors.ConstructorIsAccessor, { at: publicMethod.key });
        }
        this.pushClassMethod(
          classBody,
          publicMethod,
          false,
          false,
          /* isConstructor */ false,
          false,
        );
      }

      this.checkGetterSetterParams(publicMethod);
    } else if (
      isContextual &&
      key.name === "accessor" &&
      !this.isLineTerminator()
    ) {
      this.expectPlugin("decoratorAutoAccessors");
      this.resetPreviousNodeTrailingComments(key);

      // The so-called parsed name would have been "accessor": get the real name.
      const isPrivate = this.match(tt.privateName);
      this.parseClassElementName(publicProp);
      this.pushClassAccessorProperty(classBody, accessorProp, isPrivate);
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

  // https://tc39.es/ecma262/#prod-ClassElementName
  parseClassElementName(
    this: Parser,
    member: Undone<N.ClassMember>,
  ): N.Expression | N.Identifier {
    const { type, value } = this.state;
    if (
      (type === tt.name || type === tt.string) &&
      member.static &&
      value === "prototype"
    ) {
      this.raise(Errors.StaticPrototype, { at: this.state.startLoc });
    }

    if (type === tt.privateName) {
      if (value === "constructor") {
        this.raise(Errors.ConstructorClassPrivateField, {
          at: this.state.startLoc,
        });
      }
      const key = this.parsePrivateName();
      member.key = key;
      return key;
    }

    return this.parsePropertyName(member);
  }

  parseClassStaticBlock(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    member: Undone<
      N.StaticBlock & {
        decorators?: Array<N.Decorator>;
      }
    >,
  ) {
    // Start a new lexical scope
    this.scope.enter(SCOPE_CLASS | SCOPE_STATIC_BLOCK | SCOPE_SUPER);
    // Start a new scope with regard to loop labels
    const oldLabels = this.state.labels;
    this.state.labels = [];
    // ClassStaticBlockStatementList:
    //   StatementList[~Yield, ~Await, ~Return] opt
    this.prodParam.enter(PARAM);
    const body: N.Node[] = (member.body = []);
    this.parseBlockOrModuleBlockBody(body, undefined, false, tt.braceR);
    this.prodParam.exit();
    this.scope.exit();
    this.state.labels = oldLabels;
    classBody.body.push(this.finishNode<N.StaticBlock>(member, "StaticBlock"));
    if (member.decorators?.length) {
      this.raise(Errors.DecoratorStaticBlock, { at: member });
    }
  }

  pushClassProperty(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    prop: N.ClassProperty,
  ) {
    if (
      !prop.computed &&
      (prop.key.name === "constructor" || prop.key.value === "constructor")
    ) {
      // Non-computed field, which is either an identifier named "constructor"
      // or a string literal named "constructor"
      this.raise(Errors.ConstructorClassField, { at: prop.key });
    }

    classBody.body.push(this.parseClassProperty(prop));
  }

  pushClassPrivateProperty(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    prop: Undone<N.ClassPrivateProperty>,
  ) {
    const node = this.parseClassPrivateProperty(prop);
    classBody.body.push(node);

    this.classScope.declarePrivateName(
      this.getPrivateNameSV(node.key),
      CLASS_ELEMENT_OTHER,
      node.key.loc.start,
    );
  }

  pushClassAccessorProperty(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    prop: N.ClassAccessorProperty,
    isPrivate: boolean,
  ) {
    if (!isPrivate && !prop.computed) {
      // Not private, so not node is not a PrivateName and we can safely cast
      const key = prop.key as N.Expression;

      if (key.name === "constructor" || key.value === "constructor") {
        // Non-computed field, which is either an identifier named "constructor"
        // or a string literal named "constructor"
        this.raise(Errors.ConstructorClassField, { at: key });
      }
    }

    const node = this.parseClassAccessorProperty(prop);
    classBody.body.push(node);

    if (isPrivate) {
      this.classScope.declarePrivateName(
        this.getPrivateNameSV(node.key),
        CLASS_ELEMENT_OTHER,
        node.key.loc.start,
      );
    }
  }

  pushClassMethod(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    method: Undone<N.ClassMethod>,
    isGenerator: boolean,
    isAsync: boolean,
    isConstructor: boolean,
    allowsDirectSuper: boolean,
  ): void {
    classBody.body.push(
      this.parseMethod(
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

  pushClassPrivateMethod(
    this: Parser,
    classBody: Undone<N.ClassBody>,
    method: Undone<N.ClassPrivateMethod>,
    isGenerator: boolean,
    isAsync: boolean,
  ): void {
    const node = this.parseMethod(
      method,
      isGenerator,
      isAsync,
      /* isConstructor */ false,
      false,
      "ClassPrivateMethod",
      true,
    );
    classBody.body.push(node);

    const kind =
      node.kind === "get"
        ? node.static
          ? CLASS_ELEMENT_STATIC_GETTER
          : CLASS_ELEMENT_INSTANCE_GETTER
        : node.kind === "set"
        ? node.static
          ? CLASS_ELEMENT_STATIC_SETTER
          : CLASS_ELEMENT_INSTANCE_SETTER
        : CLASS_ELEMENT_OTHER;
    this.declareClassPrivateMethodInScope(node, kind);
  }

  declareClassPrivateMethodInScope(
    node: Undone<
      N.ClassPrivateMethod | N.EstreeMethodDefinition | N.TSDeclareMethod
    >,
    kind: number,
  ) {
    this.classScope.declarePrivateName(
      this.getPrivateNameSV(node.key),
      kind,
      node.key.loc.start,
    );
  }

  // Overridden in typescript.js
  parsePostMemberNameModifiers(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    methodOrProp: Undone<N.ClassMethod | N.ClassProperty>,
  ): void {}

  // https://tc39.es/ecma262/#prod-FieldDefinition
  parseClassPrivateProperty(
    this: Parser,
    node: Undone<N.ClassPrivateProperty>,
  ): N.ClassPrivateProperty {
    this.parseInitializer(node);
    this.semicolon();
    return this.finishNode(node, "ClassPrivateProperty");
  }

  // https://tc39.es/ecma262/#prod-FieldDefinition
  parseClassProperty(this: Parser, node: N.ClassProperty): N.ClassProperty {
    this.parseInitializer(node);
    this.semicolon();
    return this.finishNode(node, "ClassProperty");
  }

  parseClassAccessorProperty(
    this: Parser,
    node: N.ClassAccessorProperty,
  ): N.ClassAccessorProperty {
    this.parseInitializer(node);
    this.semicolon();
    return this.finishNode(node, "ClassAccessorProperty");
  }

  // https://tc39.es/ecma262/#prod-Initializer
  parseInitializer(
    this: Parser,
    node: Undone<
      N.ClassProperty | N.ClassPrivateProperty | N.ClassAccessorProperty
    >,
  ): void {
    this.scope.enter(SCOPE_CLASS | SCOPE_SUPER);
    this.expressionScope.enter(newExpressionScope());
    this.prodParam.enter(PARAM);
    node.value = this.eat(tt.eq) ? this.parseMaybeAssignAllowIn() : null;
    this.expressionScope.exit();
    this.prodParam.exit();
    this.scope.exit();
  }

  parseClassId(
    node: Undone<N.Class>,
    isStatement: boolean,
    optionalId?: boolean | null,
    bindingType: BindingTypes = BIND_CLASS,
  ): void {
    if (tokenIsIdentifier(this.state.type)) {
      node.id = this.parseIdentifier();
      if (isStatement) {
        this.declareNameFromIdentifier(node.id, bindingType);
      }
    } else {
      if (optionalId || !isStatement) {
        node.id = null;
      } else {
        throw this.raise(Errors.MissingClassName, { at: this.state.startLoc });
      }
    }
  }

  // https://tc39.es/ecma262/#prod-ClassHeritage
  parseClassSuper(this: Parser, node: Undone<N.Class>): void {
    node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
  }

  // Parses module export declaration.
  // https://tc39.es/ecma262/#prod-ExportDeclaration

  parseExport(
    this: Parser,
    node: Undone<
      | N.ExportDefaultDeclaration
      | N.ExportAllDeclaration
      | N.ExportNamedDeclaration
    >,
    decorators: N.Decorator[] | null,
  ): N.AnyExport {
    const hasDefault = this.maybeParseExportDefaultSpecifier(
      // @ts-expect-error todo(flow->ts)
      node,
    );
    const parseAfterDefault = !hasDefault || this.eat(tt.comma);
    const hasStar =
      parseAfterDefault &&
      this.eatExportStar(
        // @ts-expect-error todo(flow->ts)
        node,
      );
    const hasNamespace =
      hasStar &&
      this.maybeParseExportNamespaceSpecifier(
        // @ts-expect-error todo(flow->ts)
        node,
      );
    const parseAfterNamespace =
      parseAfterDefault && (!hasNamespace || this.eat(tt.comma));
    const isFromRequired = hasDefault || hasStar;

    if (hasStar && !hasNamespace) {
      if (hasDefault) this.unexpected();
      if (decorators) {
        throw this.raise(Errors.UnsupportedDecoratorExport, { at: node });
      }
      this.parseExportFrom(node as Undone<N.ExportNamedDeclaration>, true);

      return this.finishNode(node, "ExportAllDeclaration");
    }

    const hasSpecifiers = this.maybeParseExportNamedSpecifiers(
      // @ts-expect-error todo(flow->ts)
      node,
    );

    if (
      (hasDefault && parseAfterDefault && !hasStar && !hasSpecifiers) ||
      (hasNamespace && parseAfterNamespace && !hasSpecifiers)
    ) {
      throw this.unexpected(null, tt.braceL);
    }

    let hasDeclaration;
    if (isFromRequired || hasSpecifiers) {
      hasDeclaration = false;
      if (decorators) {
        throw this.raise(Errors.UnsupportedDecoratorExport, { at: node });
      }
      this.parseExportFrom(
        node as Undone<N.ExportNamedDeclaration>,
        isFromRequired,
      );
    } else {
      hasDeclaration = this.maybeParseExportDeclaration(
        node as Undone<N.ExportNamedDeclaration>,
      );
    }

    if (isFromRequired || hasSpecifiers || hasDeclaration) {
      const node2 = node as Undone<N.ExportNamedDeclaration>;
      this.checkExport(node2, true, false, !!node2.source);
      if (node2.declaration?.type === "ClassDeclaration") {
        this.maybeTakeDecorators(decorators, node2.declaration, node2);
      } else if (decorators) {
        throw this.raise(Errors.UnsupportedDecoratorExport, { at: node });
      }
      return this.finishNode(node2, "ExportNamedDeclaration");
    }

    if (this.eat(tt._default)) {
      const node2 = node as Undone<N.ExportDefaultDeclaration>;
      // export default ...
      const decl = this.parseExportDefaultExpression();
      node2.declaration = decl;

      if (decl.type === "ClassDeclaration") {
        this.maybeTakeDecorators(decorators, decl as N.ClassDeclaration, node2);
      } else if (decorators) {
        throw this.raise(Errors.UnsupportedDecoratorExport, { at: node });
      }

      this.checkExport(node2, true, true);

      return this.finishNode(node2, "ExportDefaultDeclaration");
    }

    throw this.unexpected(null, tt.braceL);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  eatExportStar(node: N.Node): boolean {
    return this.eat(tt.star);
  }

  maybeParseExportDefaultSpecifier(node: N.Node): boolean {
    if (this.isExportDefaultSpecifier()) {
      // export defaultObj ...
      this.expectPlugin("exportDefaultFrom");
      const specifier = this.startNode();
      specifier.exported = this.parseIdentifier(true);
      node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];
      return true;
    }
    return false;
  }

  maybeParseExportNamespaceSpecifier(node: N.Node): boolean {
    if (this.isContextual(tt._as)) {
      if (!node.specifiers) node.specifiers = [];

      const specifier = this.startNodeAt(this.state.lastTokStartLoc);

      this.next();

      specifier.exported = this.parseModuleExportName();
      node.specifiers.push(
        this.finishNode(specifier, "ExportNamespaceSpecifier"),
      );
      return true;
    }
    return false;
  }

  maybeParseExportNamedSpecifiers(node: N.Node): boolean {
    if (this.match(tt.braceL)) {
      if (!node.specifiers) node.specifiers = [];
      const isTypeExport = node.exportKind === "type";
      node.specifiers.push(...this.parseExportSpecifiers(isTypeExport));

      node.source = null;
      node.declaration = null;
      if (this.hasPlugin("importAssertions")) {
        node.assertions = [];
      }

      return true;
    }
    return false;
  }

  maybeParseExportDeclaration(
    this: Parser,
    node: Undone<N.ExportNamedDeclaration>,
  ): boolean {
    if (this.shouldParseExportDeclaration()) {
      node.specifiers = [];
      node.source = null;
      if (this.hasPlugin("importAssertions")) {
        node.assertions = [];
      }
      node.declaration = this.parseExportDeclaration(node);
      return true;
    }
    return false;
  }

  isAsyncFunction(): boolean {
    if (!this.isContextual(tt._async)) return false;
    const next = this.nextTokenStart();
    return (
      !lineBreak.test(this.input.slice(this.state.pos, next)) &&
      this.isUnparsedContextual(next, "function")
    );
  }

  parseExportDefaultExpression(this: Parser): N.Expression | N.Declaration {
    const expr = this.startNode();

    const isAsync = this.isAsyncFunction();

    if (this.match(tt._function) || isAsync) {
      this.next();
      if (isAsync) {
        this.next();
      }

      return this.parseFunction(
        expr as Undone<N.FunctionExpression>,
        FUNC_STATEMENT | FUNC_NULLABLE_ID,
        isAsync,
      );
    }

    if (this.match(tt._class)) {
      return this.parseClass(expr as Undone<N.ClassExpression>, true, true);
    }

    if (this.match(tt.at)) {
      if (
        this.hasPlugin("decorators") &&
        this.getPluginOption("decorators", "decoratorsBeforeExport")
      ) {
        this.raise(Errors.DecoratorBeforeExport, { at: this.state.startLoc });
      }
      return this.parseClass(
        this.maybeTakeDecorators(
          this.parseDecorators(false),
          this.startNode<N.ClassDeclaration>(),
        ),
        true,
        true,
      );
    }

    if (this.match(tt._const) || this.match(tt._var) || this.isLet()) {
      throw this.raise(Errors.UnsupportedDefaultExport, {
        at: this.state.startLoc,
      });
    }

    const res = this.parseMaybeAssignAllowIn();
    this.semicolon();
    return res;
  }

  parseExportDeclaration(
    this: Parser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    node: Undone<N.ExportNamedDeclaration>,
  ): N.Declaration | undefined | null {
    if (this.match(tt._class)) {
      const node = this.parseClass(
        this.startNode<N.ClassDeclaration>(),
        true,
        false,
      );
      return node;
    }
    return this.parseStatement(null) as N.Declaration;
  }

  isExportDefaultSpecifier(): boolean {
    const { type } = this.state;
    if (tokenIsIdentifier(type)) {
      if ((type === tt._async && !this.state.containsEsc) || type === tt._let) {
        return false;
      }
      if (
        (type === tt._type || type === tt._interface) &&
        !this.state.containsEsc
      ) {
        const { type: nextType } = this.lookahead();
        // If we see any variable name other than `from` after `type` keyword,
        // we consider it as flow/typescript type exports
        // note that this approach may fail on some pedantic cases
        // export type from = number
        if (
          (tokenIsIdentifier(nextType) && nextType !== tt._from) ||
          nextType === tt.braceL
        ) {
          this.expectOnePlugin(["flow", "typescript"]);
          return false;
        }
      }
    } else if (!this.match(tt._default)) {
      return false;
    }

    const next = this.nextTokenStart();
    const hasFrom = this.isUnparsedContextual(next, "from");
    if (
      this.input.charCodeAt(next) === charCodes.comma ||
      (tokenIsIdentifier(this.state.type) && hasFrom)
    ) {
      return true;
    }
    // lookahead again when `export default from` is seen
    if (this.match(tt._default) && hasFrom) {
      const nextAfterFrom = this.input.charCodeAt(
        this.nextTokenStartSince(next + 4),
      );
      return (
        nextAfterFrom === charCodes.quotationMark ||
        nextAfterFrom === charCodes.apostrophe
      );
    }
    return false;
  }

  parseExportFrom(
    this: Parser,
    node: Undone<N.ExportNamedDeclaration>,
    expect?: boolean,
  ): void {
    if (this.eatContextual(tt._from)) {
      node.source = this.parseImportSource();
      this.checkExport(node);
      const assertions = this.maybeParseImportAssertions();
      if (assertions) {
        node.assertions = assertions;
        this.checkJSONModuleImport(node);
      }
    } else if (expect) {
      this.unexpected();
    }

    this.semicolon();
  }

  shouldParseExportDeclaration(): boolean {
    const { type } = this.state;
    if (type === tt.at) {
      this.expectOnePlugin(["decorators", "decorators-legacy"]);
      if (this.hasPlugin("decorators")) {
        if (this.getPluginOption("decorators", "decoratorsBeforeExport")) {
          throw this.raise(Errors.DecoratorBeforeExport, {
            at: this.state.startLoc,
          });
        }

        return true;
      }
    }

    return (
      type === tt._var ||
      type === tt._const ||
      type === tt._function ||
      type === tt._class ||
      this.isLet() ||
      this.isAsyncFunction()
    );
  }

  checkExport(
    node: Undone<N.ExportNamedDeclaration | N.ExportDefaultDeclaration>,
    checkNames?: boolean,
    isDefault?: boolean,
    isFrom?: boolean,
  ): void {
    if (checkNames) {
      // Check for duplicate exports
      if (isDefault) {
        // Default exports
        this.checkDuplicateExports(node, "default");
        if (this.hasPlugin("exportDefaultFrom")) {
          const declaration = (node as any as N.ExportDefaultDeclaration)
            .declaration;
          if (
            declaration.type === "Identifier" &&
            declaration.name === "from" &&
            declaration.end - declaration.start === 4 && // does not contain escape
            !declaration.extra?.parenthesized
          ) {
            this.raise(Errors.ExportDefaultFromAsIdentifier, {
              at: declaration,
            });
          }
        }
        // @ts-expect-error node.specifiers may not exist
      } else if (node.specifiers && node.specifiers.length) {
        // Named exports
        // @ts-expect-error node.specifiers may not exist
        for (const specifier of node.specifiers) {
          const { exported } = specifier;
          const exportName =
            exported.type === "Identifier" ? exported.name : exported.value;
          this.checkDuplicateExports(specifier, exportName);
          if (!isFrom && specifier.local) {
            const { local } = specifier;
            if (local.type !== "Identifier") {
              this.raise(Errors.ExportBindingIsString, {
                at: specifier,
                localName: local.value,
                exportName,
              });
            } else {
              // check for keywords used as local names
              this.checkReservedWord(local.name, local.loc.start, true, false);
              // check if export is defined
              this.scope.checkLocalExport(local);
            }
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

          this.checkDuplicateExports(node, id.name);
        } else if (node.declaration.type === "VariableDeclaration") {
          for (const declaration of node.declaration.declarations) {
            this.checkDeclaration(declaration.id);
          }
        }
      }
    }
  }

  checkDeclaration(node: N.Pattern | N.ObjectProperty): void {
    if (node.type === "Identifier") {
      this.checkDuplicateExports(node, node.name);
    } else if (node.type === "ObjectPattern") {
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
      // @ts-expect-error migrate to Babel types
      this.checkDeclaration(node.value);
    } else if (node.type === "RestElement") {
      this.checkDeclaration(node.argument);
    } else if (node.type === "AssignmentPattern") {
      this.checkDeclaration(node.left);
    }
  }

  checkDuplicateExports(
    node: Undone<
      | N.Identifier
      | N.StringLiteral
      | N.ExportNamedDeclaration
      | N.ExportSpecifier
      | N.ExportDefaultSpecifier
    >,
    exportName: string,
  ): void {
    if (this.exportedIdentifiers.has(exportName)) {
      if (exportName === "default") {
        this.raise(Errors.DuplicateDefaultExport, { at: node });
      } else {
        this.raise(Errors.DuplicateExport, { at: node, exportName });
      }
    }
    this.exportedIdentifiers.add(exportName);
  }

  // Parses a comma-separated list of module exports.

  parseExportSpecifiers(isInTypeExport: boolean): Array<N.ExportSpecifier> {
    const nodes = [];
    let first = true;

    // export { x, y as z } [from '...']
    this.expect(tt.braceL);

    while (!this.eat(tt.braceR)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
        if (this.eat(tt.braceR)) break;
      }
      const isMaybeTypeOnly = this.isContextual(tt._type);
      const isString = this.match(tt.string);
      const node = this.startNode();
      node.local = this.parseModuleExportName();
      nodes.push(
        this.parseExportSpecifier(
          node,
          isString,
          isInTypeExport,
          isMaybeTypeOnly,
        ),
      );
    }

    return nodes;
  }

  parseExportSpecifier(
    node: any,
    isString: boolean,
    /* eslint-disable @typescript-eslint/no-unused-vars -- used in TypeScript parser */
    isInTypeExport: boolean,
    isMaybeTypeOnly: boolean,
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): N.ExportSpecifier {
    if (this.eatContextual(tt._as)) {
      node.exported = this.parseModuleExportName();
    } else if (isString) {
      node.exported = cloneStringLiteral(node.local);
    } else if (!node.exported) {
      node.exported = cloneIdentifier(node.local);
    }
    return this.finishNode<N.ExportSpecifier>(node, "ExportSpecifier");
  }

  // https://tc39.es/ecma262/#prod-ModuleExportName
  parseModuleExportName(): N.StringLiteral | N.Identifier {
    if (this.match(tt.string)) {
      const result = this.parseStringLiteral(this.state.value);
      const surrogate = result.value.match(loneSurrogate);
      if (surrogate) {
        this.raise(Errors.ModuleExportNameHasLoneSurrogate, {
          at: result,
          surrogateCharCode: surrogate[0].charCodeAt(0),
        });
      }
      return result;
    }
    return this.parseIdentifier(true);
  }

  isJSONModuleImport(
    node: Undone<
      N.ExportAllDeclaration | N.ExportNamedDeclaration | N.ImportDeclaration
    >,
  ): boolean {
    if (node.assertions != null) {
      return node.assertions.some(({ key, value }) => {
        return (
          value.value === "json" &&
          (key.type === "Identifier"
            ? key.name === "type"
            : key.value === "type")
        );
      });
    }
    return false;
  }

  checkImportReflection(node: Undone<N.ImportDeclaration>) {
    if (node.module) {
      if (
        node.specifiers.length !== 1 ||
        node.specifiers[0].type !== "ImportDefaultSpecifier"
      ) {
        this.raise(Errors.ImportReflectionNotBinding, {
          at: node.specifiers[0].loc.start,
        });
      }
      if (node.assertions?.length > 0) {
        this.raise(Errors.ImportReflectionHasAssertion, {
          at: node.specifiers[0].loc.start,
        });
      }
    }
  }

  checkJSONModuleImport(
    node: Undone<
      N.ExportAllDeclaration | N.ExportNamedDeclaration | N.ImportDeclaration
    >,
  ) {
    // @ts-expect-error Fixme: node.type must be undefined because they are undone
    if (this.isJSONModuleImport(node) && node.type !== "ExportAllDeclaration") {
      // @ts-expect-error specifiers may not index node
      const { specifiers } = node;
      if (specifiers != null) {
        // @ts-expect-error refine specifier types
        const nonDefaultNamedSpecifier = specifiers.find(specifier => {
          let imported;
          if (specifier.type === "ExportSpecifier") {
            imported = specifier.local;
          } else if (specifier.type === "ImportSpecifier") {
            imported = specifier.imported;
          }
          if (imported !== undefined) {
            return imported.type === "Identifier"
              ? imported.name !== "default"
              : imported.value !== "default";
          }
        });
        if (nonDefaultNamedSpecifier !== undefined) {
          this.raise(Errors.ImportJSONBindingNotDefault, {
            at: nonDefaultNamedSpecifier.loc.start,
          });
        }
      }
    }
  }

  parseMaybeImportReflection(node: Undone<N.ImportDeclaration>) {
    let isImportReflection = false;
    if (this.isContextual(tt._module)) {
      const lookahead = this.lookahead();
      const nextType = lookahead.type;
      if (tokenIsIdentifier(nextType)) {
        if (nextType !== tt._from) {
          // import module x
          isImportReflection = true;
        } else {
          const nextNextTokenFirstChar = this.input.charCodeAt(
            this.nextTokenStartSince(lookahead.end),
          );
          if (nextNextTokenFirstChar === charCodes.lowercaseF) {
            // import module from from ...
            isImportReflection = true;
          }
        }
      } else if (nextType !== tt.comma) {
        // import module { x } ...
        // import module "foo"
        // They are invalid, we will continue parsing and throw
        // a recoverable error later
        isImportReflection = true;
      }
    }
    if (isImportReflection) {
      this.expectPlugin("importReflection");
      this.next(); // eat tt._module;
      node.module = true;
    } else if (this.hasPlugin("importReflection")) {
      node.module = false;
    }
  }

  // Parses import declaration.
  // https://tc39.es/ecma262/#prod-ImportDeclaration

  parseImport(this: Parser, node: Undone<N.ImportDeclaration>): N.AnyImport {
    // import '...'
    node.specifiers = [];
    if (!this.match(tt.string)) {
      this.parseMaybeImportReflection(node);
      // check if we have a default import like
      // import React from "react";
      const hasDefault = this.maybeParseDefaultImportSpecifier(node);
      /* we are checking if we do not have a default import, then it is obvious that we need named imports
       * import { get } from "axios";
       * but if we do have a default import
       * we need to check if we have a comma after that and
       * that is where this `|| this.eat` condition comes into play
       */
      const parseNext = !hasDefault || this.eat(tt.comma);
      // if we do have to parse the next set of specifiers, we first check for star imports
      // import React, * from "react";
      const hasStar = parseNext && this.maybeParseStarImportSpecifier(node);
      // now we check if we need to parse the next imports
      // but only if they are not importing * (everything)
      if (parseNext && !hasStar) this.parseNamedImportSpecifiers(node);
      this.expectContextual(tt._from);
    }
    node.source = this.parseImportSource();
    // https://github.com/tc39/proposal-import-assertions
    // parse module import assertions if the next token is `assert` or ignore
    // and finish the ImportDeclaration node.
    const assertions = this.maybeParseImportAssertions();
    if (assertions) {
      node.assertions = assertions;
    } else if (!process.env.BABEL_8_BREAKING) {
      const attributes = this.maybeParseModuleAttributes();
      if (attributes) {
        // @ts-expect-error attributes have been deprecated
        node.attributes = attributes;
      }
    }
    this.checkImportReflection(node);
    this.checkJSONModuleImport(node);

    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  }

  parseImportSource(this: Parser): N.StringLiteral {
    if (!this.match(tt.string)) this.unexpected();
    return this.parseExprAtom() as N.StringLiteral;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shouldParseDefaultImport(node: Undone<N.ImportDeclaration>): boolean {
    return tokenIsIdentifier(this.state.type);
  }

  parseImportSpecifierLocal<
    T extends
      | N.ImportSpecifier
      | N.ImportDefaultSpecifier
      | N.ImportNamespaceSpecifier,
  >(
    node: Undone<N.ImportDeclaration>,
    specifier: Undone<T>,
    type: T["type"],
  ): void {
    specifier.local = this.parseIdentifier();
    node.specifiers.push(this.finishImportSpecifier(specifier, type));
  }

  finishImportSpecifier<
    T extends
      | N.ImportSpecifier
      | N.ImportDefaultSpecifier
      | N.ImportNamespaceSpecifier,
  >(specifier: Undone<T>, type: T["type"], bindingType = BIND_LEXICAL) {
    this.checkLVal(specifier.local, {
      // @ts-expect-error refine types
      in: specifier,
      binding: bindingType,
    });
    return this.finishNode(specifier, type);
  }

  /**
   * parse assert entries
   *
   * @see {@link https://tc39.es/proposal-import-assertions/#prod-AssertEntries |AssertEntries}
   * @returns {N.ImportAttribute[]}
   * @memberof StatementParser
   */
  parseAssertEntries(): N.ImportAttribute[] {
    const attrs = [];
    const attrNames = new Set();

    do {
      if (this.match(tt.braceR)) {
        break;
      }

      const node = this.startNode<N.ImportAttribute>();

      // parse AssertionKey : IdentifierName, StringLiteral
      const keyName = this.state.value;
      // check if we already have an entry for an attribute
      // if a duplicate entry is found, throw an error
      // for now this logic will come into play only when someone declares `type` twice
      if (attrNames.has(keyName)) {
        this.raise(Errors.ModuleAttributesWithDuplicateKeys, {
          at: this.state.startLoc,
          key: keyName,
        });
      }
      attrNames.add(keyName);
      if (this.match(tt.string)) {
        node.key = this.parseStringLiteral(keyName);
      } else {
        node.key = this.parseIdentifier(true);
      }
      this.expect(tt.colon);

      if (!this.match(tt.string)) {
        throw this.raise(Errors.ModuleAttributeInvalidValue, {
          at: this.state.startLoc,
        });
      }
      node.value = this.parseStringLiteral(this.state.value);
      attrs.push(this.finishNode(node, "ImportAttribute"));
    } while (this.eat(tt.comma));

    return attrs;
  }

  /**
   * parse module attributes
   * @deprecated It will be removed in Babel 8
   * @returns
   * @memberof StatementParser
   */
  maybeParseModuleAttributes() {
    if (this.match(tt._with) && !this.hasPrecedingLineBreak()) {
      this.expectPlugin("moduleAttributes");
      this.next();
    } else {
      if (this.hasPlugin("moduleAttributes")) return [];
      return null;
    }
    const attrs = [];
    const attributes = new Set();
    do {
      const node = this.startNode();
      node.key = this.parseIdentifier(true);

      if (node.key.name !== "type") {
        this.raise(Errors.ModuleAttributeDifferentFromType, {
          at: node.key,
        });
      }

      if (attributes.has(node.key.name)) {
        this.raise(Errors.ModuleAttributesWithDuplicateKeys, {
          at: node.key,
          key: node.key.name,
        });
      }
      attributes.add(node.key.name);
      this.expect(tt.colon);
      if (!this.match(tt.string)) {
        throw this.raise(Errors.ModuleAttributeInvalidValue, {
          at: this.state.startLoc,
        });
      }
      node.value = this.parseStringLiteral(this.state.value);
      this.finishNode(node, "ImportAttribute");
      attrs.push(node);
    } while (this.eat(tt.comma));

    return attrs;
  }

  maybeParseImportAssertions() {
    // [no LineTerminator here] AssertClause
    if (this.isContextual(tt._assert) && !this.hasPrecedingLineBreak()) {
      this.expectPlugin("importAssertions");
      this.next(); // eat `assert`
    } else {
      if (this.hasPlugin("importAssertions")) return [];
      return null;
    }
    // https://tc39.es/proposal-import-assertions/#prod-AssertClause
    this.eat(tt.braceL);
    const attrs = this.parseAssertEntries();
    this.eat(tt.braceR);

    return attrs;
  }

  maybeParseDefaultImportSpecifier(node: Undone<N.ImportDeclaration>): boolean {
    if (this.shouldParseDefaultImport(node)) {
      // import defaultObj, { x, y as z } from '...'
      this.parseImportSpecifierLocal(
        node,
        this.startNode<N.ImportDefaultSpecifier>(),
        "ImportDefaultSpecifier",
      );
      return true;
    }
    return false;
  }

  maybeParseStarImportSpecifier(node: Undone<N.ImportDeclaration>): boolean {
    if (this.match(tt.star)) {
      const specifier = this.startNode<N.ImportNamespaceSpecifier>();
      this.next();
      this.expectContextual(tt._as);

      this.parseImportSpecifierLocal(
        node,
        specifier,
        "ImportNamespaceSpecifier",
      );
      return true;
    }
    return false;
  }

  parseNamedImportSpecifiers(node: Undone<N.ImportDeclaration>) {
    let first = true;
    this.expect(tt.braceL);
    while (!this.eat(tt.braceR)) {
      if (first) {
        first = false;
      } else {
        // Detect an attempt to deep destructure
        if (this.eat(tt.colon)) {
          throw this.raise(Errors.DestructureNamedImport, {
            at: this.state.startLoc,
          });
        }

        this.expect(tt.comma);
        if (this.eat(tt.braceR)) break;
      }

      const specifier = this.startNode<N.ImportSpecifier>();
      const importedIsString = this.match(tt.string);
      const isMaybeTypeOnly = this.isContextual(tt._type);
      specifier.imported = this.parseModuleExportName();
      const importSpecifier = this.parseImportSpecifier(
        specifier,
        importedIsString,
        node.importKind === "type" || node.importKind === "typeof",
        isMaybeTypeOnly,
        undefined,
      );
      node.specifiers.push(importSpecifier);
    }
  }

  // https://tc39.es/ecma262/#prod-ImportSpecifier
  parseImportSpecifier(
    specifier: Undone<N.ImportSpecifier>,
    importedIsString: boolean,
    /* eslint-disable @typescript-eslint/no-unused-vars -- used in TypeScript and Flow parser */
    isInTypeOnlyImport: boolean,
    isMaybeTypeOnly: boolean,
    bindingType: BindingTypes | undefined,
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): N.ImportSpecifier {
    if (this.eatContextual(tt._as)) {
      specifier.local = this.parseIdentifier();
    } else {
      const { imported } = specifier;
      if (importedIsString) {
        throw this.raise(Errors.ImportBindingIsString, {
          at: specifier,
          importName: (imported as N.StringLiteral).value,
        });
      }
      this.checkReservedWord(
        (imported as N.Identifier).name,
        specifier.loc.start,
        true,
        true,
      );
      if (!specifier.local) {
        specifier.local = cloneIdentifier(imported);
      }
    }
    return this.finishImportSpecifier(
      specifier,
      "ImportSpecifier",
      bindingType,
    );
  }

  // This is used in flow and typescript plugin
  // Determine whether a parameter is a this param
  isThisParam(
    param: N.Pattern | N.Identifier | N.TSParameterProperty,
  ): boolean {
    return param.type === "Identifier" && param.name === "this";
  }
}
