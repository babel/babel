"use strict";

var rewritePattern = require("regexpu/rewrite-pattern");
var pull           = require("lodash/array/pull");
var t              = require("../../../types");

exports.check = function (node) {
  return t.isLiteral(node) && node.regex && node.regex.flags.indexOf("u") >= 0;
};

exports.Literal = function (node) {
  var regex = node.regex;
  if (!regex) return;

  var flags = regex.flags.split("");
  if (regex.flags.indexOf("u") < 0) return;
  pull(flags, "u");

  regex.pattern = rewritePattern(regex.pattern, regex.flags);
  regex.flags   = flags.join("");
};
