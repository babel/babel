define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _export("default", _foo, "foo");
  function _export(name, mod, name2) {
    Object.defineProperty(_exports, name, {
      enumerable: true,
      get() {
        return mod[name2 == null ? name : name2];
      }
    });
  }
});
