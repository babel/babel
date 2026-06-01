System.register(["foo"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foo) {
      _export({
        default: _foo.baz,
        ["__proto__"]: _foo.__proto__
      });
    }],
    execute: function () {}
  };
});
