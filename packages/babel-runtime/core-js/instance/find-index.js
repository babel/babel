var findIndex = require("core-js-pure/features/array/virtual/find-index");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.findIndex;
  return (own === ArrayPrototype.findIndex && it instanceof Array) ? findIndex : own;
};
