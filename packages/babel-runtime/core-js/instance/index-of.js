var indexOf = require("core-js-pure/features/array/virtual/index-of");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.indexOf;
  return (own === ArrayPrototype.indexOf && it instanceof Array) ? indexOf : own;
};
