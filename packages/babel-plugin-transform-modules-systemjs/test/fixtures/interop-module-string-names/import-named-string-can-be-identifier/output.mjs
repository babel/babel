System.register(["foo"], function (_export, _context) {
  "use strict";

  var bar;
  return {
    setters: [function (_foo) {
      bar = _foo["defaultImports"];
    }],
    execute: function () {
      bar;
    }
  };
});
