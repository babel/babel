var trimEnd = require("core-js-pure/features/string/virtual/trim-end");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trimEnd;
  return (own === StringPrototype.trimEnd && (typeof it === "string" || it instanceof String)) ? trimEnd : own;
};
