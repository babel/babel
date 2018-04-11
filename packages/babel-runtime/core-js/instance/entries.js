var entries = require("core-js-pure/features/array/virtual/entries");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.entries;
  return (own === ArrayPrototype.entries && (it instanceof Array || DOMIterables.hasOwnProperty(toString.call(it)))) ? entries : own;
};
