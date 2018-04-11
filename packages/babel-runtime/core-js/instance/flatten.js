var flatten = require("core-js-pure/features/array/virtual/flatten");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.flatten;
  return (own === ArrayPrototype.flatten && it instanceof Array) ? flatten : own;
};
