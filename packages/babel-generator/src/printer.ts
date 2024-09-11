import Buffer, { type Pos } from "./buffer.ts";
import type { Loc } from "./buffer.ts";
import * as n from "./node/index.ts";
import type * as t from "@babel/types";
import {
  isExpression,
  isFunction,
  isStatement,
  isClassBody,
  isTSInterfaceBody,
  isTSEnumDeclaration,
} from "@babel/types";
import type { Opts as jsescOptions } from "jsesc";

import type { GeneratorOptions } from "./index.ts";
import * as generatorFunctions from "./generators/index.ts";
import type SourceMap from "./source-map.ts";
import type { TraceMap } from "@jridgewell/trace-mapping";

// We inline this package
// eslint-disable-next-line import/no-extraneous-dependencies
import * as charCodes from "charcodes";

const SCIENTIFIC_NOTATION = /e/i;
const ZERO_DECIMAL_INTEGER = /\.0+$/;
const HAS_NEWLINE = /[\n\r\u2028\u2029]/;
const HAS_NEWLINE_OR_BlOCK_COMMENT_END = /[\n\r\u2028\u2029]|\*\//;

function commentIsNewline(c: t.Comment) {
  return c.type === "CommentLine" || HAS_NEWLINE.test(c.value);
}

const { needsParens } = n;

const enum COMMENT_TYPE {
  LEADING,
  INNER,
  TRAILING,
}

const enum COMMENT_SKIP_NEWLINE {
  DEFAULT,
  ALL,
  LEADING,
  TRAILING,
}

const enum PRINT_COMMENT_HINT {
  SKIP,
  ALLOW,
  DEFER,
}

export type Format = {
  shouldPrintComment: (comment: string) => boolean;
  retainLines: boolean;
  retainFunctionParens: boolean;
  comments: boolean;
  auxiliaryCommentBefore: string;
  auxiliaryCommentAfter: string;
  compact: boolean | "auto";
  minified: boolean;
  concise: boolean;
  indent: {
    adjustMultilineComment: boolean;
    style: string;
  };
  /**
   * @deprecated Removed in Babel 8, syntax type is always 'hash'
   */
  recordAndTupleSyntaxType?: GeneratorOptions["recordAndTupleSyntaxType"];
  jsescOption: jsescOptions;
  /**
   * @deprecated Removed in Babel 8, use `jsescOption` instead
   */
  jsonCompatibleStrings?: boolean;
  /**
   * For use with the Hack-style pipe operator.
   * Changes what token is used for pipe bodies’ topic references.
   */
  topicToken?: GeneratorOptions["topicToken"];
  /**
   * @deprecated Removed in Babel 8
   */
  decoratorsBeforeExport?: boolean;
  /**
   * The import attributes syntax style:
   * - "with"        : `import { a } from "b" with { type: "json" };`
   * - "assert"      : `import { a } from "b" assert { type: "json" };`
   * - "with-legacy" : `import { a } from "b" with type: "json";`
   */
  importAttributesKeyword?: "with" | "assert" | "with-legacy";
};

interface AddNewlinesOptions {
  addNewlines(leading: boolean, node: t.Node): number;
  nextNodeStartLine: number;
}

interface PrintSequenceOptions extends Partial<AddNewlinesOptions> {
  statement?: boolean;
  indent?: boolean;
  trailingCommentsLineOffset?: number;
}

interface PrintListOptions {
  separator?: (this: Printer) => void;
  iterator?: (node: t.Node, index: number) => void;
  statement?: boolean;
  indent?: boolean;
}

export type PrintJoinOptions = PrintListOptions & PrintSequenceOptions;
class Printer {
  constructor(format: Format, map: SourceMap) {
    this.format = format;

    this._indentRepeat = format.indent.style.length;

    this._inputMap = map?._inputMap;

    this._buf = new Buffer(map, format.indent.style[0]);
  }
  declare _inputMap: TraceMap;

  declare format: Format;

  inForStatementInit: boolean = false;
  enterForStatementInit() {
    if (this.inForStatementInit) return () => {};
    this.inForStatementInit = true;
    return () => {
      this.inForStatementInit = false;
    };
  }

