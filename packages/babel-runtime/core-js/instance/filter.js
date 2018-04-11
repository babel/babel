var filter = require("core-js-pure/features/array/virtual/filter");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.filter;
  return (own === ArrayPrototype.filter && it instanceof Array) ? filter : own;
};
