/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import Buffer from "./buffer.ts";
import type { Loc, Pos } from "./buffer.ts";
import { isLastChild, parentNeedsParens } from "./node/index.ts";
import { generatorInfosMap } from "./nodes.ts";
import type * as t from "@babel/types";
import {
  isExpression,
  isFunction,
  isStatement,
  isClassBody,
  isTSInterfaceBody,
  isTSEnumMember,
} from "@babel/types";
import type { Opts as jsescOptions } from "jsesc";

import { TokenMap } from "./token-map.ts";

import type { GeneratorOptions } from "./index.ts";
import type SourceMap from "./source-map.ts";
import type { TraceMap } from "@jridgewell/trace-mapping";
import type { Token } from "@babel/parser";

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

import { TokenContext } from "./node/index.ts";
import { _getRawIdentifier } from "./generators/types.ts";

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

const enum PRINTER_FLAGS {
  EMPTY = 0,
  PRESERVE_FORMAT = 1 << 0,
  COMPACT = 1 << 1,
  CONCISE = 1 << 2,
  RETAIN_LINES = 1 << 3,
  RETAIN_FUNCTION_PARENS = 1 << 4,
  AUX_COMMENTS = 1 << 5,
}

const enum LAST_CHAR_KINDS {
  EMPTY = 0,
  NORMAL = -1,
  INTEGER = -2,
  WORD = -3,
}

const enum INNER_COMMENTS_STATE {
  DISALLOWED = 0,
  ALLOWED = 1,
  PRINTED = 2,

  WITH_INDENT = 4,
  MASK = 3,
}

const enum PRINT_COMMENTS_RESULT {
  PRINTED_NONE = 0,
  PRINTED_SOME = 1,
  PRINTED_ALL = 2,
}

export type Format = {
  shouldPrintComment: (comment: string) => boolean;
  preserveFormat: boolean | undefined;
  retainLines: boolean | undefined;
  retainFunctionParens: boolean | undefined;
  comments: boolean | undefined;
  auxiliaryCommentBefore: string | undefined;
  auxiliaryCommentAfter: string | undefined;
  compact: boolean | "auto" | undefined;
  minified: boolean | undefined;
  concise: boolean | undefined;
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
   * @deprecated Removed in Babel 8.
   */
  importAttributesKeyword?: "with" | "assert" | "with-legacy";
};

interface PrintSequenceOptions {
  statement?: boolean;
  indent?: boolean;
  trailingCommentsLineOffset?: number;
}

interface PrintListOptions {
  separator?: (this: Printer, occurrenceCount: number, last: boolean) => void;
  statement?: boolean;
  indent?: boolean;
  printTrailingSeparator?: boolean;
}

export type PrintJoinOptions = PrintListOptions & PrintSequenceOptions;
class Printer {
  constructor(
    format: Format,
    map: SourceMap | null,
    tokens: Token[] | null = null,
    originalCode: string | null = null,
  ) {
    this.format = format;

    this._tokens = tokens;
    this._originalCode = originalCode;

    this._indentRepeat = format.indent.style.length;

    this._inputMap = map?._inputMap || null;

    this._buf = new Buffer(map, format.indent.style[0]);

    const {
      preserveFormat,
      compact,
      concise,
      retainLines,
      retainFunctionParens,
    } = format;
    if (preserveFormat) {
      this._flags |= PRINTER_FLAGS.PRESERVE_FORMAT;
    }
    if (compact) {
      this._flags |= PRINTER_FLAGS.COMPACT;
    }
    if (concise) {
      this._flags |= PRINTER_FLAGS.CONCISE;
    }
    if (retainLines) {
      this._flags |= PRINTER_FLAGS.RETAIN_LINES;
    }
    if (retainFunctionParens) {
      this._flags |= PRINTER_FLAGS.RETAIN_FUNCTION_PARENS;
    }
    if (format.auxiliaryCommentBefore || format.auxiliaryCommentAfter) {
      this._flags |= PRINTER_FLAGS.AUX_COMMENTS;
    }
  }
  declare _inputMap: TraceMap | null;