  enterDelimited() {
    const oldInForStatementInit = this.inForStatementInit;
    const oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
    if (
      oldInForStatementInit === false &&
      oldNoLineTerminatorAfterNode === null
    ) {
      return () => {};
    }
    this.inForStatementInit = false;
    this._noLineTerminatorAfterNode = null;
    return () => {
      this.inForStatementInit = oldInForStatementInit;
      this._noLineTerminatorAfterNode = oldNoLineTerminatorAfterNode;
    };
  }

  tokenContext: number = 0;

  declare _buf: Buffer;
  _currentNode: t.Node = null;
  _indent: number = 0;
  _indentRepeat: number = 0;
  _insideAux: boolean = false;
  _noLineTerminator: boolean = false;
  _noLineTerminatorAfterNode: t.Node | null = null;
  _printAuxAfterOnNextUserNode: boolean = false;
  _printedComments = new Set<t.Comment>();
  _endsWithInteger = false;
  _endsWithWord = false;
  _endsWithDiv = false;
  _lastCommentLine = 0;
  _endsWithInnerRaw: boolean = false;
  _indentInnerComments: boolean = true;

  generate(ast: t.Node) {
    this.print(ast);
    this._maybeAddAuxComment();

    return this._buf.get();
  }

  /**
   * Increment indent size.
   */

  indent(): void {
    if (this.format.compact || this.format.concise) return;

    this._indent++;
  }

  /**
   * Decrement indent size.
   */

  dedent(): void {
    if (this.format.compact || this.format.concise) return;

    this._indent--;
  }

  /**
   * Add a semicolon to the buffer.
   */

  semicolon(force: boolean = false): void {
    this._maybeAddAuxComment();
    if (force) {
      this._appendChar(charCodes.semicolon);
    } else {
      this._queue(charCodes.semicolon);
    }
    this._noLineTerminator = false;
  }

  /**
   * Add a right brace to the buffer.
   */

  rightBrace(node: t.Node): void {
    if (this.format.minified) {
      this._buf.removeLastSemicolon();
    }
    this.sourceWithOffset("end", node.loc, -1);
    this.token("}");
  }

  rightParens(node: t.Node): void {
    this.sourceWithOffset("end", node.loc, -1);
    this.token(")");
  }

  /**
   * Add a space to the buffer unless it is compact.
   */

  space(force: boolean = false): void {
    if (this.format.compact) return;

    if (force) {
      this._space();
    } else if (this._buf.hasContent()) {
      const lastCp = this.getLastChar();
      if (lastCp !== charCodes.space && lastCp !== charCodes.lineFeed) {
        this._space();
      }
    }
  }

  /**
   * Writes a token that can't be safely parsed without taking whitespace into account.
   */

  word(str: string, noLineTerminatorAfter: boolean = false): void {
    this.tokenContext = 0;

    this._maybePrintInnerComments();

    // prevent concatenating words and creating // comment out of division and regex
    if (
      this._endsWithWord ||
      (this._endsWithDiv && str.charCodeAt(0) === charCodes.slash)
    ) {
      this._space();
    }

    this._maybeAddAuxComment();
    this._append(str, false);

    this._endsWithWord = true;
    this._noLineTerminator = noLineTerminatorAfter;
  }

  /**
   * Writes a number token so that we can validate if it is an integer.
   */

  number(str: string, number?: number): void {
    // const NON_DECIMAL_LITERAL = /^0[box]/;
    function isNonDecimalLiteral(str: string) {
      if (str.length > 2 && str.charCodeAt(0) === charCodes.digit0) {
        const secondChar = str.charCodeAt(1);
        return (
          secondChar === charCodes.lowercaseB ||
          secondChar === charCodes.lowercaseO ||
          secondChar === charCodes.lowercaseX
        );
      }
      return false;
    }
    this.word(str);

    // Integer tokens need special handling because they cannot have '.'s inserted
    // immediately after them.
    this._endsWithInteger =
      Number.isInteger(number) &&
      !isNonDecimalLiteral(str) &&
      !SCIENTIFIC_NOTATION.test(str) &&
      !ZERO_DECIMAL_INTEGER.test(str) &&
      str.charCodeAt(str.length - 1) !== charCodes.dot;
  }

