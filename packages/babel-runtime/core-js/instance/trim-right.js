var trimRight = require("core-js-pure/features/string/virtual/trim-right");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trimRight;
  return (own === StringPrototype.trimRight && (typeof it === "string" || it instanceof String)) ? trimRight : own;
};
