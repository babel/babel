var at = require("core-js-pure/features/string/virtual/at");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.at;
  return (own === StringPrototype.at && (typeof it === "string" || it instanceof String)) ? at : own;
};
