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

  _export("some exports", () => _foo["some imports"]);
});
