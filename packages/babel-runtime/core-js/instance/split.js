var split = require("core-js-pure/features/string/virtual/split");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.split;
  return (own === StringPrototype.split && (typeof it === "string" || it instanceof String)) ? split : own;
};
