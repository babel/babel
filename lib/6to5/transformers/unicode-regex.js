var rewritePattern = require("regexpu/rewrite-pattern");
var b              = require("acorn-ast-types").builders;
var _              = require("lodash");

exports.Literal = function (node) {
  var regex = node.regex;
  if (!regex) return;

  var flags = regex.flags.split("");
  if (!_.contains(regex.flags, "u")) return;
  _.pull(flags, "u");

  var pattern = rewritePattern(regex.pattern, regex.flags);
  return b.literal(new RegExp(pattern, flags.join("")));
};
