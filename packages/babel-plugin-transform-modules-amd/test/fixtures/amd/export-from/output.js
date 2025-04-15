define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exportStar(_foo);
  function _exportStar(mod) {
    Object.keys(mod).forEach(function (k) {
      if (["default", "__esModule"].indexOf(k) < 0 && !(k in _exports && _exports[k] === mod[k])) {
        Object.defineProperty(_exports, k, {
          get: function () {
            return mod[k];
          },
          enumerable: true
        });
      }
    });
    return mod;
  }
});
