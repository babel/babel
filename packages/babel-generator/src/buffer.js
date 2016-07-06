import Position from "./position";
import repeat from "lodash/repeat";
import trimEnd from "lodash/trimEnd";

/**
 * Buffer for collecting generated output.
 */

export default class Buffer {
  constructor(format: Object) {
    this.printedCommentStarts = {};
    this.parenPushNewlineState = null;
    this._position = new Position();
    this._indent = format.indent.base;
    this.format = format;
    this.buf = "";

    // Maintaining a reference to the last char in the buffer is an optimization
    // to make sure that v8 doesn't "flatten" the string more often than needed
    // see https://github.com/babel/babel/pull/3283 for details.
    this.last = "";

    this.map = null;
    this._sourcePosition = {
      line: null,
      column: null,
      filename: null,
    };
    this._endsWithWord = false;
  }

  printedCommentStarts: Object;
  parenPushNewlineState: ?Object;
  position: Position;
  _indent: number;
  format: Object;
  buf: string;
  last: string;

  _catchUp(){
    // catch up to this nodes newline if we're behind
    if (this.format.retainLines && this._sourcePosition.line !== null) {
      while (this.getCurrentLine() < this._sourcePosition.line) {
        this.push("\n");
      }
    }
  }

  /**
   * Get the current trimmed buffer.
   */

  get(): string {
    return trimEnd(this.buf);
  }

  /**
   * Get the current indent.
   */

  getIndent(): string {
    if (this.format.compact || this.format.concise) {
      return "";
    } else {
      return repeat(this.format.indent.style, this._indent);
    }
  }

  /**
   * Get the current indent size.
   */

  indentSize(): number {
    return this.getIndent().length;
  }

  /**
   * Increment indent size.
   */

  indent() {
    this._indent++;
  }

  /**
   * Decrement indent size.
   */

  dedent() {
    this._indent--;
  }

  /**
   * Add a semicolon to the buffer.
   */

  semicolon() {
    this.token(";");
  }

  /**
   * Add a right brace to the buffer.
   */

  rightBrace() {
    if (!this.endsWith("\n")) this.newline();

    if (this.format.minified && !this._lastPrintedIsEmptyStatement) {
      this.removeLast(";");
    }
    this.token("}");
  }

  /**
   * Add a keyword to the buffer.
   */

  keyword(name: string) {
    this.word(name);
    this.space();
  }

  /**
   * Add a space to the buffer unless it is compact.
   */

  space(force: boolean = false) {
    if (this.format.compact) return;

    if ((this.buf && !this.endsWith(" ") && !this.endsWith("\n")) || force) {
      this.push(" ");
    }
  }

  /**
   * Writes a token that can't be safely parsed without taking whitespace into account.
   */

  word(str: string) {
    if (this._endsWithWord) this.push(" ");

    this.push(str);
    this._endsWithWord = true;
  }

  /**
   * Writes a simple token.
   */

  token(str: string) {
    // space is mandatory to avoid outputting <!--
    // http://javascript.spec.whatwg.org/#comment-syntax
    if ((str === "--" && this.last === "!") ||

      // Need spaces for operators of the same kind to avoid: `a+++b`
      (str[0] === "+" && this.last === "+") ||
      (str[0] === "-" && this.last === "-")) {
      this.push(" ");
    }

    this.push(str);
  }

  /**
   * Remove the last character.
   */

  removeLast(cha: string) {
    if (!this.endsWith(cha)) return;
    this.buf = this.buf.slice(0, -1);
    this.last = this.buf[this.buf.length - 1];
    this._position.unshift(cha);
  }

  /**
   * Set some state that will be modified if a newline has been inserted before any
   * non-space characters.
   *
   * This is to prevent breaking semantics for terminatorless separator nodes. eg:
   *
   *    return foo;
   *
   * returns `foo`. But if we do:
   *
   *   return
   *   foo;
   *
   *  `undefined` will be returned and not `foo` due to the terminator.
   */

