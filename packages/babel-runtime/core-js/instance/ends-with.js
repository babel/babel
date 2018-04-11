var endsWith = require("core-js-pure/features/string/virtual/ends-with");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.endsWith;
  return (own === StringPrototype.endsWith && (typeof it === "string" || it instanceof String)) ? endsWith : own;
};
