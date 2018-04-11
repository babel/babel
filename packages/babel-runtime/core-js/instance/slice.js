var slice = require("core-js-pure/features/array/virtual/slice");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return (own === ArrayPrototype.slice && it instanceof Array) ? slice : own;
};
