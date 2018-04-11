var splice = require("core-js-pure/features/array/virtual/splice");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return (own === ArrayPrototype.splice && it instanceof Array) ? splice : own;
};