  /**
   * Writes a simple token.
   */
  token(str: string, maybeNewline = false): void {
    this.tokenContext = 0;

    this._maybePrintInnerComments();

    const lastChar = this.getLastChar();
    const strFirst = str.charCodeAt(0);
    if (
      (lastChar === charCodes.exclamationMark &&
        // space is mandatory to avoid outputting <!--
        // http://javascript.spec.whatwg.org/#comment-syntax
        (str === "--" ||
          // Needs spaces to avoid changing a! == 0 to a!== 0
          strFirst === charCodes.equalsTo)) ||
      // Need spaces for operators of the same kind to avoid: `a+++b`
      (strFirst === charCodes.plusSign && lastChar === charCodes.plusSign) ||
      (strFirst === charCodes.dash && lastChar === charCodes.dash) ||
      // Needs spaces to avoid changing '34' to '34.', which would still be a valid number.
      (strFirst === charCodes.dot && this._endsWithInteger)
    ) {
      this._space();
    }

    this._maybeAddAuxComment();
    this._append(str, maybeNewline);
    this._noLineTerminator = false;
  }

  tokenChar(char: number): void {
    this.tokenContext = 0;

    this._maybePrintInnerComments();

    const lastChar = this.getLastChar();
    if (
      // Need spaces for operators of the same kind to avoid: `a+++b`
      (char === charCodes.plusSign && lastChar === charCodes.plusSign) ||
      (char === charCodes.dash && lastChar === charCodes.dash) ||
      // Needs spaces to avoid changing '34' to '34.', which would still be a valid number.
      (char === charCodes.dot && this._endsWithInteger)
    ) {
      this._space();
    }

    this._maybeAddAuxComment();
    this._appendChar(char);
    this._noLineTerminator = false;
  }

  /**
   * Add a newline (or many newlines), maintaining formatting.
   * This function checks the number of newlines in the queue and subtracts them.
   * It currently has some limitations.
   * @see {Buffer#getNewlineCount}
   */
  newline(i: number = 1, force?: boolean): void {
    if (i <= 0) return;

    if (!force) {
      if (this.format.retainLines || this.format.compact) return;

      if (this.format.concise) {
        this.space();
        return;
      }
    }

    if (i > 2) i = 2; // Max two lines

    i -= this._buf.getNewlineCount();

    for (let j = 0; j < i; j++) {
      this._newline();
    }

    return;
  }

  endsWith(char: number): boolean {
    return this.getLastChar() === char;
  }

  getLastChar(): number {
    return this._buf.getLastChar();
  }

  endsWithCharAndNewline(): number {
    return this._buf.endsWithCharAndNewline();
  }

  removeTrailingNewline(): void {
    this._buf.removeTrailingNewline();
  }

  exactSource(loc: Loc | undefined, cb: () => void) {
    if (!loc) {
      cb();
      return;
    }

    this._catchUp("start", loc);

    this._buf.exactSource(loc, cb);
  }

  source(prop: "start" | "end", loc: Loc | undefined): void {
    if (!loc) return;

    this._catchUp(prop, loc);

    this._buf.source(prop, loc);
  }

  sourceWithOffset(
    prop: "start" | "end",
    loc: Loc | undefined,
    columnOffset: number,
  ): void {
    if (!loc) return;

    this._catchUp(prop, loc);

    this._buf.sourceWithOffset(prop, loc, columnOffset);
  }

  sourceIdentifierName(identifierName: string, pos?: Pos): void {
    if (!this._buf._canMarkIdName) return;

    const sourcePosition = this._buf._sourcePosition;
    sourcePosition.identifierNamePos = pos;
    sourcePosition.identifierName = identifierName;
  }

  _space(): void {
    this._queue(charCodes.space);
  }

  _newline(): void {
    this._queue(charCodes.lineFeed);
  }

  _append(str: string, maybeNewline: boolean): void {
    this._maybeIndent(str.charCodeAt(0));

    this._buf.append(str, maybeNewline);

    // callers are expected to then set these to `true` when needed
    this._endsWithWord = false;
    this._endsWithInteger = false;
    this._endsWithDiv = false;
  }

  _appendChar(char: number): void {
    this._maybeIndent(char);

    this._buf.appendChar(char);

    // callers are expected to then set these to `true` when needed
    this._endsWithWord = false;
    this._endsWithInteger = false;
    this._endsWithDiv = false;
  }

  _queue(char: number) {
    this._maybeIndent(char);

    this._buf.queue(char);

    this._endsWithWord = false;
    this._endsWithInteger = false;
  }

