System.register(["foo"], function (_export, _context) {
  "use strict";

  var bar, foo;
  return {
    setters: [function (_foo) {
      bar = _foo["default imports"];
      foo = _foo;
    }],
    execute: function () {
      bar;
    }
  };
});
