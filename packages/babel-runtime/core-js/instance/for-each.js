var forEach = require("core-js-pure/features/array/virtual/for-each");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.forEach;
  return (own === ArrayPrototype.forEach && (it instanceof Array || DOMIterables.hasOwnProperty(toString.call(it)))) ? forEach : own;
};
