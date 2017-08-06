System.register(["foo"], function (_export, _context) {
  "use strict";

  var bar, bar2, baz, baz2, baz3, xyz;
  return {
    setters: [function (_foo) {
      bar = _foo.bar;
      bar2 = _foo.bar2;
      baz = _foo.baz;
      baz2 = _foo.bar;
      baz3 = _foo.bar;
      xyz = _foo.xyz;
    }],
    execute: function () {}
  };
});
