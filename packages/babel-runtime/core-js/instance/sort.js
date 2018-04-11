var sort = require("core-js-pure/features/array/virtual/sort");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.sort;
  return (own === ArrayPrototype.sort && it instanceof Array) ? sort : own;
};
