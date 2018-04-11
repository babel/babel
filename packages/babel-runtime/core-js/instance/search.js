var search = require("core-js-pure/features/string/virtual/search");
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.search;
  return (own === StringPrototype.search && (typeof it === "string" || it instanceof String)) ? search : own;
};