  startTerminatorless(): Object {
    return this.parenPushNewlineState = {
      printed: false
    };
  }

  /**
   * Print an ending parentheses if a starting one has been printed.
   */

  endTerminatorless(state: Object) {
    if (state.printed) {
      this.dedent();
      this.newline();
      this.token(")");
    }
  }

  /**
   * Add a newline (or many newlines), maintaining formatting.
   */

  newline(i?: number) {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    // never allow more than two lines
    if (this.endsWith("\n\n")) return;

    if (typeof i !== "number") i = 1;

    i = Math.min(2, i);
    if (this.endsWith("{\n") || this.endsWith(":\n")) i--;
    if (i <= 0) return;

    this._removeSpacesAfterLastNewline();
    for (let j = 0; j < i; j++) {
      this.push("\n");
    }
  }

  /**
   * If buffer ends with a newline and some spaces after it, trim those spaces.
   */

  _removeSpacesAfterLastNewline() {
    const originalBuf = this.buf;
    this.buf = this.buf.replace(/[ \t]+$/, "");

    if (originalBuf.length !== this.buf.length){
      const removed = originalBuf.slice(this.buf.length);
      this._position.unshift(removed);
      this.last = this.buf[this.buf.length - 1];
    }
  }

  /**
   * Sets a given position as the current source location so generated code after this call
   * will be given this position in the sourcemap.
   */

  source(prop: string, loc: Location) {
    if (prop && !loc) return;

    let pos = loc ? loc[prop] : null;

    this._sourcePosition.line = pos ? pos.line : null;
    this._sourcePosition.column = pos ? pos.column : null;
    this._sourcePosition.filename = loc && loc.filename || null;

    this._catchUp();
  }

  /**
   * Call a callback with a specific source location and restore on completion.
   */

  withSource(prop: string, loc: Location, cb: () => void) {
    if (!this.opts.sourceMaps && !this.format.retainLines) return cb();

    // Use the call stack to manage a stack of "source location" data.
    let originalLine = this._sourcePosition.line;
    let originalColumn = this._sourcePosition.column;
    let originalFilename = this._sourcePosition.filename;

    this.source(prop, loc);

    cb();

    this._sourcePosition.line = originalLine;
    this._sourcePosition.column = originalColumn;
    this._sourcePosition.filename = originalFilename;
  }

  /**
   * Push a string to the buffer, maintaining indentation and newlines.
   */

  push(str: string) {
    if (!this.format.compact && this._indent && str[0] !== "\n") {
      // we've got a newline before us so prepend on the indentation
      if (this.endsWith("\n")) str = this.getIndent() + str;
    }

    // see startTerminatorless() instance method
    let parenPushNewlineState = this.parenPushNewlineState;
    if (parenPushNewlineState) {
      for (let i = 0; i < str.length; i++) {
        let cha = str[i];

        // we can ignore spaces since they wont interupt a terminatorless separator
        if (cha === " ") continue;

        this.parenPushNewlineState = null;

        if (cha === "\n" || cha === "/") {
          // we're going to break this terminator expression so we need to add a parentheses
          str = "(" + str;
          this.indent();
          parenPushNewlineState.printed = true;
        }

        break;
      }
    }

    // If there the line is ending, adding a new mapping marker is redundant
    if (this.opts.sourceMaps && str[0] !== "\n") this.map.mark(this._position, this._sourcePosition);

    //
    this._position.push(str);
    this.buf += str;
    this.last = str[str.length - 1];

    // Clear any state-tracking flags that may have been set.
    this._endsWithWord = false;
  }

  /**
   * Test if the buffer ends with a string.
   */

  endsWith(str: string): boolean {
    if (str.length === 1) {
      return this.last === str;
    } else {
      return this.buf.slice(-str.length) === str;
    }
  }

  getCurrentColumn() {
    return this._position.column;
  }

  getCurrentLine() {
    return this._position.line;
  }
}
