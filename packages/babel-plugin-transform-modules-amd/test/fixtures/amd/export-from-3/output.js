define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });

  function _export(key, get) {
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get
    });
  }

  _export("foo", () => _foo.foo);

  _export("bar", () => _foo.bar);
});
