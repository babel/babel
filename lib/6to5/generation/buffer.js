module.exports = Buffer;

var util = require("../util");
var _    = require("lodash");

function Buffer(position, format) {
  this.position = position;
  this._indent  = format.indent.base;
  this.format   = format;
  this.buf      = "";
}

Buffer.prototype.get = function () {
  return util.trimRight(this.buf);
};

Buffer.prototype.getIndent = function () {
  if (this.format.compact) {
    return "";
  } else {
    return util.repeat(this._indent, this.format.indent.style);
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
  this.push(" ");
};

Buffer.prototype.space = function () {
  if (this.buf && !this.isLast([" ", "\n"])) {
    this.push(" ");
  }
};

Buffer.prototype.removeLast = function (cha) {
  if (!this.isLast(cha)) return;

  this.buf = this.buf.slice(0, -1);
  this.position.unshift(cha);
};

Buffer.prototype.newline = function (i, removeLast) {
  if (this.format.compact) return;

  if (_.isBoolean(i)) {
    removeLast = i;
    i = null;
  }

  if (_.isNumber(i)) {
    if (this.endsWith("{\n")) i--;
    if (this.endsWith(util.repeat(i, "\n"))) return;

    for (var j = 0; j < i; j++) {
      this.newline(null, removeLast);
    }
    return;
  }

  if (removeLast && this.isLast("\n")) this.removeLast("\n");

  this.removeLast(" ");

  // remove whitespace if last character was a newline
  this.buf = this.buf.replace(/\n +$/, "\n");

  this._push("\n");
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
  return this.buf.slice(-str.length) === str;
};

Buffer.prototype.isLast = function (cha, trimRight) {
  var buf = this.buf;
  if (trimRight) buf = util.trimRight(buf);
  var last = _.last(buf);

  if (_.isArray(cha)) {
    return _.contains(cha, last);
  } else {
    return cha === last;
  }
};