  declare format: Format;

  enterDelimited() {
    const oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
    if (oldNoLineTerminatorAfterNode !== null) {
      this._noLineTerminatorAfterNode = null;
    }
    return oldNoLineTerminatorAfterNode;
  }

  tokenContext: number = TokenContext.normal;

  _tokens: Token[] | null = null;
  _originalCode: string | null = null;

  declare _buf: Buffer;
  _currentNode: t.Node | null = null;
  _currentTypeId: number | null = null;
  _indent: number = 0;
  _indentRepeat: number = 0;
  _insideAux: boolean = false;
  _noLineTerminator: boolean = false;
  _noLineTerminatorAfterNode: t.Node | null = null;
  _printAuxAfterOnNextUserNode: boolean = false;
  _printedComments = new Set<t.Comment>();
  _lastCommentLine = 0;
  _innerCommentsState = INNER_COMMENTS_STATE.DISALLOWED;
  _flags = PRINTER_FLAGS.EMPTY;

  tokenMap: TokenMap | null = null;

  _boundGetRawIdentifier: ((node: t.Identifier) => string) | null = null;

  generate(ast: t.Node) {
    if (this.format.preserveFormat) {
      this.tokenMap = new TokenMap(ast, this._tokens!, this._originalCode!);
      this._boundGetRawIdentifier = _getRawIdentifier.bind(this);
    }
    this.print(ast);
    this._maybeAddAuxComment();

    return this._buf.get();
  }

  /**
   * Increment indent size.
   */

  indent(flags = this._flags): void {
    if (
      flags &
      (PRINTER_FLAGS.PRESERVE_FORMAT |
        PRINTER_FLAGS.COMPACT |
        PRINTER_FLAGS.CONCISE)
    ) {
      return;
    }

    this._indent += this._indentRepeat;
  }

  /**
   * Decrement indent size.
   */

  dedent(flags = this._flags): void {
    if (
      flags &
      (PRINTER_FLAGS.PRESERVE_FORMAT |
        PRINTER_FLAGS.COMPACT |
        PRINTER_FLAGS.CONCISE)
    ) {
      return;
    }

    this._indent -= this._indentRepeat;
  }

  /**
   * If the next token is on the same line, we must first print a semicolon.
   * This option is only used in `preserveFormat` node, for semicolons that
   * might have omitted due to them being absent in the original code (thanks
   * to ASI).
   *
   * We need both *NextToken and *NextNode because we only want to insert the
   * semicolon when the next token starts a new node, and not in cases like
   * foo} (where } is not starting a new node). So we first set *NextNode, and
   * then the print() method will move it to *NextToken.
   */
  _printSemicolonBeforeNextNode: number = -1;
  _printSemicolonBeforeNextToken: number = -1;

  /**
   * Add a semicolon to the buffer.
   */
  semicolon(force: boolean = false): void {
    const flags = this._flags;
    if (flags & PRINTER_FLAGS.AUX_COMMENTS) {
      this._maybeAddAuxComment();
    }
    if (flags & PRINTER_FLAGS.PRESERVE_FORMAT) {
      const node = this._currentNode!;
      if (node.start != null && node.end != null) {
        if (!this.tokenMap!.endMatches(node, ";")) {
          // no semicolon
          this._printSemicolonBeforeNextNode = this._buf.getCurrentLine();
          return;
        }
        const indexes = this.tokenMap!.getIndexes(this._currentNode!)!;
        this._catchUpTo(this._tokens![indexes[indexes.length - 1]].loc.start);
      }
    }
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
    if (this._flags & (PRINTER_FLAGS.PRESERVE_FORMAT | PRINTER_FLAGS.COMPACT)) {
      return;
    }

    if (force) {
      this._space();
    } else {
      const lastCp = this.getLastChar(true);
      if (
        lastCp !== 0 &&
        lastCp !== charCodes.space &&
        lastCp !== charCodes.lineFeed
      ) {
        this._space();
      }
    }
  }

