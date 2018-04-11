var trimStart = require("core-js-pure/features/string/virtual/trim-start");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trimStart;
  return (own === StringPrototype.trimStart && (typeof it === "string" || it instanceof String)) ? trimStart : own;
};
