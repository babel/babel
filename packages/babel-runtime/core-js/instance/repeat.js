var repeat = require("core-js-pure/features/string/virtual/repeat");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.repeat;
  return (own === StringPrototype.repeat && (typeof it === "string" || it instanceof String)) ? repeat : own;
};
