var startsWith = require("core-js-pure/features/string/virtual/starts-with");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.startsWith;
  return (own === StringPrototype.startsWith && (typeof it === "string" || it instanceof String)) ? startsWith : own;
};
