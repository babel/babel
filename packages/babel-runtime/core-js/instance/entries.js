var entries = require("core-js-pure/features/array/virtual/entries");
var ArrayPrototype = Array.prototype;
var toString = ({}).toString;

var DOMIterables = {
  '[object DOMTokenList]': true,
  '[object NodeList]': true
};

module.exports = function (it) {
  var own = it.entries;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.entries) || DOMIterables.hasOwnProperty(toString.call(it)) ? entries : own;
};
