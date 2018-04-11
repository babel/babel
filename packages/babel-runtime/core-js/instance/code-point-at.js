var codePointAt = require("core-js-pure/features/string/virtual/code-point-at");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.codePointAt;
  return (own === StringPrototype.codePointAt && (typeof it === "string" || it instanceof String)) ? codePointAt : own;
};