  /**
   * Writes a token that can't be safely parsed without taking whitespace into account.
   */

  word(str: string, noLineTerminatorAfter: boolean = false): void {
    this.tokenContext &= TokenContext.forInOrInitHeadAccumulatePassThroughMask;

    this._maybePrintInnerComments(str);

    const flags = this._flags;
    if (flags & PRINTER_FLAGS.AUX_COMMENTS) {
      this._maybeAddAuxComment();
    }

    if (flags & PRINTER_FLAGS.PRESERVE_FORMAT) this._catchUpToCurrentToken(str);

    const lastChar = this.getLastChar();

    if (
      lastChar === LAST_CHAR_KINDS.INTEGER ||
      lastChar === LAST_CHAR_KINDS.WORD ||
      // prevent concatenating words and creating // comment out of division and regex
      (lastChar === charCodes.slash && str.charCodeAt(0) === charCodes.slash)
    ) {
      this._space();
    }
    this._append(str, false);

    this.setLastChar(-3);
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

    // Integer tokens need special handling because they cannot have '.'s inserted immediately after them.
    if (
      Number.isInteger(number) &&
      !isNonDecimalLiteral(str) &&
      !SCIENTIFIC_NOTATION.test(str) &&
      !ZERO_DECIMAL_INTEGER.test(str) &&
      str.charCodeAt(str.length - 1) !== charCodes.dot
    ) {
      this.setLastChar(LAST_CHAR_KINDS.INTEGER);
    }
  }

  /**
   * Writes a simple token.
   *
   * @param {string} str The string to append.
   * @param {boolean} [maybeNewline=false] Wether `str` might potentially
   *    contain a line terminator or not.
   * @param {number} [occurrenceCount=0] The occurrence count of this token in
   *    the current node. This is used when printing in `preserveFormat` mode,
   *    to know which token we should map to (for example, to disambiguate the
   *    commas in an array literal).
   */
  token(
    str: string,
    maybeNewline = false,
    occurrenceCount = 0,
    mayNeedSpace: boolean = false,
  ): void {
    this.tokenContext &= TokenContext.forInOrInitHeadAccumulatePassThroughMask;

    this._maybePrintInnerComments(str, occurrenceCount);

    const flags = this._flags;

    if (flags & PRINTER_FLAGS.AUX_COMMENTS) {
      this._maybeAddAuxComment();
    }

    if (flags & PRINTER_FLAGS.PRESERVE_FORMAT) {
      this._catchUpToCurrentToken(str, occurrenceCount);
    }

    if (mayNeedSpace) {
      const strFirst = str.charCodeAt(0);
      if (
        // space is mandatory to avoid outputting <!--
        // http://javascript.spec.whatwg.org/#comment-syntax
        (((strFirst === charCodes.dash && str === "--") ||
          // Needs spaces to avoid changing a! == 0 to a!== 0
          strFirst === charCodes.equalsTo) &&
          this.getLastChar() === charCodes.exclamationMark) ||
        // Need spaces for operators of the same kind to avoid: `a+++b`
        (strFirst === charCodes.plusSign &&
          this.getLastChar() === charCodes.plusSign) ||
        (strFirst === charCodes.dash &&
          this.getLastChar() === charCodes.dash) ||
        // Needs spaces to avoid changing '34' to '34.', which would still be a valid number.
        (strFirst === charCodes.dot &&
          this.getLastChar() === LAST_CHAR_KINDS.INTEGER)
      ) {
        this._space();
      }
    }
    this._append(str, maybeNewline);
    this._noLineTerminator = false;
  }

