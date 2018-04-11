var copyWithin = require("core-js-pure/features/array/virtual/copy-within");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.copyWithin;
  return (own === ArrayPrototype.copyWithin && it instanceof Array) ? copyWithin : own;
};
