define(["exports", "dep"], function (_exports, _dep) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _export("name", function () {
    return _dep.name;
  });
  function _export(name, fn) {
    Object.defineProperty(_exports, name, {
      enumerable: true,
      get: fn
    });
  }
});
