define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  _exports.__esModule = true;

  function _exportFromThis(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in _exports && _exports[key] === this[key]) return;
    _exports[key] = this[key];
  }

  Object.keys(_foo).forEach(_exportFromThis, _foo);
});
