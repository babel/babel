// From packages\babel-generator\src\printer.ts

import Buffer from "./buffer";
import type { Loc } from "./buffer";
import * as n from "./node";
import type * as t from "@babel/types";
import type {
  RecordAndTuplePluginOptions,
  PipelineOperatorPluginOptions,
} from "@babel/parser";
import type { Opts as jsescOptions } from "jsesc";

import * as generatorFunctions from "./generators";
import type SourceMap from "./source-map";
import * as charCodes from "charcodes";

const SCIENTIFIC_NOTATION = /e/i;
const ZERO_DECIMAL_INTEGER = /\.0+$/;
const NON_DECIMAL_LITERAL = /^0[box]/;
const PURE_ANNOTATION_RE = /^\s*[@#]__PURE__\s*$/;

const { needsParens, needsWhitespaceAfter, needsWhitespaceBefore } = n;

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
  recordAndTupleSyntaxType: RecordAndTuplePluginOptions["syntaxType"];
  jsescOption: jsescOptions;
  jsonCompatibleStrings?: boolean;
  /**
   * For use with the Hack-style pipe operator.
   * Changes what token is used for pipe bodies’ topic references.
   */
  topicToken?: PipelineOperatorPluginOptions["topicToken"];
  /**
   * @deprecated Removed in Babel 8
   */
  decoratorsBeforeExport?: boolean;
};

interface AddNewlinesOptions {
  addNewlines(leading: boolean, node: t.Node): number;
}

interface PrintSequenceOptions extends Partial<AddNewlinesOptions> {
  statement?: boolean;
  indent?: boolean;
}

interface PrintListOptions {
  separator?: (this: Printer) => void;
  statement?: boolean;
  indent?: boolean;
}

type PrintJoinOptions = PrintListOptions &
  PrintSequenceOptions & {
    iterator?: (node: t.Node, index: number) => void;
  };
class Printer {
  constructor(format: Format, map: SourceMap) {
    this.format = format;
    this._buf = new Buffer(map);

    this._indentChar = format.indent.style.charCodeAt(0);
    this._indentRepeat = format.indent.style.length;
  }

  declare format: Format;
  inForStatementInitCounter: number = 0;

