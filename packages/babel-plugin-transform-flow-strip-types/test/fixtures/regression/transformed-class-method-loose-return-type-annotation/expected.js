"use strict";

var C = function () {
  function C() {}

  var _proto = C.prototype;

  _proto.m = function m(x) {
    return 'a';
  };

  return C;
}();