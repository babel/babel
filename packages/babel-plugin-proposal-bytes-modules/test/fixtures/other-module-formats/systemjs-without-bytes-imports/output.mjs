System.register(["./a.js", "./b.json"], function (_export, _context) {
  "use strict";

  var a, b, x;
  return {
    setters: [function (_aJs) {
      a = _aJs.default;
    }, function (_bJson) {
      b = _bJson.default;
    }],
    execute: function () {
      _export("x", x = a + b);
    }
  };
});
