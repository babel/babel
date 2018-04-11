var keys = require("core-js-pure/features/array/virtual/keys");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.keys;
  return (own === ArrayPrototype.keys && (it instanceof Array || DOMIterables.hasOwnProperty(toString.call(it)))) ? keys : own;
};
