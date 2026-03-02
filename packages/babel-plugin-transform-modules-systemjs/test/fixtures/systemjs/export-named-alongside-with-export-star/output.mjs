System.register(["foo", "bar"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foo) {
      var _exportObj = {};
      for (var _key in _foo) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _foo[_key];
      }
      _exportObj.default = _foo.default;
      _export(_exportObj);
    }, function (_bar) {
      var _exportObj2 = {};
      for (var _key2 in _bar) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _bar[_key2];
      }
      _exportObj2.a = _bar.a;
      _exportObj2.b = _bar.b;
      _export(_exportObj2);
    }],
    execute: function () {}
  };
});
