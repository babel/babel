System.register(["foo"], function (_export) {
  "use strict";

  var bar, bar, baz, baz, baz, xyz;
  return {
    setters: [function (_foo) {
      bar = _foo.bar;
      bar = _foo.bar;
      baz = _foo.baz;
      baz = _foo.bar;
      baz = _foo.bar;
      xyz = _foo.xyz;
    }],
    execute: function () {}
  };
});