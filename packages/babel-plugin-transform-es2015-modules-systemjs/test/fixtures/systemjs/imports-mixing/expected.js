System.register(["foo"], function (_export, _context) {
  "use strict";

  var foo, xyz;
  return {
    setters: [function (_foo) {
      foo = _foo.default;
      xyz = _foo.baz;
    }],
    execute: function () {}
  };
});
