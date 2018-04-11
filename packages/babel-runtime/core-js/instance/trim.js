var trim = require("core-js-pure/features/string/virtual/trim");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trim;
  return (own === StringPrototype.trim && (typeof it === "string" || it instanceof String)) ? trim : own;
};
