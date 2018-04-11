var find = require("core-js-pure/features/array/virtual/find");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.find;
  return (own === ArrayPrototype.find && it instanceof Array) ? find : own;
};
