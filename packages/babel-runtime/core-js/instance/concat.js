var concat = require("core-js-pure/features/array/virtual/concat");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.concat;
  return (own === ArrayPrototype.concat && it instanceof Array) ? concat : own;
};
