var forEach = require("core-js-pure/features/array/virtual/for-each");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.forEach) || DOMIterables.hasOwnProperty(toString.call(it)) ? forEach : own;
};
