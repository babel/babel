define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _export("bar", function () {
    return _foo.bar;
  });
  _export("default", function () {
    return _foo.foo;
  });
  function _export(name, fn) {
    Object.defineProperty(_exports, name, {
      enumerable: true,
      get: fn
    });
  }
});