  _maybeIndent(firstChar: number): void {
    // we've got a newline before us so prepend on the indentation
    if (
      this._indent &&
      firstChar !== charCodes.lineFeed &&
      this.endsWith(charCodes.lineFeed)
    ) {
      this._buf.queueIndentation(this._getIndent());
    }
  }

  _shouldIndent(firstChar: number) {
    // we've got a newline before us so prepend on the indentation
    if (
      this._indent &&
      firstChar !== charCodes.lineFeed &&
      this.endsWith(charCodes.lineFeed)
    ) {
      return true;
    }
  }

  catchUp(line: number) {
    if (!this.format.retainLines) return;

    // catch up to this nodes newline if we're behind
    const count = line - this._buf.getCurrentLine();

    for (let i = 0; i < count; i++) {
      this._newline();
    }
  }

  _catchUp(prop: "start" | "end", loc?: Loc) {
    if (!this.format.retainLines) return;

    // catch up to this nodes newline if we're behind
    const line = loc?.[prop]?.line;
    if (line != null) {
      const count = line - this._buf.getCurrentLine();

      for (let i = 0; i < count; i++) {
        this._newline();
      }
    }
  }

  /**
   * Get the current indent.
   */

  _getIndent(): number {
    return this._indentRepeat * this._indent;
  }

  printTerminatorless(node: t.Node) {
    /**
     * Set some state that will be modified if a newline has been inserted before any
     * non-space characters.
     *
     * This is to prevent breaking semantics for terminatorless separator nodes. eg:
     *
     *   return foo;
     *
     * returns `foo`. But if we do:
     *
     *   return
     *   foo;
     *
     *  `undefined` will be returned and not `foo` due to the terminator.
     */
    this._noLineTerminator = true;
    this.print(node);
  }

  print(
    node: t.Node | null,
    noLineTerminatorAfter?: boolean,
    // trailingCommentsLineOffset also used to check if called from printJoin
    // it will be ignored if `noLineTerminatorAfter||this._noLineTerminator`
    trailingCommentsLineOffset?: number,
  ) {
    if (!node) return;

    this._endsWithInnerRaw = false;

    const nodeType = node.type;
    const format = this.format;

    const oldConcise = format.concise;
    if (
      // @ts-expect-error document _compact AST properties
      node._compact
    ) {
      format.concise = true;
    }

    const printMethod =
      this[
        nodeType as Exclude<
          t.Node["type"],
          // removed
          | "Noop"
          // renamed
          | t.DeprecatedAliases["type"]
        >
      ];
    if (printMethod === undefined) {
      throw new ReferenceError(
        `unknown node of type ${JSON.stringify(
          nodeType,
        )} with constructor ${JSON.stringify(node.constructor.name)}`,
      );
    }

    const parent = this._currentNode;
    this._currentNode = node;

    const oldInAux = this._insideAux;
    this._insideAux = node.loc == null;
    this._maybeAddAuxComment(this._insideAux && !oldInAux);

    const parenthesized = node.extra?.parenthesized as boolean | undefined;
    let shouldPrintParens =
      (parenthesized &&
        format.retainFunctionParens &&
        nodeType === "FunctionExpression") ||
      needsParens(node, parent, this.tokenContext, this.inForStatementInit);

    if (
      !shouldPrintParens &&
      parenthesized &&
      node.leadingComments?.length &&
      node.leadingComments[0].type === "CommentBlock"
    ) {
      const parentType = parent?.type;
      switch (parentType) {
        case "ExpressionStatement":
        case "VariableDeclarator":
        case "AssignmentExpression":
        case "ReturnStatement":
          break;
        case "CallExpression":
        case "OptionalCallExpression":
        case "NewExpression":
          if (parent.callee !== node) break;
        // falls through
        default:
          shouldPrintParens = true;
      }
    }

    let indentParenthesized = false;
    if (
      !shouldPrintParens &&
      this._noLineTerminator &&
      (node.leadingComments?.some(commentIsNewline) ||
        (this.format.retainLines &&
          node.loc &&
          node.loc.start.line > this._buf.getCurrentLine()))
    ) {
      shouldPrintParens = true;
      indentParenthesized = true;
    }

    let oldNoLineTerminatorAfterNode;
    let oldInForStatementInitWasTrue;
    if (!shouldPrintParens) {
      noLineTerminatorAfter ||=
        parent &&
        this._noLineTerminatorAfterNode === parent &&
        n.isLastChild(parent, node);
      if (noLineTerminatorAfter) {
        if (node.trailingComments?.some(commentIsNewline)) {
          if (isExpression(node)) shouldPrintParens = true;
        } else {
          oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
          this._noLineTerminatorAfterNode = node;
        }
      }
    }

    if (shouldPrintParens) {
      this.token("(");
      if (indentParenthesized) this.indent();
      this._endsWithInnerRaw = false;
      if (this.inForStatementInit) {
        oldInForStatementInitWasTrue = true;
        this.inForStatementInit = false;
      }
      oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
      this._noLineTerminatorAfterNode = null;
    }

    this._lastCommentLine = 0;

    this._printLeadingComments(node, parent);

    const loc = nodeType === "Program" || nodeType === "File" ? null : node.loc;

    this.exactSource(
      loc,
      // @ts-expect-error Expected 1 arguments, but got 3.
      printMethod.bind(this, node, parent),
    );

    if (shouldPrintParens) {
      this._printTrailingComments(node, parent);
      if (indentParenthesized) {
        this.dedent();
        this.newline();
      }
      this.token(")");
      this._noLineTerminator = noLineTerminatorAfter;
      if (oldInForStatementInitWasTrue) this.inForStatementInit = true;
    } else if (noLineTerminatorAfter && !this._noLineTerminator) {
      this._noLineTerminator = true;
      this._printTrailingComments(node, parent);
    } else {
      this._printTrailingComments(node, parent, trailingCommentsLineOffset);
    }

    // end
    this._currentNode = parent;
    format.concise = oldConcise;
    this._insideAux = oldInAux;

    if (oldNoLineTerminatorAfterNode !== undefined) {
      this._noLineTerminatorAfterNode = oldNoLineTerminatorAfterNode;
    }

    this._endsWithInnerRaw = false;
  }

