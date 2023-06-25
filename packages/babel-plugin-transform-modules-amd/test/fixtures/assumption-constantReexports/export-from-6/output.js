define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _reexports(_exports, _foo);
  function _reexports(exports, mod) {
    for (const k in mod) {
      if (k === "default" || k === "__esModule") continue;
      k in exports && exports[k] === mod[k] || (exports[k] = mod[k]);
    }
  }
});
