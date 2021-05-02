"use strict";

module.exports = process.env.BABEL_8_BREAKING
  ? require("escape-string-regexp")
  : require("lodash/escapeRegExp");