  _maybeAddAuxComment(enteredPositionlessNode?: boolean) {
    if (enteredPositionlessNode) this._printAuxBeforeComment();
    if (!this._insideAux) this._printAuxAfterComment();
  }

  _printAuxBeforeComment() {
    if (this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = true;

    const comment = this.format.auxiliaryCommentBefore;
    if (comment) {
      this._printComment(
        {
          type: "CommentBlock",
          value: comment,
        },
        COMMENT_SKIP_NEWLINE.DEFAULT,
      );
    }
  }

  _printAuxAfterComment() {
    if (!this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = false;

    const comment = this.format.auxiliaryCommentAfter;
    if (comment) {
      this._printComment(
        {
          type: "CommentBlock",
          value: comment,
        },
        COMMENT_SKIP_NEWLINE.DEFAULT,
      );
    }
  }

  getPossibleRaw(
    node:
      | t.StringLiteral
      | t.NumericLiteral
      | t.BigIntLiteral
      | t.DecimalLiteral
      | t.DirectiveLiteral
      | t.JSXText,
  ): string | undefined {
    const extra = node.extra;
    if (
      extra?.raw != null &&
      extra.rawValue != null &&
      node.value === extra.rawValue
    ) {
      // @ts-expect-error: The extra.raw of these AST node types must be a string
      return extra.raw;
    }
  }

  printJoin(
    nodes: Array<t.Node> | undefined | null,
    opts: PrintJoinOptions = {},
  ) {
    if (!nodes?.length) return;

    let { indent } = opts;

    if (indent == null && this.format.retainLines) {
      const startLine = nodes[0].loc?.start.line;
      if (startLine != null && startLine !== this._buf.getCurrentLine()) {
        indent = true;
      }
    }

    if (indent) this.indent();

    const newlineOpts: AddNewlinesOptions = {
      addNewlines: opts.addNewlines,
      nextNodeStartLine: 0,
    };

    const separator = opts.separator ? opts.separator.bind(this) : null;

    const len = nodes.length;
    for (let i = 0; i < len; i++) {
      const node = nodes[i];
      if (!node) continue;

      if (opts.statement) this._printNewline(i === 0, newlineOpts);

      this.print(node, undefined, opts.trailingCommentsLineOffset || 0);

      opts.iterator?.(node, i);

      if (i < len - 1) separator?.();

      if (opts.statement) {
        if (!node.trailingComments?.length) {
          this._lastCommentLine = 0;
        }

        if (i + 1 === len) {
          this.newline(1);
        } else {
          const nextNode = nodes[i + 1];
          newlineOpts.nextNodeStartLine = nextNode.loc?.start.line || 0;

          this._printNewline(true, newlineOpts);
        }
      }
    }

    if (indent) this.dedent();
  }

  printAndIndentOnComments(node: t.Node) {
    const indent = node.leadingComments && node.leadingComments.length > 0;
    if (indent) this.indent();
    this.print(node);
    if (indent) this.dedent();
  }

  printBlock(parent: Extract<t.Node, { body: t.Statement }>) {
    const node = parent.body;

    if (node.type !== "EmptyStatement") {
      this.space();
    }

    this.print(node);
  }

  _printTrailingComments(node: t.Node, parent?: t.Node, lineOffset?: number) {
    const { innerComments, trailingComments } = node;
    // We print inner comments here, so that if for some reason they couldn't
    // be printed in earlier locations they are still printed *somewhere*,
    // even if at the end of the node.
    if (innerComments?.length) {
      this._printComments(
        COMMENT_TYPE.TRAILING,
        innerComments,
        node,
        parent,
        lineOffset,
      );
    }
    if (trailingComments?.length) {
      this._printComments(
        COMMENT_TYPE.TRAILING,
        trailingComments,
        node,
        parent,
        lineOffset,
      );
    }
  }

  _printLeadingComments(node: t.Node, parent: t.Node) {
    const comments = node.leadingComments;
    if (!comments?.length) return;
    this._printComments(COMMENT_TYPE.LEADING, comments, node, parent);
  }

  _maybePrintInnerComments() {
    if (this._endsWithInnerRaw) this.printInnerComments();
    this._endsWithInnerRaw = true;
    this._indentInnerComments = true;
  }

  printInnerComments() {
    const node = this._currentNode;
    const comments = node.innerComments;
    if (!comments?.length) return;

    const hasSpace = this.endsWith(charCodes.space);
    const indent = this._indentInnerComments;
    const printedCommentsCount = this._printedComments.size;
    if (indent) this.indent();
    this._printComments(COMMENT_TYPE.INNER, comments, node);
    if (hasSpace && printedCommentsCount !== this._printedComments.size) {
      this.space();
    }
    if (indent) this.dedent();
  }

  noIndentInnerCommentsHere() {
    this._indentInnerComments = false;
  }

  printSequence(nodes: t.Node[], opts: PrintSequenceOptions = {}) {
    opts.statement = true;
    opts.indent ??= false;
    this.printJoin(nodes, opts);
  }

  printList(items: t.Node[], opts: PrintListOptions = {}) {
    if (opts.separator == null) {
      opts.separator = commaSeparator;
    }

    this.printJoin(items, opts);
  }

  _printNewline(newLine: boolean, opts: AddNewlinesOptions) {
    const format = this.format;

    // Fast path since 'this.newline' does nothing when not tracking lines.
    if (format.retainLines || format.compact) return;

    // Fast path for concise since 'this.newline' just inserts a space when
    // concise formatting is in use.
    if (format.concise) {
      this.space();
      return;
    }

    if (!newLine) {
      return;
    }

    const startLine = opts.nextNodeStartLine;
    const lastCommentLine = this._lastCommentLine;
    if (startLine > 0 && lastCommentLine > 0) {
      const offset = startLine - lastCommentLine;
      if (offset >= 0) {
        this.newline(offset || 1);
        return;
      }
    }

    // don't add newlines at the beginning of the file
    if (this._buf.hasContent()) {
      // Here is the logic of the original line wrapping according to the node layout, we are not using it now.
      // We currently add at most one newline to each node in the list, ignoring `opts.addNewlines`.

      // let lines = 0;
      // if (!leading) lines++; // always include at least a single line after
      // if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;

      // const needs = leading ? needsWhitespaceBefore : needsWhitespaceAfter;
      // if (needs(node, parent)) lines++;

      // this.newline(Math.min(2, lines));

      this.newline(1);
    }
  }

  // Returns `PRINT_COMMENT_HINT.DEFER` if the comment cannot be printed in this position due to
  // line terminators, signaling that the print comments loop can stop and
  // resume printing comments at the next possible position. This happens when
  // printing inner comments, since if we have an inner comment with a multiline
  // there is at least one inner position where line terminators are allowed.
  _shouldPrintComment(comment: t.Comment): PRINT_COMMENT_HINT {
    // Some plugins (such as flow-strip-types) use this to mark comments as removed using the AST-root 'comments' property,
    // where they can't manually mutate the AST node comment lists.
    if (comment.ignore) return PRINT_COMMENT_HINT.SKIP;

    if (this._printedComments.has(comment)) return PRINT_COMMENT_HINT.SKIP;

    if (
      this._noLineTerminator &&
      HAS_NEWLINE_OR_BlOCK_COMMENT_END.test(comment.value)
    ) {
      return PRINT_COMMENT_HINT.DEFER;
    }

    this._printedComments.add(comment);

    if (!this.format.shouldPrintComment(comment.value)) {
      return PRINT_COMMENT_HINT.SKIP;
    }

    return PRINT_COMMENT_HINT.ALLOW;
  }

  _printComment(comment: t.Comment, skipNewLines: COMMENT_SKIP_NEWLINE) {
    const noLineTerminator = this._noLineTerminator;
    const isBlockComment = comment.type === "CommentBlock";

    // Add a newline before and after a block comment, unless explicitly
    // disallowed
    const printNewLines =
      isBlockComment &&
      skipNewLines !== COMMENT_SKIP_NEWLINE.ALL &&
      !this._noLineTerminator;

    if (
      printNewLines &&
      this._buf.hasContent() &&
      skipNewLines !== COMMENT_SKIP_NEWLINE.LEADING
    ) {
      this.newline(1);
    }

    const lastCharCode = this.getLastChar();
    if (
      lastCharCode !== charCodes.leftSquareBracket &&
      lastCharCode !== charCodes.leftCurlyBrace &&
      lastCharCode !== charCodes.leftParenthesis
    ) {
      this.space();
    }

    let val;
    if (isBlockComment) {
      val = `/*${comment.value}*/`;
      if (this.format.indent.adjustMultilineComment) {
        const offset = comment.loc?.start.column;
        if (offset) {
          const newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
          val = val.replace(newlineRegex, "\n");
        }
        if (this.format.concise) {
          val = val.replace(/\n(?!$)/g, `\n`);
        } else {
          let indentSize = this.format.retainLines
            ? 0
            : this._buf.getCurrentColumn();

          if (this._shouldIndent(charCodes.slash) || this.format.retainLines) {
            indentSize += this._getIndent();
          }

          val = val.replace(/\n(?!$)/g, `\n${" ".repeat(indentSize)}`);
        }
      }
    } else if (!noLineTerminator) {
      val = `//${comment.value}`;
    } else {
      // It was a single-line comment, so it's guaranteed to not
      // contain newlines and it can be safely printed as a block
      // comment.
      val = `/*${comment.value}*/`;
    }

    // Avoid converting a / operator into a line comment by appending /* to it
    if (this._endsWithDiv) this._space();

    this.source("start", comment.loc);
    this._append(val, isBlockComment);

    if (!isBlockComment && !noLineTerminator) {
      this.newline(1, true);
    }

    if (printNewLines && skipNewLines !== COMMENT_SKIP_NEWLINE.TRAILING) {
      this.newline(1);
    }
  }

  _printComments(
    type: COMMENT_TYPE,
    comments: readonly t.Comment[],
    node: t.Node,
    parent?: t.Node,
    lineOffset: number = 0,
  ) {
    const nodeLoc = node.loc;
    const len = comments.length;
    let hasLoc = !!nodeLoc;
    const nodeStartLine = hasLoc ? nodeLoc.start.line : 0;
    const nodeEndLine = hasLoc ? nodeLoc.end.line : 0;
    let lastLine = 0;
    let leadingCommentNewline = 0;

    const maybeNewline = this._noLineTerminator
      ? function () {}
      : this.newline.bind(this);

    for (let i = 0; i < len; i++) {
      const comment = comments[i];

      const shouldPrint = this._shouldPrintComment(comment);
      if (shouldPrint === PRINT_COMMENT_HINT.DEFER) {
        hasLoc = false;
        break;
      }
      if (hasLoc && comment.loc && shouldPrint === PRINT_COMMENT_HINT.ALLOW) {
        const commentStartLine = comment.loc.start.line;
        const commentEndLine = comment.loc.end.line;
        if (type === COMMENT_TYPE.LEADING) {
          let offset = 0;
          if (i === 0) {
            // Because currently we cannot handle blank lines before leading comments,
            // we always wrap before and after multi-line comments.
            if (
              this._buf.hasContent() &&
              (comment.type === "CommentLine" ||
                commentStartLine !== commentEndLine)
            ) {
              offset = leadingCommentNewline = 1;
            }
          } else {
            offset = commentStartLine - lastLine;
          }
          lastLine = commentEndLine;

          maybeNewline(offset);
          this._printComment(comment, COMMENT_SKIP_NEWLINE.ALL);

          if (i + 1 === len) {
            maybeNewline(
              Math.max(nodeStartLine - lastLine, leadingCommentNewline),
            );
            lastLine = nodeStartLine;
          }
        } else if (type === COMMENT_TYPE.INNER) {
          const offset =
            commentStartLine - (i === 0 ? nodeStartLine : lastLine);
          lastLine = commentEndLine;

          maybeNewline(offset);
          this._printComment(comment, COMMENT_SKIP_NEWLINE.ALL);

          if (i + 1 === len) {
            maybeNewline(Math.min(1, nodeEndLine - lastLine)); // TODO: Improve here when inner comments processing is stronger
            lastLine = nodeEndLine;
          }
        } else {
          const offset =
            commentStartLine - (i === 0 ? nodeEndLine - lineOffset : lastLine);
          lastLine = commentEndLine;

          maybeNewline(offset);
          this._printComment(comment, COMMENT_SKIP_NEWLINE.ALL);
        }
      } else {
        hasLoc = false;
        if (shouldPrint !== PRINT_COMMENT_HINT.ALLOW) {
          continue;
        }

        if (len === 1) {
          const singleLine = comment.loc
            ? comment.loc.start.line === comment.loc.end.line
            : !HAS_NEWLINE.test(comment.value);

          const shouldSkipNewline =
            singleLine &&
            !isStatement(node) &&
            !isClassBody(parent) &&
            !isTSInterfaceBody(parent) &&
            !isTSEnumDeclaration(parent);

          if (type === COMMENT_TYPE.LEADING) {
            this._printComment(
              comment,
              (shouldSkipNewline && node.type !== "ObjectExpression") ||
                (singleLine && isFunction(parent, { body: node }))
                ? COMMENT_SKIP_NEWLINE.ALL
                : COMMENT_SKIP_NEWLINE.DEFAULT,
            );
          } else if (shouldSkipNewline && type === COMMENT_TYPE.TRAILING) {
            this._printComment(comment, COMMENT_SKIP_NEWLINE.ALL);
          } else {
            this._printComment(comment, COMMENT_SKIP_NEWLINE.DEFAULT);
          }
        } else if (
          type === COMMENT_TYPE.INNER &&
          !(node.type === "ObjectExpression" && node.properties.length > 1) &&
          node.type !== "ClassBody" &&
          node.type !== "TSInterfaceBody"
        ) {
          // class X {
          //   /*:: a: number*/
          //   /*:: b: ?string*/
          // }

          this._printComment(
            comment,
            i === 0
              ? COMMENT_SKIP_NEWLINE.LEADING
              : i === len - 1
                ? COMMENT_SKIP_NEWLINE.TRAILING
                : COMMENT_SKIP_NEWLINE.DEFAULT,
          );
        } else {
          this._printComment(comment, COMMENT_SKIP_NEWLINE.DEFAULT);
        }
      }
    }

    if (type === COMMENT_TYPE.TRAILING && hasLoc && lastLine) {
      this._lastCommentLine = lastLine;
    }
  }
}

// Expose the node type functions and helpers on the prototype for easy usage.
Object.assign(Printer.prototype, generatorFunctions);

if (!process.env.BABEL_8_BREAKING) {
  // @ts-ignore(Babel 7 vs Babel 8) Babel 7 has Noop print method
  Printer.prototype.Noop = function Noop(this: Printer) {};
}

type GeneratorFunctions = typeof generatorFunctions;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Printer extends GeneratorFunctions {}
export default Printer;

function commaSeparator(this: Printer) {
  this.token(",");
  this.space();
}
