"use strict";

module.exports = Whitespace;

var sortBy = require("lodash/collection/sortBy");

/**
 * Returns `i`th number from `base`, continuing from 0 when `max` is reached.
 * Useful for shifting `for` loop by a fixed number but going over all items.
 *
 * @param {Number} i Current index in the loop
 * @param {Number} base Start index for which to return 0
 * @param {Number} max Array length
 * @returns {Number} shiftedIndex
 */

function getLookupIndex(i, base, max) {
  i += base;

  if (i >= max) {
    i -= max;
  }

  return i;
}

function Whitespace(tokens, comments) {
  this.tokens = sortBy(tokens.concat(comments), "start");
  this.used   = {};

  // Profiling this code shows that while generator passes over it, indexes
  // returned by `getNewlinesBefore` and `getNewlinesAfter` are always increasing.

  // We use this implementation detail for an optimization: instead of always
  // starting to look from `this.tokens[0]`, we will start `for` loops from the
  // previous successful match. We will enumerate all tokens—but the common
  // case will be much faster.

  this._lastFoundIndex = 0;
}

Whitespace.prototype.getNewlinesBefore = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;
  var token;

  for (var j = 0; j < tokens.length; j++) {
    // optimize for forward traversal by shifting for loop index
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
    // optimize for forward traversal by shifting for loop index
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

  if (endToken && endToken.type.type === "eof") {
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
  if (!endToken || !endToken.loc) return 0;

  var start = startToken ? startToken.loc.end.line : 1;
  var end   = endToken.loc.start.line;
  var lines = 0;

  for (var line = start; line < end; line++) {
    if (typeof this.used[line] === "undefined") {
      this.used[line] = true;
      lines++;
    }
  }

  return lines;
};
