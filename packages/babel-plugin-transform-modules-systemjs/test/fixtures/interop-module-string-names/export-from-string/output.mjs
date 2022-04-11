System.register(["foo"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_foo) {
      _export("some exports", _foo["some exports"]);
    }],
    execute: function () {}
  };
});
