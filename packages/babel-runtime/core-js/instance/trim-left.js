var trimLeft = require("core-js-pure/features/string/virtual/trim-left");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trimLeft;
  return (own === StringPrototype.trimLeft && (typeof it === "string" || it instanceof String)) ? trimLeft : own;
};
