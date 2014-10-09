var regexpu = require("regexpu");
var b       = require("ast-types").builders;
var _       = require("lodash");

exports.Literal = function (node) {
  var regex = node.regex;
  if (!regex) return;

  var flags = regex.flags.split("")
  if (!_.contains(regex.flags, "u")) return;
  _.pull(flags, "u");

  var pattern = regexpu.rewritePattern(regex.pattern, regex.flags);
  return b.literal(new RegExp(pattern, flags.join("")));
};
