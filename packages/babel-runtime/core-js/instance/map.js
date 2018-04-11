var map = require("core-js-pure/features/array/virtual/map");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.map;
  return (own === ArrayPrototype.map && it instanceof Array) ? map : own;
};
