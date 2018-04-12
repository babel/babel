var flatten = require("core-js-pure/features/array/virtual/flatten");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.flatten;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.flatten) ? flatten : own;
};
