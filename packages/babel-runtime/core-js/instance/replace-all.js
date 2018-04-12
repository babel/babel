var replaceAll = require("core-js-pure/features/string/virtual/replace-all");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.replaceAll;
  return typeof it === "string" || it === StringPrototype || (it instanceof String && own === StringPrototype.replaceAll) ? replaceAll : own;
};
