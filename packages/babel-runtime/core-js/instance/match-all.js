var matchAll = require("core-js-pure/features/string/virtual/match-all");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.matchAll;
  return (own === StringPrototype.matchAll && (typeof it === "string" || it instanceof String)) ? matchAll : own;
};
