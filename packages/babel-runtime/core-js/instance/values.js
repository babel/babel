var values = require("core-js-pure/features/array/virtual/values");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.values;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.values) || DOMIterables.hasOwnProperty(toString.call(it)) ? values : own;
};