  tokenChar(char: number, occurrenceCount = 0): void {
    this.tokenContext &= TokenContext.forInOrInitHeadAccumulatePassThroughMask;

    this._maybePrintInnerComments(char, occurrenceCount);

    const flags = this._flags;

    if (flags & PRINTER_FLAGS.AUX_COMMENTS) {
      this._maybeAddAuxComment();
    }

    if (flags & PRINTER_FLAGS.PRESERVE_FORMAT) {
      this._catchUpToCurrentToken(char, occurrenceCount);
    }

    if (
      // Need spaces for operators of the same kind to avoid: `a+++b`
      (char === charCodes.plusSign &&
        this.getLastChar() === charCodes.plusSign) ||
      (char === charCodes.dash && this.getLastChar() === charCodes.dash) ||
      // Needs spaces to avoid changing '34' to '34.', which would still be a valid number.
      (char === charCodes.dot && this.getLastChar() === LAST_CHAR_KINDS.INTEGER)
    ) {
      this._space();
    }
    this._appendChar(char);
    this._noLineTerminator = false;
  }

  /**
   * Add a newline (or many newlines), maintaining formatting.
   * This function checks the number of newlines in the queue and subtracts them.
   * It currently has some limitations.
   * @see {Buffer#getNewlineCount}
   */
  newline(i: number = 1, flags = this._flags): void {
    if (i <= 0) return;

    if (flags & (PRINTER_FLAGS.RETAIN_LINES | PRINTER_FLAGS.COMPACT)) {
      return;
    }

    if (flags & PRINTER_FLAGS.CONCISE) {
      this.space();
      return;
    }

    if (i > 2) i = 2; // Max two lines

    i -= this._buf.getNewlineCount();

    for (let j = 0; j < i; j++) {
      this._newline();
    }
  }

  endsWith(char: number): boolean {
    return this.getLastChar(true) === char;
  }

  getLastChar(checkQueue?: boolean): number {
    return this._buf.getLastChar(checkQueue);
  }

  setLastChar(char: number) {
    this._buf._last = char;
  }

  exactSource(loc: Loc | null | undefined, cb: () => void) {
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
    loc: Loc | null | undefined,
    columnOffset: number,
  ): void {
    if (!loc || this.format.preserveFormat) return;

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
    // Drop trailing spaces when a newline is inserted.
    if (this._buf._queuedChar === charCodes.space) this._buf._queuedChar = 0;

    this._appendChar(charCodes.lineFeed, true);
  }

  _catchUpToCurrentToken(
    str: string | number,
    occurrenceCount: number = 0,
  ): void {
    // Assert: this.tokenMap

    const token = this.tokenMap!.findMatching(
      this._currentNode!,
      str,
      occurrenceCount,
    );
    if (token) this._catchUpTo(token.loc.start);

    if (
      this._printSemicolonBeforeNextToken !== -1 &&
      this._printSemicolonBeforeNextToken === this._buf.getCurrentLine()
    ) {
      this._appendChar(charCodes.semicolon, true);
    }
    this._printSemicolonBeforeNextToken = -1;
    this._printSemicolonBeforeNextNode = -1;
  }

  _append(str: string, maybeNewline: boolean): void {
    this._maybeIndent();

    this._buf.append(str, maybeNewline);
  }

  _appendChar(char: number, noIndent?: boolean): void {
    if (!noIndent) {
      this._maybeIndent();
    }

    this._buf.appendChar(char);
  }

  _queue(char: typeof charCodes.space | typeof charCodes.semicolon): void {
    this._buf.queue(char);

    this.setLastChar(-1);
  }

  _maybeIndent(): void {
    const indent = this._shouldIndent();
    if (indent > 0) {
      this._buf._appendChar(-1, indent, false);
    }
  }

  _shouldIndent() {
    // we've got a newline before us so prepend on the indentation
    return this.endsWith(charCodes.lineFeed) ? this._indent : 0;
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
    const flags = this._flags;
    if ((flags & PRINTER_FLAGS.PRESERVE_FORMAT) === 0) {
      if (flags & PRINTER_FLAGS.RETAIN_LINES && loc?.[prop]) {
        this.catchUp(loc[prop].line);
      }
      return;
    }

    // catch up to this nodes newline if we're behind
    const pos = loc?.[prop];
    if (pos != null) this._catchUpTo(pos);
  }

