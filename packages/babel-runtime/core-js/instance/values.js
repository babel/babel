var values = require("core-js-pure/features/array/virtual/values");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.values;
  return (own === ArrayPrototype.values && (it instanceof Array || DOMIterables.hasOwnProperty(toString.call(it)))) ? values : own;
};
