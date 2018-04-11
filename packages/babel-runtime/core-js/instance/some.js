var some = require("core-js-pure/features/array/virtual/some");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.some;
  return (own === ArrayPrototype.some && it instanceof Array) ? some : own;
};
