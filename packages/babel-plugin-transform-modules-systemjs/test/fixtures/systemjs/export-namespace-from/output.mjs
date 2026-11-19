System.register(["foo", "bar", "baz", "qux"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foo) {
      _export("ns", _foo);
    }, function (_bar) {
      _export("default", _bar);
    }, function (_baz) {
      _export("string name", _baz);
    }, function (_qux) {
      var _exportObj = {
        __proto__: null
      };
      for (var _key in _qux) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _qux[_key];
      }
      _exportObj.qux = _qux;
      _export(_exportObj);
    }],
    execute: function () {}
  };
});