  _catchUpTo({ line, column, index }: Pos) {
    const count = line - this._buf.getCurrentLine();
    if (count > 0 && this._noLineTerminator) {
      // We cannot inject new lines when _noLineTemrinator is set
      // to `true`, or we would generate invalid code.
      return;
    }

    for (let i = 0; i < count; i++) {
      this._newline();
    }

    const spacesCount =
      count > 0 ? column : column - this._buf.getCurrentColumn();
    if (spacesCount > 0) {
      const spaces = this._originalCode
        ? this._originalCode
            .slice(index - spacesCount, index)
            // https://tc39.es/ecma262/#sec-white-space
            .replace(/[^\t\v\f\uFEFF\p{Space_Separator}]/gu, " ")
        : " ".repeat(spacesCount);
      this._append(spaces, false);
      this.setLastChar(charCodes.space);
    }
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
    node: t.Node | null | undefined,
    noLineTerminatorAfter: boolean = false,
    resetTokenContext: boolean = false,
    // trailingCommentsLineOffset also used to check if called from printJoin
    // it will be ignored if `noLineTerminatorAfter||this._noLineTerminator`
    trailingCommentsLineOffset?: number,
  ) {
    if (!node) return;

    this._innerCommentsState = INNER_COMMENTS_STATE.DISALLOWED;

    const { type, loc, extra } = node;

    const flags = this._flags;
    let changedFlags = false;
    if (
      // @ts-expect-error document _compact AST properties
      node._compact
    ) {
      this._flags |= PRINTER_FLAGS.CONCISE;
      changedFlags = true;
    }

    const nodeInfo = generatorInfosMap.get(type);
    if (nodeInfo === undefined) {
      throw new ReferenceError(
        `unknown node of type ${JSON.stringify(
          type,
        )} with constructor ${JSON.stringify(node.constructor.name)}`,
      );
    }

    const [printMethod, nodeId, needsParens] = nodeInfo;

    const parent = this._currentNode;
    const parentId = this._currentTypeId;
    this._currentNode = node;
    this._currentTypeId = nodeId;

    if (flags & PRINTER_FLAGS.PRESERVE_FORMAT) {
      this._printSemicolonBeforeNextToken = this._printSemicolonBeforeNextNode;
    }

    let oldInAux;
    if (flags & PRINTER_FLAGS.AUX_COMMENTS) {
      oldInAux = this._insideAux;
      this._insideAux = loc == null;
      this._maybeAddAuxComment(this._insideAux && !oldInAux);
    }

    let oldTokenContext = 0;
    if (resetTokenContext) {
      oldTokenContext = this.tokenContext;
      if (oldTokenContext & TokenContext.forInOrInitHeadAccumulate) {
        this.tokenContext = 0;
      } else {
        oldTokenContext = 0;
      }
    }

    const parenthesized =
      extra != null && (extra.parenthesized as boolean | undefined);
    let shouldPrintParens =
      (parenthesized && flags & PRINTER_FLAGS.PRESERVE_FORMAT) ||
      (parenthesized &&
        flags & PRINTER_FLAGS.RETAIN_FUNCTION_PARENS &&
        nodeId === __node("FunctionExpression")) ||
      (parent &&
        (parentNeedsParens(node, parent, parentId!) ||
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          (needsParens != null &&
            needsParens(
              node,
              parent,
              parentId!,
              this.tokenContext,
              flags & PRINTER_FLAGS.PRESERVE_FORMAT
                ? this._boundGetRawIdentifier!
                : undefined,
            ))));

    if (
      !shouldPrintParens &&
      parenthesized &&
      node.leadingComments?.length &&
      node.leadingComments[0].type === "CommentBlock"
    ) {
      switch (parentId) {
        case __node("ExpressionStatement"):
        case __node("VariableDeclarator"):
        case __node("AssignmentExpression"):
        case __node("ReturnStatement"):
          break;
        case __node("CallExpression"):
        case __node("OptionalCallExpression"):
        case __node("NewExpression"):
          // @ts-expect-error checked by parentTypeId
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
        (flags & PRINTER_FLAGS.RETAIN_LINES &&
          loc &&
          loc.start.line > this._buf.getCurrentLine()))
    ) {
      shouldPrintParens = true;
      indentParenthesized = true;
    }

    let oldNoLineTerminatorAfterNode;
    if (!shouldPrintParens) {
      noLineTerminatorAfter ||=
        !!parent &&
        this._noLineTerminatorAfterNode === parent &&
        isLastChild(parent, node);
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
      this._innerCommentsState = INNER_COMMENTS_STATE.DISALLOWED;
      if (!resetTokenContext) {
        oldTokenContext = this.tokenContext;
      }
      if (oldTokenContext & TokenContext.forInOrInitHeadAccumulate) {
        this.tokenContext = 0;
      }
      oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
      this._noLineTerminatorAfterNode = null;
    }

    this._printLeadingComments(node, parent);

    this.exactSource(
      nodeId === __node("Program") || nodeId === __node("File") ? null : loc,
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
    } else if (noLineTerminatorAfter && !this._noLineTerminator) {
      this._noLineTerminator = true;
      this._printTrailingComments(node, parent);
    } else {
      this._printTrailingComments(node, parent, trailingCommentsLineOffset);
    }
    if (oldTokenContext) this.tokenContext = oldTokenContext;

    // end
    this._currentNode = parent;
    this._currentTypeId = parentId;
    if (changedFlags) {
      this._flags = flags;
    }
    if (flags & PRINTER_FLAGS.AUX_COMMENTS) {
      this._insideAux = oldInAux!;
    }

    if (oldNoLineTerminatorAfterNode != null) {
      this._noLineTerminatorAfterNode = oldNoLineTerminatorAfterNode;
    }

    this._innerCommentsState = INNER_COMMENTS_STATE.DISALLOWED;
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
    nodes: t.Node[] | undefined | null,
    statement?: boolean,
    indent?: boolean,
    separator?: PrintJoinOptions["separator"] | null,
    printTrailingSeparator?: boolean | null,
    resetTokenContext?: boolean,
    trailingCommentsLineOffset?: number,
  ) {
    if (!nodes?.length) return;

    const flags = this._flags;

    if (indent == null && flags & PRINTER_FLAGS.RETAIN_LINES) {
      const startLine = nodes[0].loc?.start.line;
      if (startLine != null && startLine !== this._buf.getCurrentLine()) {
        indent = true;
      }
    }

    if (indent) this.indent(flags);

    const len = nodes.length;
    for (let i = 0; i < len; i++) {
      const node = nodes[i];
      if (!node) continue;

      // don't add newlines at the beginning of the file
      if (statement && i === 0 && this._buf.hasContent()) {
        this.newline(1, flags);
      }

      this.print(
        node,
        false,
        resetTokenContext,
        trailingCommentsLineOffset || 0,
      );

      if (separator != null) {
        if (i < len - 1) separator.call(this, i, false);
        else if (printTrailingSeparator) separator.call(this, i, true);
      }

      if (statement) {
        if (i + 1 === len) {
          this.newline(1, flags);
        } else {
          const lastCommentLine = this._lastCommentLine;
          if (lastCommentLine > 0) {
            const offset =
              (nodes[i + 1].loc?.start.line || 0) - lastCommentLine;
            if (offset >= 0) {
              this.newline(offset || 1, flags);
              continue;
            }
          }

          this.newline(1, flags);
        }
      }
    }

    if (indent) this.dedent(flags);
  }

