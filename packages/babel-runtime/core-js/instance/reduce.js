var reduce = require("core-js-pure/features/array/virtual/reduce");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.reduce;
  return (own === ArrayPrototype.reduce && it instanceof Array) ? reduce : own;
};
