"use strict";

module.exports = Buffer;

var repeating = require("repeating");
var trimRight = require("trim-right");
var isBoolean = require("lodash/lang/isBoolean");
var includes  = require("lodash/collection/includes");
var isNumber  = require("lodash/lang/isNumber");

function Buffer(position, format) {
  this.position = position;
  this._indent  = format.indent.base;
  this.format   = format;
  this.buf      = "";
}

Buffer.prototype.get = function () {
  return trimRight(this.buf);
};

Buffer.prototype.getIndent = function () {
  if (this.format.compact || this.format.concise) {
    return "";
  } else {
    return repeating(this.format.indent.style, this._indent);
  }
};

Buffer.prototype.indentSize = function () {
  return this.getIndent().length;
};

Buffer.prototype.indent = function () {
  this._indent++;
};

Buffer.prototype.dedent = function () {
  this._indent--;
};

Buffer.prototype.semicolon = function () {
  this.push(";");
};

Buffer.prototype.ensureSemicolon = function () {
  if (!this.isLast(";")) this.semicolon();
};

Buffer.prototype.rightBrace = function () {
  this.newline(true);
  this.push("}");
};

Buffer.prototype.keyword = function (name) {
  this.push(name);
  this.space();
};

Buffer.prototype.space = function () {
  if (this.format.compact) return;

  if (this.buf && !this.isLast([" ", "\n"])) {
    this.push(" ");
  }
};

Buffer.prototype.removeLast = function (cha) {
  if (!this.isLast(cha)) return;

  this.buf = this.buf.substr(0, this.buf.length - 1);
  this.position.unshift(cha);
};

Buffer.prototype.newline = function (i, removeLast) {
  if (this.format.compact || this.format.concise) {
    this.space();
    return;
  }

  removeLast = removeLast || false;

  if (isNumber(i)) {
    if (this.endsWith("{\n")) i--;
    if (this.endsWith(repeating("\n", i > 0 ? i : 0))) return;

    while (i--) {
      this._newline(removeLast);
    }
    return;
  }

  if (isBoolean(i)) {
    removeLast = i;
  }

  this._newline(removeLast);
};

Buffer.prototype._newline = function (removeLast) {
  if (removeLast && this.isLast("\n")) this.removeLast("\n");

  this.removeLast(" ");

  // remove whitespace if last character was a newline
  this._removeSpacesAfterLastNewline();
  this._push("\n");
};

/**
 * If buffer ends with a newline and some spaces after it, trim those spaces.
 */
Buffer.prototype._removeSpacesAfterLastNewline = function () {
  var lastNewlineIndex = this.buf.lastIndexOf("\n");
  if (lastNewlineIndex === -1)
    return;

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
};

Buffer.prototype.push = function (str, noIndent) {
  if (this._indent && !noIndent && str !== "\n") {
    // we have an indent level and we aren't pushing a newline
    var indent = this.getIndent();

    // replace all newlines with newlines with the indentation
    str = str.replace(/\n/g, "\n" + indent);

    // we've got a newline before us so prepend on the indentation
    if (this.isLast("\n")) str = indent + str;
  }

  this._push(str);
};

Buffer.prototype._push = function (str) {
  this.position.push(str);
  this.buf += str;
};

Buffer.prototype.endsWith = function (str) {
  var d = this.buf.length - str.length;
  return d >= 0 && this.buf.lastIndexOf(str) === d;
};

Buffer.prototype.isLast = function (cha, shouldTrimRight) {
  var buf = this.buf;
  if (shouldTrimRight) buf = trimRight(buf);
  var last = buf[buf.length - 1];

  if (Array.isArray(cha)) {
    return includes(cha, last);
  } else {
    return cha === last;
  }
};
