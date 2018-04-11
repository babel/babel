var every = require("core-js-pure/features/array/virtual/every");
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.every;
  return (own === ArrayPrototype.every && it instanceof Array) ? every : own;
};
