System.register(["foo"], function (_export) {
  var foo;
  return {
    setters: [function (_foo) {
      foo = _foo;
    }],
    execute: function () {
      "use strict";
    }
  };
});
