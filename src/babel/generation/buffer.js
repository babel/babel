import repeating from "repeating";
import trimRight from "trim-right";
import isBoolean from "lodash/lang/isBoolean";
import includes from "lodash/collection/includes";
import isNumber from "lodash/lang/isNumber";

/**
 * Buffer for collecting generated output.
 */

export default class Buffer {
  constructor(position, format) {
    this.position = position;
    this._indent  = format.indent.base;
    this.format   = format;
    this.buf      = "";
  }

  /**
   * Get the current trimmed buffer.
   */

  get() {
    return trimRight(this.buf);
  }

  /**
   * Get the current indent.
   */

  getIndent() {
    if (this.format.compact || this.format.concise) {
      return "";
    } else {
      return repeating(this.format.indent.style, this._indent);
    }
  }

  /**
   * Get the current indent size.
   */

  indentSize() {
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
    this.push(";");
  }

  /**
   * Ensure last character is a semicolon.
   */

  ensureSemicolon() {
    if (!this.isLast(";")) this.semicolon();
  }

  /**
   * Add a right brace to the buffer.
   */

  rightBrace() {
    this.newline(true);
    this.push("}");
  }

  /**
   * Add a keyword to the buffer.
   */

  keyword(name) {
    this.push(name);
    this.space();
  }

  /**
   * Add a space to the buffer unless it is compact (override with force).
   */

  space(force?) {
    if (!force && this.format.compact) return;

    if (force || this.buf && !this.isLast(" ") && !this.isLast("\n")) {
      this.push(" ");
    }
  }

  /**
   * Remove the last character.
   */

  removeLast(cha) {
    if (this.format.compact) return;
    if (!this.isLast(cha)) return;

    this.buf = this.buf.substr(0, this.buf.length - 1);
    this.position.unshift(cha);
  }

  /**
   * Add a newline (or many newlines), maintaining formatting.
   * Strips multiple newlines if removeLast is true.
   */

  newline(i, removeLast) {
    if (this.format.compact || this.format.retainLines) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    removeLast = removeLast || false;

    if (isNumber(i)) {
      i = Math.min(2, i);

      if (this.endsWith("{\n") || this.endsWith(":\n")) i--;
      if (i <= 0) return;

      while (i > 0) {
        this._newline(removeLast);
        i--;
      }
      return;
    }

    if (isBoolean(i)) {
      removeLast = i;
    }

    this._newline(removeLast);
  }

  /**
   * Adds a newline unless there is already two previous newlines.
   */

  _newline(removeLast) {
    // never allow more than two lines
    if (this.endsWith("\n\n")) return;

    // remove the last newline
    if (removeLast && this.isLast("\n")) this.removeLast("\n");

    this.removeLast(" ");
    this._removeSpacesAfterLastNewline();
    this._push("\n");
  }

  /**
   * If buffer ends with a newline and some spaces after it, trim those spaces.
   */

  _removeSpacesAfterLastNewline() {
    var lastNewlineIndex = this.buf.lastIndexOf("\n");
    if (lastNewlineIndex === -1) {
      return;
    }

    var index = this.buf.length - 1;
    while (index > lastNewlineIndex) {
      if (this.buf[index] !== " ") {
        break;
      }

      index--;
    }

    if (index === lastNewlineIndex) {
      this.buf = this.buf.substring(0, index + 1);
    }
  }

  /**
   * Push a string to the buffer, maintaining indentation and newlines.
   */

  push(str, noIndent) {
    if (!this.format.compact && this._indent && !noIndent && str !== "\n") {
      // we have an indent level and we aren't pushing a newline
      var indent = this.getIndent();

      // replace all newlines with newlines with the indentation
      str = str.replace(/\n/g, `\n${indent}`);

      // we've got a newline before us so prepend on the indentation
      if (this.isLast("\n")) this._push(indent);
    }

    this._push(str);
  }

  /**
   * Push a string to the buffer.
   */

  _push(str) {
    this.position.push(str);
    this.buf += str;
  }

  /**
   * Test if the buffer ends with a string.
   */

  endsWith(str, buf = this.buf) {
    if (str.length === 1) {
      return buf[buf.length - 1] === str;
    } else {
      return buf.slice(-str.length) === str;
    }
  }

  /**
   * Test if a character is last in the buffer.
   */

  isLast(cha) {
    if (this.format.compact) return false;

    var buf = this.buf;
    var last = buf[buf.length - 1];

    if (Array.isArray(cha)) {
      return includes(cha, last);
    } else {
      return cha === last;
    }
  }
}
