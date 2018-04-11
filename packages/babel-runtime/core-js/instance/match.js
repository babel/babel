var match = require("core-js-pure/features/string/virtual/match");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.match;
  return (own === StringPrototype.match && (typeof it === "string" || it instanceof String)) ? match : own;
};
