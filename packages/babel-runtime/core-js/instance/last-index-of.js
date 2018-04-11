var lastIndexOf = require("core-js-pure/features/array/virtual/last-index-of");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.lastIndexOf;
  return (own === ArrayPrototype.lastIndexOf && it instanceof Array) ? lastIndexOf : own;
};
