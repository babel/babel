var some = require("core-js-pure/features/array/virtual/some");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.some;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.some) ? some : own;
};
