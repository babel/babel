var flatMap = require("core-js-pure/features/array/virtual/flat-map");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.flatMap;
  return (own === ArrayPrototype.flatMap && it instanceof Array) ? flatMap : own;
};
