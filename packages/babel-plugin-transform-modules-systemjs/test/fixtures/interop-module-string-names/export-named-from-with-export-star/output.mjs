System.register(["./other.mjs"], function (_export, _context) {
  "use strict";

  var foo, bar;
  return {
    setters: [function (_otherMjs) {
      var _exportObj = {};
      for (var _key in _otherMjs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _otherMjs[_key];
      }
      _exportObj["default exports"] = _otherMjs.foo;
      _exportObj.bar = _otherMjs.bar;
      _export(_exportObj);
    }],
    execute: function () {}
  };
});
