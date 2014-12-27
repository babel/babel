System.register("es6-modules-system/imports-mixing/expected", ["foo"], function (_export) {
  var _foo;
  return {
    setters: [function (m) {
      _foo = m
    }],
    execute: function () {
      "use strict";

      var foo = _foo["default"];
      var xyz = _foo.baz;
    }
  };
});
