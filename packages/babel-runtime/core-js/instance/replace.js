var replace = require("core-js-pure/features/string/virtual/replace");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.replace;
  return (own === StringPrototype.replace && (typeof it === "string" || it instanceof String)) ? replace : own;
};
