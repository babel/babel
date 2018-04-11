var arrayIncludes = require("core-js-pure/features/array/virtual/includes");
var stringIncludes = require("core-js-pure/features/string/virtual/includes");
var ArrayPrototype = Array.prototype;
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.includes;
  if (own === ArrayPrototype.includes && it instanceof Array) return arrayIncludes;
  if (own === StringPrototype.includes && (typeof it === "string" || it instanceof String)) return stringIncludes;
  return own;
};
