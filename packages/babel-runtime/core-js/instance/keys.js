var keys = require("core-js-pure/features/array/virtual/keys");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.keys;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.keys) || DOMIterables.hasOwnProperty(toString.call(it)) ? keys : own;
};
