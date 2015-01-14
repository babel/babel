module.exports = Whitespace;

var _    = require("lodash");
var util = require("../util");

// a helper to iterate array from arbitrary index
function getLookupIndex(i, base, max) {
  i += base;

  if (i >= max)
    i -= max;

  return i;
}

function Whitespace(tokens, comments) {
  this.tokens = _.sortBy(tokens.concat(comments), "start");
  this.used   = [];

  // speed up common case where methods are called for next tokens
  this._lastFoundIndex = 0;
}

Whitespace.prototype.getNewlinesBefore = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;
  var token;

  for (var j = 0; j < tokens.length; j++) {
    var i = getLookupIndex(j, this._lastFoundIndex, this.tokens.length);
    token = tokens[i];

    // this is the token this node starts with
    if (node.start === token.start) {
      startToken = tokens[i - 1];
      endToken = token;
      this._lastFoundIndex = i;
      break;
    }
  }

  return this.getNewlinesBetween(startToken, endToken);
};

Whitespace.prototype.getNewlinesAfter = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;
  var token;

  for (var j = 0; j < tokens.length; j++) {
    var i = getLookupIndex(j, this._lastFoundIndex, this.tokens.length);
    token = tokens[i];

    // this is the token this node ends with
    if (node.end === token.end) {
      startToken = token;
      endToken = tokens[i + 1];
      this._lastFoundIndex = i;
      break;
    }
  }

  if (endToken.type.type === "eof") {
    return 1;
  } else {
    var lines = this.getNewlinesBetween(startToken, endToken);
    if (node.type === "Line" && !lines) {
      // line comment
      return 1;
    } else {
      return lines;
    }
  }
};

Whitespace.prototype.getNewlinesBetween = function (startToken, endToken) {
  var start = startToken ? startToken.loc.end.line : 1;
  var end   = endToken.loc.start.line;

  return util.mergeIntegerRange(this.used, start, end);
};