"use strict";

var foo = (function () {
  var _foo = {};

  _foo[Symbol.iterator] = "foobar";
  return _foo;
})();
