define(["exports", "foo"], function (_exports, _foo) {
  "use strict";

  _exports.__esModule = true;
  Object.keys(_foo).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (key in _exports && _exports[key] === _foo[key]) return;
    _exports[key] = _foo[key];
  });
});
