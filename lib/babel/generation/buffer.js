"use strict";

module.exports = Buffer;

var repeating = require("repeating");
var trimRight = require("trim-right");
var isBoolean = require("lodash/lang/isBoolean");
var messages  = require("../messages");
var includes  = require("lodash/collection/includes");
var isNumber  = require("lodash/lang/isNumber");

function Buffer(position, format, opts, code) {
  this.position = position;
  this._indent  = format.indent.base;
  this.format   = format;
  this.deopt    = false;
  this.buf      = "";

  if (code.length > 100000) { // 100KB
    this.deopt = true;
    console.error(messages.get("codeGeneratorDeopt", opts.filename, "100KB"));
  }
}

Buffer.prototype.get = function () {
  return trimRight(this.buf);
};

Buffer.prototype.getIndent = function () {
  if (this.deopt || this.format.concise) {
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
  if (this.deopt) return;
  if (this.buf && !this.isLast(" ") && !this.isLast("\n")) {
    this.push(" ");
  }
};

Buffer.prototype.removeLast = function (cha) {
  if (this.deopt) return;
  if (!this.isLast(cha)) return;

  this.buf = this.buf.substr(0, this.buf.length - 1);
  this.position.unshift(cha);
};

Buffer.prototype.newline = function (i, removeLast) {
  if (this.deopt) return;

  if (this.format.concise) {
    this.space();
    return;
  }

  removeLast = removeLast || false;

  if (isNumber(i)) {
    if (this.isLast("\n")) i--;

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
};

Buffer.prototype._newline = function (removeLast) {
  if (removeLast && this.isLast("\n")) this.removeLast("\n");

  this.removeLast(" ");
  this._push("\n");
};

Buffer.prototype.push = function (str, noIndent) {
  if (!this.deopt && this._indent && !noIndent && str !== "\n") {
    // we have an indent level and we aren't pushing a newline
    var indent = this.getIndent();

    // replace all newlines with newlines with the indentation
    str = str.replace(/\n/g, "\n" + indent);

    // we've got a newline before us so prepend on the indentation
    if (this.isLast("\n")) this._push(indent);
  }

  this._push(str);
};

Buffer.prototype._push = function (str) {
  this.position.push(str);
  this.buf += str;
};

Buffer.prototype.isLast = function (cha) {
  if (this.deopt) return false;

  var buf = this.buf;
  var last = buf[buf.length - 1];

  if (Array.isArray(cha)) {
    return includes(cha, last);
  } else {
    return cha === last;
  }
};
