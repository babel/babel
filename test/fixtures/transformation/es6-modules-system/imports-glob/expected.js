System.register(["foo"], function (_export) {
  var _foo;
  return {
    setters: [function (m) {
      _foo = m
    }],
    execute: function () {
      "use strict";

      var foo = _foo;
    }
  };
});