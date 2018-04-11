var fill = require("core-js-pure/features/array/virtual/fill");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.fill;
  return (own === ArrayPrototype.fill && it instanceof Array) ? fill : own;
};
