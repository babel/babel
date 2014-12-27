System.register("es6-modules-system/imports-mixing/expected", ["foo"], function (_export) {
  var _foo;
  return {
    setters: [function (m) {
      _foo = m
    }],
    execute: function () {
      "use strict";

      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };

      var foo = _interopRequire(_foo);

      var xyz = _foo.baz;
    }
  };
});