var replaceAll = require("core-js-pure/features/string/virtual/replace-all");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.replaceAll;
  return (own === StringPrototype.replaceAll && (typeof it === "string" || it instanceof String)) ? replaceAll : own;
};
