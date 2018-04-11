var reduceRight = require("core-js-pure/features/array/virtual/reduce-right");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.reduceRight;
  return (own === ArrayPrototype.reduceRight && it instanceof Array) ? reduceRight : own;
};
