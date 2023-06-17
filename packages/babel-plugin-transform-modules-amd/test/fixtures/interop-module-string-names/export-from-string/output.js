define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _defineGetter(_exports, "some exports", function () {
    return _foo["some exports"];
  });
  function _defineGetter(obj, prop, fn) {
    Object.defineProperty(obj, prop, {
      enumerable: true,
      get: fn
    });
  }
});