  declare _buf: Buffer;
  _printStack: Array<t.Node> = [];
  _indent: number = 0;
  _indentChar: number = 0;
  _indentRepeat: number = 0;
  _insideAux: boolean = false;
  _parenPushNewlineState: { printed: boolean } | null = null;
  _noLineTerminator: boolean = false;
  _printAuxAfterOnNextUserNode: boolean = false;
  _printedComments = new Set<t.Comment>();
  _endsWithInteger = false;
  _endsWithWord = false;

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
  }

  /**
   * Add a right brace to the buffer.
   */

  rightBrace(): void {
    if (this.format.minified) {
      this._buf.removeLastSemicolon();
    }
    this.token("}");
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

  word(str: string): void {
    // prevent concatenating words and creating // comment out of division and regex
    if (
      this._endsWithWord ||
      (str.charCodeAt(0) === charCodes.slash && this.endsWith(charCodes.slash))
    ) {
      this._space();
    }

    this._maybeAddAuxComment();
    this._append(str, false);

    this._endsWithWord = true;
  }

  /**
   * Writes a number token so that we can validate if it is an integer.
   */

  number(str: string): void {
    this.word(str);

    // Integer tokens need special handling because they cannot have '.'s inserted
    // immediately after them.
    this._endsWithInteger =
      Number.isInteger(+str) &&
      !NON_DECIMAL_LITERAL.test(str) &&
      !SCIENTIFIC_NOTATION.test(str) &&
      !ZERO_DECIMAL_INTEGER.test(str) &&
      str.charCodeAt(str.length - 1) !== charCodes.dot;
  }

  /**
   * Writes a simple token.
   */

  token(str: string, maybeNewline = false): void {
    // space is mandatory to avoid outputting <!--
    // http://javascript.spec.whatwg.org/#comment-syntax
    const lastChar = this.getLastChar();
    const strFirst = str.charCodeAt(0);
    if (
      (lastChar === charCodes.exclamationMark && str === "--") ||
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
  }

  tokenChar(char: number): void {
    // space is mandatory to avoid outputting <!--
    // http://javascript.spec.whatwg.org/#comment-syntax
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
  }

  /**
   * Add a newline (or many newlines), maintaining formatting.
   */

  newline(i: number = 1): void {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    const charBeforeNewline = this.endsWithCharAndNewline();
    // never allow more than two lines
    if (charBeforeNewline === charCodes.lineFeed) return;

    if (
      charBeforeNewline === charCodes.leftCurlyBrace ||
      charBeforeNewline === charCodes.colon
    ) {
      i--;
    }
    if (i <= 0) return;

    for (let j = 0; j < i; j++) {
      this._newline();
    }
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
    this._catchUp("start", loc);

    this._buf.exactSource(loc, cb);
  }

  source(prop: "start" | "end", loc: Loc | undefined): void {
    this._catchUp(prop, loc);

    this._buf.source(prop, loc);
  }

  sourceWithOffset(
    prop: "start" | "end",
    loc: Loc | undefined,
    lineOffset: number,
    columnOffset: number,
  ): void {
    this._catchUp(prop, loc);

    this._buf.sourceWithOffset(prop, loc, lineOffset, columnOffset);
  }

  withSource(
    prop: "start" | "end",
    loc: Loc | undefined,
    cb: () => void,
  ): void {
    this._catchUp(prop, loc);

    this._buf.withSource(prop, loc, cb);
  }

  _space(): void {
    this._queue(charCodes.space);
  }

  _newline(): void {
    this._queue(charCodes.lineFeed);
  }

  _append(str: string, maybeNewline: boolean): void {
    this._maybeAddParen(str);
    this._maybeIndent(str.charCodeAt(0));

    this._buf.append(str, maybeNewline);

    this._endsWithWord = false;
    this._endsWithInteger = false;
  }

  _appendChar(char: number): void {
    this._maybeAddParenChar(char);
    this._maybeIndent(char);

    this._buf.appendChar(char);

    this._endsWithWord = false;
    this._endsWithInteger = false;
  }

  _queue(char: number) {
    this._maybeAddParenChar(char);
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
      this._buf.queueIndentation(this._indentChar, this._getIndent());
    }
  }

  _maybeAddParenChar(char: number): void {
    // see startTerminatorless() instance method
    const parenPushNewlineState = this._parenPushNewlineState;
    if (!parenPushNewlineState) return;

    // This function does two things:
    // - If needed, prints a parenthesis
    // - If the currently printed string removes the need for the paren,
    //   it resets the _parenPushNewlineState field.
    //   Almost everything removes the need for a paren, except for
    //   comments and whitespaces.

    if (char === charCodes.space) {
      // Whitespaces only, the parentheses might still be needed.
      return;
    }

    // Check for newline or comment.
    if (char !== charCodes.lineFeed) {
      this._parenPushNewlineState = null;
      return;
    }

    this.token("(");
    this.indent();
    parenPushNewlineState.printed = true;
  }

  _maybeAddParen(str: string): void {
    // see startTerminatorless() instance method
    const parenPushNewlineState = this._parenPushNewlineState;
    if (!parenPushNewlineState) return;

    // This function does two things:
    // - If needed, prints a parenthesis
    // - If the currently printed string removes the need for the paren,
    //   it resets the _parenPushNewlineState field.
    //   Almost everything removes the need for a paren, except for
    //   comments and whitespaces.

    const len = str.length;

    let i;
    for (i = 0; i < len && str.charCodeAt(i) === charCodes.space; i++) continue;
    if (i === len) {
      // Whitespaces only, the parentheses might still be needed.
      return;
    }

    // Check for newline or comment.
    const cha = str.charCodeAt(i);
    if (cha !== charCodes.lineFeed) {
      if (
        // This is not a comment (it doesn't start with /)
        cha !== charCodes.slash ||
        // This is not a comment (it's a / operator)
        i + 1 === len
      ) {
        // After a normal token, the parentheses aren't needed anymore
        this._parenPushNewlineState = null;
        return;
      }

      const chaPost = str.charCodeAt(i + 1);

      if (chaPost === charCodes.asterisk) {
        // This is a block comment

        if (PURE_ANNOTATION_RE.test(str.slice(i + 2, len - 2))) {
          // We avoid printing newlines after #__PURE__ comments (we treat
          // then as unary operators), but we must keep the old
          // parenPushNewlineState because, if a newline was forbidden, it is
          // still forbidden after the comment.
          return;
        }

        // NOTE: code flow continues from here to after these if/elses
      } else if (chaPost !== charCodes.slash) {
        // This is neither a block comment, nor a line comment.
        // After a normal token, the parentheses aren't needed anymore
        this._parenPushNewlineState = null;
        return;
      }
    }

    this.token("(");
    this.indent();
    parenPushNewlineState.printed = true;
  }

  _catchUp(prop: "start" | "end", loc?: Loc) {
    if (!this.format.retainLines) return;

    // catch up to this nodes newline if we're behind
    const pos = loc ? loc[prop] : null;
    if (pos?.line != null) {
      const count = pos.line - this._buf.getCurrentLine();

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

  printTerminatorless(node: t.Node, parent: t.Node, isLabel: boolean) {
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
    if (isLabel) {
      this._noLineTerminator = true;
      this.print(node, parent);
      this._noLineTerminator = false;
    } else {
      const terminatorState = {
        printed: false,
      };
      this._parenPushNewlineState = terminatorState;
      this.print(node, parent);
      /**
       * Print an ending parentheses if a starting one has been printed.
       */
      if (terminatorState.printed) {
        this.dedent();
        this.newline();
        this.token(")");
      }
    }
  }

  print(node: t.Node | null, parent?: t.Node, noLineTerminator?: boolean) {
    if (!node) return;

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

    this._printStack.push(node);

    const oldInAux = this._insideAux;
    this._insideAux = node.loc == undefined;
    this._maybeAddAuxComment(this._insideAux && !oldInAux);

    let shouldPrintParens: boolean;
    if (
      format.retainFunctionParens &&
      nodeType === "FunctionExpression" &&
      node.extra &&
      node.extra.parenthesized
    ) {
      shouldPrintParens = true;
    } else {
      shouldPrintParens = needsParens(node, parent, this._printStack);
    }
    if (shouldPrintParens) this.token("(");

    this._printLeadingComments(node);

    const loc = nodeType === "Program" || nodeType === "File" ? null : node.loc;

    this.exactSource(loc, printMethod.bind(this, node, parent));

    if (noLineTerminator && !this._noLineTerminator) {
      this._noLineTerminator = true;
      this._printTrailingComments(node);
      this._noLineTerminator = false;
    } else {
      this._printTrailingComments(node);
    }

    if (shouldPrintParens) this.token(")");

    // end
    this._printStack.pop();

    format.concise = oldConcise;
    this._insideAux = oldInAux;
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
      this._printComment({
        type: "CommentBlock",
        value: comment,
      });
    }
  }

  _printAuxAfterComment() {
    if (!this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = false;

    const comment = this.format.auxiliaryCommentAfter;
    if (comment) {
      this._printComment({
        type: "CommentBlock",
        value: comment,
      });
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
      extra &&
      extra.raw != null &&
      extra.rawValue != null &&
      node.value === extra.rawValue
    ) {
      // @ts-expect-error: The extra.raw of these AST node types must be a string
      return extra.raw;
    }
  }

  printJoin(
    nodes: Array<t.Node> | undefined | null,
    parent: t.Node,
    opts: PrintJoinOptions = {},
  ) {
    if (!nodes?.length) return;

    if (opts.indent) this.indent();

    const newlineOpts: AddNewlinesOptions = {
      addNewlines: opts.addNewlines,
    };

    const len = nodes.length;
    for (let i = 0; i < len; i++) {
      const node = nodes[i];
      if (!node) continue;

      if (opts.statement) this._printNewline(true, node, parent, newlineOpts);

      this.print(node, parent);

      if (opts.iterator) {
        opts.iterator(node, i);
      }

      if (opts.separator && i < len - 1) {
        opts.separator.call(this);
      }

      if (opts.statement) this._printNewline(false, node, parent, newlineOpts);
    }

    if (opts.indent) this.dedent();
  }

  printAndIndentOnComments(node: t.Node, parent: t.Node) {
    const indent = node.leadingComments && node.leadingComments.length > 0;
    if (indent) this.indent();
    this.print(node, parent);
    if (indent) this.dedent();
  }

  printBlock(parent: Extract<t.Node, { body: t.Statement }>) {
    const node = parent.body;

    if (node.type !== "EmptyStatement") {
      this.space();
    }

    this.print(node, parent);
  }

  _printTrailingComments(node: t.Node) {
    this._printComments(this._getComments(false, node));
  }

  _printLeadingComments(node: t.Node) {
    this._printComments(
      this._getComments(true, node),
      // Don't add leading/trailing new lines to #__PURE__ annotations
      true,
    );
  }

  printInnerComments(node: t.Node, indent = true) {
    if (!node.innerComments?.length) return;
    if (indent) this.indent();
    this._printComments(node.innerComments);
    if (indent) this.dedent();
  }

  printSequence(
    nodes: t.Node[],
    parent: t.Node,
    opts: PrintSequenceOptions = {},
  ) {
    opts.statement = true;
    return this.printJoin(nodes, parent, opts);
  }

  printList(items: t.Node[], parent: t.Node, opts: PrintListOptions = {}) {
    if (opts.separator == null) {
      opts.separator = commaSeparator;
    }

    return this.printJoin(items, parent, opts);
  }

  _printNewline(
    leading: boolean,
    node: t.Node,
    parent: t.Node,
    opts: AddNewlinesOptions,
  ) {
    // Fast path since 'this.newline' does nothing when not tracking lines.
    if (this.format.retainLines || this.format.compact) return;

    // Fast path for concise since 'this.newline' just inserts a space when
    // concise formatting is in use.
    if (this.format.concise) {
      this.space();
      return;
    }

    let lines = 0;
    // don't add newlines at the beginning of the file
    if (this._buf.hasContent()) {
      if (!leading) lines++; // always include at least a single line after
      if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;

      const needs = leading ? needsWhitespaceBefore : needsWhitespaceAfter;
      if (needs(node, parent)) lines++;
    }

    this.newline(Math.min(2, lines));
  }

  _getComments(leading: boolean, node: t.Node) {
    // Note, we use a boolean flag here instead of passing in the attribute name as it is faster
    // because this is called extremely frequently.
    return (
      (node && (leading ? node.leadingComments : node.trailingComments)) || null
    );
  }

  _printComment(comment: t.Comment, skipNewLines?: boolean) {
    // Some plugins (such as flow-strip-types) use this to mark comments as removed using the AST-root 'comments' property,
    // where they can't manually mutate the AST node comment lists.
    if (comment.ignore) return;

    if (this._printedComments.has(comment)) return;

    if (!this.format.shouldPrintComment(comment.value)) return;

    this._printedComments.add(comment);

    const isBlockComment = comment.type === "CommentBlock";

    // Add a newline before and after a block comment, unless explicitly
    // disallowed
    const printNewLines =
      isBlockComment && !skipNewLines && !this._noLineTerminator;

    if (printNewLines && this._buf.hasContent()) this.newline(1);

    const lastCharCode = this.getLastChar();
    if (
      lastCharCode !== charCodes.leftSquareBracket &&
      lastCharCode !== charCodes.leftCurlyBrace
    ) {
      this.space();
    }

    let val;
    let maybeNewline = false;
    if (isBlockComment) {
      val = `/*${comment.value}*/`;
      if (this.format.indent.adjustMultilineComment) {
        const offset = comment.loc?.start.column;
        if (offset) {
          const newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
          val = val.replace(newlineRegex, "\n");
        }

        const indentSize = Math.max(
          this._getIndent(),
          this.format.retainLines ? 0 : this._buf.getCurrentColumn(),
        );
        val = val.replace(/\n(?!$)/g, `\n${" ".repeat(indentSize)}`);

        maybeNewline = true;
      }
    } else if (!this._noLineTerminator) {
      val = `//${comment.value}\n`;
      maybeNewline = true;
    } else {
      val = `/*${comment.value}*/`;
    }

    // Avoid creating //* comments
    if (this.endsWith(charCodes.slash)) this._space();

    this.withSource(
      "start",
      comment.loc,
      this._append.bind(this, val, maybeNewline),
    );

    if (printNewLines) this.newline(1);
  }

  _printComments(
    comments?: readonly t.Comment[],
    inlinePureAnnotation?: boolean,
  ) {
    if (!comments?.length) return;

    if (
      inlinePureAnnotation &&
      comments.length === 1 &&
      PURE_ANNOTATION_RE.test(comments[0].value)
    ) {
      this._printComment(
        comments[0],
        // Keep newlines if the comment marks a standalone call
        this._buf.hasContent() && !this.endsWith(charCodes.lineFeed),
      );
    } else {
      for (const comment of comments) {
        this._printComment(comment);
      }
    }
  }
  // todo(flow->ts): was Node
  printAssertions(node: Extract<t.Node, { assertions?: t.ImportAttribute[] }>) {
    if (node.assertions?.length) {
      this.space();
      this.word("assert");
      this.space();
      this.token("{");
      this.space();
      this.printList(node.assertions, node);
      this.space();
      this.token("}");
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
interface Printer extends GeneratorFunctions {}
export default Printer;

function commaSeparator(this: Printer) {
  this.token(",");
  this.space();
}
