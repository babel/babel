module.exports = Whitespace;

var _    = require("lodash");
var util = require("../util");

function Whitespace(tokens, comments) {
  this.tokens = _.sortBy(tokens.concat(comments), "start");
  this.used   = [];
}

Whitespace.prototype.getNewlinesBefore = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;
  var token;

  for (var i = 0; i < tokens.length; i++) {
    token = tokens[i];

    // this is the token this node starts with
    if (node.start === token.start) {
      startToken = tokens[i - 1];
      endToken = token;
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

  for (var i = 0; i < tokens.length; i++) {
    token = tokens[i];

    // this is the token this node ends with
    if (node.end === token.end) {
      startToken = token;
      endToken = tokens[i + 1];
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