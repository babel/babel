System.register("es6-modules-system/imports-named/expected", ["foo"], function (_export) {
  var _foo;
  return {
    setters: [function (m) {
      _foo = m
    }],
    execute: function () {
      "use strict";

      var bar = _foo.bar;
      var bar = _foo.bar;
      var baz = _foo.baz;
      var baz = _foo.bar;
      var baz = _foo.bar;
      var xyz = _foo.xyz;
    }
  };
});