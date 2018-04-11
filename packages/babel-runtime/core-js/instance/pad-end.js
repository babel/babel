var padEnd = require("core-js-pure/features/string/virtual/pad-end");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.padEnd;
  return (own === StringPrototype.padEnd && (typeof it === "string" || it instanceof String)) ? padEnd : own;
};
