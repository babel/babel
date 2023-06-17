define(["exports", "dep"], function (_exports, _dep) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _defineGetter(_exports, "default", function () {
    return _dep.default;
  });
  _defineGetter(_exports, "name", function () {
    return _dep.name;
  });
  _dep = babelHelpers.interopRequireWildcard(_dep, true);
  function _defineGetter(obj, prop, fn) {
    Object.defineProperty(obj, prop, {
      enumerable: true,
      get: fn
    });
  }
});
