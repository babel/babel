module.exports = Whitespace;

var _ = require("lodash");

function Whitespace(tokens, comments) {
  this.tokens = _.sortBy(tokens.concat(comments), "start");
  this.used   = [];
}

Whitespace.prototype.needsNewlineBefore = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;

  _.each(tokens, function (token, i) {
    // this is the token this node starts with
    if (node.start === token.start) {
      startToken = tokens[i - 1];
      endToken = token;
      return false;
    }
  });

  return this.hasWhitespaceBetween(startToken, endToken);
};

Whitespace.prototype.needsNewlineAfter = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;

  _.each(tokens, function (token, i) {
    // this is the token this node ends with
    if (node.end === token.end) {
      startToken = token;
      endToken = tokens[i + 1];
      return false;
    }
  });

  return this.hasWhitespaceBetween(startToken, endToken);
};

Whitespace.prototype.hasWhitespaceBetween = function (startToken, endToken) {
  if (!endToken) return false;

  var start = startToken ? startToken.loc.end.line : 1;
  var end   = endToken.loc.start.line;

  var lines = 0;

  for (var line = start; line < end; line++) {
    if (!_.contains(this.used, line)) {
      this.used.push(line);
      lines++;
    }
  }

  return lines;
};
