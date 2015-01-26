"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var obj = (function () {
  var _obj = {};

  _defineProperty(_obj, "x" + foo, "heh");

  _defineProperty(_obj, "y" + bar, "noo");

  return _obj;
})();