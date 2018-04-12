var reduceRight = require("core-js-pure/features/array/virtual/reduce-right");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.reduceRight;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.reduceRight) ? reduceRight : own;
};
