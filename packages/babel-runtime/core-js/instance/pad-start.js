var padStart = require("core-js-pure/features/string/virtual/pad-start");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.padStart;
  return (own === StringPrototype.padStart && (typeof it === "string" || it instanceof String)) ? padStart : own;
};
