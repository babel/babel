System.register(["foo"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foo) {
      var _exportObj = {};

      for (var _key in _foo) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _foo[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
