System.register(["foo"], function (_export) {
  "use strict";

  var toString;
  return {
    setters: [function (_foo) {
      toString = _foo["default"];
    }],
    execute: function () {
      toString;
    }
  };
});