  printAndIndentOnComments(node: t.Node) {
    const indent = node.leadingComments && node.leadingComments.length > 0;
    if (indent) this.indent();
    this.print(node);
    if (indent) this.dedent();
  }

  printBlock(body: t.Statement) {
    if (body.type !== "EmptyStatement") {
      this.space();
    }

    this.print(body);
  }

  _printTrailingComments(
    node: t.Node,
    parent?: t.Node | null,
    lineOffset?: number,
  ) {
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
    } else {
      this._lastCommentLine = 0;
    }
  }

  _printLeadingComments(node: t.Node, parent: t.Node | null) {
    const comments = node.leadingComments;
    if (!comments?.length) return;
    this._printComments(COMMENT_TYPE.LEADING, comments, node, parent);
  }

  _maybePrintInnerComments(
    nextTokenStr: string | number,
    nextTokenOccurrenceCount?: number,
  ) {
    const state = this._innerCommentsState;
    switch (state & INNER_COMMENTS_STATE.MASK) {
      case INNER_COMMENTS_STATE.DISALLOWED:
        this._innerCommentsState =
          INNER_COMMENTS_STATE.ALLOWED | INNER_COMMENTS_STATE.WITH_INDENT;
        return;
      case INNER_COMMENTS_STATE.ALLOWED:
        this.printInnerComments(
          (state & INNER_COMMENTS_STATE.WITH_INDENT) > 0,
          this.tokenMap?.findMatching(
            this._currentNode!,
            nextTokenStr,
            nextTokenOccurrenceCount,
          ),
        );
    }
  }

  printInnerComments(indent = true, nextToken?: Token | null) {
    const node = this._currentNode!;
    const comments = node.innerComments;
    if (!comments?.length) {
      this._innerCommentsState = INNER_COMMENTS_STATE.PRINTED;
      return;
    }

    const hasSpace = this.endsWith(charCodes.space);
    if (indent) this.indent();

    switch (
      this._printComments(
        COMMENT_TYPE.INNER,
        comments,
        node,
        undefined,
        undefined,
        nextToken,
      )
    ) {
      case PRINT_COMMENTS_RESULT.PRINTED_ALL:
        this._innerCommentsState = INNER_COMMENTS_STATE.PRINTED;
      // falls through
      case PRINT_COMMENTS_RESULT.PRINTED_SOME:
        if (hasSpace) this.space();
    }

    if (indent) this.dedent();
  }

  noIndentInnerCommentsHere() {
    this._innerCommentsState &= ~INNER_COMMENTS_STATE.WITH_INDENT;
  }

  printSequence(
    nodes: t.Node[],
    indent?: boolean,
    resetTokenContext?: boolean,
    trailingCommentsLineOffset?: number,
  ) {
    this.printJoin(
      nodes,
      true,
      indent ?? false,
      undefined,
      undefined,
      resetTokenContext,
      trailingCommentsLineOffset,
    );
  }

  printList(
    items: t.Node[] | null | undefined,
    printTrailingSeparator?: boolean | null,
    statement?: boolean,
    indent?: boolean,
    separator?: PrintListOptions["separator"],
    resetTokenContext?: boolean,
  ) {
    this.printJoin(
      items,
      statement,
      indent,
      separator ?? commaSeparator,
      printTrailingSeparator,
      resetTokenContext,
    );
  }

  shouldPrintTrailingComma(listEnd: string | number): boolean | null {
    if (!this.tokenMap) return null;

    const listEndIndex = this.tokenMap.findLastIndex(
      this._currentNode!,
      token =>
        this.tokenMap!.matchesOriginal(
          token,
          typeof listEnd === "number" ? String.fromCharCode(listEnd) : listEnd,
        ),
    );
    if (listEndIndex <= 0) return null;
    return this.tokenMap.matchesOriginal(this._tokens![listEndIndex - 1], ",");
  }

  // Returns `PRINT_COMMENT_HINT.DEFER` if the comment cannot be printed in this position due to
  // line terminators, signaling that the print comments loop can stop and
  // resume printing comments at the next possible position. This happens when
  // printing inner comments, since if we have an inner comment with a multiline
  // there is at least one inner position where line terminators are allowed.
  _shouldPrintComment(
    comment: t.Comment,
    nextToken?: Token | null,
  ): PRINT_COMMENT_HINT {
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

    if (nextToken && this.tokenMap) {
      const commentTok = this.tokenMap.find(
        this._currentNode!,
        token => token.value === comment.value,
      );
      if (commentTok && commentTok.start > nextToken.start) {
        return PRINT_COMMENT_HINT.DEFER;
      }
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
      !noLineTerminator;

    if (
      printNewLines &&
      this._buf.hasContent() &&
      skipNewLines !== COMMENT_SKIP_NEWLINE.LEADING
    ) {
      this.newline(1);
    }

    switch (this.getLastChar(true)) {
      // Avoid converting a / operator into a line comment by appending /* to it
      case charCodes.slash:
        this._space();
      // falls through
      case charCodes.leftSquareBracket:
      case charCodes.leftCurlyBrace:
      case charCodes.leftParenthesis:
        break;

      default:
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
        if (this._flags & PRINTER_FLAGS.CONCISE) {
          val = val.replace(/\n(?!$)/g, `\n`);
        } else {
          let indentSize = this.format.retainLines
            ? 0
            : this._buf.getCurrentColumn();

          if (this._shouldIndent() || this.format.retainLines) {
            indentSize += this._indent;
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

    this.source("start", comment.loc);
    this._append(val, isBlockComment);

    if (!isBlockComment && !noLineTerminator) {
      this._newline();
    }

    if (printNewLines && skipNewLines !== COMMENT_SKIP_NEWLINE.TRAILING) {
      this.newline(1);
    }
  }

  _printComments(
    type: COMMENT_TYPE,
    comments: t.Comment[],
    node: t.Node,
    parent?: t.Node | null,
    lineOffset: number = 0,
    nextToken?: Token | null,
  ): PRINT_COMMENTS_RESULT {
    const nodeLoc = node.loc;
    const len = comments.length;
    let hasLoc = !!nodeLoc;
    const nodeStartLine = hasLoc ? nodeLoc!.start.line : 0;
    const nodeEndLine = hasLoc ? nodeLoc!.end.line : 0;
    let lastLine = 0;
    let leadingCommentNewline = 0;

    const { _noLineTerminator, _flags } = this;

    for (let i = 0; i < len; i++) {
      const comment = comments[i];

      const shouldPrint = this._shouldPrintComment(comment, nextToken);
      if (shouldPrint === PRINT_COMMENT_HINT.DEFER) {
        return i === 0
          ? PRINT_COMMENTS_RESULT.PRINTED_NONE
          : PRINT_COMMENTS_RESULT.PRINTED_SOME;
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

          if (offset > 0 && !_noLineTerminator) {
            this.newline(offset, _flags);
          }
          this._printComment(comment, COMMENT_SKIP_NEWLINE.ALL);

          if (i + 1 === len) {
            const count = Math.max(
              nodeStartLine - lastLine,
              leadingCommentNewline,
            );
            if (count > 0 && !_noLineTerminator) {
              this.newline(count, _flags);
            }
            lastLine = nodeStartLine;
          }
        } else if (type === COMMENT_TYPE.INNER) {
          const offset =
            commentStartLine - (i === 0 ? nodeStartLine : lastLine);
          lastLine = commentEndLine;

          if (offset > 0 && !_noLineTerminator) {
            this.newline(offset, _flags);
          }
          this._printComment(comment, COMMENT_SKIP_NEWLINE.ALL);

          if (i + 1 === len) {
            const count = Math.min(1, nodeEndLine - lastLine);
            if (count > 0 && !_noLineTerminator) {
              this.newline(count, _flags);
            }
            lastLine = nodeEndLine;
          }
        } else {
          const offset =
            commentStartLine - (i === 0 ? nodeEndLine - lineOffset : lastLine);
          lastLine = commentEndLine;

          if (offset > 0 && !_noLineTerminator) {
            this.newline(offset, _flags);
          }
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
            !isTSEnumMember(node);

          if (type === COMMENT_TYPE.LEADING) {
            this._printComment(
              comment,
              (shouldSkipNewline && node.type !== "ObjectExpression") ||
                (singleLine && isFunction(parent) && parent.body === node)
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
    return PRINT_COMMENTS_RESULT.PRINTED_ALL;
  }
}

export default Printer;

function commaSeparator(this: Printer, occurrenceCount: number, last: boolean) {
  this.tokenChar(charCodes.comma, occurrenceCount);
  if (!last) this.space();
}
