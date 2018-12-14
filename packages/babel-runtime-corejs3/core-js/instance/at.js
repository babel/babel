var at = require("core-js-pure/features/string/virtual/at");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.at;
  return typeof it === "string" || it === StringPrototype || (it instanceof String && own === StringPrototype.at) ? at : own;
};
