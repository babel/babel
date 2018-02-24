System.register(["foo"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foo) {
      var _exportObj = {};
      _exportObj.foo = _foo.foo;
      _exportObj.bar = _foo.bar;

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
